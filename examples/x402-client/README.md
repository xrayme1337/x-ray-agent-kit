# X-RAY x402 client (pay per call, no account)

A small Node client for the X-RAY pay-per-call lane: every read tool of the MCP server is also served at
`https://fzorkxvrcbwlrolpotkf.supabase.co/functions/v1/x402/{tool}?{args}` for agents that would rather pay a fraction of a cent in USDC
than register. The protocol is [x402 v2](https://x402.org): the first request answers `402` with the price
and two ways to pay (USDC on Base, USDC on Solana), the client signs a payment for one of them and retries
with the `PAYMENT-SIGNATURE` header, the server verifies and settles through the facilitator and returns
the tool's JSON plus a `PAYMENT-RESPONSE` header with the transaction.

The lane is live (X-RAY step 8, 2026-10-11): `npm run probe` prints the real `402` with both payment options and the
Bazaar discovery extension; `npm start` pays and prints the on-chain transaction. The client was also tested end to end
against a mock x402 server on both networks. Documentation: https://x-ray.me/docs/pay-per-call.

## Run

```bash
npm install
npm run probe                                   # no keys: show the 402, the prices and the payTo addresses

cp .env.example .env                            # add a test wallet key or two, never commit it
export $(grep -v '^#' .env | xargs)
npm start -- --network base                     # pay on Base   (TEST_WALLET_EVM_KEY,    0x hex)
npm start -- --network solana                   # pay on Solana (TEST_WALLET_SOLANA_KEY, base58)
npm start -- --network both --tool get_scope --args slug=solana
```

What it prints per network: the payer address, HTTP status and latency, the decoded settlement
(`success`, `network`, `payer`, `transaction` with an explorer link) and the first keys of the response body.
Keys are read from the environment only and never printed. A missing key skips that network.

## How it works (the whole client is one file)

```ts
import { x402Client, wrapFetchWithPayment, decodePaymentResponseHeader } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm/exact/client";
import { ExactSvmScheme } from "@x402/svm/exact/client";
import { privateKeyToAccount } from "viem/accounts";
import { createKeyPairSignerFromBytes } from "@solana/kit";
import { base58 } from "@scure/base";

const client = new x402Client()
  .register("eip155:8453", new ExactEvmScheme(privateKeyToAccount(process.env.TEST_WALLET_EVM_KEY)))
  .register("solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
            new ExactSvmScheme(await createKeyPairSignerFromBytes(base58.decode(process.env.TEST_WALLET_SOLANA_KEY))));

const paidFetch = wrapFetchWithPayment(fetch, client);
const res = await paidFetch("https://fzorkxvrcbwlrolpotkf.supabase.co/functions/v1/x402/get_actor?slug=jupiter");
console.log(res.status, decodePaymentResponseHeader(res.headers.get("PAYMENT-RESPONSE")!));
```

`x402-client.ts` registers one scheme per run and passes a `paymentRequirementsSelector` that only accepts
the chosen network, so `--network base` can never pay on Solana by accident.

## Prices

USD per call, charged in USDC (6 decimals), read from the server's 402 so this table is informational:
`search_entities` 0.001; `get_actor`, `get_scope`, `get_scope_metrics`, `list_recent_events`,
`get_company_events`, `get_company_metrics`, hiring and salary analytics 0.005; `list_actors`, `compare` 0.01.
Subscribers keep using the MCP server with OAuth; pay-per-call is for agents without an account.
