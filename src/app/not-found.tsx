import Link from "next/link";

export default function NotFound() {
  return (
    <main className="document page-container narrow">
      <header>
        <p className="eyebrow">404 · Codes by Erax</p>
        <h1>Esta página saiu da rota</h1>
        <p className="lead">O endereço acessado não existe ou foi alterado.</p>
        <Link className="button" href="/pt">Voltar ao início</Link>
      </header>
    </main>
  );
}
