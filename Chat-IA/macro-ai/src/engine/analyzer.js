import { mapSport } from "../domain/sports.js";
export function analyze(text) {
    const t = text.toLowerCase();
    // Default intent
    let category = "unknown";
    let sentiment = "neutral";
    let urgency = 0.2;
    const entities = [];
    // Category detection
    if (/comer|dieta|nutric|caloria|proteina|hambre|alimento|comida|fats|carbs|macros/.test(t))
        category = "nutrition";
    else if (/entren|rutina|ejercicio|gimnasio|gym|serie|repeticion|musculo|bodybuilding|powerlifting|fuerza|cardio|deporte|disciplina/.test(t))
        category = "training";
    else if (/habito|sueño|dormir|agua|constancia|disciplina|pasos|hidratacion|cansancio|estres/.test(t))
        category = "habits";
    else if (/triste|cansado|mal|bien|feliz|emocion|animo|energia|depre|quemado|motivacion/.test(t))
        category = "mood";
    else if (/hola|buen|que tal|como estas/.test(t))
        category = "onboarding"; // Treat as social/start
    // Plan detection
    if (/plan|resumen|mi rutina|que tengo que hacer|moistrame|mostrame|como vengo|como voy|estado/.test(t)) {
        category = "training";
        if (t.includes("plan") || t.includes("resumen") || t.includes("como vengo") || t.includes("como voy") || t.includes("estado")) {
            entities.push("full_plan");
        }
    }
    // Change/Modification detection (Flexible regex for different Spanish forms)
    if (/cambi|ajust|modif|otro|diferent|no me gusta|correg|actualiz/.test(t)) {
        entities.push("change");
        urgency = 0.6;
        if (/deporte|disciplina/.test(t))
            entities.push("sport_change");
        if (/objetivo|meta/.test(t))
            entities.push("goal_change");
        if (/plan/.test(t))
            entities.push("plan_change");
        if (/nutricion|dieta|caloria|proteina|hambre|alimento|comida|fats|carbs|macros/.test(t))
            entities.push("nutrition_change");
        if (/habito|sueño|dormir|agua|constancia|disciplina|pasos|hidratacion|cansancio|estres/.test(t))
            entities.push("habits_change");
        if (/triste|cansado|mal|bien|feliz|emocion|animo|energia|depre|quemado|motivacion/.test(t))
            entities.push("mood_change");
        if (/sexo|genero/.test(t))
            entities.push("gender_change");
    }
    // Goals & Levels inference entities
    if (/elite|profesional|competencia|competir|torneo|podio/.test(t))
        entities.push("elite_goal");
    if (/salud|recreativo|hobby|divertirme/.test(t))
        entities.push("recreational_level");
    if (/empezar|arrancar|nuevo|principiante/.test(t))
        entities.push("beginner_level");
    if (/lesion|dolor|molestia|hombro|esquilda|rodilla/.test(t))
        entities.push("injury");
    // Goal change detection
    if (/volumen|aumento masa|bulk/.test(t))
        entities.push("volumen_goal");
    if (/ganar|masa|musculo|bulk|aumentar peso|ganar peso/.test(t))
        entities.push("muscle_goal");
    if (/perder|grasa|definir|adelgazar|fat|delgadez|reducir grasa/.test(t))
        entities.push("fat_loss_goal");
    if (/rendimiento|performance|competir|mejorar|elite|optimizar/.test(t))
        entities.push("performance_goal");
    if (/fuerza|maxima|potencia|strength|power/.test(t))
        entities.push("strength_goal");
    if (/tonificar|toning|composicion|body composition/.test(t))
        entities.push("toning_goal");
    if (/mantener|maintenance|forma fisica|condicion/.test(t))
        entities.push("maintenance_goal");
    if (/rehab|rehabilitacion|lesion|recovery/.test(t))
        entities.push("rehab_goal");
    if (/resistencia|endurance|cardio|aerobic/.test(t))
        entities.push("endurance_goal");
    if (/explosividad|power|potencia/.test(t))
        entities.push("power_goal");
    if (/agilidad|agility|coordinacion/.test(t))
        entities.push("agility_goal");
    if (/flexibilidad|flexibility|movilidad|mobility/.test(t))
        entities.push("flexibility_goal");
    if (/volumen|aumento masa|bulk/.test(t))
        entities.push("volumen_goal");
    // Sentiment analysis
    if (/mal|feo|dificil|cansado|odio|no puedo|aburrido|pesado/.test(t))
        sentiment = "negative";
    else if (/bien|genial|perfecto|me gusta|puedo|facil|divertido/.test(t))
        sentiment = "positive";
    // Urgency detection
    if (/ayuda|urgente|ahora|ya|importante|favor/.test(t))
        urgency = 0.9;
    // Sport entity extraction using mapSport
    const mappedSport = mapSport(text);
    if (mappedSport) {
        entities.push(mappedSport);
    }
    return { category, sentiment, urgency, entities };
}
//# sourceMappingURL=analyzer.js.map