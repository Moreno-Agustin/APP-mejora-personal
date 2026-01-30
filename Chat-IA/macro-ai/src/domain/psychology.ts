import type { UserProfile } from "../types/types.js";

export function mentalInsights(user: UserProfile): string[] {
  const notes: string[] = [];

  if (user.discipline! < 0.6)
    notes.push("Reducir fricción: entrenar siempre a la misma hora");

  if (user.stress! > 0.7)
    notes.push("Respiración 5 min post-entreno");

  if (user.sleep! < 7)
    notes.push("Priorizar sueño antes que volumen");

  return notes;
}
