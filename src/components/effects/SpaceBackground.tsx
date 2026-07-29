import { StarfieldCanvas } from "./StarfieldCanvas";

/**
 * Camada única e fixa sobre a qual todas as seções se apoiam: o gradiente
 * radial da página mais o campo de estrelas. `pointer-events: none` garante
 * que nada aqui capture interação.
 */
export function SpaceBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(90% 70% at 70% 8%, #160f2c 0%, #0a0718 42%, #040309 100%)",
      }}
    >
      <StarfieldCanvas linked />
    </div>
  );
}
