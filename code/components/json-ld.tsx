// Inyecta un bloque JSON-LD (schema.org) como <script type="application/ld+json">.
// Server component: el JSON se serializa en el HTML para que lo lean los
// rastreadores. Acepta uno o varios objetos de schema.
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // El contenido es data propia (no input de usuario): seguro de serializar.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
