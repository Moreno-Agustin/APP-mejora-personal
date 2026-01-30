import { UserProfile, Intent, AIReasoning } from "../types/types.js";

function getGoalSuggestions(sport: string): string[] {
    const suggestions: Record<string, string[]> = {
        gym: ["Ganar masa muscular", "Disminuir grasa corporal", "Aumentar fuerza máxima", "Tonificar el cuerpo", "Mejorar composición corporal", "Aumentar peso corporal (volumen)", "Mantener forma física", "Rehabilitación y prevención de lesiones", "Volumen (aumento de masa muscular)"],
        football: ["Mejorar resistencia aeróbica", "Aumentar velocidad y aceleración", "Reducir grasa corporal", "Mejorar potencia de piernas", "Incrementar agilidad y coordinación", "Optimizar rendimiento competitivo", "Prevención de lesiones"],
        running: ["Mejorar resistencia cardiovascular", "Aumentar velocidad de carrera", "Reducir grasa corporal", "Preparación para competencia", "Mejorar economía de carrera", "Mantener condición física"],
        cycling: ["Incrementar resistencia aeróbica", "Mejorar potencia y cadencia", "Reducir grasa corporal", "Preparación para eventos largos", "Mejorar recuperación muscular"],
        martial: ["Aumentar resistencia anaeróbica", "Mejorar potencia y explosividad", "Reducir grasa corporal", "Incrementar fuerza funcional", "Mejorar reflejos y coordinación", "Preparación para combate", "Control de peso"],
        basketball: ["Mejorar potencia explosiva", "Incrementar velocidad y agilidad", "Aumentar resistencia intermitente", "Ganar masa muscular funcional", "Reducir riesgo de lesiones", "Optimizar rendimiento en equipo"],
        rugby: ["Mejorar potencia explosiva", "Incrementar velocidad y agilidad", "Aumentar resistencia intermitente", "Ganar masa muscular funcional", "Reducir riesgo de lesiones", "Optimizar rendimiento en equipo"],
        swimming: ["Mejorar capacidad cardiovascular", "Aumentar resistencia muscular", "Reducir grasa corporal", "Mejorar técnica y eficiencia", "Rehabilitación de bajo impacto"],
        tennis: ["Mejorar agilidad y reacción", "Aumentar resistencia específica", "Incrementar potencia de golpe", "Mejorar coordinación ojo-mano", "Mantener peso saludable"],
        yoga: ["Mejorar movilidad y flexibilidad", "Reducir estrés", "Fortalecer core", "Prevenir lesiones", "Mejorar postura", "Recuperación activa"],
        powerlifting: ["Aumentar fuerza máxima", "Mejorar técnica de levantamientos", "Ganar masa muscular", "Preparación para competencia", "Incrementar potencia"],
        calisthenics: ["Aumentar fuerza relativa", "Mejorar control corporal", "Ganar masa muscular funcional", "Incrementar movilidad", "Desarrollar habilidades avanzadas"],
        surf: ["Mejorar equilibrio y estabilidad", "Aumentar fuerza funcional", "Incrementar resistencia", "Prevención de lesiones", "Optimizar rendimiento técnico"],
        rehab: ["Recuperación post lesión", "Mejora funcional del movimiento", "Reducción de grasa corporal", "Incremento de condición general", "Retorno progresivo al deporte"]
    };
    return suggestions[sport] || ["Ganar músculo", "Perder grasa", "Mejorar rendimiento"];
}

