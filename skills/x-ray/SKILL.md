---
name: x-ray
description: Answer questions about Web3 players (protocols, companies, exchanges, funds, chains, DAOs) with live X-RAY data. Use when the user asks who controls a protocol or a token, where a player's capital sits, how it stands with regulators, who it is tied to, what changed in Web3 this week, what is scheduled next, or wants due diligence, a comparison, or the state of a chain, a sector or a narrative.
---

# X-RAY: Web3 with the fog of war lifted

X-RAY (x-ray.me) reads Web3 as a board. The **actors** are companies, protocols, exchanges, funds, chains and DAOs. Each carries parameters, relations and moves, read from the chains, the public registers and the sources' own change logs. A **turn** is seven days. Actors sit in **scopes** (the market, a chain, a sector) and in **narratives** (memecoins, AI agents, RWA, restaking, perp DEXs).

The tools come from the X-RAY MCP server (`https://mcp.x-ray.me`, OAuth sign-in), version 1.0: 29 read-only tools. A free account gives 25 full calls, after which answers switch to previews (lists cut to 3 rows, numbers hidden, `paywalled: true`); a subscription removes the limit. When an answer carries `quota`, mention the remaining calls; when it carries `paywalled: true`, say that the numbers need a subscription and link https://x-ray.me/pricing instead of guessing values.

## Resolve names first

Names are ambiguous (Jupiter the DEX, Jupiter the fund). Start with `search_entities(q)` to get slugs; it is free and is not counted. A merged or renamed slug answers as the actor that holds it now.

## What no source states is fog

An empty block means X-RAY has not read it, not that the answer is "none". Say "not read" and never turn a missing value into zero, safe or unlisted. Every fact names its source: keep that credit and the x-ray.me link in the answer.

## Recipes

### What changed this week
1. `get_turn()` for the strongest shifts of the turn against the one before, each with its numbers (`to` = a past turn's last day).
2. `get_radar()` for the moves the sources' change logs recorded: a token key handed over, a licence granted or withdrawn, a sanction, an L2 stage, a listing. `scope` and `slug` narrow it to a chain or a sector.
3. `get_calendar()` for what is ahead: token unlocks and the DAO votes that close.
Lead with the shift, give its numbers, name the source. A week in which a source was not read is fog, not a calm week.

### Due diligence on one player
1. `search_entities` for the slug, then `get_actor(slug)` for the card: kind, sectors, chains, tokens, ranks, latest metrics and events.
2. `get_actor_control(slug)`: who holds the token's upgrade and owner keys (one wallet, a multisig, a timelock, renounced), the DAO's quorum, threshold, voting period and timelock, multisig signers, an L2's upgrade keys.
3. `get_actor_capital(slug)`: treasury and wallets, lending markets, liquidity pools, holders and their concentration, traded volume and open interest.
4. `get_actor_status(slug)`: MiCA authorisation, OFAC, SEC filings, the registers of Japan's FSA, Korea's FIU and UK Companies House, legal entities and parents.
5. `get_actor_relations(slug)`: investors, parents, key holders, dependencies, the venues that list it.
6. `get_actor_moves(slug)`: what it did and what was done to it over 90 days.
Report who can change the rules and how fast, where the money sits, which state has a say, and what moved lately. One wallet holding a key is a fact about the contract, not an accusation: say what the chain shows and what it does not.

### An exchange's listings
`get_venue_listings(slug)` for Binance, Upbit and Hyperliquid: markets, new and gone ones in 30 days, warnings and halts, the top markets by volume, each with the player whose token it carries.

### Compare players, chains or sectors
`compare(items, range)` takes up to 4 items such as `actor:aave`, `chain:solana`, `sector:dex`. State the dimension where they differ most, not every number. Add `get_actor_control` per actor when the question is about risk.

### State of a chain, a sector or the market
`list_scopes(index)` for slugs, `get_scope(type, slug)` for the overview and its tabs, `get_scope_metrics(type, slug, metrics, days)` for daily series, `list_actors(chain, sector, sort)` for the players, `list_recent_events(chain, sector, kinds)` for the feed, `get_board()` for the 50 most active players with their capital, links and risk flags.

### Narratives and the landscape
`list_narratives()` for the heat ranking, `get_narrative(slug, tab)` for members, movers and news, `get_landscape(section)` for the market regime, regulation, capital and security, `list_landscape_events(kind, jurisdiction)` for market-wide events, `get_landscape_brief()` for the weekly briefs with numbered sources: quote a brief with its sources rather than re-summarising raw events.

### One player's events and series
`get_company_events(slug, kinds, since)` for the dated feed (rounds, hacks, listings, governance, releases) and `get_company_metrics(slug, metrics, days)` for daily series (TVL, market cap, token price, commits).

### Hiring
`search_vacancies`, `get_vacancy(id)`, `hiring_stats(group_by)` and `salary_stats(group_by)` answer who hires, for what and at what pay.

## Conventions
- Slugs come from `search_entities`; never invent them. An unknown slug returns the closest matches.
- List tools page with `cursor`; ask for more only when the user needs the full list.
- Dates are ISO, money is USD. An exchange's custodial assets are not TVL.
- X-RAY is read-only. It does not predict, rate or advise, and it never holds funds or signs transactions.
