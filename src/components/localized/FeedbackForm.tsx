"use client";

import { useState } from "react";
import { content, type Locale } from "@/content/localized";

export function FeedbackForm({ locale }: { locale: Locale }) {
  const copy = content[locale].feedback;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (String(data.website || "")) return setStatus("success");

    try {
      const message = [
        `${copy.role}: ${data.role}`,
        `${copy.version}: ${data.version}`,
        `${copy.rating}: ${data.rating}`,
        `${copy.useful}: ${data.useful}`,
        "",
        `${copy.problem}:`,
        String(data.problem || "—"),
        "",
        `${copy.improve}:`,
        String(data.improve),
        "",
        `${copy.consent}: ${data.consent}`,
      ].join("\n");
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          access_key: "c925d099-5cb7-464c-bd3f-30bd1cb2dc2e",
          name: data.name,
          email: data.email,
          subject: `[Feedback] Vínculo Tutoria — ${data.rating}`,
          message,
          from_name: "Codes by Erax — Feedback",
          botcheck: "",
        }),
      });
      const result = await response.json() as { success?: boolean };
      if (!response.ok || !result.success) throw new Error();
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const select = (name: string, label: string, options: string[]) => (
    <label>{label}<select name={name} required defaultValue=""><option value="" disabled>—</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
  );

  return (
    <form className="feedback-form" onSubmit={submit}>
      <p className="form-warning">{copy.warning}</p>
      <label>{copy.name}<span>{copy.nameHelp}</span><input name="name" autoComplete="name" required maxLength={100} /></label>
      <label>{copy.email}<span>{copy.emailHelp}</span><input name="email" type="email" autoComplete="email" required maxLength={200} /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {select("role", copy.role, copy.roles)}
      {select("version", copy.version, copy.versions)}
      {select("rating", copy.rating, copy.ratings)}
      {select("useful", copy.useful, copy.features)}
      <label>{copy.problem}<span>{copy.problemHelp}</span><textarea name="problem" rows={5} maxLength={3000} /></label>
      <label>{copy.improve}<span>{copy.improveHelp}</span><textarea name="improve" rows={5} required maxLength={3000} /></label>
      {select("consent", copy.consent, copy.consents)}
      <button className="button" disabled={status === "sending"}>{status === "sending" ? (locale === "pt" ? "Enviando…" : "Sending…") : copy.submit}</button>
      <div role="status" aria-live="polite">
        {status === "success" && <p className="success">{copy.success}</p>}
        {status === "error" && <p className="error">{copy.error}</p>}
      </div>
    </form>
  );
}
