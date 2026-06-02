# Preguntas del setup

Estas son las preguntas base que hace la skill/wizard antes de instalar o configurar Remotion.

1. ¿Cómo se llama el proyecto?
2. ¿Dónde querés guardar la carpeta raíz del workspace?
3. ¿Para qué vas a usar Remotion principalmente?
4. ¿Qué formato querés priorizar: 9:16, 16:9, 1:1 o multiformato?
5. ¿Cuál es la duración típica de tus videos?
6. ¿Qué tipo de material vas a usar como input?
7. ¿Ya tenés una carpeta con recursos existentes?
8. ¿Dónde querés guardar el Inbox de archivos nuevos?
9. ¿Dónde querés guardar los videos finales aprobados?
10. ¿Dónde querés guardar temporales, cache y renders intermedios?
11. ¿Cómo vas a manejar subtítulos/transcripción?
12. ¿Qué estilo visual querés que respete el sistema?
13. ¿Qué agente IA va a operar el repo?
14. ¿Querés instalar/configurar Graphify ahora?
15. ¿Cómo querés revisar cachés y temporales de forma segura?

## Cómo se usan las respuestas

- Generan `remotion-system.config.json`.
- Crean el sistema de carpetas.
- Personalizan `AGENTS.md`.
- Personalizan la skill `skills/remotion-graphify-setup/SKILL.md`.
- Deciden si se corre `npx create-video@latest`, `npm install`, `npm run dev` y `graphify .`.
