// Estado da aplicação
let currentCardIndex = 0;
const totalCards = 3;

// Elementos do DOM
const welcomeScreen = document.getElementById('welcomeScreen');
const galleryContainer = document.getElementById('galleryContainer');
const startButton = document.getElementById('startButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const currentCardSpan = document.getElementById('currentCard');
const cards = document.querySelectorAll('.card');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateCardDisplay();
    updateNavigationButtons();
});

// Evento do botão de início
startButton.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    setTimeout(() => {
        galleryContainer.classList.add('visible');
    }, 300);
});

// Navegação - Botão Anterior
prevButton.addEventListener('click', () => {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateCardDisplay();
        updateNavigationButtons();
        animateCardTransition('prev');
    }
});

// Navegação - Botão Próximo
nextButton.addEventListener('click', () => {
    if (currentCardIndex < totalCards - 1) {
        currentCardIndex++;
        updateCardDisplay();
        updateNavigationButtons();
        animateCardTransition('next');
    }
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (!welcomeScreen.classList.contains('hidden')) return;
    
    if (e.key === 'ArrowLeft') {
        prevButton.click();
    } else if (e.key === 'ArrowRight') {
        nextButton.click();
    }
});

// Suporte para swipe em dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

const cardsWrapper = document.querySelector('.cards-wrapper');

cardsWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: false });

cardsWrapper.addEventListener('touchmove', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    
    const diffX = Math.abs(touchStartX - touchEndX);
    const diffY = Math.abs(touchStartY - touchEndY);
    
    // Se o movimento horizontal for maior que o vertical, previne o scroll da página
    if (diffX > diffY) {
        e.preventDefault();
    }
}, { passive: false });

cardsWrapper.addEventListener('touchend', (e) => {
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    
    // Só processa swipe horizontal se o movimento horizontal for maior que o vertical
    if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
        if (diffX > 0) {
            // Swipe left (próximo)
            nextButton.click();
        } else {
            // Swipe right (anterior)
            prevButton.click();
        }
    }
}

// Atualizar display dos cards
function updateCardDisplay() {
    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');
        
        if (index === currentCardIndex) {
            card.classList.add('active');
        } else if (index === currentCardIndex - 1) {
            card.classList.add('prev');
        } else if (index === currentCardIndex + 1) {
            card.classList.add('next');
        }
    });
    
    currentCardSpan.textContent = currentCardIndex + 1;
}

// Atualizar estado dos botões de navegação
function updateNavigationButtons() {
    prevButton.disabled = currentCardIndex === 0;
    nextButton.disabled = currentCardIndex === totalCards - 1;
}

// Animação de transição entre cards
function animateCardTransition(direction) {
    const activeCard = document.querySelector('.card.active');
    
    if (activeCard) {
        activeCard.style.animation = 'none';
        setTimeout(() => {
            activeCard.style.animation = '';
        }, 10);
    }
}



// Adicionar efeito de hover nos cards
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (card.classList.contains('active')) {
            card.style.transform = 'translateX(0) scale(1.02) rotateY(0deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('active')) {
            card.style.transform = 'translateX(0) scale(1) rotateY(0deg)';
        }
    });
});

// Preload de imagens
function preloadImages() {
    const images = [
        'images/the only one.png',
        'images/thank you.png',
        'images/ten years gone.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();
