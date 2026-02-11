/* ============================================================
    2. LISTA COMPLETA DE DEPORTES CON INTENSIDAD CORRECTA
============================================================ */
export const SPORT_PROFILES = {
    gym: {
        intensity: { hobby: 1.2, trained: 1.38, elite: 1.62 },
        cardioRatio: 0.2,
        strengthRatio: 0.8,
        description: "Entrenamiento de fuerza e hipertrofia",
    },
    football: {
        intensity: { hobby: 1.4, trained: 1.55, elite: 1.75 },
        cardioRatio: 0.7,
        strengthRatio: 0.3,
        description: "Deporte intermitente de alta intensidad y agilidad",
    },
    basketball: {
        intensity: { hobby: 1.4, trained: 1.55, elite: 1.75 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Explosividad, saltos y resistencia anaeróbica",
    },
    crossfit: {
        intensity: { hobby: 1.5, trained: 1.65, elite: 1.85 },
        cardioRatio: 0.5,
        strengthRatio: 0.5,
        description: "Entrenamiento funcional de alta intensidad",
    },
    running: {
        intensity: { hobby: 1.3, trained: 1.45, elite: 1.65 },
        cardioRatio: 0.9,
        strengthRatio: 0.1,
        description: "Resistencia cardiovascular pura y fondo",
    },
    cycling: {
        intensity: { hobby: 1.3, trained: 1.45, elite: 1.65 },
        cardioRatio: 0.8,
        strengthRatio: 0.2,
        description: "Resistencia en tren inferior y potencia",
    },
    martial: {
        intensity: { hobby: 1.4, trained: 1.55, elite: 1.75 },
        cardioRatio: 0.5,
        strengthRatio: 0.5,
        description: "Coordinación, potencia explosiva y técnica",
    },
    swimming: {
        intensity: { hobby: 1.3, trained: 1.45, elite: 1.65 },
        cardioRatio: 0.8,
        strengthRatio: 0.2,
        description: "Resistencia de cuerpo completo y movilidad",
    },
    tennis: {
        intensity: { hobby: 1.3, trained: 1.45, elite: 1.65 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Agilidad lateral, potencia de golpeo y sprints",
    },
    yoga: {
        intensity: { hobby: 1.1, trained: 1.2, elite: 1.35 },
        cardioRatio: 0.2,
        strengthRatio: 0.3,
        description: "Flexibilidad, control mental y fuerza estática",
    },
    rugby: {
        intensity: { hobby: 1.5, trained: 1.7, elite: 1.9 },
        cardioRatio: 0.4,
        strengthRatio: 0.6,
        description: "Potencia, contacto y resistencia física extrema",
    },
    padel: {
        intensity: { hobby: 1.25, trained: 1.4, elite: 1.55 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Agilidad, reflejos y resistencia cardiovascular moderada",
    },
    /* ============================================================
        TEAM SPORTS
    ============================================================ */
    handball: {
        intensity: { hobby: 1.4, trained: 1.55, elite: 1.75 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Deporte rápido con potencia de brazo y saltos",
    },
    hockey: {
        intensity: { hobby: 1.45, trained: 1.6, elite: 1.8 },
        cardioRatio: 0.7,
        strengthRatio: 0.3,
        description: "Alta intensidad intermitente, agilidad y resistencia",
    },
    volley: {
        intensity: { hobby: 1.3, trained: 1.45, elite: 1.6 },
        cardioRatio: 0.4,
        strengthRatio: 0.6,
        description: "Explosividad vertical y reflejos rápidos",
    },
    waterpolo: {
        intensity: { hobby: 1.5, trained: 1.7, elite: 1.9 },
        cardioRatio: 0.8,
        strengthRatio: 0.2,
        description: "Resistencia extrema y fuerza en medio acuático",
    },
    baseball: {
        intensity: { hobby: 1.2, trained: 1.3, elite: 1.5 },
        cardioRatio: 0.3,
        strengthRatio: 0.7,
        description: "Potencia explosiva rotacional y sprints cortos",
    },
    softball: {
        intensity: { hobby: 1.2, trained: 1.3, elite: 1.5 },
        cardioRatio: 0.3,
        strengthRatio: 0.7,
        description: "Potencia explosiva y agilidad en campo",
    },
    lacrosse: {
        intensity: { hobby: 1.45, trained: 1.6, elite: 1.8 },
        cardioRatio: 0.7,
        strengthRatio: 0.3,
        description: "Contacto físico, velocidad y resistencia",
    },
    cricket: {
        intensity: { hobby: 1.2, trained: 1.35, elite: 1.55 },
        cardioRatio: 0.4,
        strengthRatio: 0.6,
        description: "Resistencia prolongada y ráfagas de potencia",
    },
    ultimate_frisbee: {
        intensity: { hobby: 1.4, trained: 1.55, elite: 1.75 },
        cardioRatio: 0.8,
        strengthRatio: 0.2,
        description: "Sprints constantes y resistencia cardiovascular",
    },
    /* ============================================================
        ENDURANCE
    ============================================================ */
    athletics: {
        intensity: { hobby: 1.4, trained: 1.6, elite: 1.8 },
        cardioRatio: 0.8,
        strengthRatio: 0.2,
        description: "Rendimiento en pista según distancia",
    },
    marathon: {
        intensity: { hobby: 1.5, trained: 1.75, elite: 2.0 },
        cardioRatio: 0.95,
        strengthRatio: 0.05,
        description: "Resistencia de ultra larga distancia",
    },
    triathlon: {
        intensity: { hobby: 1.5, trained: 1.75, elite: 2.0 },
        cardioRatio: 0.9,
        strengthRatio: 0.1,
        description: "Combinación de natación, ciclismo y running",
    },
    duathlon: {
        intensity: { hobby: 1.4, trained: 1.65, elite: 1.9 },
        cardioRatio: 0.9,
        strengthRatio: 0.1,
        description: "Carrera y ciclismo de alta resistencia",
    },
    rowing: {
        intensity: { hobby: 1.5, trained: 1.7, elite: 1.95 },
        cardioRatio: 0.7,
        strengthRatio: 0.3,
        description: "Potencia total y resistencia aeróbica",
    },
    kayak: {
        intensity: { hobby: 1.35, trained: 1.5, elite: 1.7 },
        cardioRatio: 0.7,
        strengthRatio: 0.3,
        description: "Resistencia en tren superior y estabilidad",
    },
    xc_skiing: {
        intensity: { hobby: 1.5, trained: 1.8, elite: 2.1 },
        cardioRatio: 0.95,
        strengthRatio: 0.05,
        description: "Uno de los deportes con mayor demanda aeróbica",
    },
    speed_skating: {
        intensity: { hobby: 1.45, trained: 1.65, elite: 1.9 },
        cardioRatio: 0.7,
        strengthRatio: 0.3,
        description: "Potencia de piernas y resistencia anaeróbica",
    },
    /* ============================================================
        STRENGTH
    ============================================================ */
    powerlifting: {
        intensity: { hobby: 1.2, trained: 1.35, elite: 1.55 },
        cardioRatio: 0.1,
        strengthRatio: 0.9,
        description: "Fuerza máxima en sentadilla, banca y peso muerto",
    },
    weightlifting: {
        intensity: { hobby: 1.3, trained: 1.5, elite: 1.7 },
        cardioRatio: 0.2,
        strengthRatio: 0.8,
        description: "Potencia olímpica, técnica y fuerza explosiva",
    },
    strongman: {
        intensity: { hobby: 1.4, trained: 1.6, elite: 1.85 },
        cardioRatio: 0.3,
        strengthRatio: 0.7,
        description: "Fuerza bruta y resistencia con cargas pesadas",
    },
    calisthenics: {
        intensity: { hobby: 1.25, trained: 1.4, elite: 1.6 },
        cardioRatio: 0.3,
        strengthRatio: 0.7,
        description: "Control corporal y fuerza con peso propio",
    },
    street_workout: {
        intensity: { hobby: 1.25, trained: 1.4, elite: 1.6 },
        cardioRatio: 0.3,
        strengthRatio: 0.7,
        description: "Fuerza relativa y habilidades dinámicas",
    },
    gymnastics: {
        intensity: { hobby: 1.4, trained: 1.6, elite: 1.85 },
        cardioRatio: 0.2,
        strengthRatio: 0.8,
        description: "Máxima fuerza relativa, flexibilidad y control",
    },
    /* ============================================================
        COMBAT
    ============================================================ */
    boxing: {
        intensity: { hobby: 1.5, trained: 1.7, elite: 2.0 },
        cardioRatio: 0.7,
        strengthRatio: 0.3,
        description: "Resistencia anaeróbica, velocidad y potencia",
    },
    kickboxing: {
        intensity: { hobby: 1.5, trained: 1.7, elite: 2.0 },
        cardioRatio: 0.7,
        strengthRatio: 0.3,
        description: "Alta demanda metabólica y golpeo integral",
    },
    muay_thai: {
        intensity: { hobby: 1.5, trained: 1.7, elite: 2.0 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Resistencia al impacto y potencia total",
    },
    mma: {
        intensity: { hobby: 1.5, trained: 1.75, elite: 2.1 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Combinación total de lucha y golpeo",
    },
    bjj: {
        intensity: { hobby: 1.4, trained: 1.6, elite: 1.85 },
        cardioRatio: 0.4,
        strengthRatio: 0.6,
        description: "Fuerza isométrica, técnica y lucha en suelo",
    },
    wrestling: {
        intensity: { hobby: 1.5, trained: 1.75, elite: 2.1 },
        cardioRatio: 0.5,
        strengthRatio: 0.5,
        description: "Fuerza bruta, explosividad y control",
    },
    judo: {
        intensity: { hobby: 1.4, trained: 1.6, elite: 1.85 },
        cardioRatio: 0.4,
        strengthRatio: 0.6,
        description: "Proyecciones, control y fuerza explosiva",
    },
    taekwondo: {
        intensity: { hobby: 1.35, trained: 1.5, elite: 1.7 },
        cardioRatio: 0.7,
        strengthRatio: 0.3,
        description: "Agilidad de piernas y reacción rápida",
    },
    karate: {
        intensity: { hobby: 1.35, trained: 1.5, elite: 1.7 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Técnica de golpeo, velocidad y precisión",
    },
    sambo: {
        intensity: { hobby: 1.5, trained: 1.75, elite: 2.1 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Lucha integral y proyecciones",
    },
    fencing: {
        intensity: { hobby: 1.25, trained: 1.4, elite: 1.6 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Velocidad de reacción, precisión y agilidad",
    },
    /* ============================================================
        TECHNICAL
    ============================================================ */
    squash: {
        intensity: { hobby: 1.45, trained: 1.65, elite: 1.9 },
        cardioRatio: 0.8,
        strengthRatio: 0.2,
        description: "Extrema agilidad y resistencia cardiovascular",
    },
    badminton: {
        intensity: { hobby: 1.3, trained: 1.5, elite: 1.7 },
        cardioRatio: 0.7,
        strengthRatio: 0.3,
        description: "Velocidad, saltos y reflejos rápidos",
    },
    ping_pong: {
        intensity: { hobby: 1.15, trained: 1.3, elite: 1.5 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Reflejos y coordinación ojo-mano",
    },
    golf: {
        intensity: { hobby: 1.1, trained: 1.2, elite: 1.35 },
        cardioRatio: 0.4,
        strengthRatio: 0.6,
        description: "Técnica rotacional y caminata prolongada",
    },
    shooting: {
        intensity: { hobby: 1.05, trained: 1.15, elite: 1.25 },
        cardioRatio: 0.1,
        strengthRatio: 0.9,
        description: "Control nervioso, estabilidad y precisión",
    },
    archery: {
        intensity: { hobby: 1.1, trained: 1.2, elite: 1.35 },
        cardioRatio: 0.1,
        strengthRatio: 0.9,
        description: "Fuerza estática en tren superior y foco",
    },
    bowling: {
        intensity: { hobby: 1.1, trained: 1.2, elite: 1.35 },
        cardioRatio: 0.2,
        strengthRatio: 0.8,
        description: "Técnica de lanzamiento y fuerza lumbar",
    },
    billiards: {
        intensity: { hobby: 1.05, trained: 1.15, elite: 1.25 },
        cardioRatio: 0.1,
        strengthRatio: 0.9,
        description: "Precisión geométrica y control motor fino",
    },
    /* ============================================================
        EXTREME
    ============================================================ */
    surf: {
        intensity: { hobby: 1.35, trained: 1.5, elite: 1.7 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Remada intensa, balance y fuerza explosiva",
    },
    kitesurf: {
        intensity: { hobby: 1.3, trained: 1.45, elite: 1.65 },
        cardioRatio: 0.5,
        strengthRatio: 0.5,
        description: "Core extremo y resistencia en piernas",
    },
    windsurf: {
        intensity: { hobby: 1.35, trained: 1.5, elite: 1.7 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Resistencia isométrica y equilibrio",
    },
    skateboarding: {
        intensity: { hobby: 1.25, trained: 1.4, elite: 1.6 },
        cardioRatio: 0.5,
        strengthRatio: 0.5,
        description: "Agilidad, saltos y control motor",
    },
    snowboard: {
        intensity: { hobby: 1.35, trained: 1.5, elite: 1.7 },
        cardioRatio: 0.5,
        strengthRatio: 0.5,
        description: "Resistencia en piernas y control de balance",
    },
    alpine_skiing: {
        intensity: { hobby: 1.4, trained: 1.6, elite: 1.85 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Potencia en piernas y alta demanda metabólica",
    },
    climbing: {
        intensity: { hobby: 1.35, trained: 1.5, elite: 1.7 },
        cardioRatio: 0.2,
        strengthRatio: 0.8,
        description: "Fuerza de agarre, core y movilidad",
    },
    boulder: {
        intensity: { hobby: 1.3, trained: 1.45, elite: 1.65 },
        cardioRatio: 0.1,
        strengthRatio: 0.9,
        description: "Fuerza explosiva y técnica pura",
    },
    alpinism: {
        intensity: { hobby: 1.5, trained: 1.8, elite: 2.1 },
        cardioRatio: 0.8,
        strengthRatio: 0.2,
        description: "Resistencia extrema en altitud y fuerza de carga",
    },
    paragliding: {
        intensity: { hobby: 1.1, trained: 1.2, elite: 1.35 },
        cardioRatio: 0.1,
        strengthRatio: 0.9,
        description: "Control y resistencia isométrica leve",
    },
    /* ============================================================
        AQUATIC
    ============================================================ */
    artistic_swimming: {
        intensity: { hobby: 1.4, trained: 1.6, elite: 1.85 },
        cardioRatio: 0.7,
        strengthRatio: 0.3,
        description: "Control respiratorio, fuerza y gracia",
    },
    diving: {
        intensity: { hobby: 1.2, trained: 1.35, elite: 1.55 },
        cardioRatio: 0.2,
        strengthRatio: 0.8,
        description: "Potencia explosiva y control acrobático",
    },
    apnea: {
        intensity: { hobby: 1.15, trained: 1.3, elite: 1.5 },
        cardioRatio: 0.1,
        strengthRatio: 0.9,
        description: "Control mental y eficiencia de oxígeno",
    },
    paddle_surf: {
        intensity: { hobby: 1.2, trained: 1.35, elite: 1.55 },
        cardioRatio: 0.6,
        strengthRatio: 0.4,
        description: "Estabilidad de core y remada constante",
    },
    /* ============================================================
        FITNESS / WELLNESS
    ============================================================ */
    fitness: {
        intensity: { hobby: 1.2, trained: 1.35, elite: 1.55 },
        cardioRatio: 0.5,
        strengthRatio: 0.5,
        description: "Bienestar general y acondicionamiento físico",
    },
    functional_training: {
        intensity: { hobby: 1.35, trained: 1.5, elite: 1.7 },
        cardioRatio: 0.5,
        strengthRatio: 0.5,
        description: "Movimientos integrados para la vida diaria",
    },
    hiit: {
        intensity: { hobby: 1.5, trained: 1.7, elite: 2.0 },
        cardioRatio: 0.8,
        strengthRatio: 0.2,
        description: "Intervalos de alta intensidad para quema calórica",
    },
    pilates: {
        intensity: { hobby: 1.15, trained: 1.3, elite: 1.5 },
        cardioRatio: 0.1,
        strengthRatio: 0.9,
        description: "Control de core, alineación y fuerza interna",
    },
    barre: {
        intensity: { hobby: 1.2, trained: 1.35, elite: 1.55 },
        cardioRatio: 0.3,
        strengthRatio: 0.7,
        description: "Isometría de piernas, glúteos y postura",
    },
    mobility: {
        intensity: { hobby: 1.1, trained: 1.2, elite: 1.35 },
        cardioRatio: 0.1,
        strengthRatio: 0.9,
        description: "Rango de movimiento y salud articular",
    },
    stretching: {
        intensity: { hobby: 1.05, trained: 1.15, elite: 1.25 },
        cardioRatio: 0.1,
        strengthRatio: 0.9,
        description: "Elongación muscular y relajación",
    },
    rehab: {
        intensity: { hobby: 1.1, trained: 1.2, elite: 1.35 },
        cardioRatio: 0.1,
        strengthRatio: 0.9,
        description: "Recuperación de lesiones y fortalecimiento base",
    },
};
/* ============================================================
    3. SPORT_PROFILES_BASE (AUTO GENERADO)
============================================================ */
export const SPORT_PROFILES_BASE = Object.fromEntries(Object.entries(SPORT_PROFILES).map(([key, value]) => [
    key,
    {
        intensity: value.intensity.hobby,
        cardioRatio: value.cardioRatio,
        strengthRatio: value.strengthRatio,
        description: value.description,
    },
]));

// ==========================
// MAPEO DE TEXTO A SPORT
// ==========================
export function mapSport(input) {
    // Limpiar y normalizar el input
    const s = input.toLowerCase().trim().replace(/[.,;:!?]/g, '').replace(/\s+/g, ' ');
    
    // ==========================
    // 🏋️ Gym / Gimnasio
    // ==========================
    if (s.includes("gym") || s.includes("pesas") || s.includes("entrenamiento") || s.includes("fitness") || s.includes("gimnasio"))
        return "gym";
    
    // ==========================
    // ⚽ Football / Fútbol
    // ==========================
    if (s.includes("fut") || s.includes("fútbol") || s.includes("futbol") || s.includes("soccer") || s.includes("football"))
        return "football";
    
    // ==========================
    // 🏃 Running / Correr
    // ==========================
    if (s.includes("run") || s.includes("running") || s.includes("correr") || s.includes("carrera"))
        return "running";
    
    // ==========================
    // 🚴 Cycling / Ciclismo
    // ==========================
    if (s.includes("bike") || s.includes("cycling") || s.includes("ciclismo") || s.includes("bici"))
        return "cycling";
    
    // ==========================
    // 🏀 Basketball / Básquet
    // ==========================
    if (s.includes("basket") || s.includes("básquet") || s.includes("basquet") || s.includes("baloncesto"))
        return "basketball";
    
    // ==========================
    // 🥊 DEPORTES DE COMBATE
    // ==========================
    
    // ✅ MMA (PRIMERO para evitar conflictos con boxing)
    if (s === "mma" || s === "m.m.a" || s.includes("mma") || s.includes("artes mixtas") || s.includes("artes marciales mixtas") || s.includes("ufc") || s.includes("mixed martial arts"))
        return "mma";
    
    // ✅ Boxing / Boxeo (después de MMA para evitar conflictos)
    if ((s.includes("box") && !s.includes("kickbox")) || s.includes("boxing") || s.includes("boxeo"))
        return "boxing";
    
    // ✅ Kickboxing
    if (s.includes("kickboxing") || s.includes("kick box") || s.includes("kick boxing"))
        return "kickboxing";
    
    // ✅ Muay Thai
    if (s.includes("muay") || s.includes("muay thai"))
        return "muay_thai";
    
    // ✅ BJJ / Jiu Jitsu
    if (s.includes("bjj") || s.includes("jiu") || s.includes("jiu jitsu") || s.includes("jiu-jitsu") || s.includes("jiujitsu"))
        return "bjj";
    
    // ✅ Wrestling / Lucha
    if (s.includes("wrestling") || s.includes("lucha") || s.includes("lucha libre"))
        return "wrestling";
    
    // ✅ Judo
    if (s.includes("judo"))
        return "judo";
    
    // ✅ Karate
    if (s.includes("karate"))
        return "karate";
    
    // ✅ Taekwondo
    if (s.includes("taekwondo") || s.includes("tkd"))
        return "taekwondo";
    
    // ✅ Artes Marciales General
    if (s.includes("martial") || s.includes("artes marciales"))
        return "martial";
    
    // ==========================
    // Otros deportes
    // ==========================
    if (s.includes("cross") || s.includes("crossfit"))
        return "crossfit";
    if (s.includes("nat") || s.includes("swim"))
        return "swimming";
    if (s.includes("ten"))
        return "tennis";
    if (s.includes("yog"))
        return "yoga";
    if (s.includes("rug"))
        return "rugby";
    if (s.includes("pad"))
        return "padel";
    
    // ==========================
    // ❌ No match
    // ==========================
    return null;
}
//# sourceMappingURL=sports.js.map