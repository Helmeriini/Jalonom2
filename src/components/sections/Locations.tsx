"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { LOCATIONS } from "../../data/locations";
import Shapes3 from "../../assets/images/Shapes3.svg";

export const Locations: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[0]);

  return (
    <section
      id="locations"
      className="
        relative
        z-20
        -mt-12
        md:-mt-24
        rounded-t-[5rem]
        bg-stone-950
        py-24
        md:py-40
        text-stone-200
        shadow-[0_-35px_90px_rgba(0,0,0,0.4)]
        overflow-hidden
      "
    >
      {/* Background Image */}
      <Image
        src={Shapes3}
        alt="Decorative background shape"
        className="absolute z-10 -top-28 left-0 w-full h-auto opacity-5"
        aria-hidden="true"
      />
      
      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-7xl px-6">
        
        {/* 1. HEADER SECTION */}
        <div className="reveal mb-10 md:mb-16">
          <div className="max-w-lg">
            <h3 className="mb-4 text-base uppercase tracking-[0.2em] text-gold-500">
              Löydä Lähin
            </h3>

            <h2 className="mb-6 md:mb-8 font-serif text-4xl md:text-6xl text-white">
              Palvelemme Ympäri Suomea
            </h2>

            <p className="text-base md:text-lg font-light leading-relaxed text-stone-400">
              Toimipisteemme sijaitsevat keskeisillä paikoilla suurimmissa
              kaupungeissa. Tervetuloa asioimaan luottamuksellisesti ja
              turvallisesti.
            </p>
          </div>
        </div>

        {/* 2. MAIN GRID */}
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2">
          
          {/* LEFT COLUMN: Location Cards */}
          <div className="reveal space-y-4">
            {LOCATIONS.map((loc, idx) => {
              const isActive = activeLocation.city === loc.city;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveLocation(loc)}
                  className={`group cursor-pointer rounded-3xl md:rounded-3xl border p-6 transition-all duration-300 ${
                    isActive
                      ? "scale-[1.02] border-gold-500 bg-stone-800 shadow-xl shadow-black/20"
                      : "border-stone-800 bg-stone-900 hover:bg-stone-800 hover:border-gold-500/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`font-serif text-xl md:text-2xl transition-colors ${
                          isActive
                            ? "text-gold-400"
                            : "text-stone-200 group-hover:text-gold-400"
                        }`}
                      >
                        {loc.city}
                      </h4>

                      <p
                        className={`mt-2 text-xs uppercase tracking-widest transition-colors ${
                          isActive
                            ? "text-stone-400"
                            : "text-stone-500 group-hover:text-stone-400"
                        }`}
                      >
                        {loc.address}
                      </p>
                    </div>

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? "bg-none text-gold-500"
                          : "bg-none text-stone-600 group-hover:text-gold-500"
                      }`}
                    >
                      <ChevronRight className="h-5 w-5" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Map */}
          <div className="reveal" data-reveal-delay={200}>
            <div className="relative h-[22rem] w-full rounded-3xl shadow-2xl shadow-black/50 md:h-[28rem] md:rounded-3xl lg:h-full">
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-stone-800 bg-stone-900 md:rounded-3xl">
                {/* FIXED: Replaced suspicious link with standard Google Maps Embed */}
                <iframe
                  key={activeLocation.city}
                  title={activeLocation.city}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    `${activeLocation.address}, ${activeLocation.city}`
                  )}&t=m&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="h-full w-full object-cover opacity-80 hover:opacity-90 transition-opacity duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
