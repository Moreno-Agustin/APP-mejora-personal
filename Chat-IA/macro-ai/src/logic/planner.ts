import type { UserProfile } from "../types/types.js";

export interface NutritionPlan {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Habit {
  title: string;
  frequency: string;
  priority: "low" | "medium" | "high";
}

export interface TrainingPlan {
  focus: string;
  sessionsPerWeek: number;
}

export interface Plan {
  nutrition: NutritionPlan;
  training: TrainingPlan;
  habits: Habit[];
}

export function buildPlan(user: UserProfile): Plan {
  // 1. Base calórica según arquetipo
  let kcalBase = 2200;

  if (user.archetype === "football") kcalBase = 2600;
  if (user.archetype === "bodybuilding") kcalBase = 2800;

  // 2. Ajuste por nivel
  if (user.targetLevel === "elite") kcalBase += 300;

  // 3. Ajuste por disciplina
  kcalBase *= 0.8 + user.discipline * 0.4;

  // 4. Macros simples (por ahora)
  const protein = Math.round((kcalBase * 0.3) / 4);
  const carbs = Math.round((kcalBase * 0.45) / 4);
  const fat = Math.round((kcalBase * 0.25) / 9);

  // 5. Entrenamiento
  const training: TrainingPlan = {
    focus:
      user.archetype === "football"
        ? "velocidad, resistencia y técnica"
        : user.archetype === "bodybuilding"
          ? "hipertrofia progresiva"
          : "condición general",
    sessionsPerWeek: Math.round(3 + user.discipline * 3),
  };

  // 6. Hábitos según disciplina
  const habits: Habit[] =
    user.discipline < 0.4
      ? [
        { title: "Dormir 7h mínimo", frequency: "diario", priority: "high" },
        { title: "Entrenar siempre mismo horario", frequency: "diario", priority: "high" },
      ]
      : [
        { title: "Planificar comidas", frequency: "semanal", priority: "medium" },
        { title: "Movilidad post entrenamiento", frequency: "diario", priority: "medium" },
      ];

  return {
    nutrition: { kcal: Math.round(kcalBase), protein, carbs, fat },
    training,
    habits,
  };
}
