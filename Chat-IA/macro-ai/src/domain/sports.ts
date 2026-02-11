import { Sport } from "../types/types.js";

export function mapSport(input: string): Sport | null {
    // Limpiar y normalizar el input
    const s = input.toLowerCase().trim().replace(/[.,;:!?]/g, '').replace(/\s+/g, ' ');

    // ==========================
    // 🏋️ Gym / Gimnasio
    // ==========================
    if (
        s.includes("gym") ||
        s.includes("pesas") ||
        s.includes("entrenamiento") ||
        s.includes("fitness") ||
        s.includes("gimnasio")
    ) return "gym";

    // ==========================
    // ⚽ Football / Fútbol
    // ==========================
    if (
        s.includes("fut") ||
        s.includes("fútbol") ||
        s.includes("futbol") ||
        s.includes("soccer") ||
        s.includes("football")
    ) return "football";

    // ==========================
    // 🏃 Running / Correr
    // ==========================
    if (
        s.includes("run") ||
        s.includes("running") ||
        s.includes("correr") ||
        s.includes("carrera")
    ) return "running";

    // ==========================
    // 🚴 Cycling / Ciclismo
    // ==========================
    if (
        s.includes("bike") ||
        s.includes("cycling") ||
        s.includes("ciclismo") ||
        s.includes("bici")
    ) return "cycling";

    // ==========================
    // 🏀 Basketball / Básquet
    // ==========================
    if (
        s.includes("basket") ||
        s.includes("básquet") ||
        s.includes("basquet") ||
        s.includes("baloncesto")
    ) return "basketball";

    // ==========================
    // 🥊 DEPORTES DE COMBATE
    // ==========================

    // ✅ MMA (PRIMERO para evitar conflictos con boxing)
    if (
        s === "mma" ||
        s === "m.m.a" ||
        s.includes("mma") ||
        s.includes("artes mixtas") ||
        s.includes("artes marciales mixtas") ||
        s.includes("ufc") ||
        s.includes("mixed martial arts")
    ) return "mma";

    // ✅ Boxing / Boxeo (después de MMA para evitar conflictos)
    if (
        (s.includes("box") && !s.includes("kickbox")) ||
        s.includes("boxing") ||
        s.includes("boxeo")
    ) return "boxing";

    // ✅ Kickboxing
    if (
        s.includes("kickboxing") ||
        s.includes("kick box") ||
        s.includes("kick boxing")
    ) return "kickboxing";

    // ✅ Muay Thai
    if (
        s.includes("muay") ||
        s.includes("muay thai")
    ) return "muay_thai";

    // ✅ BJJ / Jiu Jitsu
    if (
        s.includes("bjj") ||
        s.includes("jiu") ||
        s.includes("jiu jitsu") ||
        s.includes("jiu-jitsu") ||
        s.includes("jiujitsu")
    ) return "bjj";

    // ✅ Wrestling / Lucha
    if (
        s.includes("wrestling") ||
        s.includes("lucha") ||
        s.includes("lucha libre")
    ) return "wrestling";

    // ✅ Judo
    if (s.includes("judo"))
        return "judo";

    // ✅ Karate
    if (s.includes("karate"))
        return "karate";

    // ✅ Taekwondo
    if (
        s.includes("taekwondo") ||
        s.includes("tkd")
    ) return "taekwondo";

    // ✅ Artes Marciales General
    if (
        s.includes("martial") ||
        s.includes("artes marciales")
    ) return "martial";

    // ==========================
    // ❌ No match
    // ==========================
    return null;
}

