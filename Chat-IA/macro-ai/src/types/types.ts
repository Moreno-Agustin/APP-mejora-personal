// src/types.ts

export type Archetype = "football" | "bodybuilding" | "fitness";
export type pendingQuestion = "weight" | null;

export interface Signals {
    archetype?: Archetype;
    elite?: boolean;
    discipline?: number; // 0.0 – 1.0
}

export interface UserProfile {
    archetype: Archetype;
    targetLevel: "elite" | "amateur";
    discipline: number;
    weight?: number;

    pendingQuestion?: "weight";
}