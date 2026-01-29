

import { extractSignals } from "./logic/nlp";
import { inferProfile } from "./logic/inference";
import { generateResponse } from "./logic/response";
import { loadUser, saveUser, updateUser } from "./data/memory";
import type { UserProfile } from './types/types';

// ==========================
// 1. LÓGICA DE NEGOCIO
// ==========================

function missingInfo(user: UserProfile): string | null {
    if (user.weight == null) {
        return "¿Cuánto pesás actualmente? (en kg)";
    }
    return null;
}

export function handleUserInput(text: string): string {
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

function handleWeightAnswer(text: string): string {
    const weight = parseInt(text, 10);

    if (isNaN(weight)) {
        return "Decime tu peso en números, por ejemplo: 75";
    }

    updateUser({ weight });

    const updatedUser = loadUser()!;
    return (
        "Perfecto. Con eso ya puedo ajustar tu alimentación.\n\n" +
        generateResponse(updatedUser)
    );
}

// ==========================
// 2. INTEGRACIÓN CON EL DOM
// ==========================

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const chatForm = document.querySelector('.chat-input') as HTMLFormElement;
    const chatInput = document.querySelector('.chat-input input') as HTMLInputElement;

    if (!chatMessages || !chatForm || !chatInput) return;

    function addMessage(text: string, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.innerText = text;
        chatMessages?.appendChild(messageDiv);
        chatMessages?.scrollTo(0, chatMessages.scrollHeight);
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
