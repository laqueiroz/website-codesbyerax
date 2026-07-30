import Link from "next/link";

export function Hero({ eyebrow, title, text, actions }: { eyebrow?: string; title: string; text: string[]; actions?: {label:string;href:string;secondary?:boolean}[] }) {
  return <section className="hero-section"><div className="orb" aria-hidden="true" /><div className="page-container hero-content">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{text.map((p)=><p key={p}>{p}</p>)}{actions && <div className="actions">{actions.map((a)=><Link key={a.href} href={a.href} className={a.secondary ? "button secondary" : "button"}>{a.label}</Link>)}</div>}</div></section>;
}

export function Section({ id, eyebrow, title, paragraphs, children, tone=false }: {id?:string;eyebrow?:string;title:string;paragraphs?:string[];children?:React.ReactNode;tone?:boolean}) {
  return <section id={id} className={tone ? "content-section tone" : "content-section"}><div className="page-container">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{paragraphs?.map((p)=><p className="section-copy" key={p}>{p}</p>)}{children}</div></section>;
}

export function Cards({ items, numbered=false }: {items:{title:string;text:string|string[]}[];numbered?:boolean}) {
  return <div className="card-grid">{items.map((item,i)=><article className="info-card" key={item.title}>{numbered && <span className="number">{String(i+1).padStart(2,"0")}</span>}<h3>{item.title}</h3>{(Array.isArray(item.text)?item.text:[item.text]).map((p)=><p key={p}>{p}</p>)}</article>)}</div>;
}

export function DocumentPage({ title, description, sections, children }: {title:string;description?:string;sections:{title:string;paragraphs:string[];items?:string[]}[];children?:React.ReactNode}) {
  return <div className="document page-container"><header><p className="eyebrow">Codes by Erax</p><h1>{title}</h1>{description && <p className="lead">{description}</p>}</header>{sections.map((section)=><section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((p)=><p key={p}>{p}</p>)}{section.items && <ul>{section.items.map((item)=><li key={item}>{item}</li>)}</ul>}</section>)}{children}</div>;
}
