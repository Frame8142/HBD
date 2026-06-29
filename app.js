// ===== Floating Particles =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = ['#ffb6d2', '#ffc1e3', '#ffd6eb', '#ffe0f0', '#f8bbd0', '#f48fb1'];
    const emojis = ['🌸', '✨', '💖', '🩷', '🎀'];

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const useEmoji = Math.random() > 0.6;
        if (useEmoji) {
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.fontSize = (12 + Math.random() * 14) + 'px';
            particle.style.borderRadius = '0';
        } else {
            const size = 6 + Math.random() * 12;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        }

        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (8 + Math.random() * 12) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';

        container.appendChild(particle);
    }
}

// ===== Confetti Burst =====
function createConfetti() {
    const container = document.getElementById('confettiBurst');
    if (!container) return;

    const colors = ['#ff6ba3', '#ff85b8', '#ffadd2', '#ffc1e3', '#f06292', '#e84d8a', '#ffd54f', '#81d4fa', '#a5d6a7'];
    const shapes = ['circle', 'square', 'star'];

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');

        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 6 + Math.random() * 10;

        piece.style.width = size + 'px';
        piece.style.height = size + 'px';
        piece.style.background = color;
        piece.style.left = Math.random() * 100 + '%';
        piece.style.top = -10 + 'px';
        piece.style.animationDelay = (Math.random() * 1.5) + 's';
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';

        if (shape === 'circle') {
            piece.style.borderRadius = '50%';
        } else if (shape === 'star') {
            piece.textContent = '⭐';
            piece.style.background = 'none';
            piece.style.fontSize = size + 'px';
        }

        container.appendChild(piece);
    }

    // Clean up confetti after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// ===== Screen Transition =====
let transitioned = false;
function showScreen2() {
    if (transitioned) return;
    transitioned = true;

    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');

    // Fade out screen 1
    screen1.classList.add('fade-out');

    setTimeout(() => {
        screen1.classList.remove('active');
        screen2.classList.add('active');

        // Fire confetti
        createConfetti();

        // Staggered reveal of elements
        const title = document.getElementById('birthdayTitle');
        const frame = document.getElementById('grownFrame');
        const badge = document.getElementById('nameBadge');
        const card = document.getElementById('messageCard');
        const msgLines = card.querySelectorAll('.msg-line');
        const msgFooter = card.querySelector('.msg-footer');

        setTimeout(() => title.classList.add('show'), 200);
        setTimeout(() => frame.classList.add('show'), 600);
        setTimeout(() => badge.classList.add('show'), 1000);
        setTimeout(() => card.classList.add('show'), 1300);

        // Stagger message lines
        msgLines.forEach((line, i) => {
            setTimeout(() => line.classList.add('show'), 1600 + i * 400);
        });

        // Footer after all lines
        setTimeout(() => {
            if (msgFooter) msgFooter.classList.add('show');
        }, 1600 + msgLines.length * 400 + 200);

        // Gift button after footer
        const giftBtn = document.getElementById('giftBtn');
        if (giftBtn) {
            setTimeout(() => giftBtn.classList.add('show'), 1600 + msgLines.length * 400 + 600);
        }

    }, 600);
}

// ===== Gift Card Overlay =====
function openGiftOverlay() {
    const overlay = document.getElementById('giftOverlay');
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('massageCard');
    const closeBtn = document.getElementById('giftCloseBtn');

    if (!overlay) return;

    // Show overlay with envelope
    overlay.classList.add('active');

    // Step 1: After a beat, open the envelope
    setTimeout(() => {
        envelope.classList.add('opened');
    }, 800);

    // Step 2: Reveal the card behind
    setTimeout(() => {
        card.classList.add('show');
    }, 1400);

    // Step 3: Show close button
    setTimeout(() => {
        if (closeBtn) closeBtn.classList.add('show');
    }, 2000);
}

function closeGiftOverlay() {
    const overlay = document.getElementById('giftOverlay');
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('massageCard');
    const closeBtn = document.getElementById('giftCloseBtn');

    if (!overlay) return;

    // Reset everything
    if (closeBtn) closeBtn.classList.remove('show');
    card.classList.remove('show');

    setTimeout(() => {
        envelope.classList.remove('opened');
    }, 200);

    setTimeout(() => {
        overlay.classList.remove('active');
    }, 500);
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();

    const heartBtn = document.getElementById('heartBtn');
    if (heartBtn) {
        heartBtn.addEventListener('click', showScreen2);

        // Also support touch
        heartBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            showScreen2();
        }, { passive: false });
    }

    // Gift button
    const giftBtn = document.getElementById('giftBtn');
    if (giftBtn) {
        giftBtn.addEventListener('click', openGiftOverlay);
        giftBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            openGiftOverlay();
        }, { passive: false });
    }

    // Close gift overlay
    const giftCloseBtn = document.getElementById('giftCloseBtn');
    if (giftCloseBtn) {
        giftCloseBtn.addEventListener('click', closeGiftOverlay);
        giftCloseBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            closeGiftOverlay();
        }, { passive: false });
    }

    // Close on overlay background click
    const giftOverlay = document.getElementById('giftOverlay');
    if (giftOverlay) {
        giftOverlay.addEventListener('click', (e) => {
            if (e.target === giftOverlay) {
                closeGiftOverlay();
            }
        });
    }
});
