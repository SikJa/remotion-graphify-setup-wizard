#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync, execFileSync } from 'node:child_process';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const questions = [
  {
    key: 'projectName',
    section: '1) Identidad del workspace',
    context: 'Primero definimos cómo se va a llamar el sistema. Este nombre se usa para carpetas, configuración y proyecto Remotion.',
    label: 'Nombre del proyecto',
    defaultValue: 'mi-remotion-studio',
  },
  {
    key: 'rootDir',
    section: '1) Identidad del workspace',
    context: 'Elegimos dónde crear todo. Ahí van las carpetas de recursos, renders, Remotion, configuración y reglas para agentes.',
    label: 'Carpeta raíz del workspace',
    defaultValue: './workspace',
  },
  {
    key: 'useCase',
    section: '2) Tipo de contenido',
    context: 'Ahora le damos contexto al sistema: no es lo mismo armar reels verticales que videos largos, cursos o ads.',
    label: 'Uso principal: reels, YouTube largo, cursos, ads, recursos visuales',
    defaultValue: 'reels + recursos visuales',
  },
  {
    key: 'aspectRatio',
    section: '2) Tipo de contenido',
    context: 'El formato define cómo se piensa el diseño: vertical para Reels/Shorts/TikTok, horizontal para YouTube, o multi si necesitás adaptar.',
    label: 'Formato principal: 9:16, 16:9, 1:1, multi',
    defaultValue: '9:16',
  },
  {
    key: 'duration',
    section: '2) Tipo de contenido',
    context: 'La duración ayuda a estimar estructura, ritmo, captions, renders y tamaño de temporales.',
    label: 'Duración típica',
    defaultValue: '30-90s',
  },
  {
    key: 'sourceMaterial',
    section: '2) Tipo de contenido',
    context: 'Esto le dice al agente con qué materiales va a trabajar: cámara, pantalla, audios, documentos, clips o assets.',
    label: 'Fuente de material: cámara, screen, audio, docs, clips, assets',
    defaultValue: 'clips + guiones + assets',
  },
  {
    key: 'assetsFolder',
    section: '3) Carpetas de trabajo',
    context: 'Si ya tenés logos, fuentes, música o imágenes en una carpeta, podés conectarla. Si lo dejás vacío, se crea Recursos/.',
    label: 'Carpeta de recursos existentes (vacío para crear Recursos/)',
    defaultValue: '',
  },
  {
    key: 'inboxFolder',
    section: '3) Carpetas de trabajo',
    context: 'Inbox es la entrada de material nuevo sin ordenar: audios, capturas, ideas, imágenes o clips que después se procesan.',
    label: 'Carpeta Inbox (vacío para crear Inbox/)',
    defaultValue: '',
  },
  {
    key: 'finalsFolder',
    section: '3) Carpetas de trabajo',
    context: 'Videos Finales guarda solamente MP4 aprobados/listos. Así no se mezclan drafts con entregables.',
    label: 'Carpeta de videos finales (vacío para crear Videos Finales/)',
    defaultValue: '',
  },
  {
    key: 'scratchFolder',
    section: '3) Carpetas de trabajo',
    context: 'Scratch/cache es para temporales pesados. Conviene separarlo para que Remotion/webpack/renders no llenen el disco principal.',
    label: 'Carpeta scratch/cache (recomendado disco con espacio)',
    defaultValue: '',
  },
  {
    key: 'captions',
    section: '4) Criterios creativos',
    context: 'Definimos cómo manejar subtítulos/transcripción. Esto se guarda para que el agente no improvise cada vez.',
    label: 'Subtítulos/transcripción: Whisper, manual, selectivos, ninguno',
    defaultValue: 'Whisper + revisión manual',
  },
  {
    key: 'visualStyle',
    section: '4) Criterios creativos',
    context: 'El estilo visual queda escrito en la configuración y en las reglas del agente para mantener consistencia.',
    label: 'Estilo visual',
    defaultValue: 'sobrio, premium, mobile-first',
  },
  {
    key: 'agentTarget',
    section: '5) Agentes IA y Graphify',
    context: 'Elegimos para qué agente preparar reglas. Hermes usa AGENTS.md; Claude Code puede usar CLAUDE.md/hooks si Graphify está disponible.',
    label: 'Agente IA objetivo: Hermes, Claude Code, ambos, otro',
    defaultValue: 'Hermes + Claude Code',
  },
  {
    key: 'graphifyMode',
    section: '5) Agentes IA y Graphify',
    context: 'Graphify crea un mapa del proyecto para que el agente entienda archivos y relaciones antes de tocar código. Recomendado: instalar+indexar.',
    label: 'Graphify: instalar+indexar, configurar, saltear',
    defaultValue: 'instalar+indexar',
  },
  {
    key: 'cleanupPolicy',
    section: '6) Higiene de disco',
    context: 'Definimos cómo revisar cachés y temporales sin tocar recursos, videos finales ni el proyecto principal. El comando base solo muestra candidatos; aplicar cambios requiere una acción explícita.',
    label: 'Gestión de caché/temporales: frecuencia o criterio de revisión',
    defaultValue: 'revisión semanal de caché y temporales, aplicar solo con confirmación',
  },
  {
    key: 'createRemotion',
    section: '7) Acciones finales',
    context: 'Si elegís yes, el wizard intenta crear un proyecto Remotion con npx create-video. Puede abrir preguntas propias; elegí una plantilla simple/minimal.',
    label: '¿Crear proyecto Remotion ahora? yes/no',
    defaultValue: 'yes',
  },
  {
    key: 'startStudio',
    section: '7) Acciones finales',
    context: 'Si elegís yes, el wizard te deja indicado cómo abrir Remotion Studio para revisar preview local.',
    label: '¿Levantar Remotion Studio al final? yes/no',
    defaultValue: 'no',
  },
];

