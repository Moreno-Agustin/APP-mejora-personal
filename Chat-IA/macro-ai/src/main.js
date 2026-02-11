import { loadUser, saveUser } from "./data/memory.js";
import { respond } from "./engine/responder.js";
import { mapSport } from "./domain/sports.js";
import { syncWithExternalApps } from "./domain/integration.js";
// ==========================
// GOAL MAPPER
// ==========================
function mapGoal(text) {
    const t = text.toLowerCase();
    if (t.includes("definicion") ||
        t.includes("definir") ||
        t.includes("grasa") ||
        t.includes("fat"))
        return "fat_loss";
    if (t.includes("hipertrofia") ||
        t.includes("musculo") ||
        t.includes("ganar"))
        return "muscle";
    if (t.includes("volumen") ||
        t.includes("bulk") ||
        t.includes("subir masa"))
        return "volumen";
    if (t.includes("fuerza") ||
        t.includes("maxima"))
        return "strength";
    if (t.includes("potencia") ||
        t.includes("explosiva"))
        return "power";
    if (t.includes("resistencia") ||
        t.includes("cardio"))
        return "endurance";
    if (t.includes("mma") ||
        t.includes("boxeo") ||
        t.includes("combate"))
        return "elite_performance";
    if (t.includes("rendimiento") ||
        t.includes("competitivo"))
        return "performance";
    if (t.includes("movilidad") ||
        t.includes("flexibilidad"))
        return "flexibility";
    if (t.includes("rehab") ||
        t.includes("lesion") ||
        t.includes("recuperacion"))
        return "rehab";
    if (t.includes("mantener") ||
        t.includes("mantenimiento"))
        return "maintenance";
    if (t.includes("salud") ||
        t.includes("bienestar"))
        return "health";
    return "maintenance";
}
// ==========================
// QUESTIONS
// ==========================
const QUESTIONS = [
    "¿Cuál es tu sexo biológico? (masculino o femenino)",
    "¿Qué deporte practicás? (fútbol, gym, crossfit, running, mma, etc.)",
    `¿Cuál es tu objetivo principal?

🏋️ Hipertrofia (ganar músculo definido)
📈 Volumen (subir masa y peso corporal)
🔥 Definición (perder grasa sin perder músculo)

💪 Fuerza máxima (más potencia en levantamientos)
⚡ Potencia explosiva (saltos, golpes, sprints)

🏃 Resistencia / Cardio (aguante y fondo)
🚀 Rendimiento deportivo (mejorar en tu deporte)

🥊 Performance combate (MMA, boxeo, artes marciales)
⚽ Performance competitivo (fútbol, rugby, básquet)

🧘 Movilidad y flexibilidad (cuerpo ágil)
🛠 Rehabilitación / recuperación (volver más fuerte)

⚖ Mantenimiento (mantener tu físico actual)
🌱 Salud general (energía diaria)`,
    "¿Cuál es tu peso (kg), altura (cm) y edad? EJ: 70, 175, 25",
    "¿Cuál es tu nivel actual? (beginner, intermediate, advanced, elite)",
    "Del 1 al 10, ¿cómo evaluarías tu disciplina?"
];
// ==========================
// MAIN INPUT HANDLER
// ==========================
export function handleUserInput(text) {
    let user = loadUser() || {
        onboardingStep: 0,
        interactionCount: 0,
        discipline: 0.5,
        stress: 0.3,
        sleep: 7,
        energyLevel: 0.7,
        stage: "initial",
        history: []
    };
    if (user.onboardingStep < 6) {
        return handleOnboarding(user, text);
    }
    return respond(user, text);
}
// ==========================
// ONBOARDING ENGINE
// ==========================
function handleOnboarding(user, text) {
    const step = user.onboardingStep;
    switch (step) {
        // STEP 0 → GENDER
        case 0: {
            const gender = text.toLowerCase().includes("femenino")
                ? "female"
                : "male";
            user.gender = gender;
            user.onboardingStep = 1;
            saveUser(user);
            return { text: `Entendido, eres ${gender === "female" ? "femenina" : "masculino"}. Ahora: ${QUESTIONS[1]}` };
        }
        // STEP 1 → SPORT
        case 1: {
            const sport = mapSport(text);
            if (!sport) {
                // Intentar detectar variaciones comunes de MMA
                const lowerText = text.toLowerCase().trim();
                if (lowerText === "mma" || lowerText.includes("mma") || lowerText.includes("artes mixtas")) {
                    user.sport = "mma";
                    user.onboardingStep = 2;
                    saveUser(user);
                    return { text: `Perfecto. Ahora dime: ${QUESTIONS[2]}` };
                }
                return { text: "No identifiqué ese deporte. Probá con gym, futbol, mma, running...", options: ["gym", "football", "running", "crossfit", "mma"] };
            }
            user.sport = sport;
            user.onboardingStep = 2;
            saveUser(user);
            return { text: `Perfecto. Ahora dime: ${QUESTIONS[2]}` };
        }
        // STEP 2 → GOAL
        case 2: {
            user.goal = mapGoal(text);
            user.onboardingStep = 3;
            saveUser(user);
            return { text: `Genial. Ahora necesito tus datos físicos: ${QUESTIONS[3]}` };
        }
        // STEP 3 → BODY DATA
        case 3: {
            const parts = text.split(/[\s,]+/).map(n => parseFloat(n));
            if (parts.length < 3) {
                return { text: "Ingresá los 3 valores así: 70 175 25" };
            }
            user.weight = parts[0];
            user.height = parts[1];
            user.age = parts[2];
            user.onboardingStep = 4;
            saveUser(user);
            return { text: `Perfecto. ${QUESTIONS[4]}`, options: ["beginner", "intermediate", "advanced", "elite"] };
        }
        // STEP 4 → LEVEL
        case 4: {
            const lvl = text.toLowerCase().trim();
            if (lvl !== "beginner" &&
                lvl !== "intermediate" &&
                lvl !== "advanced" &&
                lvl !== "elite") {
                return { text: "Escribí exactamente: beginner, intermediate, advanced o elite.", options: ["beginner", "intermediate", "advanced", "elite"] };
            }
            user.level = lvl;
            user.onboardingStep = 5;
            saveUser(user);
            return { text: `Última pregunta: ${QUESTIONS[5]}`, options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] };
        }
        // STEP 5 → DISCIPLINE
        case 5: {
            const discValue = parseInt(text);
            if (isNaN(discValue) || discValue < 1 || discValue > 10) {
                return { text: "Ingresá un número del 1 al 10.", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] };
            }
            user.discipline = discValue / 10;
            user.onboardingStep = 6;
            saveUser(user);
            syncWithExternalApps(user, "Plan activado");
            return { text: "¡Perfil configurado con éxito! ¿Querés que te muestre tu plan?", options: ["Sí, mostrar plan", "No, gracias"] };
        }
        default:
            return { text: "Error inesperado. Reiniciando..." };
    }
}
// ==========================
// DOM CHAT INTEGRATION
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    // ✅ FIX TS: casteo correcto
    const chatMessages = document.getElementById("chatMessages");
    const chatForm = document.querySelector(".chat-input");
    const chatInput = document.querySelector(".chat-input input");
    if (!chatMessages || !chatForm || !chatInput)
        return;
    function addMessage(text, isUser = false) {
        const div = document.createElement("div");
        div.className = `message ${isUser ? "user-message" : "ai-message"}`;
        div.innerText = text;
        chatMessages.appendChild(div);
        // ✅ FIX: scroll universal
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text)
            return;
        addMessage(text, true);
        chatInput.value = "";
        setTimeout(() => {
            const response = handleUserInput(text);
            addMessage(response.text);
        }, 400);
    });
    // Initial Greeting
    const user = loadUser();
    if (!user || user.onboardingStep < 6) {
        const step = user?.onboardingStep || 0;
        addMessage(`¡Hola! Soy tu coach IA. ${QUESTIONS[step]}`);
    }
    else {
        addMessage(`¡Bienvenido otra vez! ¿Qué querés mejorar hoy?`);
    }
    // Option buttons removed: user must type responses manually.
});
//# sourceMappingURL=main.js.map