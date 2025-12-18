import React from "react";
import { Logo } from "../ui/Logo";
import Favicon from "../../assets/icons/favicon.svg";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-b from-stone-950 to-black border-t border-stone-900 overflow-hidden">
      {/* Decorative favicon */}
      { }
      <img
        src={Favicon}
        aria-hidden
        alt=""
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-200
          opacity-[0.04]
        "
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Logo + Social */}
        <div className="flex flex-col items-center gap-8 mb-24">
          <Logo className="h-9 w-auto text-gold-400" />

          <div className="flex gap-8">
            {["Instagram", "Pinterest", "Facebook"].map((item) => (
              <a
                key={item}
                className="text-stone-500 hover:text-gold-300 uppercase tracking-widest text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="max-w-lg mx-auto text-center mb-28">
          <h3 className="text-white font-serif text-2xl md:text-3xl mb-3">
            Tilaa Jalonom-uutiskirje
          </h3>
          <p className="text-stone-500 text-sm md:text-base mb-8">
            Ajankohtaiset uutiset, inspiraatiota ja kutsuja yksinoikeudella.
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Sähköpostiosoitteesi"
              className="
                w-full
                rounded-lg
                bg-stone-950
                border border-stone-700
                px-5 py-3
                text-sm text-white
                placeholder:text-stone-600
                focus:outline-none
                focus:border-gold-500/60
                transition-colors
              "
            />
            <button
              type="submit"
              className="
                rounded-lg
                bg-gold-500
                px-7 py-3
                text-sm font-medium text-black
                hover:bg-gold-400
                transition-colors
                whitespace-nowrap
              "
            >
              Tilaa
            </button>
          </form>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 border-t border-stone-900 pt-14 text-center sm:text-left">
          <div>
            <h4 className="text-white uppercase tracking-widest text-xs mb-4">
              Jalonom Oy
            </h4>
            <p className="text-stone-500 text-sm leading-relaxed">
              Vanha Maantie 1
              <br />
              02650 Espoo
              <br />
              <br />
              asiakaspalvelu@jalonom.fi
              <br />
              laskut@jalonom.fi
              <br />
              <br />
              Tel. +358 9 512 7298
            </p>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-xs mb-4">
              Osta
            </h4>
            <ul className="space-y-2 text-stone-500 text-sm">
              <li><a className="hover:text-gold-300 transition-colors">MYY</a></li>
              <li><a className="hover:text-gold-300 transition-colors">TALLELOKEROT</a></li>
              <li><a className="hover:text-gold-300 transition-colors">KAUPPA</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-xs mb-4">
              Asiointi
            </h4>
            <ul className="space-y-2 text-stone-500 text-sm">
              <li><a className="hover:text-gold-300 transition-colors">ASIOINTIPISTEET</a></li>
              <li><a className="hover:text-gold-300 transition-colors">KULLAN HINTA</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-xs mb-4">
              Tietoa
            </h4>
            <ul className="space-y-2 text-stone-500 text-sm">
              <li><a className="hover:text-gold-300 transition-colors">ARTIKKELIT JA OPPAAT</a></li>
              <li><a className="hover:text-gold-300 transition-colors">JALONOM YRITYKSILLE</a></li>
              <li><a className="hover:text-gold-300 transition-colors">MEILLE TÖIHIN?</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-xs mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-stone-500 text-sm">
              <li><a className="hover:text-gold-300 transition-colors">Tilaus- ja toimitusehdot</a></li>
              <li><a className="hover:text-gold-300 transition-colors">Tietosuojaseloste</a></li>
              <li><a className="hover:text-gold-300 transition-colors">Saavutettavuusseloste</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-stone-900 text-center text-stone-600 text-xs">
          Copyright © {new Date().getFullYear()} Jalonom Oy.
        </div>
      </div>
    </footer>
  );
};
