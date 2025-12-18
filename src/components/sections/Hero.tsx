import Image from "next/image";
import React from "react";
import HeroBg from "../../assets/images/ostamme-kultaa.png";
import { Button } from "../ui/Button";

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-stone-950">
      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={HeroBg}
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_top,var(--tw-gradient-stops))] from-transparent via-stone-950/60 to-stone-950" />
        <div className="absolute inset-0 bg-linear-to-b from-stone-950/20 via-stone-950/70 to-stone-950" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center gap-10 px-6 pb-24 pt-28 text-center sm:gap-12 sm:pb-28 sm:pt-32">
        <div className="max-w-4xl space-y-6">
          <h1 className="font-serif text-5xl leading-[0.95] text-white sm:text-6xl lg:text-8xl">
            Muuta kultasi <br />
            <span className="italic bg-linear-to-r from-gold-100 via-gold-300 to-gold-500 bg-clip-text text-transparent">
              Rahaksi
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-stone-300 sm:text-lg">
            Koe markkinoiden läpinäkyvin ja luotettavin palvelu.
          </p>
        </div>

        <div className="flex w-full max-w-xl flex-col gap-4 sm:w-auto sm:flex-row sm:justify-center">
          <Button className="w-full sm:w-auto">Katso Toimipisteet</Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Päivän Hinta
          </Button>
        </div>
      </div>

      {/* Bottom section teaser */}
      <a
        href="#services"
        aria-label="Siirry palveluihin"
        className="group absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4 pb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/40 transition-opacity group-hover:opacity-80" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-500 transition-transform duration-300 group-hover:-translate-y-0.5">
              Palvelut
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/40 transition-opacity group-hover:opacity-80" />
          </div>
        </div>
      </a>
    </section>
  );
};
