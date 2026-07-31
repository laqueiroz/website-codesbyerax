import Link from "next/link";

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/pt/" />
      <main className="document page-container narrow">
        <p className="eyebrow">Codes by Erax</p>
        <h1>Redirecionando…</h1>
        <Link className="button" href="/pt/">Acessar o site</Link>
      </main>
    </>
  );
}
