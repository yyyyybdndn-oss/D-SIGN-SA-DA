---
name: GitHub source-control authorization
description: Verifying that Replit's GitHub source-control connection can actually push to a remote.
---

Do not treat an apparently successful GitHub integration bind as proof that Git pushes work. In this workspace, `addIntegration` returned success/already-added, but the connection still appeared as `not_added` and an HTTPS push failed with invalid username/token. The generic API-connector path did not expose a GitHub connection that could repair the push.

**Why:** A deployment configuration commit could not reach the requested GitHub `main` branch, so Vercel automation could not start.

**How to apply:** For GitHub write requests, verify remote access before promising a push. If the integration status and push result disagree, stop and have the user repair the workspace GitHub connection; never request a token in chat.
