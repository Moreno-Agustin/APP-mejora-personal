export function learnFromInteraction(user, intent, text) {
    const updatedUser = { ...user };
    const t = text.toLowerCase();
    // 1. Increment interaction count
    updatedUser.interactionCount = (updatedUser.interactionCount || 0) + 1;
    // 2. Adjust discipline baseline
    if (intent.sentiment === "positive" && intent.category === "habits") {
        updatedUser.discipline = Math.min(1, updatedUser.discipline + 0.05);
    }
    else if (intent.sentiment === "negative" && t.includes("no pude")) {
        updatedUser.discipline = Math.max(0, updatedUser.discipline - 0.02);
    }
    // 3. Simple Pattern Recognition for Sleep/Stress (Mental reasoning)
    if (t.includes("dormi mal") || t.includes("poco sueño")) {
        updatedUser.sleep = Math.max(4, (updatedUser.sleep || 7) - 1);
    }
    else if (t.includes("dormi genial") || t.includes("descanse")) {
        updatedUser.sleep = Math.min(9, (updatedUser.sleep || 7) + 1);
    }
    if (t.includes("estres") || t.includes("trabajo mucho")) {
        updatedUser.stress = Math.min(1, updatedUser.stress + 0.1);
    }
    // 4. Energy level tracking
    if (intent.sentiment === "negative")
        updatedUser.energyLevel = Math.max(0.2, updatedUser.energyLevel - 0.1);
    if (intent.sentiment === "positive")
        updatedUser.energyLevel = Math.min(1, updatedUser.energyLevel + 0.1);
    // 5. Memory & History (Limited to last 5 key interactions)
    const keyEntities = intent.entities.filter(e => e.includes("change") || e.includes("injury") || e.includes("goal"));
    const entityTag = keyEntities.length > 0 ? ` [${keyEntities.join(",")}]` : "";
    const summary = `${intent.category}${entityTag}: ${text.substring(0, 30)}...`;
    if (!updatedUser.history)
        updatedUser.history = [];
    updatedUser.history.push({ timestamp: Date.now(), summary });
    if (updatedUser.history.length > 5)
        updatedUser.history.shift();
    // Set pending flags
    if (intent.entities.includes("sport_change")) {
        updatedUser.pendingSportChange = true;
    }
    if (intent.entities.includes("goal_change")) {
        updatedUser.pendingGoalChange = true;
    }
    // 6. Stage Auto-Progression
    if (updatedUser.interactionCount > 10 && updatedUser.stage === "initial")
        updatedUser.stage = "adaptation";
    if (updatedUser.interactionCount > 30 && updatedUser.stage === "adaptation")
        updatedUser.stage = "progress";
    if (updatedUser.interactionCount > 100 && updatedUser.stage === "progress")
        updatedUser.stage = "optimization";
    return updatedUser;
}
//# sourceMappingURL=learning.js.map