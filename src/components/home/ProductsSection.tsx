"use client";

import { useCallback, useState } from "react";

import { Reveal } from "@/components/effects/Reveal";
import { ProductCard } from "@/components/home/ProductCard";
import { WaitlistModal } from "@/components/forms/WaitlistModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products, type Product } from "@/content/products";

/** Nós da trilha de constelação, na ordem das colunas. */
const RAIL_NODES = [
  { ring: "border-cyan-400", core: "bg-cyan-400 shadow-[0_0_10px_#7fe3e8]", inset: "inset-[3px]", twinkle: null },
  { ring: "border-violet-300/55", core: "bg-violet-300", inset: "inset-[3.5px]", twinkle: "5s" },
  { ring: "border-white/25", core: "bg-white-soft/55", inset: "inset-[4px]", twinkle: "7s" },
];

export function ProductsSection() {
  const [waitlistProduct, setWaitlistProduct] = useState<Product | null>(null);

  const openWaitlist = useCallback((product: Product) => {
    setWaitlistProduct(product);
  }, []);

  const closeWaitlist = useCallback(() => setWaitlistProduct(null), []);

  return (
    <section
      id="produtos"
      aria-labelledby="produtos-titulo"
      className="px-5 pb-10 pt-[88px] wide:px-[46px] wide:pt-[110px]"
    >
      <Reveal>
        <SectionHeading id="produtos-titulo" index="01 — Catálogo">
          Produtos em destaque
        </SectionHeading>
      </Reveal>

      {/* Trilha de constelação: só faz sentido quando os cards estão lado a
          lado, por isso desaparece abaixo de 1180px. */}
      <Reveal aria-hidden="true" className="relative mt-[38px] hidden h-11 wide:block">
        <div className="absolute inset-x-[8%] top-[5px] h-px bg-[linear-gradient(90deg,transparent,rgba(127,227,232,.5)_12%,rgba(182,156,240,.4)_55%,rgba(255,255,255,.08))]" />
        <div className="absolute inset-0 grid grid-cols-[1.5fr_1fr_1fr] gap-[22px]">
          {RAIL_NODES.map((node, index) => (
            <div key={index} className="flex justify-center">
              <span
                className={`relative block size-[11px] rounded-full border bg-space-black-2 ${node.ring}`}
              >
                <span
                  className={`absolute ${node.inset} rounded-full ${node.core} ${
                    node.twinkle ? "anim-twinkle" : ""
                  }`}
                  style={
                    node.twinkle
                      ? ({ ["--twinkle-duration" as string]: node.twinkle } as React.CSSProperties)
                      : undefined
                  }
                />
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-[22px] p-0 md:grid-cols-2 wide:mt-0 wide:grid-cols-[1.5fr_1fr_1fr]">
        {products.map((product, index) => (
          <Reveal
            as="li"
            key={product.id}
            delay={index * 0.08}
            className="flex md:[&:first-child]:col-span-2 wide:[&:first-child]:col-span-1"
          >
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
