import { UserProfile } from "../types/types.js";
import { buildPlan } from "../engine/planner.js";

export function syncWithExternalApps(user: UserProfile, coachMessage?: string): void {
    const plan = buildPlan(user);

    // 1. Sincronizar Hábitos
    // Formato esperado por /habitos/src/main.js
    const externalHabits = [
        ...plan.habits.map((h, i) => ({
            id: 200 + i,
            name: h,
            description: "Sugerido por IA para tu objetivo",
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date()
        })),
        ...plan.psychology.map((p, i) => ({
            id: 300 + i,
            name: p,
            description: "Insight psicológico adaptativo",
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }))
    ];

    localStorage.setItem('habits', JSON.stringify(externalHabits));

    // 2. Sincronizar Macros
    // Formato esperado por /Medidor de macros/src/home.ts
    const macroGoals = {
        kcal: plan.nutrition.kcal,
        pro: plan.nutrition.protein,
        carb: plan.nutrition.carbs,
        grasa: plan.nutrition.fat
    };

    localStorage.setItem("macroObjetivos", JSON.stringify(macroGoals));

    // Alimentos sugeridos detallados
    localStorage.setItem("macroAlimentosSugeridos", JSON.stringify(plan.foods));

    // 3. Sincronizar Mensaje del Coach y Estado
    localStorage.setItem("macroCoachContext", JSON.stringify({
        message: coachMessage || "Analizando tu progreso...",
        goal: user.goal === "hypertrophy" || user.goal === "volume" ? "Ganancia Muscular" : (user.goal === "cutting" ? "Pérdida de Grasa" : "Rendimiento"),
        sport: user.sport?.toUpperCase()
    }));
}