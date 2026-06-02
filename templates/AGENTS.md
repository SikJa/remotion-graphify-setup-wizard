# Remotion + Graphify Video Workspace

Este workspace puede ser operado por agentes IA. Reglas obligatorias:

## Graphify primero

Antes de explorar profundamente código, composición, rutas o estructura:

1. Si existe `graphify-out/graph.json`, consultar:
   - `graphify query "<pregunta>"`
   - `graphify explain "<nodo>"`
   - `graphify path "A" "B"`
2. Leer archivos raw solo cuando haga falta verificar contenido exacto.
3. Después de cambios grandes, actualizar el grafo:
   - `graphify .`

## Preview visible obligatorio

No hacer edición invisible.

1. Correr typecheck si existe.
2. Levantar Remotion Studio:
   - `npm run dev`
3. Revisar preview local antes de render final.
4. Renderizar draft antes de final.

## Carpetas

- `Inbox/`: material nuevo.
- `Recursos/`: logos, branding, fuentes, docs.
- `Assets Pesados/`: raw media pesado.
- `Videos Finales/`: MP4 aprobados.
- `Renders Viejos/`: drafts descartados.
- `Scratch/`: temporales/cache.

## Higiene

Antes de aplicar limpieza de temporales, usar dry-run:

```bash
npm run clean
```

Solo aplicar después de revisar que la lista incluya únicamente cachés/temporales:

```bash
npm run clean:apply
```
