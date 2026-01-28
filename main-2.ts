// ==========================
// 1. DASHBOARD LOGIC
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.presentation-card')
    const nextButtons = document.querySelectorAll('.btn-next')
    const presentation = document.querySelector('.presentation') as HTMLElement

    const STORAGE_KEY = 'onboarding_completed'
    let currentCard = 0

    // ==========================
    // 2. CHECK INICIAL
    // ==========================
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
        presentation.style.display = 'none'
        return
    }

    // Mostrar solo la primera carta
    cards[0].classList.add('active')

    // ==========================
    // 3. EVENTOS
    // ==========================
    nextButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            cards[currentCard].classList.remove('active')
            currentCard++

            if (currentCard < cards.length) {
                cards[currentCard].classList.add('active')
            } else {
                // Fin de la presentación
                localStorage.setItem(STORAGE_KEY, 'true')
                presentation.style.display = 'none'
            }
        })
    })
})