if (process.argv.includes('--questions-only')) {
  let lastSection = '';
  questions.slice(0, 15).forEach((q, i) => {
    if (q.section !== lastSection) {
      lastSection = q.section;
      console.log(`\n${q.section}`);
    }
    console.log(`${i+1}. ${q.label} [default: ${displayDefault(q.defaultValue)}]`);
    console.log(`   Para qué sirve: ${q.context}`);
  });
  process.exit(0);
}

function has(cmd, args=['--version']) {
  try { execFileSync(`${cmd} ${args.join(' ')}`, {stdio:'ignore', shell:true}); return true; } catch { return false; }
}
function run(cmd, args, cwd) {
  console.log(`\n$ ${cmd} ${args.join(' ')}`);
  return spawnSync(cmd, args, {cwd, stdio:'inherit', shell: process.platform === 'win32'});
}
function mkdir(p) { fs.mkdirSync(p, {recursive:true}); }
function write(p, content) { mkdir(path.dirname(p)); fs.writeFileSync(p, content, 'utf8'); }
function normalizeUserPath(value) {
  if (!value) return value;
  // Git Bash/MSYS users often paste /c/Users/... paths. Node on Windows would
  // otherwise resolve that as C:\c\Users\..., so convert it to C:/Users/...
  if (process.platform === 'win32') {
    const match = value.match(/^\/([a-zA-Z])\/(.*)$/);
    if (match) return `${match[1].toUpperCase()}:/${match[2]}`;
  }
  return value;
}

function displayDefault(value) {
  return value || 'crear automático';
}

function installGraphifyIfNeeded() {
  if (has('graphify')) return true;

  console.log('\nGraphify no está instalado. Intentando instalar paquete Python: graphifyy');

  if (has('uv', ['--version'])) {
    const uvRes = run('uv', ['tool', 'install', 'graphifyy'], process.cwd());
    if (uvRes.status === 0 && has('graphify')) return true;
  }

  const pythonCmd = has('python') ? 'python' : (has('python3') ? 'python3' : null);
  if (!pythonCmd) {
    console.log('No encontré Python. Instalá Python 3.10+ y después corré: pip install graphifyy');
    return false;
  }

  const pipRes = run(pythonCmd, ['-m', 'pip', 'install', '--user', 'graphifyy'], process.cwd());
  if (pipRes.status !== 0) {
    console.log('No pude instalar Graphify automáticamente. Probá manualmente: pip install graphifyy');
    return false;
  }

  if (!has('graphify')) {
    console.log('Graphify se instaló, pero el comando todavía no está en PATH. Cerrá/abrí la terminal o agregá Scripts/bin al PATH y corré npm run setup de nuevo.');
    return false;
  }

  return true;
}

