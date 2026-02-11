import type { UserProfile, Goal } from "../types/types.js";
import { SPORT_PROFILES_BASE } from "./sports.js";

export function buildNutrition(user: UserProfile) {
    let kcal = 2000;
    let bmr = 0;
    let tdee = 0;

    // ==========================
    // VALIDACIÓN BÁSICA
    // ==========================
    if (!user.weight || !user.height || !user.age ||
        user.weight < 40 || user.weight > 200 ||
        user.height < 120 || user.height > 230 ||
        user.age < 12 || user.age > 80) {
        return {
            kcal: 2000,
            protein: 150,
            carbs: 250,
            fat: 70,
            bmr: 0,
            tdee: 0
        };
    }

    // ==========================
    // A. BMR (Mifflin-St Jeor)
    // ==========================
    const isMale = user.gender !== "female";
    bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + (isMale ? 5 : -161);

    // ==========================
    // B. TDEE = BMR * sportIntensity
    // ==========================
    const sport = user.sport ?? "gym";
    const profile = SPORT_PROFILES_BASE[sport] ?? SPORT_PROFILES_BASE.gym;
    tdee = bmr * profile.intensity;
    kcal = tdee;

    // ==========================
    // C. AJUSTE POR OBJETIVO
    // ==========================
    const goal = user.goal as Goal;
    switch (goal) {
        case "hypertrophy":
        case "volume":
            kcal *= 1.10; // +10%
            break;
        case "cutting":
            kcal *= 0.85; // -15%
            break;
        case "maintenance":
            kcal *= 1.0; // igual
            break;
        case "performance":
        case "combat":
            kcal *= 1.05; // +5%
            break;
        default:
            kcal *= 1.0;
    }

    kcal = Math.round(kcal);

    // ==========================
    // D. DISTRIBUCIÓN DE MACROS
    // ==========================
    
    // Proteína (g/kg)
    let proteinRatio = 1.6; // default
    if (goal === "cutting" || goal === "combat") {
        proteinRatio = 2.2;
    } else if (goal === "hypertrophy" || goal === "volume") {
        proteinRatio = 2.0;
    } else if (goal === "maintenance" || goal === "health") {
        proteinRatio = 1.6;
    }
    const protein = Math.round(user.weight * proteinRatio);

    // Grasa: 0.9g/kg
    const fat = Math.round(user.weight * 0.9);

    // Carbohidratos: resto de calorías
    const carbs = Math.round((kcal - protein * 4 - fat * 9) / 4);

    return {
        kcal,
        protein,
        carbs,
        fat,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee)
    };
}

// ==========================
// FUNCIÓN PARA MOSTRAR RESPUESTA CLARA
// ==========================
export function formatNutritionResponse(nutrition: ReturnType<typeof buildNutrition>): string {
    if (nutrition.bmr === 0) {
        return "Por favor, completa tus datos físicos (peso, altura, edad) para calcular tu nutrición.";
    }
    return `Tu gasto diario estimado es ${nutrition.tdee} kcal (TDEE)
Basado en un BMR de ${nutrition.bmr} kcal

**Macros diarios:**
• Proteínas: ${nutrition.protein} g
• Carbohidratos: ${nutrition.carbs} g
• Grasas: ${nutrition.fat} g

**Calorías objetivo:** ${nutrition.kcal} kcal/día`;
}