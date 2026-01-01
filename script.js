// JS CODE
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

// Paragraph typing animation
const paraText = `I am Trishn Shukla, a motivated and detail-oriented student with a strong foundation in programming and problem-solving, and a growing interest in Artificial Intelligence and Machine Learning.`;

const paraElement = document.getElementById("typing-para");

let paraIndex = 0;

function typeParagraph() {
    if (paraIndex < paraText.length) {
        paraElement.innerHTML += paraText.charAt(paraIndex);
        paraIndex++;
        setTimeout(typeParagraph, 25); // speed (lower = faster)
    }
}

// Start animation when page loads
window.addEventListener("load", typeParagraph);

// for para2
const paratext2 = `Skilled in Python, data handling using NumPy and Pandas, and basic computer vision
                        concepts. I am eager to apply my technical knowledge to real-world projects,
                        continuously learn new technologies, and contribute effectively in a professional
                        environment.`;
const paraElement2 = document.getElementById("typing-para2");

let paraIndex2 = 0;

function typeParagraph2() {
    if (paraIndex2 < paratext2.length) {
        paraElement2.innerHTML += paratext2.charAt(paraIndex2);
        paraIndex2++;
        setTimeout(typeParagraph2, 25); // speed (lower = faster)
    }
}

// Start animation when page loads
window.addEventListener("load", typeParagraph2);


const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page reload

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !phone || !message) {
        alert("Please fill all fields");
        return;
    }

    //  EMAIL
    emailjs.send("service_40hrlz7", "template_vvvwl9f", {
        name,
        email,
        phone,
        message
    }).then(() => {
        console.log("Email sent ");
    }).catch(err => {
        console.error("EmailJS Error ", err);
    });

    // WHATSAPP
    const whatsappNumber = "919935833915";
    const whatsappText =
        `Hello, I am ${name}%0AEmail: ${email}%0APhone: ${phone}%0A%0A${message}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappText}`, "_blank");

    contactForm.reset();
    alert("Message sent successfully ");
});

