"use client";

import { useEffect, useState } from "react";

type PriceState = {
  goldPerOzUsd?: number;
  lastUpdated?: Date;
  loading: boolean;
  error?: string;
};

type MetalPriceApiResponse = {
  goldPerOzUsd?: number;
  fetchedAt?: string;
  error?: string;
};

export function useMetalPrices(initialPrice?: number): PriceState {
  const [state, setState] = useState<PriceState>({ 
    loading: !initialPrice,
    goldPerOzUsd: initialPrice,
    lastUpdated: initialPrice ? new Date() : undefined
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPrice() {
      try {
        const res = await fetch("/api/metal-price", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch metal price");

        const data = (await res.json()) as MetalPriceApiResponse;
        if (typeof data.goldPerOzUsd === "number") {
          setState({
            loading: false,
            goldPerOzUsd: data.goldPerOzUsd,
            lastUpdated: data.fetchedAt ? new Date(data.fetchedAt) : new Date(),
            error: data.error,
          });
          return;
        }
        throw new Error("Invalid metal price data");
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        // Only set error state if we don't have an initial price (fallback)
        if (!state.goldPerOzUsd) {
             setState({
              loading: false,
              goldPerOzUsd: 2650.0,
              lastUpdated: new Date(),
              error: "Live-yhteys katkesi, käytetään arviota.",
            });
        }
      }
    }

    // If we have initial data, we wait 60s before first fetch. 
    // If not, we fetch immediately.
    if (!initialPrice) {
        fetchPrice();
    }
    
    const interval = setInterval(fetchPrice, 60000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [initialPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}