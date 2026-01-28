import '../Sass/style.scss';
// src/index.ts
// Global error handlers (dev only)
if (import.meta.env.DEV) {
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
}
import { extractSignals } from "./logic/nlp";
import { inferProfile } from "./logic/inference";
import { generateResponse } from "./logic/response";
import { loadUser, saveUser, updateUser } from "./data/memory";
// ==========================
// 1. LÓGICA DE NEGOCIO
// ==========================
function missingInfo(user) {
    if (!user.weight) {
        return "¿Cuánto pesás actualmente? (en kg)?";
    }
    return null;
}
export function handleUserInput(text) {
    let user = loadUser();
    // 1. Si no hay usuario, creamos uno con la primera respuesta
    if (!user) {
        const signals = extractSignals(text);
        user = inferProfile(signals);
        saveUser(user);
        // Verificamos si falta algo justo después de crear
        const question = missingInfo(user);
        return question || generateResponse(user);
    }
    // 2. Si ya hay usuario y faltaba el peso, esta respuesta DEBE ser el peso
    if (!user.weight) {
        return handleWeightAnswer(text);
    }
    // 3. Si ya tenemos todo, respondemos normal
    return generateResponse(user);
}
function handleWeightAnswer(text) {
    const weight = parseInt(text);
    if (isNaN(weight)) {
        return "Decime tu peso en números, por ejemplo: 75";
    }
    updateUser({ weight });
    return "Perfecto. Con eso ya puedo ajustar tu alimentación.\n\n" + generateResponse(loadUser());
}
// ==========================
// 2. INTEGRACIÓN CON EL DOM
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    try {
        const chatMessages = document.getElementById('chatMessages');
        const chatForm = document.querySelector('.chat-input');
        const chatInput = document.querySelector('.chat-input input');
        if (!chatMessages || !chatForm || !chatInput)
            return;
        function addMessage(text, isUser = false) {
            try {
                const container = chatMessages;
                if (!container)
                    return;
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
                // Preserve newlines
                messageDiv.innerText = text;
                container.appendChild(messageDiv);
                container.scrollTo(0, container.scrollHeight);
            }
            catch (e) {
                console.error('addMessage failed:', e);
            }
        }
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            try {
                const text = chatInput.value.trim();
                if (!text)
                    return;
                addMessage(text, true);
                chatInput.value = '';
                // Simular pensamiento de IA
                setTimeout(() => {
                    try {
                        const response = handleUserInput(text);
                        addMessage(response);
                    }
                    catch (err) {
                        console.error('Error handling user input:', err);
                        addMessage('⚠️ Ocurrió un error procesando tu mensaje. Intentá nuevamente.');
                    }
                }, 600);
            }
            catch (err) {
                console.error('Submit handler error:', err);
            }
        });
        // Saludo inicial si es un usuario totalmente nuevo
        try {
            if (!loadUser()) {
                addMessage("¡Hola! Soy tu asistente de Macro Tracker. Contame un poco sobre vos: ¿Qué deporte hacés? ¿Buscás llegar a la élite o mejorar tu salud?");
            }
            else {
                const user = loadUser();
                const question = missingInfo(user);
                if (question) {
                    addMessage("Hola de nuevo. Para completar tu perfil: " + question);
                }
                else {
                    addMessage("Hola de nuevo. Ya tengo tu perfil listo. ¿Querés reajustar algo o ver tus recomendaciones?");
                }
            }
        }
        catch (err) {
            console.error('Initial greeting error:', err);
        }
    }
    catch (err) {
        console.error('DOM ready handler failed:', err);
    }
});
