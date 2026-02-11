import { loadUser, saveUser } from "./data/memory.js";
import { respond } from "./engine/responder.js";
import { UserProfile, Goal } from "./types/types.js";
import { mapSport } from "./domain/sports.js";
import { syncWithExternalApps } from "./domain/integration.js";

function mapGoal(text: string): Goal {
    const t = text.toLowerCase();
    if (/hipertrofia|hipertrofia_goal|hypertrophy/.test(t)) return "hypertrophy";
    if (/volumen|volumen_goal|volume|bulk/.test(t)) return "volume";
    if (/definicion|definir|definicion_goal|cutting|perder grasa|perder/.test(t)) return "cutting";
    if (/fuerza|fuerza_goal|strength/.test(t)) return "strength";
    if (/potencia|potencia_goal|power|explosiv/.test(t)) return "power";
    if (/resistencia|resistencia_goal|endurance|cardio/.test(t)) return "endurance";
    if (/movilidad|movilidad_goal|flexibilidad|flexibility|mobility/.test(t)) return "mobility";
    if (/rehabilitacion|rehab|rehab_goal|recovery|recuperaci/.test(t)) return "rehab";
    if (/mantenimiento|mantenimiento_goal|maintenance/.test(t)) return "maintenance";
    if (/salud|salud_goal|health/.test(t)) return "health";
    if (/combate|combate_goal|mma|boxeo|combat/.test(t)) return "combat";
    if (/competitivo|competitivo_goal|competitive|competit/.test(t)) return "competitive";
    if (/performance|performance_goal/.test(t)) return "performance";
    // Backwards-compatible: mapear goals antiguos a nuevos
    if (/musculo|muscle|muscle_goal/.test(t)) return "hypertrophy";
    if (/grasa|fat|fat_loss|fat_loss_goal/.test(t)) return "cutting";

    return "performance";
}

// ==========================
// AI CONTROLLER ENTRY POINT
// ==========================

const QUESTIONS = [
    "¿Cuál es tu género? (masculino o femenino)",
    "¿Qué deporte practicás? (futbol, gym, crossfit, running, etc.)",
    "¿Cuál es tu objetivo principal?",
    "¿Cuál es tu peso actual (kg), altura (cm) y edad?",
    "Del 1 al 10, ¿cómo evaluarías tu disciplina?",
];

// Opciones de objetivos para mostrar al usuario
export const GOAL_OPTIONS = [
    { label: "🏋️ Hipertrofia (ganar músculo definido)", value: "hypertrophy" },
    { label: "📈 Volumen (subir masa y peso corporal)", value: "volume" },
    { label: "🔥 Definición (perder grasa sin perder músculo)", value: "cutting" },
    { label: "💪 Fuerza máxima", value: "strength" },
    { label: "⚡ Potencia explosiva", value: "power" },
    { label: "🏃 Resistencia / Cardio", value: "endurance" },
    { label: "🚀 Rendimiento deportivo", value: "performance" },
    { label: "🥊 Performance combate", value: "combat" },
    { label: "⚽ Performance competitivo", value: "competitive" },
    { label: "🧘 Movilidad y flexibilidad", value: "mobility" },
    { label: "🛠 Rehabilitación / recuperación", value: "rehab" },
    { label: "⚖ Mantenimiento", value: "maintenance" },
    { label: "🌱 Salud general", value: "health" }
];

export function handleUserInput(text: string): string {
    let user: UserProfile = loadUser() || {
        onboardingStep: 0,
        interactionCount: 0,
        discipline: 0.5,
        stress: 0.3,
        sleep: 7,
        energyLevel: 0.7,
        stage: "initial",
        history: []
    };

    // ONBOARDING HANDLER (Professional Implementation)
    if (user.onboardingStep < 5) {
        return handleOnboarding(user, text);
    }

    // CONVERSATIONAL ENGINE
    return respond(user, text);
}

