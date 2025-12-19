"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ChevronRight, Package, RotateCw } from "lucide-react";

import { useExchangeRate } from "../../data/useExchangeRate";
import { GOLD_SELLING_STEPS } from "../../data/goldSellingSteps";
import { useMetalPrices } from "../../data/useMetalPrices";
import { Button } from "../ui/Button";

const OZ_TO_GRAM = 31.1035;

interface GoldSellingProps {
  initialGoldPrice?: number;
  initialExchangeRate?: number;
}

export const GoldSelling: React.FC<GoldSellingProps> = ({ 
  initialGoldPrice, 
  initialExchangeRate 
}) => {
  // Pass initial server data to hooks
  const {
    goldPerOzUsd,
    lastUpdated,
    loading: metalLoading,
    error,
  } = useMetalPrices(initialGoldPrice);

  const { rate: usdToEur, loading: rateLoading } = useExchangeRate(
    "USD",
    "EUR",
    initialExchangeRate
  );

  const [timeAgo, setTimeAgo] = useState<string>("Juuri nyt");

  const loading = metalLoading || rateLoading;

  const pureGoldEurPerGram =
    goldPerOzUsd && usdToEur
      ? (goldPerOzUsd * usdToEur) / OZ_TO_GRAM
      : undefined;

  const gold14k = pureGoldEurPerGram ? pureGoldEurPerGram * 0.585 : undefined;
  const gold18k = pureGoldEurPerGram ? pureGoldEurPerGram * 0.75 : undefined;

  useEffect(() => {
    if (!lastUpdated) return;

    const updateTime = () => {
      const now = new Date();
      const diffInSeconds = Math.floor(
        (now.getTime() - lastUpdated.getTime()) / 1000,
      );

      if (diffInSeconds < 60) {
        setTimeAgo("Juuri nyt");
      } else {
        const minutes = Math.floor(diffInSeconds / 60);
        setTimeAgo(`${minutes} minuutti${minutes > 1 ? "a" : ""} sitten`);
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, [lastUpdated]);

  const formatPrice = (value?: number) =>
    value
      ? `${value.toFixed(2)} €/g`
      : loading
        ? "Ladataan..."
        : error
          ? "-"
          : "N/A";

  return (
    <section
      id="process"
      className="pt-4 pb-24 md:pb-64 bg-stone-950 relative overflow-hidden z-10"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[50vw] md:w-[20vw] h-[30vw] md:h-[20vw] bg-gold-500/5 rounded-full blur-[80px] md:blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[20vw] h-[20vw] bg-stone-500/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-24 reveal">
          <h3 className="text-gold-500 text-base uppercase tracking-[0.2em] mb-4">
            Myyntiprosessi
          </h3>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
            Näin Se Toimii
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {GOLD_SELLING_STEPS.map((step, index) => (
            <div
              key={index}
              className="reveal h-full"
              data-reveal-delay={(index + 1) * 120}
            >
              <div className="group bg-stone-900 border border-stone-800 p-8 md:p-10 rounded-3xl md:rounded-3xl h-full transition-all duration-500 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-900/10 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <div className="relative text-6xl md:text-7xl font-serif mb-6 md:mb-8">
                    <span className="relative z-10 block text-transparent bg-clip-text bg-gradient-to-b from-stone-400 via-stone-600 to-transparent transition-opacity duration-700 opacity-100 group-hover:opacity-0">
                      {step.num}
                    </span>
                    <span className="absolute inset-0 block text-transparent bg-clip-text bg-gradient-to-b from-gold-200 via-gold-400 to-transparent transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-3xl text-white font-serif mb-4 group-hover:text-gold-100 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-stone-300 leading-relaxed text-base group-hover:text-stone-200 transition-colors">
                    {step.desc}
                  </p>
                </div>
                <div className="relative z-10 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10 flex items-center gap-2 text-gold-500 text-xs tracking-widest uppercase font-medium opacity-80 md:opacity-60 group-hover:opacity-100 transition-all duration-500 transform md:translate-y-2 group-hover:translate-y-0">
                  <span>Lue Lisää</span>
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mail Service Banner */}
        <div className="mt-20 md:mt-32 reveal">
          <div className="relative rounded-3xl md:rounded-3xl overflow-hidden bg-stone-900 border border-stone-800">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-16 flex flex-col justify-center order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 mb-6">
                  <Package className="w-4 h-4 text-gold-500" />
                  <span className="text-gold-500 uppercase tracking-widest text-xs">
                    Postituspalvelu
                  </span>
                </div>

                <h3 className="font-serif text-3xl md:text-5xl text-white mb-6">
                  Asutko kauempana?
                </h3>

                <p className="text-stone-400 font-light leading-relaxed mb-10 text-lg">
                  Voit lähettää kultaesineesi meille turvallisesti
                  postivakuutettuna lähetyksenä. Tilaa ilmainen myyntipakkaus
                  kotiisi.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="w-full sm:w-auto">
                    Tilaa myyntipakkaus
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Lue lisää postituksesta
                  </Button>
                </div>
              </div>

              <div className="relative order-1 h-[18rem] md:h-[24rem] lg:order-2 lg:h-full">
                {/* IMPROVED: Added descriptive alt text for accessibility */}
                <Image
                  src="https://www.kokemaenjokilaakso.fi/wp-content/uploads/2018/01/posti-jakaja-001.jpg"
                  alt="Postin työntekijä jakamassa postia" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Banner */}
        <div id="pricing" className="mt-20 md:mt-32 reveal">
          <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 rounded-3xl md:rounded-3xl p-8 md:p-16 text-center border border-white/5 shadow-2xl relative overflow-hidden max-w-5xl mx-auto">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_8s_infinite]"></div>

            <h3 className="text-white font-serif text-2xl md:text-4xl mb-4 relative z-10">
              Tämänhetkinen Markkinahinta
            </h3>
            <p className="text-stone-500 text-sm mb-6 max-w-lg mx-auto relative z-10 leading-relaxed">
              Hintamme perustuvat reaaliaikaiseen maailmanmarkkinahintaan.
            </p>

            <div className="relative z-10 flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 bg-stone-950/80 border border-gold-500/20 rounded-lg px-4 py-1.5 backdrop-blur-sm">
                <RotateCw
                  className={`w-3 h-3 text-gold-500 ${loading ? "animate-spin" : ""}`}
                />
                <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                  Päivitetty:{" "}
                  <span className="text-gold-400 normal-case tracking-normal">
                    {timeAgo}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 relative z-10">
              <div className="text-center w-full md:w-auto p-4 md:p-0 bg-stone-950/50 md:bg-transparent rounded-2xl md:rounded-none border border-stone-800 md:border-none">
                <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">
                  14K Kulta
                </p>
                <p className="text-2xl md:text-3xl text-gold-300 font-serif">
                  {formatPrice(gold14k)}
                </p>
              </div>
              <div className="h-12 w-px bg-stone-800 hidden md:block"></div>
              <div className="text-center w-full md:w-auto p-4 md:p-0 bg-stone-950/50 md:bg-transparent rounded-2xl md:rounded-none border border-stone-800 md:border-none">
                <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">
                  18K Kulta
                </p>
                <p className="text-2xl md:text-3xl text-gold-300 font-serif">
                  {formatPrice(gold18k)}
                </p>
              </div>
              <div className="h-12 w-px bg-stone-800 hidden md:block"></div>
              <div className="text-center w-full md:w-auto p-4 md:p-0 bg-stone-950/50 md:bg-transparent rounded-2xl md:rounded-none border border-stone-800 md:border-none">
                <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">
                  24K Kulta
                </p>
                <p className="text-2xl md:text-3xl text-gold-300 font-serif">
                  {formatPrice(pureGoldEurPerGram)}
                </p>
              </div>
            </div>

            <div className="mt-10 md:mt-12 relative z-10 flex justify-center w-full">
              <Button className="w-full md:w-auto">
                Pyydä Henkilökohtainen Tarjous
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldSelling;