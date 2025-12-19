import { NextResponse } from "next/server";
import { fetchExchangeRate } from "@/lib/market-data";

export const revalidate = 3600;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const base = url.searchParams.get("base") ?? "USD";
  const target = url.searchParams.get("target") ?? "EUR";
  
  const { rate, error } = await fetchExchangeRate(base, target);
  const fetchedAt = new Date().toISOString();

  return NextResponse.json({ 
    rate, 
    fetchedAt, 
    base, 
    target,
    error 
  });
}