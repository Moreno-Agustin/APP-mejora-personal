// src/response.ts
import type { UserProfile } from "../types/types";

export function generateResponse(profile: UserProfile): string {
  return `
Si tu objetivo es llegar al fútbol ${profile.targetLevel}:

• Disciplina estimada: ${(profile.discipline * 100).toFixed(0)}%
• Peso considerado: ${profile.weight} kg

Vamos paso a paso, priorizando constancia.
  `;
}
