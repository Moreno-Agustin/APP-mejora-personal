import { SPORT_PROFILES } from "./sports.js";
export function buildTraining(user) {
    const sportProfile = SPORT_PROFILES[user.sport || "gym"] || SPORT_PROFILES["gym"];
    // Sesiones dinámicas según nivel y objetivo
    let sessions = 3;
    if (user.level === "intermediate" || user.level === "recreational")
        sessions = 4;
    if (user.level === "advanced" || user.level === "competitive")
        sessions = 5;
    if (user.level === "elite")
        sessions = 6;
    if (user.goal === "fat_loss" && sessions > 5)
        sessions = 5; // Recovery focus
    if (user.goal === "health")
        sessions = 3;
    if (user.goal === "elite_performance")
        sessions = Math.max(sessions, 5);
    if (user.goal === "maintenance")
        sessions = 3;
    if (user.goal === "rehab")
        sessions = 2;
    // Detalle de sesiones según deporte
    const details = generateTrainingDetails(user, sessions);
    const focusMap = {
        "muscle": "Hipertrofia y Volumen",
        "fat_loss": "Definición y Cardio",
        "performance": "Rendimiento Deportivo",
        "elite_performance": "Rendimiento Máximo Élite",
        "health": "Salud y Bienestar",
        "strength": "Fuerza Máxima",
        "toning": "Tonificación y Composición",
        "maintenance": "Mantenimiento Físico",
        "rehab": "Rehabilitación y Recuperación",
        "endurance": "Resistencia Cardiovascular",
        "power": "Potencia Explosiva",
        "agility": "Agilidad y Coordinación",
        "flexibility": "Movilidad y Flexibilidad",
        "volumen": "Volumen (Aumento de Masa Muscular)"
    };
    const intensityValue = user.level === "elite"
        ? sportProfile.intensity.elite
        : (user.level === "advanced" || user.level === "competitive")
            ? sportProfile.intensity.trained
            : sportProfile.intensity.hobby;
    return {
        sessions,
        focus: focusMap[user.goal || "health"] || "Salud y Bienestar",
        methods: details,
        intensity: (user.level === "elite" || user.level === "advanced") ? "Muy Alta (Crítica)" : (intensityValue > 1.3 ? "Alta" : "Moderada")
    };
}
function generateTrainingDetails(user, sessions) {
    const sport = user.sport || "gym";
    const trainingManifesto = {
        gym: [
            "Fuerza: Multiarticulares (Push/Pull) 3x8-12",
            "Aislamiento: Enfocado en grupos rezagados 3x15",
            "Progreso: Sobrecarga progresiva cada 2 semanas",
            "Descanso: 90-120 seg entre series de fuerza"
        ],
        football: [
            "Sprints: 10x40m con 1min de descanso",
            "Agilidad: Circuitos con conos y cambios de ritmo",
            "Resistencia: 20 min de carrera continua variable",
            "Fuerza: Sentadillas explosivas y saltos al cajón"
        ],
        crossfit: [
            "WOD: Mezcla de gimnásticos y halterofilia",
            "EMOM: 12 min de cleans y burpees",
            "Habilidades: Doble unders y handstand walk",
            "AMRAP: Máxima intensidad en periodos cortos"
        ],
        running: [
            "Intervalos: 5x1km a ritmo de carrera",
            "Fondo: Salida larga de +10km a ritmo cómodo",
            "Fuerza: Core y estabilidad articular",
            "Recuperación: Carrera regenerativa de 30 min"
        ],
        martial: [
            "Saco: 5 rounds de 3 min alta intensidad",
            "Sparring: Técnico con enfoque preventivo",
            "Explosividad: Burpees y lanzamientos de balón",
            "Flexibilidad: Sesión enfocada en cadera y hombro"
        ],
        basketball: [
            "Pliometría: Saltos verticales y laterales",
            "Shooting: Fatiga controlada y tiro libre",
            "Defensa: Sprints laterales y desplazamientos",
            "Core: Planchas dinámicas para contacto físico"
        ],
        rugby: [
            "Potencia: Melé y empuje con cargas altas",
            "Resistencia: HIIT con periodos de contacto",
            "Placaje: Técnica y caída controlada",
            "Suplementario: Entrenamiento de cuello y trapecio"
        ],
        tennis: [
            "Laterales: Desplazamientos rápidos en línea",
            "Servicio: Repetición técnica y hombro",
            "Fondo: Tenis de ida y vuelta persistente",
            "Mano: Ejercicios de reflejos con pelota pequeña"
        ],
        yoga: [
            "Vinyasa: Fluidez de movimiento y respiración",
            "Hatha: Mantención de posturas y alineación",
            "Yin: Estiramientos profundos de larga duración",
            "Balance: Posturas sobre una pierna o brazos"
        ],
        // CATEGORÍA: Team Sports
        handball: ["Sprints cortos y cambios de dirección", "Lanzamientos con resistencia elástica", "Fuerza explosiva de tren superior", "Resistencia anaeróbica láctica"],
        hockey: ["Acondicionamiento en postura baja (isometría)", "Sprints repetidos con stick", "Fuerza de rotación de core", "Agilidad en espacios reducidos"],
        volley: ["Pliometría intensa (saltos)", "Fuerza de hombro preventiva", "Desplazamientos laterales rápidos", "Técnica de recepción en fatiga"],
        waterpolo: ["Nado con resistencia (arrastre)", "Fuerza de piernas (batida de waterpolo)", "Lanzamientos pesados en agua", "Capacidad pulmonar y apnea dinámica"],
        baseball: ["Potencia rotacional (med ball throws)", "Sprints de bases (60 yards)", "Fuerza de brazo (long toss)", "Agilidad de pies en infield"],
        // CATEGORÍA: Endurance
        marathon: ["Rodajes largos progresivos (Z2/Z3)", "Series de umbral lactato", "Fuerza de carrera (cuestas)", "Movilidad de cadera y tobillo"],
        triathlon: ["Transiciones (Brick sessions)", "Nado de aguas abiertas", "Intervalos de potencia en bici", "Técnica de carrera en fatiga"],
        athletics: ["Drills de técnica de carrera", "Sprints de alta intensidad", "Fuerza explosiva (pliometría)", "Movilidad articular profunda"],
        rowing: ["Intervalos en ergómetro", "Fuerza máxima (Peso muerto/Remo)", "Resistencia base de larga duración", "Core estable y potente"],
        // CATEGORÍA: Strength
        powerlifting: ["Sentadilla: Trabajo de fuerza máxima 3-5 reps", "Banca: Control excéntrico y pausa", "Peso Muerto: Técnica y carga progresiva", "Accesorios: Hipertrofia específica"],
        weightlifting: ["Snatch: Técnica y velocidad", "Clean & Jerk: Potencia y recepción", "Sentadilla frontal pesada", "Pliometría y reactividad"],
        calisthenics: ["Dominadas y fondos lastrados", "Skills (Front lever, Planche)", "Fuerza explosiva corporal", "Flexibilidad de hombros y muñecas"],
        // CATEGORÍA: Combat
        boxing: ["Shadow boxing con pesas ligeras", "Saco pesado por rounds", "Sprints de 400m", "Fuerza de core (antirrotación)"],
        mma: ["Lucha: Derribos y control de pared", "Striking combinaciones técnicas", "Grappling con fatiga", "Circuito de fuerza funcional"],
        // CATEGORÍA: Fitness & Health
        hiit: ["Intervalos 20/10 o 30/15", "Movimientos metabólicos (Burpees, Thrusters)", "Mínimo descanso entre bloques", "Frecuencia cardíaca máxima"],
        pilates: ["Control del Powerhouse (Core)", "Fluidez y precisión de movimiento", "Respiración costal lateral", "Estabilidad escapular y pélvica"],
        rehab: ["Ejercicios de activación específica", "Baja carga, alta repetición técnica", "Propiocepción y equilibrio", "Control motor y rango de movimiento"]
    };
    return trainingManifesto[sport] || trainingManifesto["gym"] || trainingManifesto["fitness"];
}
//# sourceMappingURL=training.js.map