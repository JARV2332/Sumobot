/* SumoBot Academy — contenido pedagógico (ABR + rúbrica) */
const GAME_DATA = {
  colors: [
    { id: "teal", hex: "#1a8f6e", emoji: "🟩" },
    { id: "orange", hex: "#ff8a3d", emoji: "🟧" },
    { id: "gold", hex: "#ffd23f", emoji: "🟨" },
    { id: "sky", hex: "#3aa0e8", emoji: "🟦" },
    { id: "rose", hex: "#e85d75", emoji: "🟥" },
    { id: "violet", hex: "#7b6cf6", emoji: "🟪" }
  ],

  rubric: [
    {
      title: "1. Innovación y creatividad",
      pts: 15,
      tip: "Tu SumoBot resuelve un problema real de forma creativa (no solo copia un ejemplo)."
    },
    {
      title: "2. Automatización",
      pts: 20,
      tip: "Sensores + actuadores + código que funciona solo, sin tocar el robot a cada rato."
    },
    {
      title: "3. Funcionamiento técnico",
      pts: 20,
      tip: "En la demo el robot debe funcionar completo, con pocas o ninguna falla."
    },
    {
      title: "4. Presentación oral (3 min)",
      pts: 15,
      tip: "Explica objetivo, proceso, funcionamiento y lo que aprendiste."
    },
    {
      title: "5. Resolución de problemas",
      pts: 20,
      tip: "Deja claro qué problema resuelves y por qué sirve en tu comunidad."
    },
    {
      title: "6. Trabajo y preparación previa",
      pts: 10,
      tip: "Se nota constancia: diseño, pruebas y mejoras a lo largo del tiempo."
    },
    {
      title: "7. Materiales electrónicos y reciclados",
      pts: 20,
      tip: "Usa electrónica y, si puedes, materiales reciclados. ¡Proyecto hecho por ustedes!"
    }
  ],

  parts: {
    plan: { id: "plan", name: "Plan de misión", icon: "🗺️", desc: "Tu idea y ciclo de vida del proyecto." },
    arduino: { id: "arduino", name: "Arduino", icon: "🧠", desc: "El cerebro base del robot." },
    wemos: { id: "wemos", name: "Wemos", icon: "📡", desc: "Módulo inteligente con WiFi." },
    blocks: { id: "blocks", name: "Programa en bloques", icon: "🧩", desc: "Lógica visual que mueve al robot." },
    code: { id: "code", name: "Código autónomo", icon: "💻", desc: "Automatización con sensores." },
    chassis: { id: "chassis", name: "Chasis 3D", icon: "📐", desc: "Cuerpo diseñado en Tinkercad." },
    print: { id: "print", name: "Piezas impresas", icon: "🖨️", desc: "Partes listas desde la impresora." }
  },

  worlds: [
    {
      id: "ideas",
      order: 1,
      title: "Taller de Ideas",
      short: "Desarrollo del proyecto",
      icon: "💡",
      color: "#ffd23f",
      story: "Antes de cablear, ¡piensa! En este mundo aprendes a imaginar tu SumoBot y a seguir el ciclo de vida de un proyecto real.",
      partId: "plan",
      unlockAfter: null,
      lessons: [
        {
          id: "lluvia",
          title: "Lluvia de ideas",
          icon: "🌧️",
          visual: `
            <div class="viz viz-brainstorm">
              <div class="viz-title">Equipo inventando</div>
              <div class="bubble-row">
                <div class="bubble">Problema rural?</div>
                <div class="bubble">Sensores?</div>
                <div class="bubble">Chasis?</div>
              </div>
              <div class="viz-board">
                <span>💡</span><span>📝</span><span>🤝</span>
              </div>
              <p class="viz-caption">Anota todas las ideas · luego elige 1 reto</p>
            </div>`,
          body: `
            <h3>¿Qué es una lluvia de ideas?</h3>
            <p>Es cuando el equipo dice muchas ideas sin criticarlas al inicio. Luego eligen las mejores.</p>
            <div class="data-grid">
              <div class="data-card"><b>Quién</b><span>3–4 integrantes</span></div>
              <div class="data-card"><b>Tiempo</b><span>10–15 min</span></div>
              <div class="data-card"><b>Salida</b><span>1 problema + 1 idea de robot</span></div>
            </div>
            <ul>
              <li>¿Para qué sirve un SumoBot en tu comunidad?</li>
              <li>¿Qué sensores necesita? (distancia, línea, luz…)</li>
              <li>¿Cómo se verá su chasis?</li>
            </ul>
            <div class="tip-box">🎯 Tip ABR: el reto no es “hacer un robot”, es resolver un desafío con tecnología.</div>
          `
        },
        {
          id: "ciclo",
          title: "Ciclo de vida del proyecto",
          icon: "🔄",
          visual: `
            <div class="viz viz-cycle">
              <div class="cycle-step"><i>1</i>Idear</div>
              <div class="cycle-arrow">→</div>
              <div class="cycle-step"><i>2</i>Diseñar</div>
              <div class="cycle-arrow">→</div>
              <div class="cycle-step"><i>3</i>Construir</div>
              <div class="cycle-arrow">→</div>
              <div class="cycle-step"><i>4</i>Programar</div>
              <div class="cycle-arrow">→</div>
              <div class="cycle-step"><i>5</i>Probar</div>
            </div>`,
          body: `
            <h3>Los 5 pasos del inventor/a</h3>
            <p>Así se organiza un proyecto real. Cada mundo del juego sigue este ciclo.</p>
            <div class="data-grid">
              <div class="data-card"><b>1 Idear</b><span>Problema + lluvia de ideas</span></div>
              <div class="data-card"><b>2 Diseñar</b><span>Croquis y chasis</span></div>
              <div class="data-card"><b>3 Construir</b><span>Electrónica + 3D</span></div>
              <div class="data-card"><b>4 Programar</b><span>Bloques y código</span></div>
              <div class="data-card"><b>5 Probar</b><span>Fallar y mejorar</span></div>
            </div>
            <div class="tip-box">📋 La rúbrica premia innovación, automatización y que el proyecto funcione en la demo.</div>
          `
        }
      ],
      challenge: {
        title: "Reto: Ordena el ciclo",
        type: "sort",
        prompt: "Ordena los pasos del ciclo de vida del proyecto (del primero al último).",
        items: [
          { id: "a", text: "Idear el problema y la solución" },
          { id: "b", text: "Diseñar el chasis y las partes" },
          { id: "c", text: "Construir e imprimir" },
          { id: "d", text: "Programar el robot" },
          { id: "e", text: "Probar, fallar y mejorar" }
        ],
        answer: ["a", "b", "c", "d", "e"]
      }
    },
    {
      id: "arduino",
      order: 2,
      title: "Mundo Arduino",
      short: "Electrónica · Arduino",
      icon: "🔌",
      color: "#1a8f6e",
      story: "Arduino es una placa pequeña que entiende instrucciones y controla motores, luces y sensores. ¡Es el cerebro clásico del SumoBot!",
      partId: "arduino",
      unlockAfter: "ideas",
      lessons: [
        {
          id: "que-arduino",
          title: "¿Qué es Arduino?",
          icon: "🧠",
          visual: `
            <div class="viz viz-board-arduino" aria-label="Diagrama de Arduino">
              <div class="board-chip">UNO</div>
              <div class="board-usb">USB</div>
              <div class="pins left">
                <span>D2</span><span>D3</span><span>D4</span><span>D5</span>
              </div>
              <div class="pins right">
                <span>5V</span><span>GND</span><span>A0</span><span>A1</span>
              </div>
              <div class="board-label">Arduino = cerebro del SumoBot</div>
            </div>`,
          body: `
            <h3>Arduino = cerebro electrónico</h3>
            <p>Es una placa con un microcontrolador. Tú le escribes un programa y él mueve motores o lee sensores.</p>
            <div class="data-grid">
              <div class="data-card"><b>Qué coloca</b><span>Placa Arduino UNO (o similar)</span></div>
              <div class="data-card"><b>Dónde</b><span>Sobre el chasis, bien sujeta</span></div>
              <div class="data-card"><b>Conecta a</b><span>Driver de motores + sensores</span></div>
              <div class="data-card"><b>Alimentación</b><span>USB o batería (con cuidado)</span></div>
            </div>
            <ul>
              <li><b>Pines digitales:</b> ON/OFF (LEDs, botones).</li>
              <li><b>Pines analógicos:</b> valores (sensores).</li>
              <li><b>USB:</b> para cargar el programa desde la PC.</li>
            </ul>
            <div class="tip-box">⚡ Nunca conectes motores potentes directo a la placa sin driver o fuente adecuada.</div>
          `
        },
        {
          id: "partes-placa",
          title: "Partes importantes",
          icon: "🧰",
          visual: `
            <div class="viz viz-labels">
              <div class="label-row"><span class="dot teal"></span><b>USB</b> — cargar programa</div>
              <div class="label-row"><span class="dot gold"></span><b>Chip</b> — cerebro</div>
              <div class="label-row"><span class="dot orange"></span><b>GND / 5V</b> — energía</div>
              <div class="label-row"><span class="dot sky"></span><b>Reset</b> — reiniciar</div>
              <div class="label-row"><span class="dot rose"></span><b>LED</b> — indicador ON</div>
            </div>`,
          body: `
            <h3>Anatomía rápida</h3>
            <p>Antes de cablear, identifica cada parte en la imagen y en tu placa real.</p>
            <div class="data-grid">
              <div class="data-card"><b>Chip</b><span>Ejecuta tu código</span></div>
              <div class="data-card"><b>GND</b><span>Tierra / negativo común</span></div>
              <div class="data-card"><b>5V</b><span>Alimenta sensores pequeños</span></div>
              <div class="data-card"><b>Reset</b><span>Reinicia el programa</span></div>
            </div>
            <div class="tip-box">🤝 Habilidad social: en equipo, uno cablea y otro revisa el diagrama.</div>
          `
        }
      ],
      challenge: {
        title: "Reto: ¿Para qué sirve?",
        type: "quiz",
        questions: [
          {
            q: "¿Qué hace Arduino en un SumoBot?",
            options: [
              "Solo decora el robot",
              "Ejecuta el programa y controla sensores/motores",
              "Imprime las piezas 3D",
              "Corta el filamento"
            ],
            answer: 1
          },
          {
            q: "¿Por qué no conectar un motor grande directo a Arduino?",
            options: [
              "Porque se ve feo",
              "Porque puede dañar la placa: necesita driver/fuente",
              "Porque Arduino no tiene USB",
              "Porque los motores no existen"
            ],
            answer: 1
          },
          {
            q: "¿Qué pin usas para tierra (negativo común)?",
            options: ["5V", "GND", "A0", "RESET"],
            answer: 1
          }
        ]
      }
    },
    {
      id: "wemos",
      order: 3,
      title: "Ciudad Wemos",
      short: "Electrónica · Wemos",
      icon: "📡",
      color: "#3aa0e8",
      story: "Wemos (ESP8266) es una placa chiquita con WiFi. Puede hacer lo de un microcontrolador y además conectarse a la red.",
      partId: "wemos",
      unlockAfter: "arduino",
      lessons: [
        {
          id: "que-wemos",
          title: "¿Qué es Wemos?",
          icon: "📶",
          visual: `
            <div class="viz viz-wemos">
              <div class="wemos-board">
                <div class="wifi-waves">))) WiFi</div>
                <div class="wemos-chip">ESP8266</div>
                <div class="wemos-pins">3.3V · GND · D1 · D2</div>
              </div>
              <p class="viz-caption">Más pequeña que Arduino · con antena WiFi</p>
            </div>`,
          body: `
            <h3>Wemos D1 Mini y familia</h3>
            <p>Placa basada en ESP8266. Ideal para controlar o monitorear el robot por WiFi.</p>
            <div class="data-grid">
              <div class="data-card"><b>Qué coloca</b><span>Wemos D1 Mini</span></div>
              <div class="data-card"><b>Voltaje</b><span>3.3V (¡no 5V en pines!)</span></div>
              <div class="data-card"><b>Extra</b><span>WiFi integrado</span></div>
              <div class="data-card"><b>Programa</b><span>IDE de Arduino / similar</span></div>
            </div>
            <div class="tip-box">⚠️ Wemos trabaja a 3.3V. No le metas 5V a los pines de señal.</div>
          `
        },
        {
          id: "arduino-vs-wemos",
          title: "Arduino vs Wemos",
          icon: "⚖️",
          visual: `
            <div class="viz viz-compare">
              <div class="cmp-card">
                <div class="cmp-ico">🔌</div>
                <b>Arduino</b>
                <span>Aprender · muchos pines</span>
                <span>Sin WiFi de fábrica</span>
              </div>
              <div class="cmp-vs">VS</div>
              <div class="cmp-card">
                <div class="cmp-ico">📡</div>
                <b>Wemos</b>
                <span>Chiquita · con WiFi</span>
                <span>3.3V · IoT</span>
              </div>
            </div>`,
          body: `
            <h3>¿Cuál elijo?</h3>
            <div class="data-grid">
              <div class="data-card"><b>Taller escolar</b><span>Arduino + driver de motores</span></div>
              <div class="data-card"><b>Conectar a red</b><span>Wemos / ESP</span></div>
              <div class="data-card"><b>Sumo básico</b><span>Arduino suele bastar</span></div>
              <div class="data-card"><b>Proyecto IoT</b><span>Wemos suma control remoto</span></div>
            </div>
            <div class="tip-box">🏅 En SumoBot escolar suele usarse Arduino; Wemos suma conectividad.</div>
          `
        }
      ],
      challenge: {
        title: "Reto: Empareja placas",
        type: "match",
        prompt: "Toca una tarjeta y luego su pareja.",
        pairs: [
          { a: "Arduino", b: "Cerebro clásico sin WiFi" },
          { a: "Wemos", b: "Placa con WiFi (ESP8266)" },
          { a: "3.3V", b: "Voltaje típico de Wemos" },
          { a: "USB", b: "Sirve para cargar el programa" }
        ]
      }
    },
    {
      id: "blocks",
      order: 4,
      title: "Valle de Bloques",
      short: "Programación · Bloques",
      icon: "🧩",
      color: "#ff8a3d",
      story: "La programación por bloques te deja armar la lógica como si fueran piezas de LEGO: si detecta enemigo → avanzar y empujar.",
      partId: "blocks",
      unlockAfter: "wemos",
      lessons: [
        {
          id: "bloques",
          title: "Programar con bloques",
          icon: "🧱",
          visual: `
            <div class="viz viz-blocks">
              <div class="code-block event">al iniciar</div>
              <div class="code-block control">si distancia &lt; 20</div>
              <div class="code-block action">motores ADELANTE</div>
              <div class="code-block action alt">si no → GIRAR</div>
            </div>`,
          body: `
            <h3>Lógica visual</h3>
            <p>En mBlock, Scratch o MakeCode juntas bloques como LEGO.</p>
            <div class="data-grid">
              <div class="data-card"><b>Eventos</b><span>Al iniciar / al recibir</span></div>
              <div class="data-card"><b>Control</b><span>Si / entonces / repetir</span></div>
              <div class="data-card"><b>Actuadores</b><span>Motor izq. y der.</span></div>
              <div class="data-card"><b>Sensores</b><span>Distancia, línea, luz</span></div>
            </div>
            <div class="tip-box">🎮 Idea Sumo: SI sensor ve algo CERCA → ambos motores ADELANTE.</div>
          `
        },
        {
          id: "algoritmo",
          title: "Algoritmo del sumo",
          icon: "📜",
          visual: `
            <div class="viz viz-flow">
              <div class="flow-node">Buscar (girar)</div>
              <div class="flow-arrow">↓</div>
              <div class="flow-node">¿Hay rival?</div>
              <div class="flow-split">
                <div class="flow-node ok">Sí → Atacar</div>
                <div class="flow-node">No → Seguir buscando</div>
              </div>
              <div class="flow-arrow">↓</div>
              <div class="flow-node warn">¿Borde? → Retroceder</div>
            </div>`,
          body: `
            <h3>Receta básica de combate</h3>
            <div class="data-grid">
              <div class="data-card"><b>Buscar</b><span>Girar despacio</span></div>
              <div class="data-card"><b>Detectar</b><span>Sensor de distancia</span></div>
              <div class="data-card"><b>Atacar</b><span>Avanzar fuerte</span></div>
              <div class="data-card"><b>Borde</b><span>Sensor de línea</span></div>
            </div>
            <div class="tip-box">🤝 Una persona diseña el algoritmo en papel y otra lo arma en bloques.</div>
          `
        }
      ],
      challenge: {
        title: "Reto: Arma la lógica",
        type: "quiz",
        questions: [
          {
            q: "Si el sensor de distancia detecta al rival cerca, ¿qué debe hacer el SumoBot?",
            options: ["Apagarse", "Avanzar para empujar", "Imprimir una pieza", "Abrir Tinkercad"],
            answer: 1
          },
          {
            q: "¿Para qué sirve un bloque “repetir para siempre”?",
            options: [
              "Para que el robot revise sensores sin parar",
              "Para apagar la impresora",
              "Para diseñar el chasis",
              "Para cargar filamento"
            ],
            answer: 0
          },
          {
            q: "¿Qué bloque usas para una decisión?",
            options: ["Motor", "Si / entonces", "USB", "GND"],
            answer: 1
          }
        ]
      }
    },
    {
      id: "code",
      order: 5,
      title: "Torre del Código",
      short: "Programación · Código",
      icon: "💻",
      color: "#7b6cf6",
      story: "Los bloques se convierten en código. Aquí entiendes setup(), loop() y cómo automatizar de verdad (¡puntos de la rúbrica!).",
      partId: "code",
      unlockAfter: "blocks",
      lessons: [
        {
          id: "setup-loop",
          title: "setup y loop",
          icon: "🔁",
          visual: `
            <div class="viz viz-code">
              <pre>void setup() {
  // se ejecuta 1 vez
  pinMode(motor, OUTPUT);
}

void loop() {
  // se repite siempre
  leerSensor();
  moverMotores();
}</pre>
            </div>`,
          body: `
            <h3>Dos funciones mágicas</h3>
            <div class="data-grid">
              <div class="data-card"><b>setup()</b><span>Configura pines una vez</span></div>
              <div class="data-card"><b>loop()</b><span>Lee y actúa sin parar</span></div>
              <div class="data-card"><b>Rúbrica</b><span>Automatización = 20 pts</span></div>
              <div class="data-card"><b>Meta</b><span>Robot que decide solo</span></div>
            </div>
            <div class="tip-box">🧠 Automatización: el robot decide solo con sensores.</div>
          `
        },
        {
          id: "sensores",
          title: "Sensores y autonomía",
          icon: "👁️",
          visual: `
            <div class="viz viz-sensors">
              <div class="sumo-mini">
                <div class="eye">📡 Ultrasónico</div>
                <div class="body-mini">🤖</div>
                <div class="line-s">⬛ Sensor línea</div>
                <div class="wheels-mini">⚙️ Driver + motores</div>
              </div>
            </div>`,
          body: `
            <h3>Ojos y cerebro</h3>
            <p>Un SumoBot autónomo no usa joystick: lee el mundo y actúa.</p>
            <div class="data-grid">
              <div class="data-card"><b>Ultrasónico / IR</b><span>Detectar rival</span></div>
              <div class="data-card"><b>Sensor de línea</b><span>No caer del dohyo</span></div>
              <div class="data-card"><b>Driver (L298N)</b><span>Potencia los motores</span></div>
              <div class="data-card"><b>Depurar</b><span>Cable → power → código</span></div>
            </div>
            <div class="tip-box">🛠️ Si no se mueve: revisa alimentación, cables, driver y código.</div>
          `
        }
      ],
      challenge: {
        title: "Reto: Código mental",
        type: "quiz",
        questions: [
          {
            q: "¿Dónde pones el código que se repite siempre?",
            options: ["setup()", "loop()", "Tinkercad", "Cura"],
            answer: 1
          },
          {
            q: "¿Qué criterio de la rúbrica premia sensores + código autónomo?",
            options: ["Presentación oral", "Automatización", "Materiales reciclados", "Solo el color del robot"],
            answer: 1
          },
          {
            q: "Si el robot no se mueve, ¿qué revisas primero?",
            options: [
              "Solo el color del filamento",
              "Alimentación, cables, driver y código",
              "Borrar el chasis",
              "Cambiar de escuela"
            ],
            answer: 1
          }
        ]
      }
    },
    {
      id: "design",
      order: 6,
      title: "Forja 3D",
      short: "Diseño 3D · Tinkercad & Slicer",
      icon: "📐",
      color: "#e85d75",
      story: "Diseñas el cuerpo del robot en Tinkercad y lo preparas para imprimir con un slicer (Cura u Orca).",
      partId: "chassis",
      unlockAfter: "code",
      lessons: [
        {
          id: "tinkercad",
          title: "Tinkercad",
          icon: "🟦",
          visual: `
            <div class="viz viz-tinker">
              <div class="tinker-workspace">
                <div class="shape cube"></div>
                <div class="shape cyl"></div>
                <div class="shape hole"></div>
              </div>
              <p class="viz-caption">Arrastra formas → une → exporta STL</p>
            </div>`,
          body: `
            <h3>Diseño en el navegador</h3>
            <p>Creas el chasis con cubos, cilindros y agujeros.</p>
            <div class="data-grid">
              <div class="data-card"><b>Herramienta</b><span>Tinkercad (web)</span></div>
              <div class="data-card"><b>Diseña</b><span>Base + soportes de motor</span></div>
              <div class="data-card"><b>Huecos</b><span>Tornillos, cables, placa</span></div>
              <div class="data-card"><b>Exporta</b><span>Archivo .STL</span></div>
            </div>
            <div class="tip-box">✏️ Empieza simple: base + soportes. Luego embellece.</div>
          `
        },
        {
          id: "slicer",
          title: "Slicer: Cura y Orca",
          icon: "🥪",
          visual: `
            <div class="viz viz-slicer">
              <div class="slice-stack">
                <div class="slice"></div><div class="slice"></div>
                <div class="slice"></div><div class="slice"></div>
                <div class="slice"></div>
              </div>
              <div class="slice-labels">
                <span>STL</span><span>→</span><span>Capas</span><span>→</span><span>G-code</span>
              </div>
            </div>`,
          body: `
            <h3>Del STL a la impresora</h3>
            <p>El slicer “rebanada” el modelo y crea el G-code.</p>
            <div class="data-grid">
              <div class="data-card"><b>Cura</b><span>Fácil para empezar</span></div>
              <div class="data-card"><b>Orca</b><span>Más opciones de calidad</span></div>
              <div class="data-card"><b>Capa</b><span>Altura 0.2 mm típica</span></div>
              <div class="data-card"><b>Relleno</b><span>15–30% suele bastar</span></div>
            </div>
            <div class="tip-box">🌡️ Si no pega a la cama: limpia, sube temp o usa brim.</div>
          `
        }
      ],
      challenge: {
        title: "Reto: Del diseño a la rebanada",
        type: "sort",
        prompt: "Ordena el flujo correcto del diseño 3D.",
        items: [
          { id: "a", text: "Diseñar el chasis en Tinkercad" },
          { id: "b", text: "Exportar archivo STL" },
          { id: "c", text: "Abrir el STL en Cura u Orca" },
          { id: "d", text: "Configurar capas, relleno y soportes" },
          { id: "e", text: "Generar G-code para la impresora" }
        ],
        answer: ["a", "b", "c", "d", "e"]
      }
    },
    {
      id: "print",
      order: 7,
      title: "Fábrica de Impresión",
      short: "Impresión 3D",
      icon: "🖨️",
      color: "#c4783a",
      story: "Aquí conoces la impresora, sus partes, la calibración y los pasos seguros para sacar tu pieza.",
      partId: "print",
      unlockAfter: "design",
      lessons: [
        {
          id: "partes-impresora",
          title: "Partes de la impresora",
          icon: "🔩",
          visual: `
            <div class="viz viz-printer">
              <div class="printer">
                <div class="p-frame"></div>
                <div class="p-head" title="Hotend">🔥</div>
                <div class="p-bed" title="Cama">CAMA</div>
                <div class="p-spool">Filamento</div>
              </div>
              <div class="printer-keys">
                <span>Hotend</span><span>Cama</span><span>Ejes XYZ</span>
              </div>
            </div>`,
          body: `
            <h3>Máquina de capas</h3>
            <div class="data-grid">
              <div class="data-card"><b>Hotend</b><span>Derrite el filamento</span></div>
              <div class="data-card"><b>Cama</b><span>Donde nace la pieza</span></div>
              <div class="data-card"><b>Ejes X Y Z</b><span>Movimiento</span></div>
              <div class="data-card"><b>Pantalla</b><span>Control / G-code</span></div>
            </div>
            <div class="tip-box">✋ Nunca toques el hotend caliente. Seguridad primero.</div>
          `
        },
        {
          id: "calibracion",
          title: "Calibración y pasos",
          icon: "📏",
          visual: `
            <div class="viz viz-checklist">
              <div class="check-item">1 Nivelar cama (papel)</div>
              <div class="check-item">2 Cargar PLA</div>
              <div class="check-item">3 Cargar G-code</div>
              <div class="check-item">4 Vigilar 1.ªs capas</div>
              <div class="check-item">5 Enfriar y retirar</div>
            </div>`,
          body: `
            <h3>Checklist de impresión</h3>
            <div class="data-grid">
              <div class="data-card"><b>Filamento</b><span>PLA (amigo del aula)</span></div>
              <div class="data-card"><b>Nivelado</b><span>Papel: ligera fricción</span></div>
              <div class="data-card"><b>Rural tip</b><span>Imprime lo esencial</span></div>
              <div class="data-card"><b>Recicla</b><span>Reutiliza cuando puedas</span></div>
            </div>
            <div class="tip-box">🌱 Imprime soportes de motor y cuñas; combina con materiales reciclados.</div>
          `
        }
      ],
      challenge: {
        title: "Reto: Pasos de impresión",
        type: "sort",
        prompt: "Ordena los pasos seguros para imprimir.",
        items: [
          { id: "a", text: "Calibrar / nivelar la cama" },
          { id: "b", text: "Cargar el filamento" },
          { id: "c", text: "Enviar el G-code e iniciar" },
          { id: "d", text: "Vigilar las primeras capas" },
          { id: "e", text: "Dejar enfriar y retirar la pieza" }
        ],
        answer: ["a", "b", "c", "d", "e"]
      }
    }
  ]
};
