import ClientEffects from "./ClientEffects";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GoldSelling } from "@/components/sections/GoldSelling";
import { Hero } from "@/components/sections/Hero";
import { Locations } from "@/components/sections/Locations";
import { Services } from "@/components/sections/Services";
import { Trust } from "@/components/sections/Trust";
import { fetchGoldPrice, fetchExchangeRate } from "@/lib/market-data";

// This makes the component async to allow server-side data fetching
export default async function Home() {
  // Fetch data in parallel on the server
  const metalData = await fetchGoldPrice();
  const exchangeData = await fetchExchangeRate("USD", "EUR");

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-gold-500 selection:text-stone-950">
      <ClientEffects />
      <Navbar />

      <main>
        <Hero />
        <Services />
        {/* Pass the server-fetched data as props */}
        <GoldSelling 
            initialGoldPrice={metalData.price} 
            initialExchangeRate={exchangeData.rate} 
        />
        <Locations />
        <Trust />
      </main>

      <Footer />
    </div>
  );
}