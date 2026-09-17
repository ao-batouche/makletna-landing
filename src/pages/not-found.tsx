import { Link } from "wouter";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
      <div>
        <h1 style={{ fontSize: 48, marginBottom: 12 }}>404</h1>
        <p style={{ marginBottom: 20 }}>Page not found</p>
        <Link href="/" className="btn-pill btn-pill--primary">Makletna</Link>
      </div>
    </main>
  );
}
