"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { brandAssets, siteConfig } from "@/content/site";
import { useScrollLock } from "@/hooks/useScrollLock";

const SESSION_KEY = "erax:intro-visto";
/** Fim da sequência, antes da dissolução (handoff: 2.5s + 0.9s). */
const SEQUENCE_MS = 2500;
const DISSOLVE_S = 0.9;
const SKIP_DISSOLVE_S = 0.4;

/**
 * Script bloqueante que decide, ANTES da primeira pintura, se a intro roda.
 *
 * Sem isso haveria um piscar: o HTML do servidor não sabe se o visitante já viu
 * a intro nesta sessão nem se ele pediu movimento reduzido. Aqui a decisão sai
 * antes de qualquer pixel — e, com JavaScript desligado, o `[data-intro]` nunca
 * é definido e a sobreposição permanece oculta por CSS (o site abre direto).
 */
function IntroBootstrap() {
  const script = `(function(){try{var d=document.documentElement;var seen=sessionStorage.getItem(${JSON.stringify(
    SESSION_KEY,
  )})==="1";var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(seen||reduce){d.setAttribute("data-intro","done");}else{d.setAttribute("data-intro","play");d.setAttribute("data-scroll-locked","");}}catch(e){document.documentElement.setAttribute("data-intro","done");}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

/**
 * Momento de marca na primeira visita da sessão.
 *
 * - some com clique, toque ou qualquer tecla;
 * - trava a rolagem só enquanto está visível;
 * - grava em `sessionStorage` para não repetir na mesma sessão;
 * - não aparece com `prefers-reduced-motion: reduce`;
 * - não causa flash nem deslocamento de layout (ver `IntroBootstrap`).
 */
export function IntroOverlay() {
  // Estado inicial `true` para casar com o HTML do servidor; o primeiro efeito
  // corrige em seguida, e o CSS já garantiu que nada foi pintado à toa.
  const [playing, setPlaying] = useState(true);
  const [skipped, setSkipped] = useState(false);
  /**
   * Depois que o React assume, a visibilidade passa a ser um estilo inline em
   * vez do seletor `[data-intro="play"]`. Sem isso, marcar a intro como vista
   * esconderia o elemento na hora e comeria a dissolução de saída.
   */
  const [reactControlled, setReactControlled] = useState(false);
  const skipButtonRef = useRef<HTMLButtonElement>(null);

  /**
   * A trava exige `reactControlled`, não só `playing`.
   *
   * `playing` começa `true` para casar com o HTML do servidor, e só o primeiro
   * efeito descobre que a intro não deve rodar. Travar apenas por `playing`
   * prendia a rolagem por um instante mesmo com movimento reduzido ou em visita
   * recorrente. Quando a intro de fato roda, o script bloqueante já aplicou a
   * trava antes da pintura — então não existe janela sem trava.
   */
  useScrollLock(playing && reactControlled);

  const finish = useCallback((wasSkipped: boolean) => {
    setSkipped(wasSkipped);
    setPlaying(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Modo privativo pode bloquear o storage: a intro apenas repetiria.
    }
    document.documentElement.setAttribute("data-intro", "done");
  }, []);

  useEffect(() => {
    if (document.documentElement.getAttribute("data-intro") !== "play") {
      setPlaying(false);
      return;
    }

    setReactControlled(true);
    skipButtonRef.current?.focus();

    const timer = window.setTimeout(() => finish(false), SEQUENCE_MS);

    const skip = () => finish(true);
    // `capture` para chegar antes de qualquer handler do conteúdo por baixo.
    window.addEventListener("pointerdown", skip, { capture: true });
    window.addEventListener("keydown", skip, { capture: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", skip, { capture: true });
      window.removeEventListener("keydown", skip, { capture: true });
    };
  }, [finish]);

  return (
    <>
      <IntroBootstrap />

      <AnimatePresence>
        {playing ? (
          <motion.div
            id="intro-overlay"
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: skipped ? SKIP_DISSOLVE_S : DISSOLVE_S, ease: "easeOut" }}
            className="fixed inset-0 z-[200] cursor-pointer flex-col items-center justify-center"
            style={{
              ...(reactControlled ? { display: "flex" } : {}),
              background:
                "radial-gradient(80% 70% at 50% 45%, #160f2c 0%, #0a0718 45%, #040309 100%)",
            }}
          >
            <div className="relative grid aspect-square w-[min(46vw,380px)] place-items-center">
              <div
                aria-hidden="true"
                className="anim-intro-ring absolute inset-0 rounded-full border border-[rgba(182,156,240,.35)]"
                style={{ ["--ring-delay" as string]: "0.3s" }}
              />
              <div
                aria-hidden="true"
                className="anim-intro-ring absolute inset-0 rounded-full border border-[rgba(127,227,232,.28)]"
                style={{ ["--ring-delay" as string]: "0.8s" }}
              />
              <Image
                src={brandAssets.mark.src}
                alt=""
                width={brandAssets.mark.width}
                height={brandAssets.mark.height}
                priority
                sizes="(max-width: 820px) 46vw, 380px"
                className="anim-intro-mark relative w-[74%]"
                style={{
                  height: "auto",
                  filter: "drop-shadow(0 0 60px rgba(150,110,245,.55))",
                }}
              />
            </div>

            <p className="anim-intro-word m-0 mt-[34px] font-mono text-[11px] uppercase leading-none text-white-soft/80">
              {siteConfig.name}
            </p>

            <button
              ref={skipButtonRef}
              type="button"
              onClick={() => finish(true)}
              className="absolute bottom-10 inline-flex min-h-[44px] items-center rounded-full border border-white/15 px-5 font-mono text-[10.5px] uppercase tracking-[.2em] text-white-soft/70 transition-colors hover:border-cyan-400/50 hover:text-white"
            >
              Pular introdução
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
