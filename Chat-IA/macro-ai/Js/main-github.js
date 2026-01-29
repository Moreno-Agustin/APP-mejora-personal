// ==========================
// CONFIGURACIÓN PARA GITHUB PAGES
// ==========================

// Cargar estilos manualmente para GitHub Pages
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'Css/style.css';
document.head.appendChild(link);

// Global error handlers
window.addEventListener('error', (ev) => {
    console.error('Global error caught:', ev.error || ev.message);
    try {
        const chatMessagesEl = document.getElementById('chatMessages');
        if (chatMessagesEl) {
            const d = document.createElement('div');
            d.className = 'message ai-message';
            d.innerText = '⚠️ Error: ' + (ev.error?.message || ev.message || 'Unknown');
            chatMessagesEl.appendChild(d);
        }
    }
    catch (e) { /* ignore */ }
});

window.addEventListener('unhandledrejection', (ev) => {
    console.error('Unhandled rejection:', ev.reason);
    try {
        const chatMessagesEl = document.getElementById('chatMessages');
        if (chatMessagesEl) {
            const d = document.createElement('div');
            d.className = 'message ai-message';
            d.innerText = '⚠️ Promise rejection: ' + (ev.reason?.toString?.() || String(ev.reason));
            chatMessagesEl.appendChild(d);
        }
    }
    catch (e) { /* ignore */ }
});

// ==========================
// MÓDULOS INCLUIDOS MANUALMENTE
// ==========================

// NLP Module
function extractSignals(text) {
    const t = text.toLowerCase();
    return {
        archetype: t.includes("futbol") ? "football" : t.includes("gimnasio") || t.includes("musculación") ? "bodybuilding" : "fitness",
        elite: t.includes("elite"),
        discipline: t.includes("me cuesta") || t.includes("poca disciplina")
            ? 0.3
            : t.includes("disciplinado")
                ? 0.8
                : 0.5
    };
}

// Inference Module
function inferProfile(signals) {
    return {
        archetype: signals.archetype ?? "fitness",
        targetLevel: signals.elite ? "elite" : "amateur",
        discipline: signals.discipline ?? 0.5,
    };
}

// Planner Module
function buildPlan(user) {
    // 1. Base calórica según arquetipo
    let kcalBase = 2200;
    if (user.archetype === "football")
        kcalBase = 2600;
    if (user.archetype === "bodybuilding")
        kcalBase = 2800;
    // 2. Ajuste por nivel
    if (user.targetLevel === "elite")
        kcalBase += 300;
    // 3. Ajuste por disciplina
    kcalBase *= 0.8 + user.discipline * 0.4;
    // 4. Macros simples
    const protein = Math.round((kcalBase * 0.3) / 4);
    const carbs = Math.round((kcalBase * 0.45) / 4);
    const fat = Math.round((kcalBase * 0.25) / 9);
    // 5. Entrenamiento
    const training = {
        focus: user.archetype === "football"
            ? "velocidad, resistencia y técnica"
            : user.archetype === "bodybuilding"
                ? "hipertrofia progresiva"
                : "condición general",
        sessionsPerWeek: Math.round(3 + user.discipline * 3),
    };
    // 6. Hábitos según disciplina
    const habits = user.discipline < 0.4
        ? [
            { title: "Dormir 7h mínimo", frequency: "diario", priority: "high" },
            { title: "Entrenar siempre mismo horario", frequency: "diario", priority: "high" },
        ]
        : [
            { title: "Planificar comidas", frequency: "semanal", priority: "medium" },
            { title: "Movilidad post entrenamiento", frequency: "diario", priority: "medium" },
        ];
    return {
        nutrition: { kcal: Math.round(kcalBase), protein, carbs, fat },
        training,
        habits,
    };
}

// Response Module
function generateResponse(profile) {
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

// Memory Module
const STORAGE_KEY = "macro_tracker_user";
function loadUser() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
}
function saveUser(profile) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
function updateUser(partial) {
    const user = loadUser();
    if (!user)
        return;
    const updated = { ...user, ...partial };
    saveUser(updated);
}

// ==========================
// 1. LÓGICA DE NEGOCIO
// ==========================
function missingInfo(user) {
    if (user.weight == null) {
        return "¿Cuánto pesás actualmente? (en kg)";
    }
    return null;
}

function handleUserInput(text) {
    let user = loadUser();

    // 1. Usuario nuevo
    if (!user) {
        const signals = extractSignals(text);
        user = inferProfile(signals);
        saveUser(user);

        const question = missingInfo(user);
        return question ?? generateResponse(user);
    }

    // 2. Esperamos el peso
    if (user.weight == null) {
        return handleWeightAnswer(text);
    }

    // 3. Flujo normal
    return generateResponse(user);
}

function handleWeightAnswer(text) {
    const weight = parseInt(text, 10);

    if (isNaN(weight)) {
        return "Decime tu peso en números, por ejemplo: 75";
    }

    updateUser({ weight });
    const updatedUser = loadUser();
    return "Perfecto. Con eso ya puedo ajustar tu alimentación.\n\n" + generateResponse(updatedUser);
}

// ==========================
// 2. INTEGRACIÓN CON EL DOM
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const chatForm = document.querySelector('.chat-input');
    const chatInput = document.querySelector('.chat-input input');
    
    if (!chatMessages || !chatForm || !chatInput) return;

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
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

        setTimeout(() => {
            const response = handleUserInput(text);
            addMessage(response);
        }, 600);
    });

    // Mensaje inicial
    const user = loadUser();
    
    if (!user) {
        addMessage(
            "¡Hola! Soy tu asistente de Macro Tracker. Contame un poco sobre vos: ¿qué deporte hacés y qué objetivo tenés?"
        );
    } else {
        const question = missingInfo(user);
        addMessage(
            question
                ? "Hola de nuevo. Para completar tu perfil: " + question
                : "Hola de nuevo. Ya tengo tu perfil listo. ¿Querés reajustar algo o ver recomendaciones?"
        );
    }
});
