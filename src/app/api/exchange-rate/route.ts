import { NextResponse } from "next/server";

export const revalidate = 3600;

type ExchangeResponse = {
  rates?: Record<string, number>;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const base = url.searchParams.get("base") ?? "USD";
  const target = url.searchParams.get("target") ?? "EUR";

  const fetchedAt = new Date().toISOString();

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${base}`, {
      next: { revalidate },
    });
    if (!res.ok) throw new Error("Failed to fetch exchange rate");

    const data = (await res.json()) as unknown;
    const parsed = data as ExchangeResponse;
    const rate = parsed.rates?.[target];

    if (typeof rate === "number") {
      return NextResponse.json({ rate, fetchedAt, base, target });
    }

    throw new Error("Invalid exchange rate data");
  } catch {
    return NextResponse.json({
      rate: 0.92,
      fetchedAt,
      base,
      target,
      source: "fallback",
      error: "Could not fetch exchange rate, using estimate.",
    });
  }
}

