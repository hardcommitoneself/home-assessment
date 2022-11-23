import React, { useCallback } from "react";
import {
  Container,
  Input,
  Flex,
  Heading,
  Button,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getQuote } from "./api/finnub";
import { appState, symbolSelector, quoteSelector } from "./state/state";

function App() {
  const [state, setState] = useRecoilState(appState);
  const symbol = useRecoilValue(symbolSelector);
  const quote = useRecoilValue(quoteSelector);

  const handleSymbolChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({ symbol: e.target.value, quote: quote });
    },
    [setState, quote]
  );

  const handleGetQuote = async () => {
    const quote = await getQuote(symbol);

    setState({ symbol: symbol, quote: quote });
  };

  return (
    <Container maxW="2xl">
      <Flex direction="column" gap={5}>
        <Box p={2}>
          <Heading>Path Inc</Heading>
        </Box>

        <Flex minWidth="max-content" alignItems="center" gap={2}>
          <Input
            id="symbol"
            name="symbol"
            placeholder="Please enther symbol(e.g. AAPL)"
            value={state.symbol}
            onChange={handleSymbolChange}
          />
          <Spacer />
          <Button colorScheme="teal" onClick={handleGetQuote}>
            Get Price
          </Button>
        </Flex>

        <Flex direction="column" gap={1}>
          <Heading as="h4" size="md">
            Current Price: {quote?.close}
          </Heading>
          <Heading as="h4" size="md">
            Date: {quote?.date}
          </Heading>
          <Heading as="h4" size="md">
            Percentage Difference:{" "}
            {quote && ((quote.close / quote.prevClose) * 100 - 100).toFixed(2)}%
          </Heading>
        </Flex>
      </Flex>
    </Container>
  );
}

export default App;
