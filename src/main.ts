document.addEventListener('DOMContentLoaded', () => {
    // --- Presentation Logic ---
    const comenzarButton = document.querySelector('.comenzar') as HTMLElement;
    const cards = document.querySelectorAll('.presentation-card');
    const nextButtons = document.querySelectorAll('.btn-next');
    const presentation = document.querySelector('.presentation') as HTMLElement;
    let currentCard = 0;

    nextButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            cards[currentCard].classList.remove('active');
            currentCard++;
            if (currentCard < cards.length) {
                cards[currentCard].classList.add('active');
            } else {
                if (presentation) {
                    presentation.style.display = 'none';
                    // Save that presentation was seen
                    localStorage.setItem('presentationSeen', 'true');
                }
            }
        });
    });
    comenzarButton.addEventListener('click', () => {
        if (presentation) {
            presentation.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'Chat-IA/macro-ai/index.html';
            }, 600);
        } else {
            window.location.href = 'Chat-IA/macro-ai/index.html';
        }
    })

    // Persistent presentation check
    if (localStorage.getItem('presentationSeen') === 'true' && presentation) {
        presentation.style.display = 'none';
    }


});