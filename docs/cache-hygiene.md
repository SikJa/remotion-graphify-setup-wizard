# Higiene de cachés y temporales

Problema real: Remotion, webpack, Chromium y renders intermedios pueden acumular cachés y carpetas temporales pesadas.

## Política recomendada

- Usar una carpeta `Scratch/` explícita para temporales.
- Mantener recursos, proyecto y videos finales separados de la caché.
- Revisar tamaño de `node_modules/.cache`, `.cache`, `tmp`, `temp` y subcarpetas de caché dentro de `Scratch/`.
- Correr primero el dry-run y aplicar cambios solo después de revisar la lista.

## Comandos

```bash
npm run clean        # muestra candidatos; no modifica archivos
npm run clean:apply  # aplica solo sobre carpetas conocidas de caché/temp
```

## Buenas prácticas

- Mantener finales aprobados en `Videos Finales/`.
- Archivar drafts en `Renders Viejos/` si todavía pueden servir.
- Usar disco externo o scratch dedicado cuando trabajás con video pesado.
- No guardar material fuente ni entregables dentro de carpetas de caché.
