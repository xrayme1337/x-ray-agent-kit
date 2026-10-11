/**
 * X-RAY pay-per-call test client (x402 v2, USDC on Base and Solana).
 *
 * Calls one X-RAY tool through the x402 lane without an account or API key:
 * the first request answers 402 with the price, the client signs a USDC payment
 * for the network you chose, retries with the PAYMENT-SIGNATURE header and
 * prints what came back (status, settlement, the tool's JSON).
 *
 *   npm install
 *   npm run probe                              # no keys: show the 402 and the price list
 *   TEST_WALLET_EVM_KEY=0x... npm start -- --network base
 *   TEST_WALLET_SOLANA_KEY=... npm start -- --network solana
 *   npm start -- --network both --tool get_actor --args slug=jupiter
 *
 * Keys are read from the environment only and are never printed.
 * Endpoint: https://fzorkxvrcbwlrolpotkf.supabase.co/functions/v1/x402/{tool}?{args}  (override with X402_BASE).
 */
import { x402Client, wrapFetchWithPayment, decodePaymentResponseHeader } from "@x402/fetch";
import { decodePaymentRequiredHeader } from "@x402/core/http";
import type { PaymentRequirements } from "@x402/core/types";
import { ExactEvmScheme } from "@x402/evm/exact/client";
import { ExactSvmScheme } from "@x402/svm/exact/client";
import { privateKeyToAccount } from "viem/accounts";
import { createKeyPairSignerFromBytes } from "@solana/kit";
import { base58 } from "@scure/base";

const NETWORKS = {
  base: { caip2: "eip155:8453", label: "Base", explorer: (tx: string) => `https://basescan.org/tx/${tx}` },
  solana: {
    caip2: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    label: "Solana",
    explorer: (tx: string) => `https://solscan.io/tx/${tx}`,
  },
} as const;
type NetworkKey = keyof typeof NETWORKS;

const BASE_URL = (process.env.X402_BASE ?? "https://fzorkxvrcbwlrolpotkf.supabase.co/functions/v1/x402").replace(/\/$/, "");

// ---- CLI -------------------------------------------------------------------
function flag(name: string, fallback: string): string {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const PROBE = process.argv.includes("--probe");
const networkArg = flag("network", "both");
const tool = flag("tool", "get_actor");
const args = flag("args", "slug=jupiter");
const url = `${BASE_URL}/${tool}?${args}`;

const usd = (r: PaymentRequirements) => `$${(Number(r.amount) / 1e6).toFixed(6).replace(/0+$/, "").replace(/\.$/, "")}`;

// ---- 1. Probe: the unpaid request -------------------------------------------
async function probe(): Promise<void> {
  console.log(`GET ${url}  (no payment)`);
  const res = await fetch(url);
  console.log(`→ HTTP ${res.status}`);
  const header = res.headers.get("PAYMENT-REQUIRED");
  if (res.status === 402 && header) {
    const req = decodePaymentRequiredHeader(header);
    console.log(`  x402Version ${req.x402Version}; resource ${req.resource?.url ?? "?"}`);
    for (const a of req.accepts) {
      console.log(`  accepts: ${a.scheme} on ${a.network} — ${usd(a)} USDC → ${a.payTo} (timeout ${a.maxTimeoutSeconds}s)`);
    }
    if (req.extensions && "bazaar" in req.extensions) console.log("  extensions.bazaar: present (discoverable)");
    return;
  }
  const text = (await res.text()).slice(0, 300);
  if (res.status === 401 || res.status === 404) {
    console.log("  No 402 from this host: check X402_BASE (the lane answers 402 at https://fzorkxvrcbwlrolpotkf.supabase.co/functions/v1/x402/{tool}).");
  }
  console.log(`  body: ${text}`);
}

// ---- 2. Pay on one network --------------------------------------------------
async function makeClient(network: NetworkKey): Promise<x402Client | null> {
  const want = NETWORKS[network].caip2;
  const selectOnlyThisNetwork = (_version: number, accepts: PaymentRequirements[]): PaymentRequirements => {
    const match = accepts.find((a) => a.network === want && a.scheme === "exact");
    if (!match) throw new Error(`server offers no exact/${want} option; offered: ${accepts.map((a) => a.network).join(", ")}`);
    return match;
  };
  const client = new x402Client(selectOnlyThisNetwork);
  if (network === "base") {
    const key = process.env.TEST_WALLET_EVM_KEY;
    if (!key) return null;
    const account = privateKeyToAccount(key as `0x${string}`);
    console.log(`  payer (Base): ${account.address}`);
    client.register(want, new ExactEvmScheme(account));
  } else {
    const key = process.env.TEST_WALLET_SOLANA_KEY;
    if (!key) return null;
    const signer = await createKeyPairSignerFromBytes(base58.decode(key));
    console.log(`  payer (Solana): ${signer.address}`);
    client.register(want, new ExactSvmScheme(signer));
  }
  return client;
}

async function payOn(network: NetworkKey): Promise<void> {
  const net = NETWORKS[network];
  console.log(`\n== ${net.label} (${net.caip2}) ==`);
  const client = await makeClient(network);
  if (!client) {
    console.log(`  skipped: ${network === "base" ? "TEST_WALLET_EVM_KEY" : "TEST_WALLET_SOLANA_KEY"} is not set`);
    return;
  }
  const paidFetch = wrapFetchWithPayment(fetch, client);
  const t0 = Date.now();
  let res: Response;
  try {
    res = await paidFetch(url, { method: "GET" });
  } catch (err) {
    console.log(`  payment failed: ${err instanceof Error ? err.message : String(err)}`);
    return;
  }
  const ms = Date.now() - t0;
  console.log(`  HTTP ${res.status} in ${ms} ms`);

  const settled = res.headers.get("PAYMENT-RESPONSE");
  if (settled) {
    const s = decodePaymentResponseHeader(settled);
    console.log(`  settlement: success=${s.success} network=${s.network} payer=${s.payer ?? "?"}`);
    console.log(`  transaction: ${s.transaction}  ${s.transaction ? net.explorer(s.transaction) : ""}`);
    if (s.errorReason) console.log(`  error: ${s.errorReason} ${s.errorMessage ?? ""}`);
  } else {
    console.log("  no PAYMENT-RESPONSE header (the request was not paid)");
  }

  const text = await res.text();
  try {
    const body = JSON.parse(text);
    const brief = typeof body === "object" && body ? Object.fromEntries(Object.entries(body).slice(0, 8)) : body;
    console.log(`  body (first keys): ${JSON.stringify(brief).slice(0, 600)}`);
  } catch {
    console.log(`  body: ${text.slice(0, 300)}`);
  }
}

// ---- main -------------------------------------------------------------------
(async () => {
  await probe();
  if (PROBE) return;
  const targets: NetworkKey[] = networkArg === "both" ? ["base", "solana"] : [networkArg as NetworkKey];
  for (const n of targets) {
    if (!(n in NETWORKS)) {
      console.error(`unknown network "${n}"; use base, solana or both`);
      process.exitCode = 2;
      return;
    }
    await payOn(n);
  }
})().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
