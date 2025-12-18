import ClientEffects from "./ClientEffects";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

import { GoldSelling } from "@/components/sections/GoldSelling";
import { Hero } from "@/components/sections/Hero";
import { Locations } from "@/components/sections/Locations";
import { Services } from "@/components/sections/Services";
import { Trust } from "@/components/sections/Trust";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-gold-500 selection:text-stone-950">
      <ClientEffects />
      <Navbar />

      <main>
        <Hero />
        <Services />
        <GoldSelling />
        <Locations />
        <Trust />
      </main>

      <Footer />
    </div>
  );
}
