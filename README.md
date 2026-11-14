# X-RAY for agents

[X-RAY](https://x-ray.me) is Web3 with the fog of war lifted. It reads the market as a board: 3,000+ protocols, companies, exchanges, funds, chains and DAOs, each with who controls it (token upgrade and owner keys, DAO quorum and timelock, multisigs), where its capital sits (treasury, lending markets, liquidity, holders), where it stands with regulators (MiCA, OFAC, SEC, Japan FSA, Korea FIU, UK Companies House), who it is tied to, and what changed on the board this turn (seven days). Every fact names its source; what no source states is reported as not read, never as zero.

Built during the Colosseum Crypto World's Fair hackathon (October 2026) as the distribution layer for agents: the server is listed in the official MCP Registry as `me.x-ray/mcp`.

This repository holds everything an agent platform needs to connect to the X-RAY MCP server:

| Path | What it is |
|---|---|
| `.mcp.json` | MCP server config (`https://mcp.x-ray.me`, Streamable HTTP, OAuth) |
| `.claude-plugin/` | Claude Code plugin manifest and marketplace file |
| `skills/x-ray/SKILL.md` | Agent skill with analysis recipes (what changed this week, due diligence by control, capital, status and relations, comparison, chain and sector state, narratives) |
| `gemini-extension.json`, `GEMINI.md` | Gemini CLI extension |
| `registry/server.json` | Entry for the official MCP Registry |
| `examples/x402-client/` | Pay-per-call test client (x402 v2, USDC on Base and Solana) |
| `docs/listing.md` | Listing texts for catalogs |

All tools are read-only. X-RAY does not hold funds, execute trades or sign transactions.

## Connect

Server URL for every client: **`https://mcp.x-ray.me`**. Sign-in is OAuth; no API keys.

**Claude (web and desktop):** Settings → Connectors → Add custom connector → paste the URL → Connect.

**Claude Code:**
```bash
claude mcp add --transport http x-ray https://mcp.x-ray.me
```
or install the plugin with its skill:
```
/plugin marketplace add xrayme1337/x-ray-agent-kit
/plugin install x-ray@x-ray
```

**Cursor:** [Add to Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=x-ray&config=eyJ1cmwiOiJodHRwczovL21jcC54LXJheS5tZSJ9) or add to `mcp.json`:
```json
{ "mcpServers": { "x-ray": { "url": "https://mcp.x-ray.me" } } }
```

**VS Code:** [Install in VS Code](vscode:mcp/install?%7B%22name%22%3A%22x-ray%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.x-ray.me%22%7D) or add to `.vscode/mcp.json`:
```json
{ "servers": { "x-ray": { "type": "http", "url": "https://mcp.x-ray.me" } } }
```

**Windsurf** (`mcp_config.json`):
```json
{ "mcpServers": { "x-ray": { "serverUrl": "https://mcp.x-ray.me" } } }
```

**Codex** (`config.toml`):
```toml
[mcp_servers.x-ray]
url = "https://mcp.x-ray.me"
```

**Gemini CLI:**
```bash
gemini extensions install https://github.com/xrayme1337/x-ray-agent-kit
```

**ChatGPT:** developer mode → create a connector with the same URL.

**Agent skill only** (any agent that reads `skills/*/SKILL.md`):
```bash
npx skills add xrayme1337/x-ray-agent-kit
```

## Access

A free X-RAY account includes a 25-call trial. After the trial, tools return previews (lists cut to 3 rows, numbers hidden, `paywalled: true`); a subscription removes the limit: https://x-ray.me/pricing. `search_entities` is always free and is not counted.

Agents without an account can pay per call in USDC (Base and Solana) through the separate x402 lane, `https://mcp.x-ray.me/x402/{tool}?{args}` (discovery: `https://mcp.x-ray.me/.well-known/x402`, `https://mcp.x-ray.me/openapi.json`): the first request answers `402` with the price, an [x402](https://x402.org) client pays and retries. A ready client with both networks is in [`examples/x402-client/`](examples/x402-client/); details, live prices, the paid-calls counter and the receiving addresses at https://x-ray.me/docs/pay-per-call.

## Tools

29 read-only tools (server version 1.0.2, every tool with a title and `readOnlyHint`):

- The board: `get_turn`, `get_radar`, `get_board`, `get_calendar`
- One player: `get_actor`, `get_actor_control`, `get_actor_capital`, `get_actor_status`, `get_actor_relations`, `get_actor_moves`, `get_venue_listings`, `get_company_events`, `get_company_metrics`
- Actors and scopes: `search_entities`, `list_actors`, `compare`, `list_recent_events`, `get_scope`, `get_scope_metrics`, `list_scopes`
- Landscape: `get_landscape`, `get_landscape_brief`, `list_landscape_events`, `list_narratives`, `get_narrative`
- Hiring: `search_vacancies`, `get_vacancy`, `hiring_stats`, `salary_stats`

Every answer carries `source` (the X-RAY page with the same data); an unknown name returns `not found` with the three closest slugs. Full reference: https://x-ray.me/docs/mcp-capabilities; install snippets for every client: https://x-ray.me/docs/connect. The x402 lane serves the same 29 tools under the same names.

## Links

Site https://x-ray.me · Docs https://x-ray.me/docs · Connect guide https://x-ray.me/docs/connect · Pricing https://x-ray.me/pricing · Support hello@x-ray.me

MIT License.
