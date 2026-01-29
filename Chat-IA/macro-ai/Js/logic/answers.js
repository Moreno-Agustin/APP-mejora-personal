import { updateUser } from "../data/memory";
export function handleAnswer(user, text) {
    if (user.weight == null) {
        const weight = parseInt(text, 10);
        if (isNaN(weight))
            return false;
        updateUser({ weight, pendingQuestion: undefined });
        return true;
    }
    return false;
}
