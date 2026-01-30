import "./nav.js";

// ==========================
// 1. TYPES
// ==========================
interface Habit {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface AIContext {
    habits: Habit[];
    summary: {
        totalHabits: number;
        completedHabits: number;
        consistency: string;
        discipline: number;
        abandonmentRate: number;
        focus: string;
    };
}

// ==========================
// 2. ESTADO ACTUAL
// ==========================
let habits: Habit[] = [];

// ==========================
// 3. ELEMENTOS DEL DOM
// ==========================
const habitList = document.querySelector('#HabitsList') as HTMLElement;
const newHabitButton = document.getElementById('btnNewHabit') as HTMLButtonElement;
const btnAiAction = document.getElementById('BtnAiAction') as HTMLButtonElement;
const aiTips = document.getElementById('aiTips') as HTMLElement;

if (!habitList || !newHabitButton || !btnAiAction) {
    console.error('Elementos del DOM no encontrados');
}

// ==========================
// 4. FUNCIONES AUXILIARES / LÓGICA
// ==========================
function toggleHabit(id: number): void {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    habit.completed = !habit.completed;
    habit.updatedAt = new Date();
    saveHabits();
    renderHabits();
}

function generateRecommendations(habits: Habit[]): string[] {
    const tips: string[] = [];
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

// ==========================
// 5. CRUD (CREATE/UPDATE/DELETE)
// ==========================
function createHabit(name: string, description: string): void {
    const habit: Habit = {
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

function deleteHabit(id: number): void {
    habits = habits.filter(h => h.id !== id);
    saveHabits();
    renderHabits();
}

function editHabit(id: number, changes: Partial<Habit>): void {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    Object.assign(habit, changes);
    habit.updatedAt = new Date();
    saveHabits();
    renderHabits();
}

// ==========================
// 6. RENDERIZADO
// ==========================
function renderHabits(): void {
    if (!habitList) return;
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
// 7. EVENT LISTENERS
// ==========================
habitList?.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const habitElement = target.closest('.habit') as HTMLElement;
    if (!habitElement) return;

    const id = Number(habitElement.dataset.id);

    if (target.classList.contains('btn-delete')) {
        deleteHabit(id);
    }

    if (target.classList.contains('btn-edit')) {
        const habit = habits.find(h => h.id === id);
        if (!habit) return;
        const newName = prompt('Nuevo nombre', habit.name);
        if (!newName) return;
        const newDescription = prompt('Nueva descripción', habit.description) ?? '';
        editHabit(id, { name: newName, description: newDescription });
    }

    if (target.classList.contains('habit-check')) {
        const hId = Number(habitElement.dataset.id);
        toggleHabit(hId);
    }
});

newHabitButton?.addEventListener('click', () => {
    const name = prompt('Nombre del hábito');
    if (!name) return;
    const description = prompt('Descripción') ?? '';
    createHabit(name, description);
});

btnAiAction?.addEventListener('click', () => {
    const tips = generateRecommendations(habits);
    if (!aiTips) return;
    aiTips.innerHTML = '';
    tips.forEach(tip => {
        const p = document.createElement('p');
        p.style.marginBottom = "10px";
        p.style.animation = "fadeIn 0.5s ease-out";
        p.textContent = tip;
        aiTips.appendChild(p);
    });
});

// ==========================
// 8. PERSISTENCIA
// ==========================
function saveHabits(): void {
    localStorage.setItem('habits', JSON.stringify(habits));
}

function loadHabits(): void {
    const data = localStorage.getItem('habits');
    if (!data) return;
    habits = JSON.parse(data);
}

// ==========================
// 9. INIT
// ==========================
loadHabits();
renderHabits();

window.addEventListener('focus', () => {
    loadHabits();
    renderHabits();
});
