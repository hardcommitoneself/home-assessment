import { atom, selector } from "recoil";
import type { Quote } from "../types/quote";

interface AppStateProps {
  symbol: string;
  quote: Quote | null;
}

export const appState = atom<AppStateProps>({
  key: "app",
  default: {
    symbol: "",
    quote: null,
  },
});

export const symbolSelector = selector({
  key: "symbol",
  get: ({ get }) => {
    const app = get(appState);

    return app.symbol;
  },
});

export const quoteSelector = selector({
  key: "quote",
  get: ({ get }) => {
    const app = get(appState);

    return app.quote;
  },
});
