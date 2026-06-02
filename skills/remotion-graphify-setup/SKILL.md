---
name: remotion-graphify-setup
description: Use when a user wants to install or configure a Remotion video workspace with Graphify, AI-agent rules, folder structure, assets, cache hygiene, and a guided questionnaire before setup.
version: 1.0.0
author: Remotion Graphify Setup Wizard Contributors
license: MIT
metadata:
  hermes:
    tags: [remotion, graphify, video, setup, ai-agent, workflow]
    related_skills: []
---

# Remotion Graphify Setup

## Overview

This skill guides a user through setting up a Remotion workspace that is ready for AI-assisted video production. It must ask context questions first, then create folders, config files, agent rules, Graphify setup, and cache-cleaning policies.

Do not install blindly. The setup depends on how the user will use Remotion: reels, YouTube videos, educational explainers, screen recordings, ads, courses, or internal assets.

## When to Use

Use this when the user wants:

- a Remotion project;
- a reusable video production workspace;
- Graphify integration;
- AI-agent instructions for editing;
- a folder system for assets/renders/finals;
- safe cache/temp auditing for Remotion and webpack.

## Required Questions

Ask these before setup:

1. Project name.
2. Root workspace folder.
3. Main use case.
4. Main aspect ratio.
5. Typical video duration.
6. Source material type.
7. Existing assets folder.
8. Inbox folder.
9. Final videos folder.
10. Scratch/cache folder.
11. Subtitle/transcription plan.
12. Visual style.
13. AI agent target.
14. Graphify setup preference.
15. Cache/temp review policy.

## Setup Steps

1. Check dependencies: Node.js, npm, Git, Python, FFmpeg, Graphify.
2. Create workspace folders.
3. Create or initialize Remotion project.
4. Run `npm install` inside the Remotion project when needed.
5. Create `AGENTS.md` with preview and Graphify rules.
6. Configure Graphify if requested:
   - `graphify hermes install`
   - `graphify claude install`
   - `graphify .`
7. Write `remotion-system.config.json` with the answers.
8. Configure cache/scratch review policy.
9. Start Remotion Studio with `npm run dev` only after install succeeds.
10. Show the local preview URL to the user.

## Folder Contract

Use this default structure unless the user overrides it:

```text
Inbox/
Recursos/
Assets Pesados/
Remotion/
Publicaciones/
Videos Finales/
Renders Viejos/
Backups/
Scratch/
graphify-out/
```

## Cache Hygiene Rules

- Do not let temp renders accumulate inside random OS temp folders.
- Prefer a configured `Scratch/` folder.
- Cleanup must be dry-run by default.
- Never modify `Videos Finales/`, source assets, Inbox, resources, publications, backups, or the full Scratch folder automatically.
- Apply cleanup only to known cache/temp folders after explicit review.

## Verification Checklist

- [ ] Dependency check completed.
- [ ] Workspace folders exist.
- [ ] Remotion project exists.
- [ ] `npm install` succeeded or clear next command is shown.
- [ ] `AGENTS.md` exists.
- [ ] `remotion-system.config.json` exists.
- [ ] Graphify installed/configured or explicitly skipped.
- [ ] Cache/temp review policy documented.
- [ ] Remotion Studio can be started with `npm run dev`.
