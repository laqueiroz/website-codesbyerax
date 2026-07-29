"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { HoneypotField, TextAreaField, TextField } from "@/components/ui/FormField";
import { FormStatus, type FormState } from "@/components/ui/FormStatus";
import {
  validateContact,
  type ContactField,
  type FieldErrors,
} from "@/lib/validation";

const MESSAGES: Record<Exclude<FormState, "idle" | "submitting">, string> = {
  success: "Mensagem enviada. Respondemos no e-mail informado assim que possível.",
  error: "Não foi possível enviar agora. Tente novamente em alguns instantes.",
  "not-configured":
    "O envio de e-mails ainda não está configurado neste ambiente, então sua mensagem não foi enviada. Por favor, tente novamente mais tarde.",
};

/** Assuntos oferecidos; o campo continua livre para digitação. */
const SUBJECT_SUGGESTIONS = [
  "Dúvida sobre o Vínculo Tutoria",
  "Problema técnico",
  "Sugestão de recurso",
  "Uso na minha escola",
  "Imprensa",
  "Outro assunto",
];

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors<ContactField>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (state === "submitting") return;

      const formData = new FormData(event.currentTarget);
      const payload = {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        subject: String(formData.get("subject") ?? ""),
        message: String(formData.get("message") ?? ""),
        website: String(formData.get("website") ?? ""),
      };

      const local = validateContact(payload);
      if (!local.ok) {
        setErrors(local.errors);
        setState("idle");
        const firstField = Object.keys(local.errors)[0];
        if (firstField) {
          formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
        }
        return;
      }

      setErrors({});
      setState("submitting");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(local.value),
        });

        if (response.ok) {
          setState("success");
          formRef.current?.reset();
          return;
        }

        const body = (await response.json().catch(() => null)) as {
          errors?: FieldErrors<ContactField>;
        } | null;

        if (response.status === 422 && body?.errors) {
          setErrors(body.errors);
          setState("idle");
          return;
        }

        setState(response.status === 503 ? "not-configured" : "error");
      } catch {
        setState("error");
      }
    },
    [state],
  );

  if (state === "success") {
    return <FormStatus state="success" message={MESSAGES.success} />;
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="relative flex max-w-[560px] flex-col gap-5"
    >
      <HoneypotField />

      <TextField
        label="Nome"
        name="name"
        autoComplete="name"
        required
        maxLength={80}
        error={errors.name}
        placeholder="Seu nome"
      />

      <TextField
        label="E-mail"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        maxLength={254}
        error={errors.email}
        placeholder="seu@email.com"
      />

      <TextField
        label="Assunto"
        name="subject"
        required
        maxLength={120}
        error={errors.subject}
        list="assuntos-contato"
        placeholder="Sobre o que você quer falar"
      />
      <datalist id="assuntos-contato">
        {SUBJECT_SUGGESTIONS.map((subject) => (
          <option key={subject} value={subject} />
        ))}
      </datalist>

      <TextAreaField
        label="Mensagem"
        name="message"
        required
        rows={6}
        maxLength={2000}
        error={errors.message}
        hint="Se for um problema técnico, informe a versão do aplicativo e a do Windows."
        placeholder="Escreva sua mensagem"
      />

      <FormStatus
        state={state}
        message={
          state === "error" || state === "not-configured" ? MESSAGES[state] : undefined
        }
      />

      <Button type="submit" size="md" disabled={state === "submitting"} className="self-start">
        {state === "submitting" ? "Enviando…" : "Enviar mensagem"}
      </Button>
    </form>
  );
}