async function main() {
  console.log('Remotion + Graphify Setup Wizard\n');
  console.log('Dependency check:');
  for (const [cmd, required] of [['node',true], ['npm',true], ['git',true], ['python',false], ['ffmpeg',false], ['graphify',false]]) {
    console.log(`${has(cmd) ? '✓' : (required ? '✗' : '○')} ${cmd}${required ? ' (required)' : ' (optional)'}`);
  }

  const piped = process.stdin.isTTY ? null : fs.readFileSync(0, 'utf8').split(/\r?\n/);
  const rl = piped ? null : readline.createInterface({ input, output });
  const answers = {};
  let idx = 0;
  let lastSection = '';
  for (const question of questions) {
    const { key, label, defaultValue, context, section } = question;
    let value;
    if (section !== lastSection) {
      lastSection = section;
      console.log(`\n${section}`);
    }
    console.log(`Para qué sirve: ${context}`);
    if (piped) {
      value = piped[idx++] ?? '';
      console.log(`${label} [${displayDefault(defaultValue)}]: ${value}`);
    } else {
      value = await rl.question(`${label} [${displayDefault(defaultValue)}]: `);
    }
    answers[key] = value.trim() || defaultValue;
  }
  if (rl) rl.close();

  const workspace = path.resolve(normalizeUserPath(answers.rootDir));
  const folders = {
    inbox: normalizeUserPath(answers.inboxFolder) || path.join(workspace, 'Inbox'),
    resources: normalizeUserPath(answers.assetsFolder) || path.join(workspace, 'Recursos'),
    heavyAssets: path.join(workspace, 'Assets Pesados'),
    remotion: path.join(workspace, 'Remotion'),
    publications: path.join(workspace, 'Publicaciones'),
    finals: normalizeUserPath(answers.finalsFolder) || path.join(workspace, 'Videos Finales'),
    oldRenders: path.join(workspace, 'Renders Viejos'),
    backups: path.join(workspace, 'Backups'),
    scratch: normalizeUserPath(answers.scratchFolder) || path.join(workspace, 'Scratch'),
  };
  Object.values(folders).forEach(mkdir);

  const config = {
    projectName: answers.projectName,
    createdAt: new Date().toISOString(),
    useCase: answers.useCase,
    aspectRatio: answers.aspectRatio,
    duration: answers.duration,
    sourceMaterial: answers.sourceMaterial,
    captions: answers.captions,
    visualStyle: answers.visualStyle,
    agentTarget: answers.agentTarget,
    graphifyMode: answers.graphifyMode,
    cleanupPolicy: answers.cleanupPolicy,
    paths: folders,
  };
  write(path.join(workspace, 'remotion-system.config.json'), JSON.stringify(config, null, 2));
  write(path.join(workspace, 'AGENTS.md'), `# ${answers.projectName} — Remotion + Graphify Workspace\n\n## Purpose\n${answers.useCase}\n\n## Graphify first\nIf graphify-out/graph.json exists, query Graphify before reading raw files:\n\n- graphify query "what is the structure of this project?"\n- graphify explain "Remotion"\n- graphify path "composition" "render"\n\n## Preview rule\nDo not claim a video edit is ready without a local preview or rendered draft. Use npm run dev inside the Remotion project.\n\n## Folder contract\n${Object.entries(folders).map(([k,v]) => `- ${k}: ${v}`).join('\n')}\n\n## Cache hygiene\nScratch/cache path: ${folders.scratch}\nCleanup policy: ${answers.cleanupPolicy}\n`);
  write(path.join(workspace, 'README.md'), `# ${answers.projectName}\n\nGenerated by remotion-graphify-setup-wizard.\n\n- Use case: ${answers.useCase}\n- Aspect ratio: ${answers.aspectRatio}\n- Captions: ${answers.captions}\n- Style: ${answers.visualStyle}\n\nStart Remotion Studio from the Remotion project folder with:\n\n\`\`\`bash\nnpm run dev\n\`\`\`\n`);

  if (/^y/i.test(answers.createRemotion)) {
    mkdir(folders.remotion);
    const projectDir = path.join(folders.remotion, answers.projectName.replace(/[^a-z0-9_-]+/gi, '-').toLowerCase());
    if (!fs.existsSync(projectDir)) {
      console.log('\nCreating Remotion project. If create-video asks questions, choose a minimal/blank template.');
      const res = run('npx', ['create-video@latest', projectDir], workspace);
      if (res.status !== 0) console.log('Remotion creation did not complete automatically. Run manually: npx create-video@latest "' + projectDir + '"');
    }
  }

  if (/instalar|indexar|configurar/i.test(answers.graphifyMode)) {
    const graphifyReady = /instalar|indexar/i.test(answers.graphifyMode) ? installGraphifyIfNeeded() : has('graphify');
    if (graphifyReady) {
      run('graphify', ['hermes', 'install'], workspace);
      run('graphify', ['claude', 'install'], workspace);
      if (/indexar/i.test(answers.graphifyMode)) run('graphify', ['.'], workspace);
    } else {
      console.log('Graphify quedó pendiente. El workspace se creó igual; instalá Graphify y luego corré desde el workspace: graphify hermes install && graphify claude install');
    }
  }

  console.log('\nDone. Workspace created at: ' + workspace);
  console.log('Config: ' + path.join(workspace, 'remotion-system.config.json'));
  if (/^y/i.test(answers.startStudio)) console.log('Start Studio inside the Remotion project with: npm run dev');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
