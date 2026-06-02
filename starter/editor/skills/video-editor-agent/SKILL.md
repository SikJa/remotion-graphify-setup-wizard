---
name: video-editor-agent
description: Operate this public Remotion editor kit with Graphify-first repo understanding, Hyperframes motion graphics, preview-visible editing, and safe cache hygiene.
---

# Video Editor Agent

Use this skill inside the generated editor workspace.

## Rules

1. Query Graphify before deep repo exploration when `graphify-out/graph.json` exists.
2. Use Remotion as the primary editor for compositions, subtitles, layouts and renders.
3. Use Hyperframes for motion graphics: full-screen explainers, animated cards, arrows, diagrams, and overlays.
4. Never claim an edit is finished without a visible Remotion Studio preview or a rendered draft.
5. Keep public assets generic: no private paths, client data, internal scripts, or destructive cleanup commands.
6. Run `npm run typecheck` before rendering when possible.

## Common commands

```bash
npm run dev
npm run typecheck
npm run render -- <composition-id> out/video.mp4
npm run hyperframes:lint
npm run hyperframes:validate
npm run clean:remotion-temp
```
