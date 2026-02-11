// ==========================
// GOAL LABELS (USER FRIENDLY)
// ==========================
const goalLabels = {
    muscle: "🏋️ Hipertrofia (ganar músculo definido)",
    fat_loss: "🔥 Definición (perder grasa sin perder músculo)",
    volumen: "📈 Volumen (subir masa y peso corporal)",
    strength: "💪 Fuerza máxima",
    power: "⚡ Potencia explosiva",
    endurance: "🏃 Resistencia / Cardio",
    performance: "🚀 Rendimiento deportivo",
    elite_performance: "🥊 Performance combate",
    flexibility: "🧘 Movilidad y flexibilidad",
    rehab: "🛠 Rehabilitación / recuperación",
    maintenance: "⚖ Mantenimiento",
    health: "🌱 Salud general",
    toning: "✨ Tonificación",
    agility: "🤸 Agilidad"
};
// ==========================
// GOAL MAP (ENTITY → GOAL)
// ==========================
const goalMap = {
    // 🏋️ Hipertrofia / músculo
    "muscle_goal": "muscle",
    "hipertrofia_goal": "muscle",
    // 🔥 Definición
    "fat_loss_goal": "fat_loss",
    "definicion_goal": "fat_loss",
    // 📈 Volumen
    "volumen_goal": "volumen",
    "bulk_goal": "volumen",
    // 💪 Fuerza máxima
    "strength_goal": "strength",
    // ⚡ Potencia explosiva
    "power_goal": "power",
    // 🏃 Resistencia
    "endurance_goal": "endurance",
    // 🚀 Rendimiento deportivo
    "performance_goal": "performance",
    // 🥊 Combate / Elite
    "elite_performance_goal": "elite_performance",
    "combat_goal": "elite_performance",
    // 🧘 Movilidad
    "flexibility_goal": "flexibility",
    // 🛠 Recuperación
    "rehab_goal": "rehab",
    // ⚖ Mantenimiento
    "maintenance_goal": "maintenance",
    // 🌱 Salud general
    "health_goal": "health"
};
// ==========================
// GOAL SUGGESTIONS PER SPORT
// ==========================
export function getGoalSuggestions(sport) {
    const suggestions = {
        gym: [
            "🏋️ Hipertrofia",
            "📈 Volumen",
            "🔥 Definición",
            "💪 Fuerza máxima",
            "⚖ Mantenimiento",
            "🌱 Salud general"
        ],
        football: [
            "🏃 Resistencia",
            "⚡ Velocidad y explosividad",
            "🔥 Definición",
            "🚀 Rendimiento competitivo",
            "🛠 Prevención de lesiones"
        ],
        running: [
            "🏃 Resistencia cardiovascular",
            "⚡ Mejorar velocidad",
            "🔥 Pérdida de grasa",
            "🚀 Preparación para carrera"
        ],
        cycling: [
            "🏃 Fondo aeróbico",
            "⚡ Potencia en piernas",
            "🔥 Definición",
            "🚀 Rendimiento en largas distancias"
        ],
        // 🥊 COMBATE REAL
        mma: [
            "🥊 Performance combate",
            "⚡ Explosividad",
            "🏃 Resistencia anaeróbica",
            "🔥 Control de peso",
            "💪 Fuerza funcional"
        ],
        boxing: [
            "🥊 Potencia de golpe",
            "🏃 Cardio y aguante",
            "🔥 Definición",
            "⚡ Velocidad"
        ],
        muay_thai: [
            "🥊 Explosividad",
            "🏃 Resistencia",
            "🔥 Control de peso",
            "💪 Fuerza funcional"
        ],
        bjj: [
            "💪 Fuerza relativa",
            "🏃 Endurance",
            "⚡ Control corporal",
            "🛠 Prevención de lesiones"
        ],
        martial: [
            "🥊 Performance combate",
            "⚡ Explosividad",
            "🏃 Resistencia",
            "🔥 Control de peso"
        ],
        yoga: [
            "🧘 Movilidad",
            "🌱 Bienestar general",
            "🛠 Recuperación activa",
            "✨ Tonificación suave"
        ],
        rehab: [
            "🛠 Recuperación progresiva",
            "🧘 Movilidad funcional",
            "🌱 Salud general"
        ]
    };
    return suggestions[sport] || [
        "🏋️ Hipertrofia",
        "🔥 Definición",
        "🚀 Rendimiento deportivo"
    ];
}
// ==========================
// MAIN REASONING ENGINE
// ==========================
export function reason(user, intent) {
    const { category, urgency, entities } = intent;
    let advice = "";
    let suggestedChanges = {};
    let requiresClarification = false;
    const lastInteraction = user.history[user.history.length - 1];
    const wasAskedForGoalChange = user.pendingGoalChange ||
        (lastInteraction && lastInteraction.summary.includes("goal_change"));
    // ==========================
    // GOAL CHANGE DETECTION
    // ==========================
    if (entities.includes("goal_change") || wasAskedForGoalChange) {
        const goalEntities = entities.filter(e => e.endsWith("_goal"));
        if (goalEntities.length > 0) {
            const newGoal = goalMap[goalEntities[0]];
            if (newGoal) {
                suggestedChanges.goal = newGoal;
                suggestedChanges.pendingGoalChange = false;
                advice = `✅ Objetivo actualizado: **${goalLabels[newGoal]}**

Ajustaré tu nutrición y entrenamiento en base a esta meta.`;
                return { advice, suggestedChanges };
            }
        }
        // If unclear → Suggest goals
        const sport = user.sport || "gym";
        const goalSuggestions = getGoalSuggestions(sport);
        advice = `Entendido. Para tu deporte **${sport.toUpperCase()}**, estos son objetivos recomendados:`;
        requiresClarification = true;
        return { advice, requiresClarification, suggestions: goalSuggestions };
    }
    // ==========================
    // CATEGORY RESPONSES
    // ==========================
    if (category === "nutrition") {
        advice = "🍎 Nutrición optimizada. Si querés, puedo ajustarte macros según tu objetivo actual.";
    }
    else if (category === "training") {
        advice = "💪 Entrenamiento listo. Hoy podemos trabajar fuerza, hipertrofia o rendimiento.";
    }
    else if (category === "habits") {
        advice = "🧠 Hábitos clave: sueño, hidratación y constancia son la base del progreso.";
    }
    else {
        advice = "Estoy listo para optimizar tu plan. ¿Querés enfocarte en nutrición, entrenamiento o hábitos?";
    }
    if (urgency > 0.8) {
        advice = "🚨 FOCO INMEDIATO: " + advice;
    }
    return { advice, suggestedChanges, requiresClarification };
}
//# sourceMappingURL=reasoning.js.map