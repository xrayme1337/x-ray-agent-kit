# X-RAY extension

X-RAY (x-ray.me) reads Web3 as a board, read-only: actors (protocols, companies, exchanges, funds, chains, DAOs) with who controls them, where their capital sits, how they stand with regulators, who they are tied to and what changed this turn (seven days), plus narratives and the market regime. 29 tools, server version 1.0.

- Resolve names with `search_entities` first (free, not counted), then pass the slug to other tools.
- "What changed this week" is `get_turn`, then `get_radar` and `get_calendar`. One player is `get_actor`, then `get_actor_control`, `get_actor_capital`, `get_actor_status`, `get_actor_relations`, `get_actor_moves`.
- What no source states is not read, never zero or none. Keep each fact's source and the `source` link in your answer.
- A free account has 25 full calls; after them answers are previews (`paywalled: true`, numbers hidden). Say so and link https://x-ray.me/pricing instead of guessing numbers.
- Recipes: see skills/x-ray/SKILL.md in this repository.
