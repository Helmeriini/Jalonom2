import Image from "next/image";
import React from "react";
import { COLLECTION_ITEMS } from "../../data/collections";
import { Button } from "../ui/Button";

export const Collections: React.FC = () => {
  return (
    // Reduced padding from py-32 to py-20 md:py-32
    <section id="collections" className="py-20 md:py-32 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 reveal">
          <div>
            <h3 className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-2">
              Tutustu
            </h3>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-2">
              Latest Creations
            </h2>
            <p className="font-serif italic text-stone-600 text-xl">
              Uusimmat Luomukset
            </p>
          </div>
          <a
            href="#"
            className="hidden md:block text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-white transition-colors bg-stone-900/50 rounded-lg px-6 py-2 border border-stone-800 hover:border-gold-500"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {COLLECTION_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer reveal"
              data-reveal-delay={(index + 1) * 100}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[3/4] mb-6 md:mb-8 rounded-3xl md:rounded-3xl shadow-2xl border border-stone-800">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                {/* Floating price tag - Always visible on mobile, or keep hover interaction? Kept hover for now, but added mobile touch support conceptually via :active */}
                <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-4 py-2 rounded-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {item.price}
                </div>
              </div>
              <div className="text-center">
                <p className="text-gold-500 text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-3">
                  {item.category}
                </p>
                <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-gold-100 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button variant="outline" className="w-full">
            View All
          </Button>
        </div>
      </div>
    </section>
  );
};
