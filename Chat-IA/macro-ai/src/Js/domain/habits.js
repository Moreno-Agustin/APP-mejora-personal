import { SPORT_PROFILES } from "./sports.js";
export function buildHabits(user) {
    const level = user.discipline > 0.8 ? "avanzado" : (user.discipline > 0.4 ? "intermedio" : "principiante");
    const sport = user.sport || "gym";
    const profile = SPORT_PROFILES[sport] || SPORT_PROFILES["gym"];
    const habits = ["Hidratarse 35–40 ml/kg"];
    // Basic habits by discipline level
    if (level === "principiante") {
        habits.push("Caminar 10.000 pasos");
        habits.push("Comer al menos 1 fruta al día");
    }
    else if (level === "intermedio") {
        habits.push("Dormir 7–8 horas");
        habits.push("Entrenar sin distracciones (modo avión)");
        habits.push("Comer proteína en cada comida");
    }
    else {
        habits.push("Dormir 8+ horas (calidad monitorizada)");
        habits.push("Pesar alimentos (precisión máxima)");
        habits.push("Optimizar timing de nutrientes");
        habits.push("Respiración diafragmática 5min post-entreno");
    }
    // Specific habits by Sport Category
    if (profile.cardioRatio > 0.7) {
        habits.push("Monitorizar pulso en reposo al despertar");
        if (user.level === "advanced" || user.level === "elite")
            habits.push("Suplementación con Electrolitos en entrenos largos");
    }
    if (profile.strengthRatio > 0.7) {
        habits.push("Movilidad específica de articulaciones clave");
        habits.push("Anotar cargas y RPE en cada sesión");
    }
    // Combat habits
    if (["boxing", "mma", "martial", "wrestling", "judo", "bjj", "muay_thai", "kickboxing"].includes(sport)) {
        habits.push("Estiramiento dinámico de cuello y core");
        habits.push("Limpieza rigurosa de equipo protector");
    }
    // Technical/Focus habits
    if (["golf", "shooting", "archery", "ping_pong"].includes(sport)) {
        habits.push("Sesión de visualización táctica (10 min)");
        habits.push("Control de cafeína para estabilidad motora");
    }
    // Team sports habits
    if (["football", "basketball", "rugby", "handball", "hockey"].includes(sport)) {
        habits.push("Ducha de contraste (frío/calor) tras partidos");
        habits.push("Revisión de jugadas o táctica personal");
    }
    if (user.goal === "fat_loss")
        habits.push("Eliminar bebidas calóricas");
    if (user.goal === "elite_performance")
        habits.push("Suplementación (Creatina/Beta-alanina) según protocolo");
    return habits;
}
