export function getNextQuestion(user) {
    if (user.weight == null) {
        return "¿Cuánto pesás actualmente? (en kg)";
    }
    return null;
}
