interface JsonLdProps {
  /** Um ou mais objetos schema.org. */
  data: object | object[];
}

/**
 * Injeta dados estruturados. O JSON é serializado no servidor e tem `<` e `&`
 * escapados para que o conteúdo nunca possa fechar a tag `<script>`.
 */
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item)
              .replace(/</g, "\\u003c")
              .replace(/&/g, "\\u0026"),
          }}
        />
      ))}
    </>
  );
}
