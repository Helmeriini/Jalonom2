import Image from "next/image";
import type { StaticImageData } from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react";

/* Static image imports (production-safe) */
import SellImg from "../../assets/images/Jalonom-2025-L1020676-Sam-Jamse-hires.jpeg";
import BuyImg from "../../assets/images/osta-kultaa-palvelut-kuva.jpg";
import VaultImg from "../../assets/images/palvelut-tallelokero-kuva.jpeg";

type Service = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: StaticImageData;
};

const SERVICES: Service[] = [
  {
    id: "sell",
    title: "Myy kultaa",
    description:
      "Muuta kulta rahaksi nopeasti ja turvallisesti. Ostamme kaikkea koruista sijoitusharkkoihin päivän parhaaseen hintaan.",
    cta: "Aloita myynti",
    href: "#process",
    image: SellImg,
  },
  {
    id: "buy",
    title: "Osta kultaa",
    description:
      "Hanki sijoituskultaa luotettavasti. Laaja valikoima harkkoja ja kolikoita vakuutetulla toimituksella.",
    cta: "Selaa tuotteita",
    href: "#shop",
    image: BuyImg,
  },
  {
    id: "vault",
    title: "Tallelokerot",
    description:
      "Säilytä arvoesineet ja tärkeät dokumentit murtosuojatussa yksityisholvissamme Espoossa ja Helsingissä.",
    cta: "Varaa lokero",
    href: "#vault",
    image: VaultImg,
  },
];

export const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-stone-950 pt-20 pb-24 md:pt-24 md:pb-32"
    >
      {/* Ambient gold glows */}
      <div className="pointer-events-none absolute top-40 left-1/2 h-[400px] w-[400px] rounded-full bg-gold-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-20 right-1/4 h-[300px] w-[300px] rounded-full bg-gold-500/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center md:mb-24 reveal">
          <div className="mb-6 flex items-center justify-center gap-3"></div>

          <h2 className="mb-6 font-serif text-4xl text-white md:text-6xl lg:text-7xl">
            Arvokkaat palvelumme
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-400 md:text-lg">
            Tarjoamme kokonaisvaltaiset ratkaisut jalometallien hallintaan.
            Olipa kyseessä realisointi, sijoittaminen tai turvasäilytys,
            meiltä saat asiantuntevaa palvelua.
          </p>
        </div>

        {/* Cards Grid - Added md:grid-cols-2 for better tablet layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, idx) => (
            <article
              key={service.id}
              data-reveal-delay={(idx + 1) * 100}
              className="group reveal relative flex flex-col overflow-hidden rounded-3xl border border-stone-800/50 bg-gradient-to-b from-stone-900/80 to-stone-950 transition-all duration-700 hover:border-gold-500/40 hover:shadow-[0_20px_70px_rgba(0,0,0,0.6)]"
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />

                {/* Floating accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-8 md:p-10">
                <h3 className="mb-4 font-serif text-3xl text-white transition-colors duration-300 group-hover:text-gold-100">
                  {service.title}
                </h3>

                <p className="mb-8 flex-1 text-base leading-relaxed text-stone-400 group-hover:text-stone-300 transition-colors duration-300">
                  {service.description}
                </p>

                {/* CTA Link */}
                <a
                  href={service.href}
                  className="group/cta inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gold-500 transition-all duration-300 hover:gap-3 hover:text-gold-400"
                >
                  <span>{service.cta}</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                    strokeWidth={2}
                  />
                </a>
              </div>

              {/* Hover shimmer effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/1 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
