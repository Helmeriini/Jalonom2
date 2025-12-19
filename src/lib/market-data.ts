// src/lib/market-data.ts

// Types for the external API responses
type SpotResponse = Array<{ gold?: number }>;
type GoldPriceResponse = { items?: Array<{ xauPrice?: number }> };
type ExchangeResponse = { rates?: Record<string, number> };

export const REVALIDATE_TIME = 60; // 60 seconds

export async function fetchGoldPrice(): Promise<{ price: number; source: string; error?: string }> {
  try {
    const [metalsLive, goldPriceOrg] = await Promise.allSettled([
      fetch("https://metals.live/api/spot", { next: { revalidate: REVALIDATE_TIME } }).then(r => r.json()),
      fetch("https://data-asg.goldprice.org/dbXRates/USD", { next: { revalidate: REVALIDATE_TIME } }).then(r => r.json()),
    ]);

    // Parse Metals.live
    let metalsLivePrice: number | null = null;
    if (metalsLive.status === "fulfilled" && Array.isArray(metalsLive.value) && metalsLive.value.length > 0) {
      const first = (metalsLive.value as SpotResponse)[0];
      if (typeof first?.gold === "number") metalsLivePrice = first.gold;
    }

    // Parse GoldPrice.org
    let goldPriceOrgPrice: number | null = null;
    if (goldPriceOrg.status === "fulfilled" && goldPriceOrg.value && typeof goldPriceOrg.value === "object") {
      const parsed = goldPriceOrg.value as GoldPriceResponse;
      const xauPrice = parsed.items?.[0]?.xauPrice;
      if (typeof xauPrice === "number") goldPriceOrgPrice = xauPrice;
    }

    const price = metalsLivePrice ?? goldPriceOrgPrice;

    if (typeof price === "number") {
      return { 
        price, 
        source: metalsLivePrice ? "metals.live" : "goldprice.org" 
      };
    }
  } catch (e) {
    console.error("Market data fetch error:", e);
  }

  return { 
    price: 2650.0, 
    source: "fallback", 
    error: "Live-yhteys katkesi, käytetään arviota." 
  };
}

export async function fetchExchangeRate(base = "USD", target = "EUR"): Promise<{ rate: number; error?: string }> {
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${base}`, {
      next: { revalidate: 3600 }, // Cache exchange rates for 1 hour
    });
    
    if (res.ok) {
      const data = (await res.json()) as ExchangeResponse;
      const rate = data.rates?.[target];
      if (typeof rate === "number") {
        return { rate };
      }
    }
  } catch (e) {
    console.error("Exchange rate fetch error:", e);
  }

  return { 
    rate: 0.92, 
    error: "Could not fetch exchange rate, using estimate." 
  };
}