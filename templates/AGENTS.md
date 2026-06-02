# Remotion Editor Kit Workspace

Este workspace puede ser operado por agentes IA. Es un editor completo basado en Remotion, Graphify e Hyperframes.

## Stack obligatorio

- **Remotion**: composiciones, preview, renders y edición principal.
- **Graphify**: mapa del codebase antes de exploración profunda.
- **Hyperframes**: motion graphics, tarjetas, overlays, diagramas y escenas HTML.

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

1. Correr typecheck si existe:
   - `npm run typecheck`
2. Levantar Remotion Studio:
   - `npm run dev`
3. Revisar preview local antes de render final.
4. Renderizar draft antes de decir que está terminado.

## Hyperframes

Usar Hyperframes para:

- full-screen explainers;
- motion cards;
- diagramas de proceso;
- flechas/labels;
- overlays técnicos;
- transiciones editoriales.

Validar cuando aplique:

```bash
npm run hyperframes:lint
npm run hyperframes:validate
```

## Carpetas

- `Inbox/`: material nuevo.
- `Recursos/`: logos, branding, fuentes, docs.
- `Assets Pesados/`: raw media pesado.
- `Videos Finales/`: MP4 aprobados.
- `Renders Viejos/`: drafts descartados.
- `Scratch/`: temporales/cache.

## Seguridad pública

No incluir rutas privadas, assets personales, datos de clientes, guiones internos de producción ni comandos destructivos.

## Higiene

Antes de aplicar limpieza de temporales, usar dry-run:

```bash
npm run clean
```

Solo aplicar después de revisar que la lista incluya únicamente cachés/temporales:

```bash
npm run clean:apply
```
