"use client";

import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { Modal } from "@/components/ui/Modal";
import type { Product } from "@/content/products";

interface WaitlistModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

/**
 * Modal da lista de espera.
 *
 * O nome do produto escolhido aparece no título e na descrição, para o
 * visitante ter certeza de onde está se inscrevendo. Toda a mecânica de
 * acessibilidade (foco, `Escape`, clique fora, retorno do foco) vive no
 * `Modal`.
 */
export function WaitlistModal({ product, open, onClose }: WaitlistModalProps) {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Lista de espera · ${product.name}`}
      description={`${product.description} Avisamos por e-mail assim que houver uma versão para testar.`}
    >
      <WaitlistForm product={product} />
    </Modal>
  );
}
