---
name: remotion-graphify-setup
description: Use when a user wants to install a full public Remotion editor workspace with Graphify, Hyperframes, reusable components/templates, AI-agent rules, folder structure, assets, cache hygiene, and a guided questionnaire before setup.
version: 2.0.0
author: Remotion Editor Kit Wizard Contributors
license: MIT
metadata:
  hermes:
    tags: [remotion, graphify, hyperframes, video-editor, setup, ai-agent, workflow]
    related_skills: []
---

# Remotion Editor Kit Setup

## Overview

This skill guides a user through setting up a full AI-assisted Remotion editor workspace. It is not just a folder wizard.

The generated workspace includes:

- Remotion editor starter;
- 25 reusable components;
- real templates;
- pipeline scripts;
- Graphify-first agent rules;
- Hyperframes motion graphics layer;
- cache/scratch hygiene;
- public-safe agent skill pack.

This public kit is based on the internal Editor Pro Max system and adapted into a clean, generic, installable starter.

## When to Use

Use this when the user wants:

- a Remotion editor project;
- a reusable video production workspace;
- Graphify integration;
- Hyperframes motion graphics;
- AI-agent instructions for editing;
- components/templates/scripts included;
- a folder system for assets/renders/finals;
- safe cache/temp auditing.

## Required Questions

Ask these before setup:

1. Project/editor name.
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
14. Graphify mode: install+index or configure existing.
15. Cache/temp review policy.
16. Install full editor now?
17. Start Remotion Studio at the end?

## Setup Steps

1. Check dependencies: Node.js, npm, Git, Python, FFmpeg, Graphify.
2. Create workspace folders.
3. Install the editor starter into `Remotion/<project-name>/`.
4. Include components, templates, scripts, Hyperframes files and skill pack.
5. Create `AGENTS.md` with Remotion, Graphify and Hyperframes rules.
6. Configure Graphify:
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
  <project-name>/
    src/components/
    src/templates/
    src/hyperframes/
    scripts/
    hyperframes/
    skills/video-editor-agent/
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
- Never modify final videos, source assets, Inbox, resources, publications, backups, or the full Scratch folder automatically.
- Apply cleanup only to known cache/temp folders after explicit review.

## Public Safety Rules

Never ship:

- private local paths;
- internal recording scripts;
- private prompts;
- client material;
- personal assets;
- destructive cleanup commands;
- unpublished production notes.

## Verification Checklist

- [ ] Dependency check completed.
- [ ] Workspace folders exist.
- [ ] Editor project exists under `Remotion/`.
- [ ] `src/components/` includes 25 components.
- [ ] `src/templates/` includes real templates.
- [ ] `scripts/` includes pipeline scripts.
- [ ] `hyperframes/` and `src/hyperframes/` exist.
- [ ] `AGENTS.md` exists.
- [ ] `remotion-system.config.json` exists.
- [ ] Graphify installed/configured or clear pending command shown.
- [ ] Cache/temp review policy documented.
- [ ] Remotion Studio can be started with `npm run dev`.
