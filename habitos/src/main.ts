// ==========================
// 1. MODELO / INTERFACES
// ==========================
interface Habit {
    id: number
    name: string
    description: string
    completed: boolean
    createdAt: Date
    updatedAt: Date
}

interface UserProfile {
    consistency: 'low' | 'medium' | 'high'
    discipline: number
    abandonmentRate: number
    focus: 'starter' | 'maintainer'
    completed: number
    lastCompleted: Date | null
}

type aicontent = {
    habits: Habit[]
    summary: {
        totalHabits: number
        completedHabits: number
        consistency: 'low' | 'medium' | 'high'
        discipline: number
        abandonmentRate: number
        focus: 'starter' | 'maintainer'
    }
}

// ==========================
// 2. ESTADO ACTUAL
// ==========================
let habits: Habit[] = []

// ==========================
// 3. ELEMENTOS DEL DOM
// ==========================
const habitList = document.querySelector('#HabitsList') as HTMLElement
const newHabitButton = document.getElementById('btnNewHabit') as HTMLButtonElement
const btnAiAction = document.getElementById('BtnAiAction') as HTMLButtonElement
const aiTips = document.getElementById('aiTips') as HTMLDivElement

if (!habitList || !newHabitButton || !btnAiAction) {
    throw new Error('Elementos del DOM no encontrados')
}

// ==========================
// 4. FUNCIONES AUXILIARES / LÓGICA
// ==========================
function toggleHabit(id: number) {
    const habit = habits.find(h => h.id === id)
    if (!habit) return

    habit.completed = !habit.completed
    habit.updatedAt = new Date()
    saveHabits()
    renderHabits()
}

function generateRecommendations(habits: Habit[]): string[] {
    const tips: string[] = []

    if (habits.length === 0) {
        tips.push('Creá tu primer hábito. Empezá simple.')
        return tips
    }

    const completed = habits.filter(h => h.completed).length
    const ratio = completed / habits.length

    if (ratio < 0.3) {
        tips.push('Tus hábitos son muy exigentes. Bajá la dificultad.')
    }

    if (ratio >= 0.3 && ratio < 0.7) {
        tips.push('Vas bien. La constancia es más importante que la intensidad.')
    }

    if (ratio >= 0.7) {
        tips.push('Excelente disciplina. Podés sumar un nuevo hábito.')
    }

    return tips
}

function analyzeUser(habits: Habit[]): UserProfile {
    if (habits.length === 0) {
        return {
            consistency: 'low',
            discipline: 0,
            abandonmentRate: 0,
            focus: 'starter',
            completed: 0,
            lastCompleted: null
        }
    }

    const now = Date.now()

    return {
        consistency: 'low',
        discipline: 0,
        abandonmentRate: 0,
        focus: 'starter',
        completed: 0,
        lastCompleted: null
    }

}

function buildAIContext(habits: Habit[]): aicontent {
    const totalHabits = habits.length
    const completedHabits = habits.filter(h => h.completed).length
    const userAnalysis = analyzeUser(habits)

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
    }
}

// ==========================
// 5. CRUD (CREATE/UPDATE/DELETE)
// ==========================
function createHabit(name: string, description: string) {
    const habit: Habit = {
        id: Date.now(),
        name,
        description,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    habits.push(habit)
    saveHabits()
    renderHabits()
}

function deleteHabit(id: number) {
    habits = habits.filter(h => h.id !== id)
    saveHabits()
    renderHabits()
}

function editHabit(id: number, changes: Partial<Omit<Habit, 'id' | 'createdAt'>>) {
    const habit = habits.find(h => h.id === id)
    if (!habit) return

    Object.assign(habit, changes)
    habit.updatedAt = new Date()
    saveHabits()
    renderHabits()
}

// ==========================
// 6. RENDERIZADO
// ==========================
function renderHabits() {
    habitList.innerHTML = ''

    habits.forEach(habit => {
        const div = document.createElement('div')
        div.className = 'habit'
        div.dataset.id = habit.id.toString()

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
        `

        habitList.appendChild(div)
    })
}

// ==========================
// 7. EVENT LISTENERS
// ==========================
habitList.addEventListener('click', e => {
    const target = e.target as HTMLElement
    const habitElement = target.closest('.habit') as HTMLElement
    if (!habitElement) return

    const id = Number(habitElement.dataset.id)

    if (target.classList.contains('btn-delete')) {
        deleteHabit(id)
    }

    if (target.classList.contains('btn-edit')) {
        const habit = habits.find(h => h.id === id)
        if (!habit) return

        const newName = prompt('Nuevo nombre', habit.name)
        if (!newName) return

        const newDescription = prompt('Nueva descripción', habit.description) ?? ''

        editHabit(id, { name: newName, description: newDescription })
    }

    if (target.classList.contains('habit-check')) {
        const habitElement = target.closest('.habit') as HTMLDivElement
        const habitId = Number(habitElement.dataset.id)

        toggleHabit(habitId)
    }
})

newHabitButton.addEventListener('click', () => {
    const name = prompt('Nombre del hábito')
    if (!name) return

    const description = prompt('Descripción') ?? ''
    createHabit(name, description)
})

btnAiAction.addEventListener('click', () => {
    const tips = generateRecommendations(habits)

    aiTips.innerHTML = ''
    tips.forEach(tip => {
        const p = document.createElement('p')
        p.textContent = tip
        aiTips.appendChild(p)
    })
})

// ==========================
// 8. PERSISTENCIA
// ==========================
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits))
}

function loadHabits() {
    const data = localStorage.getItem('habits')
    if (!data) return

    habits = JSON.parse(data)
}

// ==========================
// 9. INIT
// ==========================
loadHabits()
renderHabits()



