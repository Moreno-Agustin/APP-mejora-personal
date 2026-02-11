import { Level, UserProfile } from "../types/types.js";

function isLevel(x: string): x is Level {
    return ["beginner", "intermediate", "advanced", "recreational", "competitive", "elite"].includes(x);
}

export function setUserLevel(user: Partial<UserProfile>, lvl: string): boolean {
    if (isLevel(lvl)) {
        user.level = lvl;
        return true;
    }
    return false;
}

export function appendMessageSafe(chatMessages: HTMLElement | null, messageDiv: HTMLElement) {
    if (!chatMessages) return;
    // appendChild and scrollTo are safe now because of the null-check
    chatMessages.appendChild(messageDiv);
    try {
        // scrollTo may not exist on older elements but most browsers support it
        // fallback to scrollTop if needed
        if (typeof (chatMessages as any).scrollTo === 'function') {
            (chatMessages as any).scrollTo(0, chatMessages.scrollHeight);
        } else {
            (chatMessages as any).scrollTop = chatMessages.scrollHeight;
        }
    } catch (e) {
        console.warn('Scrolling failed', e);
    }
}

export default function ChatWidget() {
    // Placeholder: This file exposes safe helpers for legacy code.
    return null as any;
}
