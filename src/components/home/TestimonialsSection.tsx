import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { showTestimonials } from "@/content/site";
import { testimonials } from "@/content/testimonials";

/**
 * Depoimentos.
 *
 * Oculta enquanto não houver depoimentos reais e autorizados — as citações do
 * protótipo são placeholders e publicá-las atribuídas seria inventar prova
 * social. O layout fica pronto: basta popular `content/testimonials.ts` e
 * ligar `showTestimonials` em `content/site.ts`.
 */
export function TestimonialsSection() {
  if (!showTestimonials || testimonials.length === 0) return null;

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-titulo"
      className="px-5 pt-[88px] wide:px-[46px] wide:pt-[110px]"
    >
      <Reveal>
        <SectionHeading id="depoimentos-titulo" index="05 — Depoimentos">
          Quem já usa
        </SectionHeading>
      </Reveal>

      <ul className="m-0 mt-11 grid list-none grid-cols-1 gap-[22px] p-0 sm:grid-cols-2 wide:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal as="li" key={testimonial.id} delay={index * 0.08} className="flex">
            <blockquote className="m-0 flex w-full flex-col rounded-[10px] border border-white/10 bg-white/[0.014] p-8">
              <p className="m-0 font-display text-[22px] font-light leading-[1.62] text-white-soft/90">
                {testimonial.quote}
              </p>
              <footer className="mt-6 font-mono text-[10.5px] uppercase leading-[1.6] tracking-[.14em] text-white-soft/60">
                {testimonial.author}
                <br />
                {testimonial.role}
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
