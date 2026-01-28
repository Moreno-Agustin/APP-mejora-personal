"use strict";
// ==========================
// 1. DASHBOARD LOGIC
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.presentation-card');
    const nextButtons = document.querySelectorAll('.btn-next');
    const presentation = document.querySelector('.presentation');
    let currentCard = 0;
    nextButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            // Hide current card
            cards[currentCard].classList.remove('active');
            currentCard++;
            if (currentCard < cards.length) {
                // Show next card
                cards[currentCard].classList.add('active');
            }
            else {
                // End presentation
                if (presentation) {
                    presentation.style.display = 'none';
                }
            }
            if (btn.classList.contains('btn-start')) {
                window.location.href = '/Chat-IA/chat.html';
            }
        });
    });
});
//# sourceMappingURL=main.js.map