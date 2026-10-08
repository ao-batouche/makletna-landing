/** Browser submission checks. API schemas remain the authority. No field coercion. */
const pending = new Map<string, Promise<unknown>>();
const orderKeys = new Map<string, { value: string; expires: number }>();
export const CHECK_FIELDS = "Please check the fields and their length or format, then try again.";
export const CHECK_PASSWORD = "Use at least 8 characters and no more than 72 UTF-8 bytes for a new password.";
export const CHECK_FILE = "Choose a valid image or PDF within the upload size limit.";

/** Keep page-specific response parsing, with shared checks and bearer-only transport. */
export async function fetchSubmission(url: string | URL, init: RequestInit = {}): Promise<Response> {
  const path = String(url);
  const body = checkedSubmission(path, init.body);
  const method = init.method || "GET";
  const token = new Headers(init.headers).get("Authorization") || "";
  const key = method !== "GET" && typeof body === "string" ? `${token}:${method}:${path}:${body}` : undefined;
  const response = await singleSubmission(key, () => fetch(url, { ...init, body, credentials: "omit" }));
  return response.clone();
}

function stringLimit(key: string, path: string): number | undefined {
  if (key === "identifier") return 254;
  if (key === "username") return 30;
  if (/email$/i.test(key)) return 254;
  if (/phone(?:[12])?$/i.test(key)) return 30;
  if (key === "name" || key === "fullName") return 120;
  if (/password/i.test(key)) return /login|currentPassword/.test(path + key) ? 1024 : 72;
  if (/url$/i.test(key)) return 2048;
  if (key === "content") return 80000;
  if (key === "subject") return path.includes("form-submissions/contact") ? 200 : 300;
  if (key === "title") return path.includes("/services") ? 140 : 200;
  if (key === "description") return path.includes("/services") ? 2000 : 5000;
  if (key === "body") return /email-settings|form-submissions/.test(path) ? 5000 : 4000;
  if (key === "message") return /form-submissions|broadcast/.test(path) ? 2000 : 4000;
  if (/^(?:bio|notes|reason|motivation|adminNote|reviewNote|note|comment|opinion|cancellationReason)$/.test(key)) return 2000;
  if (/^(?:wilaya|commune)$/.test(key)) return 80;
  if (key === "company") return 200;
  if (key === "investmentRange") return 100;
  if (/address/i.test(key)) return 1000;
  return undefined;
}

/** Preserve native constraint behavior, but do not depend on the browser UI language. */
export function installBrowserValidation(): void {
  const changed = new WeakSet<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>();
  const messages = {
    en: { required: "Please complete this field.", check: "Please check this field’s format and allowed range." },
    fr: { required: "Veuillez remplir ce champ.", check: "Vérifiez le format et les limites autorisées de ce champ." },
    ar: { required: "يرجى إكمال هذا الحقل.", check: "يرجى التحقق من تنسيق هذا الحقل والحدود المسموح بها." },
  };
  const field = (target: EventTarget | null): target is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =>
    target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;
  document.addEventListener("invalid", event => {
    if (!field(event.target) || event.target.validity.customError) return;
    const locale = document.documentElement.lang.split("-")[0];
    const text = messages[locale as keyof typeof messages] || messages.en;
    event.target.setCustomValidity(event.target.validity.valueMissing ? text.required : text.check);
    changed.add(event.target);
  }, true);
  const clear = (event: Event) => {
    if (field(event.target) && changed.has(event.target)) {
      event.target.setCustomValidity("");
      changed.delete(event.target);
    }
  };
  document.addEventListener("input", clear, true);
  document.addEventListener("change", clear, true);
}

