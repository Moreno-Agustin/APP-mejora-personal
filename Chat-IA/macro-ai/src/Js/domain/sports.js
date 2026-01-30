export const SPORT_PROFILES = {
    gym: { intensity: 1.2, cardioRatio: 0.2, strengthRatio: 0.8, description: "Entrenamiento de fuerza e hipertrofia" },
    football: { intensity: 1.4, cardioRatio: 0.7, strengthRatio: 0.3, description: "Deporte intermitente de alta intensidad y agilidad" },
    basketball: { intensity: 1.4, cardioRatio: 0.6, strengthRatio: 0.4, description: "Explosividad, saltos y resistencia anaeróbica" },
    crossfit: { intensity: 1.5, cardioRatio: 0.5, strengthRatio: 0.5, description: "Entrenamiento funcional de alta intensidad" },
    running: { intensity: 1.3, cardioRatio: 0.9, strengthRatio: 0.1, description: "Resistencia cardiovascular pura y fondo" },
    cycling: { intensity: 1.3, cardioRatio: 0.8, strengthRatio: 0.2, description: "Resistencia en tren inferior y potencia" },
    martial: { intensity: 1.4, cardioRatio: 0.5, strengthRatio: 0.5, description: "Coordinación, potencia explosiva y técnica" },
    swimming: { intensity: 1.3, cardioRatio: 0.8, strengthRatio: 0.2, description: "Resistencia de cuerpo completo y movilidad" },
    tennis: { intensity: 1.3, cardioRatio: 0.6, strengthRatio: 0.4, description: "Agilidad lateral, potencia de golpeo y sprints" },
    yoga: { intensity: 1.1, cardioRatio: 0.2, strengthRatio: 0.3, description: "Flexibilidad, control mental y fuerza estática" },
    rugby: { intensity: 1.5, cardioRatio: 0.4, strengthRatio: 0.6, description: "Potencia, contacto y resistencia física extrema" },
    padel: { intensity: 1.25, cardioRatio: 0.6, strengthRatio: 0.4, description: "Agilidad, reflejos y resistencia cardiovascular moderada" },
    // Team Sports
    handball: { intensity: 1.4, cardioRatio: 0.6, strengthRatio: 0.4, description: "Deporte de equipo rápido con foco en potencia de brazo y saltos" },
    hockey: { intensity: 1.45, cardioRatio: 0.7, strengthRatio: 0.3, description: "Alta intensidad intermitente, agilidad y resistencia" },
    volley: { intensity: 1.3, cardioRatio: 0.4, strengthRatio: 0.6, description: "Explosividad vertical y reflejos rápidos" },
    waterpolo: { intensity: 1.5, cardioRatio: 0.8, strengthRatio: 0.2, description: "Resistencia extrema y fuerza en medio acuático" },
    baseball: { intensity: 1.2, cardioRatio: 0.3, strengthRatio: 0.7, description: "Potencia explosiva rotacional y sprints cortos" },
    softball: { intensity: 1.2, cardioRatio: 0.3, strengthRatio: 0.7, description: "Potencia explosiva y agilidad en campo" },
    lacrosse: { intensity: 1.45, cardioRatio: 0.7, strengthRatio: 0.3, description: "Contacto físico, velocidad y resistencia" },
    cricket: { intensity: 1.2, cardioRatio: 0.4, strengthRatio: 0.6, description: "Resistencia de larga duración y ráfagas de potencia" },
    ultimate_frisbee: { intensity: 1.4, cardioRatio: 0.8, strengthRatio: 0.2, description: "Sprints constantes y resistencia cardiovascular" },
    // Endurance
    athletics: { intensity: 1.4, cardioRatio: 0.8, strengthRatio: 0.2, description: "Rendimiento en pista, variado según distancia" },
    marathon: { intensity: 1.5, cardioRatio: 0.95, strengthRatio: 0.05, description: "Resistencia de ultra larga distancia" },
    triathlon: { intensity: 1.5, cardioRatio: 0.9, strengthRatio: 0.1, description: "Combinación de natación, ciclismo y running" },
    duathlon: { intensity: 1.4, cardioRatio: 0.9, strengthRatio: 0.1, description: "Carrera y ciclismo de alta resistencia" },
    rowing: { intensity: 1.5, cardioRatio: 0.7, strengthRatio: 0.3, description: "Potencia de cuerpo completo y resistencia aeróbica" },
    kayak: { intensity: 1.35, cardioRatio: 0.7, strengthRatio: 0.3, description: "Resistencia en tren superior y estabilidad" },
    xc_skiing: { intensity: 1.5, cardioRatio: 0.95, strengthRatio: 0.05, description: "Uno de los deportes con mayor demanda aeróbica" },
    speed_skating: { intensity: 1.45, cardioRatio: 0.7, strengthRatio: 0.3, description: "Potencia de piernas y resistencia anaeróbica" },
    // Strength
    powerlifting: { intensity: 1.2, cardioRatio: 0.1, strengthRatio: 0.9, description: "Fuerza máxima en sentadilla, banca y peso muerto" },
    weightlifting: { intensity: 1.3, cardioRatio: 0.2, strengthRatio: 0.8, description: "Potencia olímpica, técnica y fuerza explosiva" },
    strongman: { intensity: 1.4, cardioRatio: 0.3, strengthRatio: 0.7, description: "Fuerza bruta y resistencia con cargas pesadas" },
    calisthenics: { intensity: 1.25, cardioRatio: 0.3, strengthRatio: 0.7, description: "Control corporal y fuerza con peso propio" },
    street_workout: { intensity: 1.25, cardioRatio: 0.3, strengthRatio: 0.7, description: "Fuerza relativa y habilidades dinámicas" },
    gymnastics: { intensity: 1.4, cardioRatio: 0.2, strengthRatio: 0.8, description: "Máxima fuerza relativa, flexibilidad y control" },
    // Combat
    boxing: { intensity: 1.5, cardioRatio: 0.7, strengthRatio: 0.3, description: "Resistencia anaeróbica, velocidad y potencia" },
    kickboxing: { intensity: 1.5, cardioRatio: 0.7, strengthRatio: 0.3, description: "Alta demanda metabólica y golpeo integral" },
    muay_thai: { intensity: 1.5, cardioRatio: 0.6, strengthRatio: 0.4, description: "Resistencia al impacto y potencia en 8 puntos" },
    mma: { intensity: 1.5, cardioRatio: 0.6, strengthRatio: 0.4, description: "Combinación total de lucha y golpeo" },
    bjj: { intensity: 1.4, cardioRatio: 0.4, strengthRatio: 0.6, description: "Fuerza isométrica, técnica y lucha en suelo" },
    wrestling: { intensity: 1.5, cardioRatio: 0.5, strengthRatio: 0.5, description: "Fuerza bruta, explosividad y control" },
    judo: { intensity: 1.4, cardioRatio: 0.4, strengthRatio: 0.6, description: "Proyecciones, control y fuerza explosiva" },
    taekwondo: { intensity: 1.35, cardioRatio: 0.7, strengthRatio: 0.3, description: "Agilidad de piernas y velocidad de reacción" },
    karate: { intensity: 1.35, cardioRatio: 0.6, strengthRatio: 0.4, description: "Técnica de golpeo, velocidad y precisión" },
    sambo: { intensity: 1.5, cardioRatio: 0.6, strengthRatio: 0.4, description: "Lucha integral y proyecciones" },
    fencing: { intensity: 1.25, cardioRatio: 0.6, strengthRatio: 0.4, description: "Velocidad de reacción, precisión y agilidad" },
    // Technical
    squash: { intensity: 1.45, cardioRatio: 0.8, strengthRatio: 0.2, description: "Extrema agilidad y resistencia cardiovascular" },
    badminton: { intensity: 1.3, cardioRatio: 0.7, strengthRatio: 0.3, description: "Velocidad, saltos y reflejos rápidos" },
    ping_pong: { intensity: 1.15, cardioRatio: 0.6, strengthRatio: 0.4, description: "Reflejos, precisión y coordinación ojo-mano" },
    golf: { intensity: 1.1, cardioRatio: 0.4, strengthRatio: 0.6, description: "Concentración, técnica rotacional y caminata" },
    shooting: { intensity: 1.05, cardioRatio: 0.1, strengthRatio: 0.9, description: "Control nervioso, estabilidad y precisión" },
    archery: { intensity: 1.1, cardioRatio: 0.1, strengthRatio: 0.9, description: "Fuerza estática en tren superior y foco" },
    bowling: { intensity: 1.1, cardioRatio: 0.2, strengthRatio: 0.8, description: "Técnica de lanzamiento y fuerza lumbar básica" },
    billiards: { intensity: 1.05, cardioRatio: 0.1, strengthRatio: 0.9, description: "Precisión geométrica y control motor fino" },
    // Extreme
    surf: { intensity: 1.35, cardioRatio: 0.6, strengthRatio: 0.4, description: "Remada intensa, balance y fuerza explosiva" },
    kitesurf: { intensity: 1.3, cardioRatio: 0.5, strengthRatio: 0.5, description: "Core extremo y resistencia en piernas" },
    windsurf: { intensity: 1.35, cardioRatio: 0.6, strengthRatio: 0.4, description: "Resistencia isométrica y equilibrio" },
    skateboarding: { intensity: 1.25, cardioRatio: 0.5, strengthRatio: 0.5, description: "Agilidad, saltos y control motor" },
    snowboard: { intensity: 1.35, cardioRatio: 0.5, strengthRatio: 0.5, description: "Resistencia en piernas y control de balance" },
    alpine_skiing: { intensity: 1.4, cardioRatio: 0.6, strengthRatio: 0.4, description: "Potencia en piernas y alta demanda metabólica" },
    climbing: { intensity: 1.35, cardioRatio: 0.2, strengthRatio: 0.8, description: "Fuerza de agarre, core y movilidad" },
    boulder: { intensity: 1.3, cardioRatio: 0.1, strengthRatio: 0.9, description: "Fuerza explosiva, dedos y técnica pura" },
    alpinism: { intensity: 1.5, cardioRatio: 0.8, strengthRatio: 0.2, description: "Resistencia extrema en altitud y fuerza de carga" },
    paragliding: { intensity: 1.1, cardioRatio: 0.1, strengthRatio: 0.9, description: "Control y resistencia isométrica leve" },
    // Aquatic
    artistic_swimming: { intensity: 1.4, cardioRatio: 0.7, strengthRatio: 0.3, description: "Control respiratorio, fuerza y gracia" },
    diving: { intensity: 1.2, cardioRatio: 0.2, strengthRatio: 0.8, description: "Potencia explosiva y control acrobático" },
    apnea: { intensity: 1.15, cardioRatio: 0.1, strengthRatio: 0.9, description: "Control mental y eficiencia de oxígeno" },
    paddle_surf: { intensity: 1.2, cardioRatio: 0.6, strengthRatio: 0.4, description: "Estabilidad de core y remada constante" },
    // Fitness
    fitness: { intensity: 1.2, cardioRatio: 0.5, strengthRatio: 0.5, description: "Bienestar general y acondicionamiento físico" },
    functional_training: { intensity: 1.35, cardioRatio: 0.5, strengthRatio: 0.5, description: "Movimientos integrados para la vida diaria" },
    hiit: { intensity: 1.5, cardioRatio: 0.8, strengthRatio: 0.2, description: "Intervalos de alta intensidad para quema calórica" },
    pilates: { intensity: 1.15, cardioRatio: 0.1, strengthRatio: 0.9, description: "Control de core, alineación y fuerza interna" },
    barre: { intensity: 1.2, cardioRatio: 0.3, strengthRatio: 0.7, description: "Isometría de piernas, glúteos y postura" },
    mobility: { intensity: 1.1, cardioRatio: 0.1, strengthRatio: 0.9, description: "Rango de movimiento y salud articular" },
    stretching: { intensity: 1.05, cardioRatio: 0.1, strengthRatio: 0.9, description: "Elongación muscular y relajación" },
    rehab: { intensity: 1.1, cardioRatio: 0.1, strengthRatio: 0.9, description: "Recuperación de lesiones y fortalecimiento base" }
};
export function mapSport(input) {
    const s = input.toLowerCase().trim();
    // Core (already there)
    if (s.includes("fut") || s.includes("socc") || s.includes("fútbol") || s.includes("soccer"))
        return "football";
    if (s.includes("gym") || s.includes("pesa") || s.includes("fuerza") || s.includes("muscul") || s.includes("gimnasio"))
        return "gym";
    if (s.includes("cross"))
        return "crossfit";
    if (s.includes("run") || s.includes("corr") || s.includes("running") || s.includes("correr"))
        return "running";
    if (s.includes("bici") || s.includes("cycl") || s.includes("ciclismo"))
        return "cycling";
    if (s.includes("box") || s.includes("mma") || s.includes("lu") || s.includes("mart") || s.includes("artes marciales"))
        return "martial";
    if (s.includes("bas") || s.includes("bask") || s.includes("baloncesto"))
        return "basketball";
    if (s.includes("nat") || s.includes("swim") || s.includes("nadar"))
        return "swimming";
    if (s.includes("ten") || s.includes("tenis"))
        return "tennis";
    if (s.includes("yog") || s.includes("pil") || s.includes("yoga"))
        return "yoga";
    if (s.includes("rug") || s.includes("rugby"))
        return "rugby";
    if (s.includes("pad") || s.includes("pádel"))
        return "padel";
    // New Team Sports
    if (s.includes("hand"))
        return "handball";
    if (s.includes("hoc") || s.includes("césped") || s.includes("sala"))
        return "hockey";
    if (s.includes("vol") || s.includes("voley") || s.includes("vóley"))
        return "volley";
    if (s.includes("water"))
        return "waterpolo";
    if (s.includes("beis") || s.includes("base"))
        return "baseball";
    if (s.includes("soft"))
        return "softball";
    if (s.includes("lacr"))
        return "lacrosse";
    if (s.includes("cri"))
        return "cricket";
    if (s.includes("fris") || s.includes("ulti"))
        return "ultimate_frisbee";
    // New Endurance
    if (s.includes("atl") || s.includes("pista"))
        return "athletics";
    if (s.includes("mara"))
        return "marathon";
    if (s.includes("tria"))
        return "triathlon";
    if (s.includes("dua"))
        return "duathlon";
    if (s.includes("remo") || s.includes("row"))
        return "rowing";
    if (s.includes("kay") || s.includes("canot"))
        return "kayak";
    if (s.includes("esquí de fondo") || s.includes("xc"))
        return "xc_skiing";
    if (s.includes("patin") || s.includes("skat"))
        return "speed_skating";
    // New Strength
    if (s.includes("power"))
        return "powerlifting";
    if (s.includes("weight") || s.includes("halt"))
        return "weightlifting";
    if (s.includes("strong"))
        return "strongman";
    if (s.includes("cali"))
        return "calisthenics";
    if (s.includes("street"))
        return "street_workout";
    if (s.includes("gimnasia"))
        return "gymnastics";
    // New Combat
    if (s.includes("box"))
        return "boxing";
    if (s.includes("kick"))
        return "kickboxing";
    if (s.includes("muay"))
        return "muay_thai";
    if (s.includes("mma"))
        return "mma";
    if (s.includes("jiu") || s.includes("bjj"))
        return "bjj";
    if (s.includes("lucha"))
        return "wrestling";
    if (s.includes("judo"))
        return "judo";
    if (s.includes("taek"))
        return "taekwondo";
    if (s.includes("kar"))
        return "karate";
    if (s.includes("sambo"))
        return "sambo";
    if (s.includes("esgr"))
        return "fencing";
    // New Technical
    if (s.includes("squa"))
        return "squash";
    if (s.includes("badm"))
        return "badminton";
    if (s.includes("ping") || s.includes("mesa"))
        return "ping_pong";
    if (s.includes("golf"))
        return "golf";
    if (s.includes("tiro"))
        return "shooting";
    if (s.includes("arqu") || s.includes("arch"))
        return "archery";
    if (s.includes("bowl"))
        return "bowling";
    if (s.includes("bil"))
        return "billiards";
    // New Extreme
    if (s.includes("surf"))
        return "surf";
    if (s.includes("kite"))
        return "kitesurf";
    if (s.includes("wind"))
        return "windsurf";
    if (s.includes("skate"))
        return "skateboarding";
    if (s.includes("snow"))
        return "snowboard";
    if (s.includes("alpino") || s.includes("esquí"))
        return "alpine_skiing";
    if (s.includes("escala"))
        return "climbing";
    if (s.includes("bould"))
        return "boulder";
    if (s.includes("alpinis"))
        return "alpinism";
    if (s.includes("parap"))
        return "paragliding";
    // New Aquatic
    if (s.includes("artístic") || s.includes("sincro"))
        return "artistic_swimming";
    if (s.includes("buceo") || s.includes("dive"))
        return "diving";
    if (s.includes("apnea"))
        return "apnea";
    if (s.includes("paddle"))
        return "paddle_surf";
    // New Fitness
    if (s.includes("fitness"))
        return "fitness";
    if (s.includes("func"))
        return "functional_training";
    if (s.includes("hiit"))
        return "hiit";
    if (s.includes("pilat"))
        return "pilates";
    if (s.includes("barre"))
        return "barre";
    if (s.includes("mobi") || s.includes("movil"))
        return "mobility";
    if (s.includes("stret") || s.includes("along"))
        return "stretching";
    if (s.includes("reha") || s.includes("fisiot"))
        return "rehab";
    return null; // No match
}
