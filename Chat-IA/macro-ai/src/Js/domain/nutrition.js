import { SPORT_PROFILES } from "./sports.js";
export function buildNutrition(user) {
    let kcal = 2000;
    // ==========================
    // BMR (Mifflin-St Jeor)
    // ==========================
    if (user.weight && user.height && user.age) {
        const isMale = user.gender !== "female";
        const bmr = 10 * user.weight +
            6.25 * user.height -
            5 * user.age +
            (isMale ? 5 : -161);
        const profile = SPORT_PROFILES[user.sport ?? "gym"] ?? SPORT_PROFILES.gym;
        kcal = bmr * profile.intensity;
        if (user.level === "advanced")
            kcal *= 1.1;
        if (user.level === "elite")
            kcal *= 1.2;
    }
    // ==========================
    // AJUSTE POR OBJETIVO
    // ==========================
    switch (user.goal) {
        case "fat_loss":
            kcal *= 0.85;
            break;
        case "muscle":
            kcal *= 1.15;
            break;
        case "elite_performance":
            kcal *= 1.25;
            break;
        case "strength":
            kcal *= 1.1;
            break;
        case "toning":
            kcal *= 0.9;
            break;
        case "rehab":
            kcal *= 0.95;
            break;
        case "endurance":
            kcal *= 1.05;
            break;
        case "power":
            kcal *= 1.1;
            break;
        case "flexibility":
            kcal *= 0.95;
            break;
        case "volumen":
            kcal *= 1.3;
            break;
        case "maintenance":
        case "health":
        default:
            kcal *= 1.0;
    }
    // ==========================
    // PROTEÍNA (g/kg)
    // ==========================
    let proteinRatio = 1.8;
    switch (user.goal) {
        case "muscle":
            proteinRatio = 2.4;
            break;
        case "elite_performance":
            proteinRatio = 2.0;
            break;
        case "strength":
            proteinRatio = 2.2;
            break;
        case "power":
            proteinRatio = 2.1;
            break;
        case "toning":
            proteinRatio = 2.0;
            break;
        case "rehab":
            proteinRatio = 1.6;
            break;
        case "flexibility":
            proteinRatio = 1.5;
            break;
        case "volumen":
            proteinRatio = 2.5;
            break;
    }
    if (user.level === "elite")
        proteinRatio += 0.2;
    const protein = user.weight
        ? user.weight * proteinRatio
        : 150;
    // ==========================
    // MACROS
    // ==========================
    const fat = (kcal * 0.25) / 9;
    const carbs = (kcal - protein * 4 - fat * 9) / 4;
    return {
        kcal: Math.round(kcal),
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat),
    };
}
