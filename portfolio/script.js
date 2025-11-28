// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');

window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
});

// Hover effects for cursor
const hoverElements = document.querySelectorAll('a, button, .project-item');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorDot.style.mixBlendMode = 'difference';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.mixBlendMode = 'difference';
    });
});

// Glitch Text Effect on Load
const glitchText = document.querySelector('.glitch-text');
const originalText = glitchText.innerText;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*';

let iterations = 0;
const interval = setInterval(() => {
    glitchText.innerText = glitchText.innerText.split('')
        .map((letter, index) => {
            if (index < iterations) {
                return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

    if (iterations >= originalText.length) {
        clearInterval(interval);
        // Restore breaks
        glitchText.innerHTML = "BUILDING<br>SCALABLE<br>SYSTEMS";
    }

    iterations += 1 / 3;
}, 30);

// Scroll Reveal
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title, .project-item, .exp-item, .edu-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
});

// Add reveal class style dynamically
const style = document.createElement('style');
style.innerHTML = `
    .reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
