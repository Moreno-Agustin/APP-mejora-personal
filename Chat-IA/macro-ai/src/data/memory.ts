import type { UserProfile } from "../types/types.js";

const KEY = "sports_ai_user";

export function loadUser(): UserProfile | null {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : null;
}

export function saveUser(user: UserProfile): void {
    localStorage.setItem(KEY, JSON.stringify(user));
}
