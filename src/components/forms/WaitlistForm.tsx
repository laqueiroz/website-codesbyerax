"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import {
  CheckboxField,
  HoneypotField,
  TextAreaField,
  TextField,
} from "@/components/ui/FormField";
import { FormStatus, type FormState } from "@/components/ui/FormStatus";
import type { Product } from "@/content/products";
import {
  validateWaitlist,
  type FieldErrors,
  type WaitlistField,
} from "@/lib/validation";

interface WaitlistFormProps {
  product: Product;
  onSuccess?: () => void;
}

const MESSAGES: Record<Exclude<FormState, "idle" | "submitting">, string> = {
  success:
    "Pronto — seu nome está na lista. Você receberá um e-mail quando houver novidade.",
  error: "Não foi possível registrar agora. Tente novamente em alguns instantes.",
  "not-configured":
    "O envio de e-mails ainda não está configurado neste ambiente, então seu cadastro não foi registrado. Nada foi perdido: tente novamente mais tarde ou escreva pela página de contato.",
};

export function WaitlistForm({ product, onSuccess }: WaitlistFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors<WaitlistField>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Barra o duplo envio: enquanto uma requisição estiver em voo, ignora.
      if (state === "submitting") return;

      const formData = new FormData(event.currentTarget);
      const payload = {
        productId: product.id,
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message: String(formData.get("message") ?? ""),
        consent: formData.get("consent") === "on",
        website: String(formData.get("website") ?? ""),
      };

      const local = validateWaitlist(payload, [product.id]);
      if (!local.ok) {
        setErrors(local.errors);
        setState("idle");
        // Leva o foco ao primeiro campo com erro.
        const firstField = Object.keys(local.errors)[0];
        if (firstField) {
          formRef.current
            ?.querySelector<HTMLElement>(`[name="${firstField}"]`)
            ?.focus();
        }
        return;
      }

      setErrors({});
      setState("submitting");

      try {
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(local.value),
        });

        if (response.ok) {
          setState("success");
          formRef.current?.reset();
          onSuccess?.();
          return;
        }

        const body = (await response.json().catch(() => null)) as {
          errors?: FieldErrors<WaitlistField>;
          reason?: string;
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
    [product.id, state, onSuccess],
  );

  if (state === "success") {
    return <FormStatus state="success" message={MESSAGES.success} />;
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-5">
      <HoneypotField />

      <TextField
        label="Nome"
        name="name"
        autoComplete="name"
        required
        maxLength={80}
        error={errors.name}
        placeholder="Como devemos chamar você"
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

      <TextAreaField
        label="Mensagem"
        name="message"
        rows={3}
        maxLength={600}
        error={errors.message}
        hint={`O que você espera do ${product.name}?`}
        placeholder="Opcional"
      />

      <CheckboxField
        label={`Concordo em receber por e-mail novidades sobre o ${product.name}. Posso cancelar quando quiser.`}
        name="consent"
        required
        error={errors.consent}
      />

      {errors.productId ? (
        <FormStatus state="error" message={errors.productId} />
      ) : null}

      <FormStatus
        state={state}
        message={
          state === "error" || state === "not-configured" ? MESSAGES[state] : undefined
        }
      />

      <Button type="submit" size="md" disabled={state === "submitting"} className="self-start">
        {state === "submitting" ? "Enviando…" : "Entrar na lista"}
      </Button>
    </form>
  );
}
