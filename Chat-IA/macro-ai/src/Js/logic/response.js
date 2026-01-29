import { buildPlan } from "./planner.js";
export function generateResponse(profile) {
    const plan = buildPlan(profile);
    return `
🎯 Objetivo: ${profile.archetype} (${profile.targetLevel})

🍽 Nutrición diaria:
• ${plan.nutrition.kcal} kcal
• Proteína: ${plan.nutrition.protein} g
• Carbohidratos: ${plan.nutrition.carbs} g
• Grasas: ${plan.nutrition.fat} g

🏋️ Entrenamiento:
• Enfoque: ${plan.training.focus}
• Sesiones por semana: ${plan.training.sessionsPerWeek}

📌 Hábitos clave:
${plan.habits.map(h => `• ${h.title} (${h.frequency})`).join("\n")}

Vamos paso a paso, consistencia > perfección.
`;
}
