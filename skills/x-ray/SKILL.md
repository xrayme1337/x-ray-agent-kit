---
name: x-ray
description: Answer questions about Web3 companies, protocols, chains, funds, exchanges and DAOs with live X-RAY data (hiring, funding, token and TVL metrics, GitHub activity, events, sectors, narratives). Use when the user asks who is building, hiring, raising or shipping in crypto, wants due diligence on a project, a comparison of two projects, or the state of a chain, sector or narrative.
---

# X-RAY: Web3 intelligence

X-RAY (x-ray.me) maps the Web3 landscape around **actors**: companies, protocols, exchanges, funds, chains and DAOs. Every actor carries hiring (open roles, skills, salaries), funding rounds, token and TVL metrics, GitHub activity, governance, security incidents and a dated event feed. Actors sit in **scopes** (the whole market, a chain, a sector) and in **narratives** (Memecoins, AI agents, RWA, Restaking, Perp DEXs, ...). Scopes and narratives have their own daily metrics and feeds.

The tools come from the X-RAY MCP server (`https://mcp.x-ray.me`, OAuth sign-in). A free account gives a 25-call trial, after which responses switch to preview mode (lists cut to 3 rows, numbers hidden, `paywalled: true`); a subscription removes the limit. When a response carries `quota`, mention remaining calls to the user; when it carries `paywalled: true`, say that the numbers need a subscription and link to https://x-ray.me/settings/api instead of guessing values.

## Resolve names first

Names are ambiguous (Jupiter the DEX vs Jupiter the fund). Always start with `search_entities(query)` to get slugs; it is free and does not count against the trial. Then pass the slug to the other tools.

## Recipes

### Due diligence on one project
1. `search_entities` to get the actor slug.
2. `get_actor(slug)` for the card: kind, chains, sectors, website, primary token, protocols, GitHub, headcount proxy (open roles), funding total.
3. `get_company_events(slug, limit=30)` for the dated feed: raises, hacks, listings, unlocks, governance, releases, hiring spikes.
4. `get_company_metrics(slug, range=90)` for daily series: open roles, TVL, token price, commits.
5. `company_hiring_activity(slug)` and `top_skills_for_company(slug)` to read what the team is building from what it hires for.
Report: what the actor is, how it is funded, whether it is growing (roles, commits, TVL direction), what happened in the last 90 days, and the risks (hacks, unlock schedule, governance fights). Quote dates and link to `https://x-ray.me/actor/{slug}`.

### Compare two or more projects
`compare(slugs=[...])` returns side by side metrics (open roles, TVL, token, commits, funding, events). Add `hiring_trend` per actor when the user cares about momentum. State the dimension where they differ most, not every number.

### State of a chain, sector or the market
1. `list_scopes()` or `search_entities` to find the scope slug.
2. `get_scope(type, slug)` for the overview (actors, open roles, TVL, top actors) and `get_scope_metrics(type, slug, range)` for the 30/90 day series.
3. `list_recent_events(scope=...)` for the feed; `top_hiring_companies(scope=...)` for who is hiring.
For a sector tree use `list_sectors()`; for chains `list_blockchains()`; actors in a scope `list_actors(kind, chain, sector, cursor)`.

### Who is hiring and for what
`search_vacancies(query, chain, sector, grade, remote)` for roles; `vacancy_stats_by_sector`, `vacancy_stats_by_blockchain`, `vacancy_stats_by_grade`, `vacancy_stats_by_skill` for the distribution; `salary_stats(role, grade, location)` for pay ranges; `list_skill_clusters()` and `top_skills_for_sector(sector)` for demand. `get_vacancy(id)` and `vacancy_skills(id)` for one role.

### Narratives (when available on the server, MCP 0.7+)
`list_narratives()` for heat ranking; `get_narrative(slug, tab=overview|members|news)` for members, movers and the news feed. Narratives are phenomena (meme tokens, AI agents, RWA), not actors: a token belongs to a narrative, an actor belongs to sectors.

## Conventions
- Slugs come from `search_entities`; never invent them. Unknown slugs return the closest matches.
- List tools paginate with `cursor`; default 50 rows. Ask for more only when the user needs the full list.
- Every response has a `source` footer; keep the x-ray.me link in your answer so the user can verify.
- Dates are ISO, money in USD, TVL and market cap in USD, roles are counts of active postings.
- X-RAY is read-only. It does not place orders, sign transactions or move funds.
