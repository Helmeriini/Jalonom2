import React from "react";
import {
  ArrowRight,
  BanknoteArrowUp,
  ShieldCheck,
  Star,
  StarHalf,
} from "lucide-react";
import FinlandSvg from "../../assets/icons/finland.svg";
import { TRUST_BENEFITS } from "../../data/trustBenefits";
import type { TrustBenefit } from "../../types";
import { Button } from "../ui/Button";

export const Trust: React.FC = () => {
  const rating = 4.7462762669963;
  const ratingCount = 3236;

  const fullStars = Math.floor(rating);
  const showHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (showHalfStar ? 1 : 0);

  const icons: Record<TrustBenefit["icon"], React.ReactNode> = {
    finland: (
      <div
        aria-label="Finland"
        role="img"
        className="w-12 h-12 bg-gold-500"
        style={{
          WebkitMaskImage: `url(${FinlandSvg.src})`,
          maskImage: `url(${FinlandSvg.src})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          borderRadius: "8px",
        }}
      />
    ),
    security: (
      <ShieldCheck className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
    ),
    payout: (
      <BanknoteArrowUp className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
    ),
  };

  return (
    <section className="relative z-40 bg-stone-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="reveal mb-14 text-center md:mb-20">
          <h3 className="mb-4 text-base uppercase tracking-[0.2em] text-gold-500">
            Miksi Me?
          </h3>
          <h2 className="mb-6 font-serif text-4xl text-white md:text-5xl">
            Luottamuksesi Arvoinen
          </h2>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-gold-400">
              {Array.from({ length: fullStars }).map((_, idx) => (
                <Star
                  key={`full-${idx}`}
                  className="h-5 w-5"
                  fill="currentColor"
                />
              ))}
              {showHalfStar && (
                <StarHalf
                  className="h-5 w-5 text-gold-400"
                  fill="currentColor"
                />
              )}

              {Array.from({ length: emptyStars }).map((_, idx) => (
                <Star key={`empty-${idx}`} className="h-5 w-5 opacity-40" />
              ))}

              <span className="rounded-full border border-white/10 bg-stone-900/80 px-3 py-1 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                {rating.toFixed(1)}/5
              </span>
            </div>

            <p className="text-xs text-stone-300">
              Perustuu {new Intl.NumberFormat("fi-FI").format(ratingCount)}{" "}
              arvosteluun Trustmaryssa
            </p>

            <a
              href="https://trustmary.com/review/www.jalonom.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.28em] text-stone-400 transition-colors hover:text-gold-300"
            >
              Lue arvostelut
            </a>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20 grid grid-cols-1 gap-6 md:mb-32 md:grid-cols-3 md:gap-8">
          {TRUST_BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              data-reveal-delay={(idx + 1) * 120}
              className="
                group
                rounded-3xl
                border border-white/5
                bg-stone-900/40
                p-8 md:p-10
                text-center md:text-left
                transform
                [will-change:transform]
                transition duration-500 ease-out
                hover:-translate-y-1
                hover:border-gold-500/30
                hover:bg-stone-500/10
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]
              "
            >
              <div
                className="
                  mx-auto mb-6 flex h-16 w-16 items-center justify-center
                  rounded-2xl bg-stone-900
                  transition duration-500
                  group-hover:scale-105
                  group-hover:bg-gold-500/15
                  md:mx-0 md:mb-8
                "
              >
                {icons[benefit.icon]}
              </div>

              <h3 className="mb-4 font-serif text-2xl text-white">
                {benefit.title}
              </h3>
              <p className="text-base font-light leading-relaxed text-stone-400">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal">
          <div className="relative overflow-hidden rounded-3xl border border-stone-800/50 bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 p-12 text-center md:p-16">
            <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[80px]" />

            <div className="relative z-10">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
                Kysymyksiä?
              </p>
              <h3 className="mb-6 font-serif text-3xl text-white md:text-4xl">
                Autamme mielellämme
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-base text-stone-400 md:text-lg">
                Ota yhteyttä asiantuntijoihimme tai tule käymään
                toimipisteessämme. Vastaamme kaikkiin kysymyksiisi
                jalometalleista.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button as="a" href="#contact" className="w-full sm:w-auto">
                  Ota yhteyttä
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Button>

                <Button
                  as="a"
                  variant="secondary"
                  href="#locations"
                  className="w-full sm:w-auto"
                >
                  Toimipisteet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
