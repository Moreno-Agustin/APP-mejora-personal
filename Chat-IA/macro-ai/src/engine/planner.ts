import type { UserProfile } from "../types/types.js";
import { buildNutrition } from "../domain/nutrition.js";
import { buildTraining } from "../domain/training.js";
import { buildHabits } from "../domain/habits.js";
import { mentalInsights } from "../domain/psychology.js";
import { getFoodRecommendations } from "../domain/foods.js";

export function buildPlan(user: UserProfile) {
    return {
        nutrition: buildNutrition(user),
        training: buildTraining(user),
        habits: buildHabits(user),
        psychology: mentalInsights(user),
        foods: getFoodRecommendations(user)
    };
}