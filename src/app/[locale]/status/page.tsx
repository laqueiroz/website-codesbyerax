import type { Metadata } from "next";
import type { Locale } from "@/content/localized";
import { isLocale, localizedMetadata } from "@/lib/localized";

const serviceStates = [
  { id: "site", state: "operational" },
  { id: "downloads", state: "unavailable" },
  { id: "app", state: "operational" },
] as const;

const statusCopy = {
  pt: {
    title: "Situação dos serviços",
    description: "Situação atual do site, da distribuição de downloads e do aplicativo Vínculo Tutoria.",
    intro: "O Vínculo Tutoria funciona localmente: mesmo que um serviço online esteja indisponível, o aplicativo instalado continua funcionando normalmente.",
    notice: "Este painel é atualizado manualmente pela Codes by Erax e não representa monitoramento automático em tempo real.",
    operational: "Operacional",
    unavailable: "Indisponível",
    services: [
      { name: "Site institucional", description: "Páginas públicas, conteúdo e formulários." },
      { name: "Distribuição de downloads", description: "Disponibilidade do instalador oficial do Vínculo Tutoria." },
      { name: "Vínculo Tutoria", description: "O aplicativo funciona localmente e não depende da disponibilidade do site para seus recursos principais." },
    ],
  },
  en: {
    title: "Service status",
    description: "Current status of the website, download distribution, and Vínculo Tutoria application.",
    intro: "Vínculo Tutoria works locally: even if an online service is unavailable, the installed application continues to work normally.",
    notice: "This page is updated manually by Codes by Erax and does not represent automated real-time monitoring.",
    operational: "Operational",
    unavailable: "Unavailable",
    services: [
      { name: "Official website", description: "Public pages, content, and forms." },
      { name: "Download distribution", description: "Availability of the official Vínculo Tutoria installer." },
      { name: "Vínculo Tutoria", description: "The application works locally and does not depend on website availability for its core features." },
    ],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = statusCopy[locale];
  return localizedMetadata(locale, "/status", `${copy.title} | Codes by Erax`, copy.description);
}

export default async function StatusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const copy = statusCopy[locale];
  return (
    <div className="document page-container">
      <header>
        <p className="eyebrow">Status · Codes by Erax</p>
        <h1>{copy.title}</h1>
        <p className="lead">{copy.intro}</p>
      </header>
      <aside className="notice"><p>{copy.notice}</p></aside>
      <section aria-label={copy.title}>
        <div className="status-list">
          {serviceStates.map((service, index) => (
            <article className="status-row" key={service.id}>
              <div>
                <h2>{copy.services[index]!.name}</h2>
                <p>{copy.services[index]!.description}</p>
              </div>
              <span className={`status-state status-${service.state}`}>
                <span aria-hidden="true" />
                {copy[service.state]}
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
