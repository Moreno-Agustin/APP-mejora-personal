import { loadUser, saveUser } from "../data/memory.js";
import { analyze } from "./analyzer.js";
import { buildPlan } from "./planner.js";
import { reason } from "./reasoning.js";
import { learnFromInteraction } from "../domain/learning.js";
import { syncWithExternalApps } from "../domain/integration.js";
function generateFullPlanResponse(user, plan, advice) {
    return `🌟 [TU ESTRATEGIA INTEGRAL DE ALTO RENDIMIENTO] 🌟

👤 PERFIL: ${user.gender === "male" ? "Atleta" : "Atleta"} en disciplina de ${user.sport?.toUpperCase()}
📈 ESTADO ACTUAL: Energía al ${Math.round(user.energyLevel * 100)}% | Disciplina: ${Math.round(user.discipline * 100)}%

🍎 INGENIERÍA NUTRICIONAL:
• Objetivo Calórico: ${plan.nutrition.kcal} kcal (Ajustado por IA)
• Proteína: ${plan.nutrition.protein}g | Carbos: ${plan.nutrition.carbs}g | Grasas: ${plan.nutrition.fat}g

🍽 EJEMPLOS DE COMIDAS PARA HOY:
${plan.foods.map((f) => "  " + f).join("\n")}

💪 PROTOCOLO DE ENTRENAMIENTO (${plan.training.focus}):
• Volumen: ${plan.training.sessions} sesiones semanales
• Metodología para ${user.sport}:
${plan.training.methods.map((m) => "  - " + m).join("\n")}

🧠 OPTIMIZACIÓN BIO-HÁBITOS:
${[...plan.habits, ...plan.psychology].map((h) => "• " + h).join("\n")}

🚀 MENSAJE DE TU COACH:
${advice}`;
}
export function respond(user, input) {
    try {
        // 1. Understand
        const intent = analyze(input);
        // Ensure defaults for existing users
        if (user.energyLevel === undefined)
            user.energyLevel = 0.7;
        if (user.discipline === undefined)
            user.discipline = 0.5;
        if (user.stress === undefined)
            user.stress = 0.3;
        if (user.sleep === undefined)
            user.sleep = 7;
        if (user.interactionCount === undefined)
            user.interactionCount = 0;
        // 2. Self-Learn & Adapt Profile
        const updatedUser = learnFromInteraction(user, intent, input);
        // Inactivity check
        const now = Date.now();
        const wasAway = updatedUser.lastInteraction && (now - updatedUser.lastInteraction > 10800000);
        updatedUser.lastInteraction = now;
        // 3. Reason based on updated state
        const thought = reason(updatedUser, intent);
        let advice = thought.advice;
        // CRITICAL: Apply the AI's suggested changes to the user object
        if (thought.suggestedChanges) {
            // Check if we need to clear storage and recreate profile
            if (thought.suggestedChanges.clearStorage && thought.suggestedChanges.newSport) {
                // Clear all localStorage
                localStorage.clear();
                // Create new user profile with the new sport
                const newUser = {
                    sport: thought.suggestedChanges.newSport,
                    onboardingStep: 4, // Skip onboarding since sport is set
                    interactionCount: 1,
                    discipline: 0.5,
                    stress: 0.3,
                    sleep: 7,
                    energyLevel: 0.7,
                    stage: "initial",
                    history: []
                };
                saveUser(newUser);
                syncWithExternalApps(newUser, advice);
                return advice + "\n\nTu perfil ha sido completamente reiniciado con el nuevo deporte. Puedes continuar solicitando tu plan personalizado.";
            }
            Object.assign(updatedUser, thought.suggestedChanges);
            // Force immediate save to ensure sport change persists
            saveUser(updatedUser);
            syncWithExternalApps(updatedUser, advice);
        }
        saveUser(updatedUser);
        syncWithExternalApps(updatedUser, advice);
        if (wasAway && !intent.entities.includes("full_plan") && !thought.requiresClarification) {
            advice = `¡Qué bueno verte de nuevo! Estuve analizando tu progreso. ${advice}`;
        }
        const plan = buildPlan(updatedUser);
        // 4. Special Case: Full Plan Request
        if (intent.entities.includes("full_plan")) {
            // Double-check we have the latest sport
            const currentUser = loadUser();
            if (currentUser && currentUser.sport && currentUser.sport !== updatedUser.sport) {
                updatedUser.sport = currentUser.sport;
                const updatedPlan = buildPlan(updatedUser);
                return generateFullPlanResponse(updatedUser, updatedPlan, advice);
            }
            return generateFullPlanResponse(updatedUser, plan, advice);
        }
        // 5. Dynamic Responses
        if (thought.requiresClarification) {
            return `[Intervención de IA] ${advice}`;
        }
        if (intent.category === "nutrition") {
            const foodList = plan.foods.map((f) => "• " + f).join("\n");
            return `[Analizando Nutrición] ${advice}\n\nResumen de Macros:\n• Kcal: ${plan.nutrition.kcal}\n• Proteínas: ${plan.nutrition.protein}g\n• Carbs: ${plan.nutrition.carbs}g\n• Grasas: ${plan.nutrition.fat}g\n\nMenú Sugerido:\n${foodList}`;
        }
        if (intent.category === "training") {
            const methods = plan.training.methods.map((m) => "• " + m).join("\n");
            return `[Protocolo de Entrenamiento] ${advice}\n\nFrecuencia: ${plan.training.sessions}/sem\nEnfoque: ${plan.training.focus}\n\nRutina Detallada:\n${methods}`;
        }
        if (intent.category === "habits") {
            const habitsList = [...plan.habits, ...plan.psychology].map((h) => "• " + h).join("\n");
            return `[Optimización de Estilo de Vida]\n${advice}\n\nAcciones Inmediatas:\n${habitsList}`;
        }
        if (intent.category === "mood") {
            return `[Apoyo Psicológico] ${advice}`;
        }
        return advice;
    }
    catch (error) {
        console.error("AI Responder Error:", error);
        return "Lo siento, mis procesadores están un poco saturados analizando tu plan. ¿Podrías intentar decirme algo más específico sobre tu nutrición o entrenamiento?";
    }
}
