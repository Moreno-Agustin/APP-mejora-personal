import type { UserProfile } from "../types/types";
import { updateUser } from "../data/memory";

export function handleAnswer(user: UserProfile, text: string): boolean {
    if (user.weight == null) {
        const weight = parseInt(text, 10);
        if (isNaN(weight)) return false;

        updateUser({ weight, pendingQuestion: undefined });
        return true;
    }
    return false;
}
