import { checkedSubmission, singleSubmission } from "./form-security";

class LeadSubmissionError extends Error {
  constructor(readonly status: number) { super("Lead submission rejected"); }
}

export function leadError(error: unknown, lang: string, fallback: string): string {
  const status = error instanceof LeadSubmissionError ? error.status : 0;
  if (status === 400 || status === 422 || status === 413) {
    return lang === "ar" ? "تحقق من الحقول وطول النص وصيغته، ثم حاول مرة أخرى."
      : lang === "fr" ? "Vérifiez les champs, leur longueur et leur format, puis réessayez."
      : "Check the fields and their length or format, then try again.";
  }
  if (status === 429) return lang === "ar" ? "انتظر قليلًا قبل المحاولة مرة أخرى."
    : lang === "fr" ? "Patientez un moment avant de réessayer."
    : "Please wait a moment before trying again.";
  return fallback;
}

/** Public endpoints do not rely on cookies; preserve entered values on failure. */
export function submitLead(path: string, fields: Record<string, unknown>): Promise<Response> {
  const body = JSON.stringify(fields);
  checkedSubmission(path, body);
  // Share bytes, not a consumed Response body. Each caller receives a clone.
  return singleSubmission(`${path}:${body}`, () =>
    fetch(`https://makletna.replit.app/api${path}`, { method: "POST", credentials: "omit", headers: { "Content-Type": "application/json" }, body }),
  ).then(response => {
    if (!response.ok) throw new LeadSubmissionError(response.status);
    return response.clone();
  });
}
