import { SPORT_PROFILES } from "./sports.js";
export function buildNutrition(user) {
    let kcal = 2000;
    // ==========================
    // VALIDACIÓN BÁSICA
    // ==========================
    if (!user.weight ||
        !user.height ||
        !user.age ||
        user.weight < 40 ||
        user.weight > 200 ||
        user.height < 120 ||
        user.height > 230 ||
        user.age < 12 ||
        user.age > 80) {
        return {
            kcal: 2000,
            protein: 150,
            carbs: 250,
            fat: 70,
        };
    }
    // ==========================
    // BMR (Mifflin-St Jeor)
    // ==========================
    const isMale = user.gender !== "female";
    const bmr = 10 * user.weight +
        6.25 * user.height -
        5 * user.age +
        (isMale ? 5 : -161);
    // ==========================
    // ACTIVIDAD SEGÚN DEPORTE + NIVEL
    // ==========================
    const profile = SPORT_PROFILES[user.sport ?? "gym"] ?? SPORT_PROFILES.gym;
    // Elegimos intensidad según nivel del usuario
    let activityMultiplier = profile.intensity.hobby;
    if (user.level === "advanced") {
        activityMultiplier = profile.intensity.trained;
    }
    if (user.level === "elite") {
        activityMultiplier = profile.intensity.elite;
    }
    // Calorías base según deporte
    kcal = bmr * activityMultiplier;
    // ==========================
    // AJUSTE POR OBJETIVO
    // ==========================
    switch (user.goal) {
        case "fat_loss":
            kcal *= 0.85;
            break;
        case "muscle":
            kcal *= 1.10;
            break;
        case "strength":
            kcal *= 1.08;
            break;
        case "elite_performance":
            kcal *= 1.15;
            break;
        case "endurance":
            kcal *= 1.05;
            break;
        case "toning":
            kcal *= 0.90;
            break;
        case "rehab":
            kcal *= 0.95;
            break;
        case "flexibility":
            kcal *= 0.95;
            break;
        case "volumen":
            kcal *= 1.15;
            break;
        case "maintenance":
        case "health":
        default:
            kcal *= 1.0;
    }
    kcal = Math.round(kcal);
    // ==========================
    // PROTEÍNA (g/kg)
    // ==========================
    let proteinRatio = 1.6;
    switch (user.goal) {
        case "fat_loss":
            proteinRatio = 2.0;
            break;
        case "muscle":
            proteinRatio = 2.0;
            break;
        case "strength":
            proteinRatio = 2.2;
            break;
        case "power":
            proteinRatio = 2.1;
            break;
        case "elite_performance":
            proteinRatio = 2.0;
            break;
        case "volumen":
            proteinRatio = 2.0;
            break;
        case "rehab":
            proteinRatio = 1.6;
            break;
        case "flexibility":
            proteinRatio = 1.5;
            break;
    }
    if (user.level === "elite")
        proteinRatio += 0.1;
    const protein = Math.round(user.weight * proteinRatio);
    // ==========================
    // GRASAS (mínimo saludable)
    // ==========================
    let fat = (kcal * 0.25) / 9;
    // mínimo recomendado: 0.8g/kg
    fat = Math.max(fat, user.weight * 0.8);
    fat = Math.round(fat);
    // ==========================
    // CARBS (resto de calorías)
    // ==========================
    let carbs = (kcal - protein * 4 - fat * 9) / 4;
    // evitar negativos
    carbs = Math.max(carbs, 80);
    carbs = Math.round(carbs);
    // ==========================
    // RESULTADO FINAL
    // ==========================
    return {
        kcal,
        protein,
        carbs,
        fat,
    };
}
//# sourceMappingURL=nutrition.js.map