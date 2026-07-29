"use client";

import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const CONTROL =
  "w-full rounded-lg border bg-white/[0.03] px-4 py-3 font-sans text-[15px] font-light " +
  "text-white-soft placeholder:text-white-soft/40 transition-colors " +
  "focus:border-cyan-400/60 focus:bg-white/[0.05]";

const CONTROL_OK = "border-white/12";
const CONTROL_ERROR = "border-[#ff9d9d]/70";

interface BaseFieldProps {
  label: string;
  name: string;
  error?: string;
  /** Texto de apoio permanente sob o rótulo. */
  hint?: string;
  required?: boolean;
}

type TextFieldProps = BaseFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id" | "required">;

/** Campo de texto de uma linha com rótulo visível e erro associado. */
export function TextField({
  label,
  name,
  error,
  hint,
  required = false,
  className,
  ...rest
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel htmlFor={id} label={label} required={required} />
      {hint ? (
        <p id={hintId} className="text-[13px] font-light text-white-soft/60">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(error && errorId, hint && hintId) || undefined}
        className={cn(CONTROL, error ? CONTROL_ERROR : CONTROL_OK, className)}
        {...rest}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

type TextAreaFieldProps = BaseFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "id" | "required">;

/** Campo de texto multilinha. */
export function TextAreaField({
  label,
  name,
  error,
  hint,
  required = false,
  className,
  rows = 5,
  ...rest
}: TextAreaFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel htmlFor={id} label={label} required={required} />
      {hint ? (
        <p id={hintId} className="text-[13px] font-light text-white-soft/60">
          {hint}
        </p>
      ) : null}
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(error && errorId, hint && hintId) || undefined}
        className={cn(CONTROL, "resize-y", error ? CONTROL_ERROR : CONTROL_OK, className)}
        {...rest}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

type CheckboxFieldProps = Omit<BaseFieldProps, "hint"> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id" | "type" | "required">;

/** Caixa de consentimento. A área clicável cobre rótulo inteiro. */
export function CheckboxField({
  label,
  name,
  error,
  required = false,
  className,
  ...rest
}: CheckboxFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 py-1 text-[14px] font-light leading-[1.55] text-white-soft/80"
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "mt-0.5 size-5 shrink-0 cursor-pointer accent-violet-500",
            className,
          )}
          {...rest}
        />
        <span>{label}</span>
      </label>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-[11px] uppercase leading-none tracking-[.16em] text-white-soft/75"
    >
      {label}
      {required ? (
        <span className="ml-1.5 text-cyan-400" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-1.5 normal-case tracking-normal text-white-soft/50">
          (opcional)
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="text-[13px] font-normal leading-snug text-[#ffb4b4]">
      {message}
    </p>
  );
}

/**
 * Honeypot: invisível para pessoas, atraente para robôs de formulário.
 *
 * Escondido com `position:absolute` fora da tela em vez de `display:none` —
 * bots costumam ignorar campos ocultos por display. `tabIndex={-1}` e
 * `aria-hidden` o mantêm fora do caminho de quem navega por teclado ou
 * leitor de tela.
 */
export function HoneypotField({ name = "website" }: { name?: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
    >
      <label htmlFor={`hp-${name}`}>Não preencha este campo</label>
      <input
        id={`hp-${name}`}
        name={name}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
