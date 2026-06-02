# Sistema de carpetas

El objetivo es separar material fuente, proyecto, renders, finales y temporales para que el workspace sea fácil de mantener.

## Estructura recomendada

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

## Reglas

- `Inbox`: entra todo lo nuevo, no se edita desde acá.
- `Recursos`: logos, fuentes, branding, imágenes, docs, prompts.
- `Assets Pesados`: raw media pesado. Idealmente fuera del disco del sistema.
- `Remotion`: código, componentes, composiciones y scripts.
- `Publicaciones`: una carpeta por pieza con copy, fuentes y métricas.
- `Videos Finales`: solo MP4 aprobados.
- `Renders Viejos`: drafts viejos y descartados.
- `Scratch`: cache, frames temporales, renders intermedios.
- `Backups`: copias de seguridad.

## Regla clave

Los temporales deberían vivir en `Scratch/` o carpetas de caché identificables. Usá dry-run para revisar antes de aplicar cualquier limpieza.
