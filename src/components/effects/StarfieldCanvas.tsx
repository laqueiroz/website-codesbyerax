"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Particle {
  x: number;
  y: number;
  /** Raio em px CSS. */
  r: number;
  /** Fase do ciclo de brilho. */
  a: number;
  /** Velocidade da fase. */
  s: number;
  vx: number;
  vy: number;
  /** Partícula com clarão ocasional. */
  flare: boolean;
  hue: string;
}

const MAX_PARTICLES = 340;
/** Uma partícula a cada N px² de viewport (valor do handoff). */
const AREA_PER_PARTICLE = 9000;
/** Distância² máxima para ligar duas estrelas em constelação. */
const LINK_DISTANCE_SQ = 11000;
/** Teto de FPS: o campo deriva devagar, 45 é indistinguível de 60 e gasta menos bateria. */
const TARGET_FPS = 45;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const WRAP_MARGIN = 4;

const HUE_CYAN = "#7fe3e8";
const HUE_VIOLET = "#c3adf3";
const HUE_WHITE = "#EDEAF6";

function createParticles(width: number, height: number): Particle[] {
  const count = Math.min(
    MAX_PARTICLES,
    Math.round((width * height) / AREA_PER_PARTICLE),
  );
  const particles: Particle[] = [];

  for (let i = 0; i < count; i += 1) {
    const roll = Math.random();
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.3 + 0.25,
      a: Math.random() * 6,
      s: Math.random() * 0.007 + 0.002,
      vx: (Math.random() - 0.5) * 0.03,
      vy: -(Math.random() * 0.05 + 0.012),
      flare: Math.random() < 0.12,
      hue: roll < 0.3 ? HUE_CYAN : roll < 0.65 ? HUE_VIOLET : HUE_WHITE,
    });
  }

  return particles;
}

interface StarfieldCanvasProps {
  /** Liga as linhas de constelação entre partículas. */
  linked?: boolean;
  className?: string;
}

/**
 * Campo de estrelas em canvas, fixo e em tela cheia.
 *
 * Decorativo por completo: `aria-hidden`, fora da ordem de tabulação e com
 * `pointer-events: none`, para nunca interceptar cliques do conteúdo acima.
 *
 * Economia de recursos:
 *  - o loop pausa quando a aba fica oculta (`visibilitychange`);
 *  - a taxa de quadros é limitada a 45 fps;
 *  - a contagem de partículas acompanha a área da viewport (teto de 340);
 *  - com `prefers-reduced-motion: reduce` desenha um único quadro estático e
 *    encerra o loop — nenhum `requestAnimationFrame` continua rodando.
 *
 * Na desmontagem, o rAF é cancelado e ResizeObserver/listeners são removidos.
 */
export function StarfieldCanvas({ linked = true, className }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frameId = 0;
    let lastFrame = 0;
    let running = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height);
    };

    const drawParticles = () => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        const alpha = 0.26 + Math.abs(Math.sin(particle.a)) * 0.62;

        if (particle.flare) {
          // Curva à sétima potência: escura quase todo o ciclo, com pico curto.
          const cycle = (Math.sin(particle.a * 0.42) + 1) / 2;
          const glow = Math.pow(cycle, 7);

          if (glow > 0.02) {
            context.save();
            context.shadowBlur = 16 * glow;
            context.shadowColor = particle.hue;
            context.beginPath();
            context.arc(particle.x, particle.y, particle.r + 1.5 * glow, 0, Math.PI * 2);
            context.fillStyle = particle.hue;
            context.globalAlpha = Math.min(1, alpha + glow);
            context.fill();
            context.restore();
            continue;
          }
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(226,218,255,${alpha.toFixed(3)})`;
        context.fill();
      }

      if (!linked) return;

      // Amostra 1 a cada 3 partículas dos dois lados: densidade de linhas
      // suficiente para sugerir constelações a ~1/9 do custo do par completo.
      for (let i = 0; i < particles.length; i += 3) {
        const a = particles[i];
        if (!a) continue;

        for (let j = i + 3; j < particles.length; j += 3) {
          const b = particles[j];
          if (!b) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq >= LINK_DISTANCE_SQ) continue;

          const opacity = 0.11 * (1 - distanceSq / LINK_DISTANCE_SQ);
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.strokeStyle = `rgba(160,132,224,${opacity.toFixed(3)})`;
          context.lineWidth = 0.6;
          context.stroke();
        }
      }
    };

    const advance = () => {
      for (const particle of particles) {
        particle.a += particle.s;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.y < -WRAP_MARGIN) particle.y = height + WRAP_MARGIN;
        else if (particle.y > height + WRAP_MARGIN) particle.y = -WRAP_MARGIN;

        if (particle.x < -WRAP_MARGIN) particle.x = width + WRAP_MARGIN;
        else if (particle.x > width + WRAP_MARGIN) particle.x = -WRAP_MARGIN;
      }
    };

    const loop = (timestamp: number) => {
      if (!running) return;
      frameId = window.requestAnimationFrame(loop);

      if (timestamp - lastFrame < FRAME_INTERVAL) return;
      lastFrame = timestamp;

      advance();
      drawParticles();
    };

    resize();

    const observer = new ResizeObserver(() => {
      resize();
      // Redesenha imediatamente para que o quadro estático (movimento reduzido)
      // acompanhe o novo tamanho sem esperar um loop que não existe.
      if (prefersReducedMotion) drawParticles();
    });
    observer.observe(canvas);

    const onVisibilityChange = () => {
      if (prefersReducedMotion) return;

      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(frameId);
      } else if (!running) {
        running = true;
        lastFrame = 0;
        frameId = window.requestAnimationFrame(loop);
      }
    };

    if (prefersReducedMotion) {
      // Um quadro, sem loop: o campo fica congelado como uma fotografia.
      drawParticles();
    } else {
      document.addEventListener("visibilitychange", onVisibilityChange);
      frameId = window.requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [linked, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      className={className ?? "absolute inset-0 h-full w-full"}
      style={{ pointerEvents: "none" }}
    />
  );
}
