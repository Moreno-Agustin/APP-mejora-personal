import type { UserProfile } from "../types/types";

const STORAGE_KEY = "macro_tracker_user";

export function loadUser(): UserProfile | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
}

export function saveUser(profile: UserProfile) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function updateUser(partial: Partial<UserProfile>) {
    const user = loadUser();
    if (!user) return;

    const updated = { ...user, ...partial };
    saveUser(updated);
}
