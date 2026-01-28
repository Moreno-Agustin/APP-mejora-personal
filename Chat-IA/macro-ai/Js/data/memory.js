const STORAGE_KEY = "macro_tracker_user";
export function loadUser() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
}
export function saveUser(profile) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
export function updateUser(partial) {
    const user = loadUser();
    if (!user)
        return;
    const updated = { ...user, ...partial };
    saveUser(updated);
}
