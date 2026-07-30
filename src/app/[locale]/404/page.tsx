import Link from "next/link";
import type { Locale } from "@/content/localized";

export default async function NotFoundRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const english = locale === "en";
  return (
    <div className="document page-container narrow">
      <header>
        <p className="eyebrow">404 · Codes by Erax</p>
        <h1>{english ? "This page went off course" : "Esta página saiu da rota"}</h1>
        <p className="lead">
          {english
            ? "The address does not exist, has changed, or is no longer available."
            : "O endereço não existe, foi alterado ou não está mais disponível."}
        </p>
        <Link className="button" href={`/${locale}`}>
          {english ? "Return home" : "Voltar ao início"}
        </Link>
      </header>
    </div>
  );
}
