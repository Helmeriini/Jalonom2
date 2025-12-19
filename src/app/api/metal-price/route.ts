import { NextResponse } from "next/server";
import { fetchGoldPrice } from "@/lib/market-data";

export const revalidate = 60;

export async function GET() {
  const { price, source, error } = await fetchGoldPrice();
  const fetchedAt = new Date().toISOString();

  return NextResponse.json({
    goldPerOzUsd: price,
    fetchedAt,
    source,
    error
  });
}