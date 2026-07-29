"use client";

import { useCallback, useState } from "react";

import { Reveal } from "@/components/effects/Reveal";
import { WaitlistModal } from "@/components/forms/WaitlistModal";
import { ProductCard } from "@/components/home/ProductCard";
import { products, type Product } from "@/content/products";

/**
 * Catálogo completo em /produtos. Reaproveita o `ProductCard` da home, com o
 * mesmo fluxo de lista de espera, num grid sem a hierarquia 1.5fr do destaque.
 */
export function ProductsCatalog() {
  const [waitlistProduct, setWaitlistProduct] = useState<Product | null>(null);

  const openWaitlist = useCallback((product: Product) => setWaitlistProduct(product), []);
  const closeWaitlist = useCallback(() => setWaitlistProduct(null), []);

  return (
    <section aria-label="Catálogo de produtos" className="px-5 pb-16 wide:px-[46px]">
      <ul className="m-0 grid list-none grid-cols-1 gap-[22px] p-0 md:grid-cols-2 wide:grid-cols-3">
        {products.map((product, index) => (
          <Reveal as="li" key={product.id} delay={index * 0.08} className="flex">
            <div className="flex w-full">
              <ProductCard product={product} onWaitlist={openWaitlist} />
            </div>
          </Reveal>
        ))}
      </ul>

      <WaitlistModal
        product={waitlistProduct}
        open={waitlistProduct !== null}
        onClose={closeWaitlist}
      />
    </section>
  );
}
