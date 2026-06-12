import { promo } from "@/lib/promo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "¿Necesito cita previa?", a: "Puedes agendar por WhatsApp y coordinamos el horario que mejor te quede." },
  { q: `¿Qué incluye la consulta de ${promo.price}?`, a: "Revisión de oídos, garganta, fondo de ojo y control de signos vitales." },
  { q: "¿Aceptan seguros médicos?", a: "Escríbenos por WhatsApp para confirmar la cobertura según tu caso." },
  { q: "¿Dónde están ubicados?", a: "Gaspar de Cañero E10-114 y Av. 6 de Diciembre, Quito." },
];

export function Faq() {
  return (
    <section id="faq" className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <div className="text-center">
          <p className="eyebrow">Dudas</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
            Preguntas frecuentes
          </h2>
        </div>
        <Accordion className="mt-8">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
