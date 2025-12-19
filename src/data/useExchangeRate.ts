"use client";

import { useEffect, useState } from "react";

type ExchangeRateState = {
  rate?: number;
  loading: boolean;
  error?: string;
};

type ExchangeRateApiResponse = {
  rate?: number;
  error?: string;
};

export function useExchangeRate(
  baseCurrency: string,
  targetCurrency: string,
  initialRate?: number
): ExchangeRateState {
  const [state, setState] = useState<ExchangeRateState>({ 
    loading: !initialRate,
    rate: initialRate
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRate() {
      try {
        const res = await fetch(
          `/api/exchange-rate?base=${encodeURIComponent(baseCurrency)}&target=${encodeURIComponent(targetCurrency)}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Failed to fetch exchange rate");

        const data = (await res.json()) as ExchangeRateApiResponse;
        if (typeof data.rate === "number") {
          setState({
            loading: false,
            rate: data.rate,
            error: data.error,
          });
        } else {
          throw new Error("Invalid exchange rate data");
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (!state.rate) {
            setState({
              loading: false,
              rate: 0.92,
              error: "Could not fetch exchange rate, using estimate.",
            });
        }
      }
    }

    if (!initialRate) {
        fetchRate();
    }

    const interval = setInterval(fetchRate, 3600000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [baseCurrency, targetCurrency, initialRate]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}