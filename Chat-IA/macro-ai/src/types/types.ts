export type Sport =
    | "football" | "basketball" | "gym" | "crossfit" | "running" | "cycling"
    | "martial" | "swimming" | "tennis" | "yoga" | "rugby" | "padel"
    | "handball" | "hockey" | "volley" | "waterpolo" | "baseball" | "softball"
    | "lacrosse" | "cricket" | "ultimate_frisbee"
    | "athletics" | "marathon" | "triathlon" | "duathlon" | "rowing" | "kayak"
    | "xc_skiing" | "speed_skating"
    | "powerlifting" | "weightlifting" | "strongman" | "calisthenics" | "street_workout" | "gymnastics"
    | "boxing" | "kickboxing" | "muay_thai" | "mma" | "bjj" | "wrestling" | "judo"
    | "taekwondo" | "karate" | "sambo" | "fencing"
    | "squash" | "badminton" | "ping_pong" | "golf" | "shooting" | "archery"
    | "bowling" | "billiards"
    | "surf" | "kitesurf" | "windsurf" | "skateboarding" | "snowboard" | "alpine_skiing"
    | "climbing" | "boulder" | "alpinism" | "paragliding"
    | "artistic_swimming" | "diving" | "apnea" | "paddle_surf"
    | "fitness" | "functional_training" | "hiit" | "pilates" | "barre" | "mobility" | "stretching" | "rehab";

export type Goal = "performance" | "muscle" | "fat_loss" | "health" | "elite_performance" | "strength" | "toning" | "maintenance" | "rehab" | "endurance" | "power" | "agility" | "flexibility" | "volumen";
export type Level = "beginner" | "intermediate" | "advanced" | "recreational" | "competitive" | "elite";
export type ProcessStage = "initial" | "adaptation" | "progress" | "optimization" | "excellence";

export interface ConversationThread {
    timestamp: number;
    summary: string;
}

export interface UserProfile {
    // Physical Data
    sport?: Sport;
    weight?: number;
    height?: number;
    age?: number;
    goal?: Goal;
    level?: Level;
    gender?: "male" | "female";

    // Dynamic State (Self-Learning indicators)
    discipline: number; // 0–1
    stress: number;     // 0–1
    sleep: number;      // average hours
    energyLevel: number; // 0-1 (updated by chat)

    // AI Coach Context
    onboardingStep: number;
    stage: ProcessStage;
    lastFeedback?: "too_hard" | "too_easy" | "good";
    interactionCount: number;
    lastInteraction?: number;
    history: ConversationThread[];
    pendingSportChange?: boolean;
    pendingGoalChange?: boolean;

    // Physical & Context
    prefersHomeWorkout?: boolean;
    vegan?: boolean;
    injuries?: string[];
    dailyActivity?: "sedentary" | "light" | "active" | "very_active";
    
    // System flags
    clearStorage?: boolean; // New: Flag to clear localStorage
    newSport?: string; // New: New sport for recreation
}

export interface Intent {
    category: "nutrition" | "training" | "habits" | "mood" | "onboarding" | "unknown";
    sentiment: "positive" | "negative" | "neutral";
    urgency: number; // 0-1
    entities: string[];
}

export interface AIReasoning {
    advice: string;
    suggestedChanges?: Partial<UserProfile>;
    requiresClarification?: boolean; // New: Flag to ask user for more info
    clearStorage?: boolean; // New: Flag to clear localStorage
    newSport?: string; // New: New sport for recreation
}
