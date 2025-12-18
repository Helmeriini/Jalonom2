import { NextResponse } from "next/server";

export const revalidate = 60;

type SpotResponse = Array<{ gold?: number }>;
type GoldPriceResponse = { items?: Array<{ xauPrice?: number }> };

async function fetchFromMetalsLive(): Promise<number | null> {
  const res = await fetch("https://metals.live/api/spot", {
    next: { revalidate },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as unknown;
  if (!Array.isArray(data) || data.length === 0) return null;

  const first = (data as SpotResponse)[0];
  return typeof first?.gold === "number" ? first.gold : null;
}

async function fetchFromGoldPriceOrg(): Promise<number | null> {
  const res = await fetch("https://data-asg.goldprice.org/dbXRates/USD", {
    next: { revalidate },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as unknown;
  if (typeof data !== "object" || data === null) return null;

  const parsed = data as GoldPriceResponse;
  const xauPrice = parsed.items?.[0]?.xauPrice;
  return typeof xauPrice === "number" ? xauPrice : null;
}

export async function GET() {
  const fetchedAt = new Date().toISOString();

  try {
    const [metalsLive, goldPriceOrg] = await Promise.allSettled([
      fetchFromMetalsLive(),
      fetchFromGoldPriceOrg(),
    ]);

    const metalsLiveValue =
      metalsLive.status === "fulfilled" ? metalsLive.value : null;
    const goldPriceOrgValue =
      goldPriceOrg.status === "fulfilled" ? goldPriceOrg.value : null;

    const goldPerOzUsd = metalsLiveValue ?? goldPriceOrgValue;
    if (typeof goldPerOzUsd === "number") {
      return NextResponse.json({
        goldPerOzUsd,
        fetchedAt,
        source: metalsLiveValue ? "metals.live" : "goldprice.org",
      });
    }
  } catch {
    // Fall through to fallback response.
  }

  return NextResponse.json({
    goldPerOzUsd: 2650.0,
    fetchedAt,
    source: "fallback",
    error: "Live-yhteys katkesi, käytetään arviota.",
  });
}

