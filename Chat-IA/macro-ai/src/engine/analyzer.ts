import { Intent } from "../types/types.js";
import { mapSport } from "../domain/sports.js";

export function analyze(text: string): Intent {
    const t = text.toLowerCase();

    // Default intent
    let category: Intent["category"] = "unknown";
    let sentiment: Intent["sentiment"] = "neutral";
    let urgency = 0.2;
    const entities: string[] = [];

    // Category detection
    if (/comer|dieta|nutric|caloria|proteina|hambre|alimento|comida|fats|carbs|macros/.test(t)) category = "nutrition";
    else if (/entren|rutina|ejercicio|gimnasio|gym|serie|repeticion|musculo|bodybuilding|powerlifting|fuerza|cardio|deporte|disciplina/.test(t)) category = "training";
    else if (/habito|sueño|dormir|agua|constancia|disciplina|pasos|hidratacion|cansancio|estres/.test(t)) category = "habits";

    else if (/triste|cansado|mal|bien|feliz|emocion|animo|energia|depre|quemado|motivacion/.test(t)) category = "mood";
    else if (/hola|buen|que tal|como estas/.test(t)) category = "onboarding"; // Treat as social/start


    // Plan detection
    if (/plan|resumen|mi rutina|que tengo que hacer|moistrame|mostrame|como vengo|como voy|estado/.test(t)) {
        category = "training";
        if (t.includes("plan") || t.includes("resumen") || t.includes("como vengo") || t.includes("como voy") || t.includes("estado")) {
            entities.push("full_plan");
        }
    }

    // Change/Modification detection (Flexible regex for different Spanish forms)
    if (/cambi|ajust|modif|otro|diferent|no me gusta|correg|actualiz|quiero cambiar|deseo cambiar|necesito cambiar|hacer un cambio|realizar un cambio|modificar|variar|alterar|revisar|actualizar/.test(t)) {
        entities.push("change");
        urgency = 0.6;
        // Detectar qué quiere cambiar específicamente
        if (/deporte|disciplina|sport|practico|practicar/.test(t)) entities.push("sport_change");
        if (/objetivo|meta|goal|quiero|busco/.test(t)) entities.push("goal_change");
        if (/plan|rutina|programa|todo|completo/.test(t)) entities.push("plan_change");
        if (/nivel|level|competitividad|competitivo|elite|principiante|intermedio|avanzado/.test(t)) entities.push("level_change");
        if (/disciplina|constancia|adherencia|compromiso|dedicacion/.test(t)) entities.push("discipline_change");
    }



    // Goals & Levels inference entities
    if (/elite|profesional|competencia|competir|torneo|podio/.test(t)) entities.push("elite_goal");
    if (/salud|recreativo|hobby|divertirme/.test(t)) entities.push("recreational_level");
    if (/empezar|arrancar|nuevo|principiante/.test(t)) entities.push("beginner_level");
    if (/lesion|dolor|molestia|hombro|esquilda|rodilla/.test(t)) entities.push("injury");
    
    // Level detection
    if (/principiante|beginner|empezando/.test(t)) entities.push("beginner");
    if (/intermedio|intermediate|medio/.test(t)) entities.push("intermediate");
    if (/avanzado|advanced/.test(t)) entities.push("advanced");
    if (/recreativo|recreational/.test(t)) entities.push("recreational");
    if (/competitivo|competitive/.test(t)) entities.push("competitive");
    if (/elite|profesional/.test(t)) entities.push("elite");

    // Goal change detection
    if (/volumen|aumento masa|bulk/.test(t)) entities.push("volumen_goal");
    if (/ganar|masa|musculo|bulk|aumentar peso|ganar peso/.test(t)) entities.push("muscle_goal");
    if (/hipertrofia|hipertrofia_goal/.test(t)) entities.push("hipertrofia_goal");
    if (/perder|grasa|definir|adelgazar|fat|delgadez|reducir grasa|definicion_goal/.test(t)) entities.push("definicion_goal");
    if (/rendimiento|performance|competir|mejorar|elite|optimizar/.test(t)) entities.push("performance_goal");
    if (/fuerza|fuerza_goal|maxima|potencia|strength|power/.test(t)) entities.push("fuerza_goal");
    if (/potencia|potencia_goal|explosiv/.test(t)) entities.push("potencia_goal");
    if (/tonificar|toning|composicion|body composition/.test(t)) entities.push("toning_goal");
    if (/mantener|mantenimiento|mantenimiento_goal|maintenance|forma fisica|condicion/.test(t)) entities.push("mantenimiento_goal");
    if (/rehab|rehabilitacion|rehabilitacion_goal|lesion|recovery/.test(t)) entities.push("rehab_goal");
    if (/resistencia|resistencia_goal|endurance|cardio|aerobic/.test(t)) entities.push("resistencia_goal");
    if (/explosividad|power|potencia/.test(t)) entities.push("power_goal");
    if (/agilidad|agility|coordinacion/.test(t)) entities.push("agility_goal");
    if (/flexibilidad|flexibility|movilidad|movility|movilidad_goal/.test(t)) entities.push("movilidad_goal");


    // Sentiment analysis
    if (/mal|feo|dificil|cansado|odio|no puedo|aburrido|pesado/.test(t)) sentiment = "negative";
    else if (/bien|genial|perfecto|me gusta|puedo|facil|divertido/.test(t)) sentiment = "positive";

    // Urgency detection
    if (/ayuda|urgente|ahora|ya|importante|favor/.test(t)) urgency = 0.9;

    // Sport entity extraction using mapSport
    const mappedSport = mapSport(text);
    if (mappedSport) {
        entities.push(mappedSport);
    }

    return { category, sentiment, urgency, entities };
}