// ==========================
// SPORT PROFILES CON INTENSIDAD
// ==========================
export const SPORT_PROFILES_BASE: Record<Sport, { intensity: number; cardioRatio: number; strengthRatio: number; description: string }> = {
    gym: { intensity: 1.2, cardioRatio: 0.2, strengthRatio: 0.8, description: "Entrenamiento de fuerza e hipertrofia" },
    crossfit: { intensity: 1.5, cardioRatio: 0.5, strengthRatio: 0.5, description: "Entrenamiento funcional de alta intensidad" },
    football: { intensity: 1.4, cardioRatio: 0.7, strengthRatio: 0.3, description: "Deporte intermitente de alta intensidad y agilidad" },
    rugby: { intensity: 1.5, cardioRatio: 0.4, strengthRatio: 0.6, description: "Potencia, contacto y resistencia física extrema" },
    running: { intensity: 1.3, cardioRatio: 0.9, strengthRatio: 0.1, description: "Resistencia cardiovascular pura y fondo" },
    cycling: { intensity: 1.3, cardioRatio: 0.8, strengthRatio: 0.2, description: "Resistencia en tren inferior y potencia" },
    basketball: { intensity: 1.4, cardioRatio: 0.6, strengthRatio: 0.4, description: "Explosividad, saltos y resistencia anaeróbica" },
    mma: { intensity: 1.4, cardioRatio: 0.5, strengthRatio: 0.5, description: "Coordinación, potencia explosiva y técnica" },
    boxing: { intensity: 1.4, cardioRatio: 0.5, strengthRatio: 0.5, description: "Coordinación, potencia explosiva y técnica" },
    yoga: { intensity: 1.1, cardioRatio: 0.2, strengthRatio: 0.3, description: "Flexibilidad, control mental y fuerza estática" },
    martial: { intensity: 1.4, cardioRatio: 0.5, strengthRatio: 0.5, description: "Coordinación, potencia explosiva y técnica" },
    swimming: { intensity: 1.3, cardioRatio: 0.8, strengthRatio: 0.2, description: "Resistencia de cuerpo completo y movilidad" },
    tennis: { intensity: 1.3, cardioRatio: 0.6, strengthRatio: 0.4, description: "Agilidad lateral, potencia de golpeo y sprints" },
    padel: { intensity: 1.25, cardioRatio: 0.6, strengthRatio: 0.4, description: "Agilidad, reflejos y resistencia cardiovascular moderada" },
    handball: { intensity: 1.4, cardioRatio: 0.6, strengthRatio: 0.4, description: "Deporte rápido con potencia de brazo y saltos" },
    hockey: { intensity: 1.45, cardioRatio: 0.7, strengthRatio: 0.3, description: "Alta intensidad intermitente, agilidad y resistencia" },
    volley: { intensity: 1.3, cardioRatio: 0.4, strengthRatio: 0.6, description: "Explosividad vertical y reflejos rápidos" },
    waterpolo: { intensity: 1.5, cardioRatio: 0.8, strengthRatio: 0.2, description: "Resistencia extrema y fuerza en medio acuático" },
    baseball: { intensity: 1.2, cardioRatio: 0.3, strengthRatio: 0.7, description: "Potencia de brazo y velocidad de reacción" },
    softball: { intensity: 1.2, cardioRatio: 0.3, strengthRatio: 0.7, description: "Potencia de brazo y velocidad de reacción" },
    lacrosse: { intensity: 1.4, cardioRatio: 0.6, strengthRatio: 0.4, description: "Velocidad, agilidad y resistencia" },
    cricket: { intensity: 1.2, cardioRatio: 0.4, strengthRatio: 0.6, description: "Resistencia y potencia de golpeo" },
    ultimate_frisbee: { intensity: 1.35, cardioRatio: 0.7, strengthRatio: 0.3, description: "Resistencia y agilidad" },
    athletics: { intensity: 1.4, cardioRatio: 0.6, strengthRatio: 0.4, description: "Velocidad, potencia y resistencia" },
    marathon: { intensity: 1.45, cardioRatio: 0.95, strengthRatio: 0.05, description: "Resistencia extrema de larga distancia" },
    triathlon: { intensity: 1.5, cardioRatio: 0.9, strengthRatio: 0.1, description: "Resistencia multidisciplinaria" },
    duathlon: { intensity: 1.45, cardioRatio: 0.85, strengthRatio: 0.15, description: "Resistencia combinada" },
    rowing: { intensity: 1.4, cardioRatio: 0.7, strengthRatio: 0.3, description: "Resistencia y fuerza de tren superior" },
    kayak: { intensity: 1.35, cardioRatio: 0.7, strengthRatio: 0.3, description: "Resistencia y fuerza de tren superior" },
    xc_skiing: { intensity: 1.5, cardioRatio: 0.85, strengthRatio: 0.15, description: "Resistencia extrema en nieve" },
    speed_skating: { intensity: 1.4, cardioRatio: 0.7, strengthRatio: 0.3, description: "Velocidad y resistencia" },
    powerlifting: { intensity: 1.3, cardioRatio: 0.1, strengthRatio: 0.9, description: "Fuerza máxima pura" },
    weightlifting: { intensity: 1.35, cardioRatio: 0.1, strengthRatio: 0.9, description: "Fuerza explosiva y técnica" },
    strongman: { intensity: 1.4, cardioRatio: 0.2, strengthRatio: 0.8, description: "Fuerza funcional extrema" },
    calisthenics: { intensity: 1.25, cardioRatio: 0.3, strengthRatio: 0.7, description: "Fuerza relativa y control corporal" },
    street_workout: { intensity: 1.3, cardioRatio: 0.3, strengthRatio: 0.7, description: "Fuerza funcional y habilidades" },
    gymnastics: { intensity: 1.35, cardioRatio: 0.2, strengthRatio: 0.8, description: "Fuerza, flexibilidad y técnica" },
    kickboxing: { intensity: 1.4, cardioRatio: 0.5, strengthRatio: 0.5, description: "Potencia explosiva y resistencia" },
    muay_thai: { intensity: 1.4, cardioRatio: 0.5, strengthRatio: 0.5, description: "Potencia explosiva y resistencia" },
    bjj: { intensity: 1.35, cardioRatio: 0.4, strengthRatio: 0.6, description: "Fuerza funcional y resistencia" },
    wrestling: { intensity: 1.4, cardioRatio: 0.4, strengthRatio: 0.6, description: "Fuerza y resistencia" },
    judo: { intensity: 1.35, cardioRatio: 0.4, strengthRatio: 0.6, description: "Fuerza funcional y técnica" },
    taekwondo: { intensity: 1.35, cardioRatio: 0.5, strengthRatio: 0.5, description: "Velocidad y potencia de piernas" },
    karate: { intensity: 1.3, cardioRatio: 0.4, strengthRatio: 0.6, description: "Fuerza y técnica" },
    sambo: { intensity: 1.4, cardioRatio: 0.4, strengthRatio: 0.6, description: "Fuerza y resistencia" },
    fencing: { intensity: 1.3, cardioRatio: 0.5, strengthRatio: 0.5, description: "Velocidad y agilidad" },
    squash: { intensity: 1.4, cardioRatio: 0.7, strengthRatio: 0.3, description: "Alta intensidad intermitente" },
    badminton: { intensity: 1.35, cardioRatio: 0.6, strengthRatio: 0.4, description: "Velocidad y agilidad" },
    ping_pong: { intensity: 1.2, cardioRatio: 0.4, strengthRatio: 0.6, description: "Reflejos y coordinación" },
    golf: { intensity: 1.15, cardioRatio: 0.2, strengthRatio: 0.8, description: "Técnica y potencia de swing" },
    shooting: { intensity: 1.1, cardioRatio: 0.1, strengthRatio: 0.9, description: "Control y precisión" },
    archery: { intensity: 1.1, cardioRatio: 0.1, strengthRatio: 0.9, description: "Control y precisión" },
    bowling: { intensity: 1.1, cardioRatio: 0.1, strengthRatio: 0.9, description: "Técnica y control" },
    billiards: { intensity: 1.05, cardioRatio: 0.05, strengthRatio: 0.95, description: "Técnica y precisión" },
    surf: { intensity: 1.3, cardioRatio: 0.4, strengthRatio: 0.6, description: "Equilibrio y fuerza funcional" },
    kitesurf: { intensity: 1.35, cardioRatio: 0.5, strengthRatio: 0.5, description: "Fuerza y resistencia" },
    windsurf: { intensity: 1.3, cardioRatio: 0.4, strengthRatio: 0.6, description: "Fuerza y resistencia" },
    skateboarding: { intensity: 1.25, cardioRatio: 0.3, strengthRatio: 0.7, description: "Equilibrio y habilidades" },
    snowboard: { intensity: 1.3, cardioRatio: 0.4, strengthRatio: 0.6, description: "Equilibrio y fuerza" },
    alpine_skiing: { intensity: 1.4, cardioRatio: 0.5, strengthRatio: 0.5, description: "Velocidad y fuerza" },
    climbing: { intensity: 1.4, cardioRatio: 0.3, strengthRatio: 0.7, description: "Fuerza relativa y resistencia" },
    boulder: { intensity: 1.35, cardioRatio: 0.2, strengthRatio: 0.8, description: "Fuerza explosiva" },
    alpinism: { intensity: 1.5, cardioRatio: 0.6, strengthRatio: 0.4, description: "Resistencia extrema" },
    paragliding: { intensity: 1.1, cardioRatio: 0.2, strengthRatio: 0.8, description: "Control y técnica" },
    artistic_swimming: { intensity: 1.3, cardioRatio: 0.5, strengthRatio: 0.5, description: "Flexibilidad y resistencia" },
    diving: { intensity: 1.25, cardioRatio: 0.3, strengthRatio: 0.7, description: "Fuerza y flexibilidad" },
    apnea: { intensity: 1.2, cardioRatio: 0.4, strengthRatio: 0.6, description: "Resistencia y control" },
    paddle_surf: { intensity: 1.25, cardioRatio: 0.4, strengthRatio: 0.6, description: "Equilibrio y resistencia" },
    fitness: { intensity: 1.2, cardioRatio: 0.5, strengthRatio: 0.5, description: "Bienestar general y acondicionamiento físico" },
    functional_training: { intensity: 1.35, cardioRatio: 0.5, strengthRatio: 0.5, description: "Movimientos integrados para la vida diaria" },
    hiit: { intensity: 1.5, cardioRatio: 0.8, strengthRatio: 0.2, description: "Intervalos de alta intensidad para quema calórica" },
    pilates: { intensity: 1.15, cardioRatio: 0.1, strengthRatio: 0.9, description: "Control de core, alineación y fuerza interna" },
    barre: { intensity: 1.2, cardioRatio: 0.3, strengthRatio: 0.7, description: "Isometría de piernas, glúteos y postura" },
    mobility: { intensity: 1.1, cardioRatio: 0.1, strengthRatio: 0.9, description: "Rango de movimiento y salud articular" },
    stretching: { intensity: 1.05, cardioRatio: 0.1, strengthRatio: 0.9, description: "Elongación muscular y relajación" },
    rehab: { intensity: 1.1, cardioRatio: 0.1, strengthRatio: 0.9, description: "Recuperación de lesiones y fortalecimiento base" }
};

// Alias para compatibilidad
export const SPORT_PROFILES = SPORT_PROFILES_BASE;
