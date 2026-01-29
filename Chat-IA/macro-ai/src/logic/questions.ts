import type { UserProfile } from "../types/types";

export function getNextQuestion(user: UserProfile): string | null {
    if (user.weight == null) {
        return "¿Cuánto pesás actualmente? (en kg)";
    }
    return null;
}