function handleOnboarding(user: UserProfile, text: string): string {
    const step = user.onboardingStep;

    try {
        switch (step) {
            case 0:
                const gender = text.toLowerCase().includes("femenino") ? "female" : "male";
                user.gender = gender;
                user.onboardingStep = 1;
                saveUser(user);
                return `Entendido, eres ${gender === "female" ? "femenina" : "masculino"}. Ahora, dime: ${QUESTIONS[1]}`;

            case 1:
                if (text.toLowerCase().includes("reiniciar") || text.toLowerCase().includes("empezar")) {
                    user.onboardingStep = 0;
                    saveUser(user);
                    return `Perfecto, empecemos de nuevo. ${QUESTIONS[0]}`;
                }
                const sport = mapSport(text);
                if (!sport) {
                    // Intentar detectar variaciones comunes
                    const lowerText = text.toLowerCase().trim();
                    if (lowerText === "mma" || lowerText.includes("mma") || lowerText.includes("artes mixtas")) {
                        user.sport = "mma";
                        user.onboardingStep = 2;
                        saveUser(user);
                        return `Entendido. Vamos por ese objetivo de MMA. Ahora, dime: ${QUESTIONS[2]}`;
                    }
                    return "No logré identificar ese deporte. ¿Podrías decirme qué deporte practicás? (ej: gym, futbol, running, mma, crossfit...)";
                }
                user.sport = sport;
                user.onboardingStep = 2;
                saveUser(user);
                return `Entendido. Vamos por ese objetivo de ${user.sport}. Ahora, dime: ${QUESTIONS[2]}`;

            case 2:
                user.goal = mapGoal(text);
                user.onboardingStep = 3;
                saveUser(user);
                return `Perfecto. Para ser exactos en los cálculos, dime: ${QUESTIONS[3]} (ej: 80, 180, 25)`;

            case 3:
                const parts = text.split(/[\s,]+/).map(p => parseFloat(p));
                if (parts.length < 3) return "Por favor, ingresa los 3 valores (Peso, Altura, Edad).";
                user.weight = parts[0];
                user.height = parts[1];
                user.age = parts[2];
                user.onboardingStep = 4;
                saveUser(user);
                return `Datos guardados. Casi terminamos: ${QUESTIONS[4]}`;

            case 4:
                const discValue = parseInt(text);
                if (isNaN(discValue) || discValue < 1 || discValue > 10) return "Ingresa un número del 1 al 10.";
                user.discipline = discValue / 10;
                user.onboardingStep = 5;
                saveUser(user);

                // Immediate synchronization after onboarding
                syncWithExternalApps(user, "¡Bienvenido! Tu plan personalizado ya está activo.");

                // Final setup response
                return "¡Perfil configurado con éxito! He analizado tus datos y ya tengo listo un plan de nutrición y entrenamiento adaptado a tu deporte. ¿Querés que te muestre los detalles o tenés alguna duda?";

            default:
                return "Error en el sistema. Reiniciando...";
        }
    } catch (e) {
        return "Hubo un error procesando tu respuesta. Intentá de nuevo.";
    }
}

// DOM INTEGRATION
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const chatForm = document.querySelector('.chat-input') as HTMLFormElement;
    const chatInput = document.querySelector('.chat-input input') as HTMLInputElement;

    if (!chatMessages || !chatForm || !chatInput) return;

    function addMessage(text: string, isUser = false) {
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

        // Formatear saltos de línea y bolitas para que se vea profesional
        messageDiv.innerText = text;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTo(0, chatMessages.scrollHeight);
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, true);
        chatInput.value = '';

        // AI thinking simulation
        if (!chatMessages) return;
        
        const thinkingId = "thinking-" + Date.now();
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'message ai-message thinking';
        thinkingDiv.id = thinkingId;
        thinkingDiv.innerText = "Escribiendo...";
        chatMessages.appendChild(thinkingDiv);
        chatMessages.scrollTo(0, chatMessages.scrollHeight);

        setTimeout(() => {
            try {
                const response = handleUserInput(text);
                const thinkingMsg = document.getElementById(thinkingId);
                if (thinkingMsg) thinkingMsg.remove();
                addMessage(response);
            } catch (e) {
                console.error(e);
                const thinkingMsg = document.getElementById(thinkingId);
                if (thinkingMsg) thinkingMsg.remove();
                addMessage("Lo siento, hubo un error técnico. Por favor, refresca la página.");
            }
        }, 800);
    });

    // Initial Greeting
    const user = loadUser();
    if (!user || user.onboardingStep < 5) {
        const step = user ? user.onboardingStep : 0;
        addMessage(`¡Hola! Soy tu coach personal impulsado por IA. Vamos a empezar configurando tu perfil. ${QUESTIONS[step]}`);
    } else {
        const energy = Math.round((user.energyLevel || 0.7) * 100);
        const stageLabel = user.stage === "initial" ? "arranque" : (user.stage === "adaptation" ? "adaptación" : "progreso");
        addMessage(`¡Hola de nuevo! Detecto energía al ${energy}% y estamos en fase de ${stageLabel}. ¿Listo para seguir con tu plan de ${user.sport || 'gym'} hoy?`);
    }
});

console.log("hola");