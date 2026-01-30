const KEY = "sports_ai_user";
export function loadUser() {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : null;
}
export function saveUser(user) {
    localStorage.setItem(KEY, JSON.stringify(user));
}
