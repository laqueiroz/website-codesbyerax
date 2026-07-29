export interface Testimonial {
  id: string;
  quote: string;
  /** Nome real da pessoa. Obrigatório para publicar. */
  author: string;
  role: string;
}

/**
 * VAZIO POR DECISÃO EDITORIAL.
 *
 * As três citações do protótipo foram escritas na voz pretendida da marca, mas
 * não são declarações reais de clientes — o próprio handoff as marca como
 * "DEPOIMENTO PENDENTE". Publicá-las atribuídas seria inventar prova social.
 *
 * Para ativar a seção:
 *   1. colete depoimentos reais com autorização de uso por escrito;
 *   2. adicione-os a este array;
 *   3. mude `showTestimonials` para `true` em content/site.ts.
 *
 * O layout em TestimonialsSection.tsx já está pronto para recebê-los.
 */
export const testimonials: readonly Testimonial[] = [];
