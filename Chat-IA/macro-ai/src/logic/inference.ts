// src/inference.ts
import type { Signals, UserProfile } from "../types/types.js";

export function inferProfile(signals: Signals): UserProfile {
    return {
        archetype: signals.archetype ?? "football",
        targetLevel: signals.elite ? "elite" : "amateur",
        discipline: signals.discipline ?? 0.5,
    };
}