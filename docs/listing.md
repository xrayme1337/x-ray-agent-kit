# X-RAY listing texts

One text for every MCP, x402 and agent catalog. Checked on 14 Nov 2026: 3,332 actors on x-ray.me (written as "3,000+"), 29 read-only tools (MCP 1.0), MCP Registry entry `me.x-ray/mcp` 1.0.2.

## Card

| Field | Value |
|---|---|
| Name | X-RAY |
| Server URL | `https://mcp.x-ray.me` (Streamable HTTP, OAuth with dynamic client registration and PKCE, no API keys) |
| Registry name | `me.x-ray/mcp` |
| Pay per call | x402 v2, USDC on Base or Solana, no account: `https://mcp.x-ray.me/x402/{tool}?{args}`; discovery at `https://mcp.x-ray.me/.well-known/x402` and `https://mcp.x-ray.me/openapi.json`; live prices at `https://mcp.x-ray.me/x402/_prices` |
| Website | https://x-ray.me |
| Docs | connect any client: https://x-ray.me/docs/connect · what the tools answer: https://x-ray.me/docs/mcp-capabilities · pay per call: https://x-ray.me/docs/pay-per-call |
| Pricing | https://x-ray.me/pricing |
| Privacy, terms | https://x-ray.me/privacy · https://x-ray.me/terms |
| Support | hello@x-ray.me |
| Icon | https://x-ray.me/icon-512.png (512×512) · https://x-ray.me/icon-256.png |
| Repository | https://github.com/xrayme1337/x-ray-agent-kit (client configs, Claude plugin, Gemini extension, skill, x402 client) |
| Categories | Data and analytics · Finance and research · Crypto |
| Tags | web3, crypto, defi, governance, compliance, due-diligence, market-intelligence, x402, read-only |

## One-liner

Web3 with the fog of war lifted: who controls each protocol, exchange, fund and DAO, where its capital sits, how it stands with regulators, and what changed on the board this turn.

## Short line (81 characters, for lists with a 100 or 120 limit)

Who controls each Web3 player, where its capital sits and what changed this turn.

## Short description

X-RAY gives an AI agent the map of Web3's players: who holds the keys, the treasury, the licences and the sanctions, who is tied to whom, and what changed on the board this turn. 29 read-only MCP tools, every fact with its source.

## Description

X-RAY reads Web3 as a board. The actors are companies, protocols, exchanges, funds, chains and DAOs. Each carries parameters, relations and moves, read from the chains, the public registers and the sources' own change logs. A turn is seven days.

With the connector an assistant can answer:

- What changed this turn: who entered the top 10 by moves, whose market cap or TVL moved 25 % or more, which token key was handed over, which licence was granted or withdrawn.
- Who controls a player: the holders of a token's upgrade and owner keys, the DAO's quorum, timelock and voting period, multisig signers and thresholds, L2 upgrade keys.
- Where its capital sits: treasury and wallets, lending markets, liquidity pools, holders and their concentration.
- Where it stands with regulators: MiCA authorisations, OFAC listings, SEC filings, the registers of Japan's FSA, Korea's FIU and UK Companies House.
- Who it is tied to: investors, parents, key holders, dependencies and the venues that list it.
- What is ahead: token unlocks and the DAO votes that close.

29 read-only tools. Every answer links the X-RAY page with the same data and every fact names its source. What no source states is reported as not read, never as zero. X-RAY does not predict, rate or advise, and it never holds funds or signs transactions.

Access: sign in with OAuth from your client; a free account includes 25 full calls, then a subscription. Autonomous agents can skip the account and pay per call in USDC on Base or Solana over x402, from $0.001 a call. People read the whole board free at x-ray.me.

## Use cases

1. Due diligence on a protocol or exchange before a listing, an integration or an investment: "Who can upgrade Arbitrum's contracts, and with what delay?"
2. A weekly read of the market: "What changed on the board this turn, and what is scheduled for the next one?"
3. Compliance and risk screening: "Is this exchange authorised under MiCA, and does any register or sanctions list name it?"

## Example prompts

- What changed in Web3 this week? Give me the five strongest shifts with their numbers.
- Who holds the upgrade and owner keys of Uniswap's token, and what does its DAO need to pass a vote?
- Where does Kraken stand with regulators: MiCA, SEC, UK, Japan?
- Which token unlocks and DAO votes close in the next seven days in the DEX sector?

## Pricing (for forms)

Free: every actor page on x-ray.me, watchlists, compare, 5 alerts, an MCP trial of 25 calls. Pro $199/mo: 1 seat, 5,000 MCP calls a month, CSV export, API key. Team $990/mo: 5 seats, 30,000 pooled MCP calls, shared watchlists. Enterprise from $3,000/mo: bulk export, custom actors and sources, SLA. Pay per call over x402 from $0.001, no account. Annual plans include two months free.

## Entries for GitHub lists

awesome-remote-mcp-servers (the description must stay under 120 characters):

```markdown
- [X-RAY](https://x-ray.me/?utm_source=awesome-remote&utm_medium=listing) `https://mcp.x-ray.me`
  🔐 - Who controls each Web3 player, where its capital sits and what changed this turn; OAuth, or pay per call via x402.
```

Web3 and x402 lists (one line):

```markdown
- [X-RAY](https://x-ray.me) - Who controls each Web3 player, where its capital sits, how it stands with regulators and what changed this turn. Remote MCP server (`https://mcp.x-ray.me`, OAuth) and x402 pay-per-call lane (USDC on Base and Solana).
```

Every link in a listing gets a UTM tag: `?utm_source=<catalog>&utm_medium=listing`.