/** Called before dispatch, including inline actions without a form element. */
export function checkedSubmission(path: string, body: RequestInit["body"]): RequestInit["body"] {
  if (body instanceof FormData) {
    let count = 0;
    for (const [key, value] of body.entries()) {
      if (typeof value === "string") {
        const limit = stringLimit(key, path);
        if (limit && value.length > limit) throw new Error(CHECK_FIELDS);
      } else {
        count++;
        const doc = /\.pdf$/i.test(value.name);
        const limit = /chat|issues/.test(path) ? 20 : 10;
        if (value.size > limit * 1024 * 1024 || !/\.(?:jpe?g|png|gif|webp|hei[cf]|pdf)$/i.test(value.name) ||
            (doc && !/chat|issues/.test(path))) throw new Error(CHECK_FILE);
      }
    }
    if (count > (path.includes("issues") ? 5 : 1)) throw new Error(CHECK_FILE);
    return body;
  }
  if (typeof body !== "string") return body;
  if (new TextEncoder().encode(body).length > 1024 * 1024) throw new Error(CHECK_FIELDS);
  let parsed: unknown;
  try { parsed = JSON.parse(body); } catch { throw new Error(CHECK_FIELDS); }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error(CHECK_FIELDS);
  function walk(value: unknown, key: string, depth: number): void {
    if (depth > 8) throw new Error(CHECK_FIELDS);
    const limit = stringLimit(key, path);
    const translated = /\/admin\/legal\//.test(path) && /^(?:title|content)$/.test(key) &&
      value !== null && typeof value === "object" && !Array.isArray(value);
    if (limit && value != null && typeof value !== "string" && !translated) throw new Error(CHECK_FIELDS);
    if (typeof value === "number" && !Number.isFinite(value)) throw new Error(CHECK_FIELDS);
    if (typeof value === "string") {
      if (value.includes("\0") && !(/\/(?:auth\/|[^/]*password)/.test(path) &&
          /^(?:password|currentPassword|newPassword)$/.test(key))) throw new Error(CHECK_FIELDS);
      if (limit && value.length > limit) throw new Error(CHECK_FIELDS);
      if (/^(?:password|newPassword)$/.test(key) && !path.includes("/login") &&
          (value.length < 8 || new TextEncoder().encode(value).length > 72)) throw new Error(CHECK_PASSWORD);
      if (/url$/i.test(key) && value && !value.startsWith("/api/uploads/")) {
        let url: URL;
        try { url = new URL(value); } catch { throw new Error(CHECK_FIELDS); }
        if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error(CHECK_FIELDS);
      }
    }
    if (Array.isArray(value)) {
      const maximum = ({ photos: 10, photoUrls: 3, ingredients: 100, allergies: 50, locations: 30,
        additionalServices: 5, placements: 4, officeHours: 14, category: 4 } as Record<string, number>)[key] ?? 100;
      if (value.length > maximum) throw new Error(CHECK_FIELDS);
      value.forEach(v => walk(v, "", depth + 1));
    } else if (value && typeof value === "object") {
      Object.entries(value).forEach(([k, v]) => {
        if (["__proto__", "constructor", "prototype"].includes(k)) throw new Error(CHECK_FIELDS);
        walk(v, translated ? key : k, depth + 1);
      });
    }
  }
  Object.entries(parsed).forEach(([k, v]) => walk(v, k, 0));
  return body;
}

/** Exact simultaneous submissions share one request, scoped to the session. */
export function singleSubmission<T>(key: string | undefined, action: () => Promise<T>): Promise<T> {
  if (!key) return action();
  const existing = pending.get(key);
  if (existing) return existing as Promise<T>;
  const operation = action().finally(() => { pending.delete(key); });
  pending.set(key, operation);
  return operation;
}

/** Preserve the existing optional order contract; retries after network loss keep their key. */
export function orderSubmission(path: string, body: RequestInit["body"], session: string): RequestInit["body"] {
  if (path !== "/orders" || typeof body !== "string") return body;
  const data = JSON.parse(body);
  if (data.idempotencyKey) return body;
  const fingerprint = session + body;
  for (const [key, entry] of orderKeys) if (entry.expires < Date.now()) orderKeys.delete(key);
  let entry = orderKeys.get(fingerprint);
  if (!entry) {
    entry = { value: crypto.randomUUID(), expires: Date.now() + 10 * 60_000 };
    orderKeys.set(fingerprint, entry);
  }
  return JSON.stringify({ ...data, idempotencyKey: entry.value });
}

export function forgetOrderSubmission(body: RequestInit["body"], session: string): void {
  if (typeof body === "string") orderKeys.delete(session + body);
}
