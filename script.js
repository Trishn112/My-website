document.addEventListener("DOMContentLoaded", () => {

    /* ================= MODAL ================= */
    const modal = document.getElementById("contactModal");
    const btn = document.getElementById("contactBtn");
    const closeBtn = document.querySelector(".close");

    btn.addEventListener("click", () => modal.classList.add("show"));
    closeBtn.addEventListener("click", () => modal.classList.remove("show"));

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("show");
    });


    /* ================= TYPING EFFECT ================= */
    const words = ["Python Developer", "AI / ML Learner", "Web Developer"];
    const typingElement = document.getElementById("typing-text");

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!isDeleting) {
            typingElement.textContent = currentWord.slice(0, ++charIndex);
            if (charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 1400);
            }
        } else {
            typingElement.textContent = currentWord.slice(0, --charIndex);
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, isDeleting ? 60 : 100);
    }

    typeEffect();


    /* ================= SKILLS ON SCROLL ================= */
    const skillBoxes = document.querySelectorAll(".skill-box");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-skill");
            }
        });
    }, { threshold: 0.3 });

    skillBoxes.forEach(skill => observer.observe(skill));


    /* ================= INTRO ANIMATION ================= */
    document.querySelector(".home-text").classList.add("intro-show");
});
/* ================= AI BACKGROUND PARTICLES ================= */

const canvas = document.getElementById("ai-bg");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 80;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56,189,248,0.7)";
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.strokeStyle = `rgba(56,189,248,${1 - distance / 120})`;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
}

particles = Array.from({ length: particleCount }, () => new Particle());
animateParticles();
