import type { Signals } from "../types/types.js";

export function extractSignals(text: string): Signals {
    const t = text.toLowerCase();

    return {
        archetype: t.includes("futbol") ? "football" : undefined,
        elite: t.includes("elite"),
        discipline:
            t.includes("me cuesta") || t.includes("poca disciplina")
                ? 0.3
                : t.includes("disciplinado")
                    ? 0.8
                    : 0.5
    };
}
