"use strict";
// ==========================
// 2. ESTADO
// ==========================
let habits = [];
// ==========================
// 3. DOM
// ==========================
const habitList = document.querySelector('#HabitsList');
const newHabitButton = document.getElementById('btnNewHabit');
const btnAiAction = document.getElementById('BtnAiAction');
if (!habitList || !newHabitButton || !btnAiAction) {
    throw new Error('Elementos del DOM no encontrados');
}
// ==========================
// 4. PERSISTENCIA
// ==========================
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}
function loadHabits() {
    const data = localStorage.getItem('habits');
    if (!data)
        return;
    habits = JSON.parse(data);
}
// ==========================
// 5. CRUD
// ==========================
function createHabit(name, description) {
    const habit = {
        id: Date.now(),
        name,
        description,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    habits.push(habit);
    saveHabits();
    renderHabits();
}
function deleteHabit(id) {
    habits = habits.filter(h => h.id !== id);
    saveHabits();
    renderHabits();
}
function editHabit(id, changes) {
    const habit = habits.find(h => h.id === id);
    if (!habit)
        return;
    Object.assign(habit, changes);
    habit.updatedAt = new Date();
    saveHabits();
    renderHabits();
}
// ==========================
// 6. RENDER
// ==========================
function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach(habit => {
        const div = document.createElement('div');
        div.className = 'habit';
        div.dataset.id = habit.id.toString();
        div.innerHTML = `
            <div class="habit-content">
                <input 
                    type="checkbox" 
                    class="habit-check"
                    ${habit.completed ? 'checked' : ''}
                />
                <div class="habit-name">
                    <h3>${habit.name}</h3>
                </div>
                <div class="habit-actions">
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </div>
            </div>
        `;
        habitList.appendChild(div);
    });
}
// ==========================
// 7. EVENTOS
// ==========================
habitList.addEventListener('click', e => {
    const target = e.target;
    const habitElement = target.closest('.habit');
    if (!habitElement)
        return;
    const id = Number(habitElement.dataset.id);
    if (target.classList.contains('btn-delete')) {
        deleteHabit(id);
    }
    if (target.classList.contains('btn-edit')) {
        const habit = habits.find(h => h.id === id);
        if (!habit)
            return;
        const newName = prompt('Nuevo nombre', habit.name);
        if (!newName)
            return;
        const newDescription = prompt('Nueva descripción', habit.description) ?? '';
        editHabit(id, { name: newName, description: newDescription });
    }
    if (target.classList.contains('habit-check')) {
        const habitElement = target.closest('.habit');
        const habitId = Number(habitElement.dataset.id);
        toggleHabit(habitId);
    }
});
newHabitButton.addEventListener('click', () => {
    const name = prompt('Nombre del hábito');
    if (!name)
        return;
    const description = prompt('Descripción') ?? '';
    createHabit(name, description);
});
//checkbox
function toggleHabit(id) {
    const habit = habits.find(h => h.id === id);
    if (!habit)
        return;
    habit.completed = !habit.completed;
    habit.updatedAt = new Date();
    saveHabits();
    renderHabits();
}
//consejos IA
function generateRecommendations(habits) {
    const tips = [];
    if (habits.length === 0) {
        tips.push('Creá tu primer hábito. Empezá simple.');
        return tips;
    }
    const completed = habits.filter(h => h.completed).length;
    const ratio = completed / habits.length;
    if (ratio < 0.3) {
        tips.push('Tus hábitos son muy exigentes. Bajá la dificultad.');
    }
    if (ratio >= 0.3 && ratio < 0.7) {
        tips.push('Vas bien. La constancia es más importante que la intensidad.');
    }
    if (ratio >= 0.7) {
        tips.push('Excelente disciplina. Podés sumar un nuevo hábito.');
    }
    return tips;
}
function analyzeUser(habits) {
    if (habits.length === 0) {
        return {
            consistency: 'low',
            discipline: 0,
            abandonmentRate: 0,
            focus: 'starter',
            completed: 0,
            lastCompleted: null
        };
    }
    const completedHabits = habits.filter(h => h.completed).length;
    const now = Date.now();
    const freshness = habits.reduce((acc, habit) => {
        const timeDiff = now - habit.updatedAt.getTime();
        return acc + timeDiff;
    }, 0) / habits.length;
    return {
        consistency: 'low',
        discipline: 0,
        abandonmentRate: 0,
        focus: 'starter',
        completed: 0,
        lastCompleted: null
    };
}
const aiTips = document.getElementById('aiTips');
btnAiAction.addEventListener('click', () => {
    const tips = generateRecommendations(habits);
    aiTips.innerHTML = '';
    tips.forEach(tip => {
        const p = document.createElement('p');
        p.textContent = tip;
        aiTips.appendChild(p);
    });
});
function buildAIContext(habits) {
    const totalHabits = habits.length;
    const completedHabits = habits.filter(h => h.completed).length;
    const userAnalysis = analyzeUser(habits);
    return {
        habits,
        summary: {
            totalHabits,
            completedHabits,
            consistency: userAnalysis.consistency,
            discipline: userAnalysis.discipline,
            abandonmentRate: userAnalysis.abandonmentRate,
            focus: userAnalysis.focus
        }
    };
}
// ==========================
// 8. INIT
// ==========================
loadHabits();
renderHabits();
//# sourceMappingURL=main.js.map