export function reason(user: UserProfile, intent: Intent): AIReasoning {
    const { category, sentiment, urgency, entities } = intent;
    let advice = "";
    let suggestedChanges: Partial<UserProfile> = {};
    let requiresClarification = false;

    // 0. Establish Persona (Coach context - calculated but not printed per user request)
    const stageName = user.stage || "initial";

    // 1. DYNAMIC INFERENCE (Coach reading between the lines)
    // Check for direct goal changes
    const lastInteraction = user.history[user.history.length - 1];
    const wasAskedForGoalChange = user.pendingGoalChange || (lastInteraction && lastInteraction.summary.includes("goal_change"));
    
    if (entities.includes("goal_change") || wasAskedForGoalChange) {
        const goalEntities = entities.filter(e => e.endsWith("_goal"));
        if (goalEntities.length > 0) {
            const goalMap: Record<string, string> = {
                "muscle_goal": "muscle",
                "fat_loss_goal": "fat_loss",
                "performance_goal": "performance",
                "strength_goal": "strength",
                "toning_goal": "toning",
                "maintenance_goal": "maintenance",
                "rehab_goal": "rehab",
                "endurance_goal": "endurance",
                "power_goal": "power",
                "agility_goal": "agility",
                "flexibility_goal": "flexibility",
                "volumen_goal": "volumen"
            };
            const newGoal = goalMap[goalEntities[0]];
            if (newGoal) {
                suggestedChanges.goal = newGoal as any;
                advice = `¡Objetivo actualizado! He cambiado tu meta a **${newGoal.toUpperCase()}**. Ajustaré tu plan de nutrición y entrenamiento en consecuencia.`;
                suggestedChanges.pendingGoalChange = false;
                return { advice, suggestedChanges };
            }
        } else {
            const sport = user.sport || "gym";
            const goalSuggestions = getGoalSuggestions(sport);
            advice = `Entendido, vamos a ajustar tus metas para ${sport.toUpperCase()}. ¿Qué buscas ahora? Opciones: ${goalSuggestions.join(", ")}`;
            requiresClarification = true;
            return { advice, requiresClarification };
        }
    }

    // Check for direct sport responses after asking for change
    const wasAskedForSportChange = user.pendingSportChange || (lastInteraction && lastInteraction.summary.includes("sport_change"));
    
    if (entities.includes("change") || wasAskedForSportChange) {
        // Full list of supported sports keys for robust detection
        const allSports = [
            "football", "basketball", "gym", "crossfit", "running", "cycling",
            "martial", "swimming", "tennis", "yoga", "rugby", "padel",
            "handball", "hockey", "volley", "waterpolo", "baseball", "softball",
            "lacrosse", "cricket", "ultimate_frisbee",
            "athletics", "marathon", "triathlon", "duathlon", "rowing", "kayak",
            "xc_skiing", "speed_skating",
            "powerlifting", "weightlifting", "strongman", "calisthenics", "street_workout", "gymnastics",
            "boxing", "kickboxing", "muay_thai", "mma", "bjj", "wrestling", "judo",
            "taekwondo", "karate", "sambo", "fencing",
            "squash", "badminton", "ping_pong", "golf", "shooting", "archery",
            "bowling", "billiards",
            "surf", "kitesurf", "windsurf", "skateboarding", "snowboard", "alpine_skiing",
            "climbing", "boulder", "alpinism", "paragliding",
            "artistic_swimming", "diving", "apnea", "paddle_surf",
            "fitness", "functional_training", "hiit", "pilates", "barre", "mobility", "stretching", "rehab"
        ];

        const mentionedSport = entities.find(e => allSports.includes(e));

        if (mentionedSport) {
            suggestedChanges.sport = mentionedSport as any;
            advice = `¡Deporte actualizado correctamente! He cambiado tu disciplina a **${mentionedSport.toUpperCase()}**. Tu perfil ha sido reiniciado con el nuevo deporte.`;
            
            // Add flag to trigger localStorage clear
            suggestedChanges.clearStorage = true;
            suggestedChanges.newSport = mentionedSport;
            suggestedChanges.pendingSportChange = false;
            
            return { advice, suggestedChanges };
        }

        // Check for goal changes
        const goalEntities = entities.filter(e => e.endsWith("_goal"));
        if (goalEntities.length > 0) {
            const goalMap: Record<string, string> = {
                "muscle_goal": "muscle",
                "fat_loss_goal": "fat_loss",
                "performance_goal": "performance",
                "strength_goal": "strength",
                "toning_goal": "toning",
                "maintenance_goal": "maintenance",
                "rehab_goal": "rehab",
                "endurance_goal": "endurance",
                "power_goal": "power",
                "agility_goal": "agility",
                "flexibility_goal": "flexibility",
                "volumen_goal": "volumen"
            };
            const newGoal = goalMap[goalEntities[0]];
            if (newGoal) {
                suggestedChanges.goal = newGoal as any;
                advice = `¡Objetivo actualizado! He cambiado tu meta a **${newGoal.toUpperCase()}**. Ajustaré tu plan de nutrición y entrenamiento en consecuencia.`;
                suggestedChanges.pendingGoalChange = false;
                return { advice, suggestedChanges };
            }
        }

        if (entities.includes("sport_change") || wasAskedForSportChange) {
            advice = "¡Claro! ¿A qué deporte te gustaría cambiar? (Ej: Futbol, Crossfit, Running, Rugby, etc.) para que pueda ajustar todo tu plan.";
            requiresClarification = true;
            return { advice, requiresClarification };
        }

        if (entities.includes("plan_change")) {
            advice = "¡Claro! ¿Qué aspecto del plan quieres cambiar? Opciones: 1) Deporte/Disciplina, 2) Objetivo/Meta, 3) Nivel de intensidad, 4) Horarios, 5) Otro aspecto específico.";
            requiresClarification = true;
            return { advice, requiresClarification };
        }
    }

    if (entities.includes("elite_goal")) suggestedChanges.goal = "elite_performance";
    if (entities.includes("recreational_level")) suggestedChanges.level = "recreational";
    if (entities.includes("beginner_level")) suggestedChanges.level = "beginner";

    // Injury handling (Empathy first)
    if (entities.includes("injury")) {
        advice = "Escuché que mencionaste una molestia o lesión. Como tu coach, mi prioridad es tu longevidad. Vamos a bajar la intensidad inmediatamente y priorizar la recuperación. ¿Podrías describirme el tipo de dolor y si es articular o muscular?";
        requiresClarification = true;
        suggestedChanges.energyLevel = Math.max(0.3, user.energyLevel - 0.2);
        return { advice, suggestedChanges, requiresClarification };
    }

    // 2. STAGE PROGRESSION (Autonomous Coaching)
    if (user.interactionCount > 50 && user.stage === "initial") suggestedChanges.stage = "adaptation";
    if (user.discipline > 0.85 && user.stage === "adaptation") suggestedChanges.stage = "progress";

    // 3. LOGIC BY CATEGORY (Professional Insight)
    if (category === "nutrition") {
        if (user.goal === "elite_performance") {
            advice = "Para el nivel de élite que buscamos, el timing es todo. Necesitamos cargar carbohidratos 3 horas antes del entrenamiento y proteína de rápida absorción después. ¿Cómo llevas la organización de tus comidas en el día?";
        } else if (user.goal === "fat_loss") {
            const adherenceNote = user.discipline < 0.6 ? "No busques perfección, busca constancia. Si un día fallas, el siguiente volvemos." : "Tu disciplina es de hierro, podemos ajustar un poco más el déficit si te sientes con energía.";
            advice = `Estamos en fase de definición. ${adherenceNote} ¿Has notado cambios en tu saciedad con las recomendaciones actuales?`;
        } else {
            advice = "La base nutricional está sólida. Mi recomendación ahora es enfocarnos en micronutrientes para mejorar la recuperación nerviosa. ¿Estás incluyendo suficientes vegetales verdes?";
        }
    } else if (category === "training") {
        if (user.energyLevel < 0.3) {
            advice = "Veo signos de fatiga acumulada. El sobreentrenamiento es el enemigo del progreso. Hoy te ordeno descanso total o movilidad muy suave. Mañana volveremos con todo. ¿Aceptas el descanso?";
        } else if (user.level === "elite" || user.level === "competitive") {
            advice = "A este nivel, la técnica supera al volumen. Hoy quiero que te enfoques en la calidad de cada repetición en " + (user.sport || "tu disciplina") + ". ¿Qué aspecto técnico sientes que podemos pulir hoy?";
        } else {
            advice = "Buen nivel de energía. Vamos a subir la carga un 5% para forzar la adaptación. ¿Te sientes cómodo con un poco más de peso o intensidad hoy?";
        }
    } else if (category === "habits") {
        const sleepAdvice = user.sleep < 7 ? "Tu motor no se recupera sin sueño. Prioricemos esto antes que cualquier entreno suplementario." : "Excelente descanso, eso se nota en tu enfoque.";
        advice = `${sleepAdvice} Para tu nivel ${user.level}, te sugiero implementar 5 min de visualización o meditación post-entreno. ¿Te parece algo viable?`;
    } else if (category === "onboarding") {
        advice = `¡Hola! Soy tu coach personal. Estoy analizando tu perfil de ${user.sport} y tu etapa de ${user.stage}. Mi objetivo es acompañarte a tu mejor versión. ¿Qué es lo que más te motiva hoy para entrenar?`;
    } else {
        advice = "Estoy aquí para optimizar tu rendimiento. ¿En qué área (nutrición, entrenamiento o hábitos) te gustaría enfocarte hoy?";
    }

    // Adapt response based on urgency/mentality
    if (urgency > 0.8) advice = "🚨 FOCO INMEDIATO: " + advice;

    return { advice, suggestedChanges, requiresClarification };
}
