# X-RAY listing texts

One text for every MCP, x402 and agent catalog. Checked on 5 Nov 2026: 3,258 actors on x-ray.me (written as "3,000+"), 36 read-only tools, MCP Registry entry `me.x-ray/mcp` 0.9.2.

## Card

| Field | Value |
|---|---|
| Name | X-RAY |
| Server URL | `https://mcp.x-ray.me` (Streamable HTTP, OAuth with dynamic client registration and PKCE, no API keys) |
| Registry name | `me.x-ray/mcp` |
| Pay per call | x402 v2, USDC on Base or Solana, no account: `https://mcp.x-ray.me/x402/{tool}?{args}`; discovery at `https://mcp.x-ray.me/.well-known/x402` and `https://mcp.x-ray.me/openapi.json` |
| Website | https://x-ray.me |
| Docs | https://x-ray.me/docs/mcp · connect any client: https://x-ray.me/docs/connect · pay per call: https://x-ray.me/docs/pay-per-call |
| Pricing | https://x-ray.me/pricing |
| Privacy, terms | https://x-ray.me/privacy · https://x-ray.me/terms |
| Support | hello@x-ray.me |
| Icon | https://x-ray.me/icon-512.png (512×512) · https://x-ray.me/icon-256.png |
| Repository | https://github.com/xrayme1337/x-ray-agent-kit (client configs, Claude plugin, Gemini extension, skill, x402 client) |
| Categories | Data and analytics · Finance and research · Crypto |
| Tags | web3, crypto, defi, market-intelligence, competitive-intelligence, due-diligence, x402, read-only |

## One-liner (80 characters)

The map of who is doing what in Web3: actors, their links and every public move.

## Short blurb (117 characters, for lists with a 120 limit)

Web3 actors, their links and every public move: rounds, investors, partners, hacks, listings. OAuth or x402 per call.

## Description (about 1,450 characters)

X-RAY is Web3 with the fog of war lifted. It maps who is doing what: 3,000+ protocols, companies, funds, exchanges, chains and DAOs, each with its numbers, its links and every public move, updated every day.

- Parameters: TVL, market cap, fees, open roles, commits and funding, each with its 30-day change and the actor's rank in its sector.
- Links: investors and portfolio, co-investors, tokens, chains and sectors.
- Moves: funding rounds, launches, listings, partnerships, hacks, governance votes, regulatory actions and hiring spikes.
- The field: narratives with a daily heat score, the regulation that names the actor, and the market regime.

Ask your agent things like:
- "Compare Morpho, Aave and Maple on TVL, hiring and moves in the last 30 days, with dates and sources."
- "Who co-invests most often with Blockchain Capital, and who led the latest rounds in its portfolio?"
- "Which narratives are heating up this week, and who is in them?"

36 read-only tools. Every response links to the x-ray.me page with the same data, so any number can be checked. X-RAY does not predict, rate or advise, and it never holds funds or signs transactions.

Access: sign in with OAuth from your client; a free account includes 25 full calls. Pro and Team plans lift the limit. Autonomous agents can skip the account and pay per call in USDC on Base or Solana over x402, from $0.001 a call. People read the whole map free at x-ray.me.

## Use cases

- Due diligence on a protocol, fund or company before a deal, a listing or a partnership
- Watching rivals or a portfolio: rounds, partners, launches, listings, hires
- Who co-invests with whom, and who leads the next round
- Side-by-side comparison of up to four actors, chains or sectors
- Which narratives are heating up, and who is in them

## Pricing (for forms)

Free: every actor page on x-ray.me, watchlists, compare, 5 alerts, an MCP trial of 25 calls. Pro $199/mo: 1 seat, 5,000 MCP calls a month, CSV export, API key. Team $990/mo: 5 seats, 30,000 pooled MCP calls, shared watchlists. Enterprise from $3,000/mo: bulk export, custom actors and sources, SLA. Pay per call over x402 from $0.001, no account. Annual plans include two months free.

## Entries for GitHub lists

awesome-remote-mcp-servers (Finance; the description must stay under 120 characters):

```markdown
- [X-RAY](https://x-ray.me/?utm_source=awesome-remote&utm_medium=listing) `https://mcp.x-ray.me`
  [![X-RAY MCP connector](https://glama.ai/mcp/connectors/me.x-ray/mcp/badges/score.svg)](https://glama.ai/mcp/connectors/me.x-ray/mcp)
  🔐 - Web3 actors, their links and every public move: rounds, investors, partners, hacks, listings; or pay per call via x402.
```

Web3 and x402 lists (one line):

```markdown
- [X-RAY](https://x-ray.me) - The map of who is doing what in Web3: actors, their links and every public move. Remote MCP server (`https://mcp.x-ray.me`, OAuth) and x402 pay-per-call lane (USDC on Base and Solana).
```

Every link in a listing gets a UTM tag: `?utm_source=<catalog>&utm_medium=listing`.
