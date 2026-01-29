export function extractSignals(text) {
    const t = text.toLowerCase();
    return {
        archetype: t.includes("futbol") ? "football" : undefined,
        elite: t.includes("elite"),
        discipline: t.includes("me cuesta") || t.includes("poca disciplina")
            ? 0.3
            : t.includes("disciplinado")
                ? 0.8
                : 0.5
    };
}
