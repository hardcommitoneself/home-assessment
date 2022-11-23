import axios from "axios";
import type { Quote } from "../types/quote";

const API_URL = process.env.REACT_APP_PATH_INC_API_URL;

export const getQuote = async (symbol: string) => {
  const response = await axios.post<Quote>(`${API_URL}/quote`, {
    symbol: symbol,
  });
  const quote = response.data;

  return quote;
};
