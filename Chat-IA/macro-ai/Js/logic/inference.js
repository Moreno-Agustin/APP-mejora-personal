export function inferProfile(signals) {
    return {
        archetype: signals.archetype ?? "football",
        targetLevel: signals.elite ? "elite" : "amateur",
        discipline: signals.discipline ?? 0.5,
    };
}
