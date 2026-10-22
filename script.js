// Dark Mode Toggle Logic
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleBtn = document.getElementById('theme-toggle');
const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.add('dark'); // Default to dark/black theme preference for orange & black vibe
    localStorage.setItem('color-theme', 'dark');
    if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
}

function toggleDarkMode() {
    if (themeToggleDarkIcon) themeToggleDarkIcon.classList.toggle('hidden');
    if (themeToggleLightIcon) themeToggleLightIcon.classList.toggle('hidden');

    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
}

if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleDarkMode);
if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleDarkMode);

// Mobile Menu Toggle Logic
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when link is clicked
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah terkirim. Muh. Alghazali akan segera menghubungi Anda kembali.');
        this.reset();
    });
}

// Modal Handler
function openModal(title, desc) {
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const projectModal = document.getElementById('project-modal');

    if (modalTitle) modalTitle.innerText = title;
    if (modalDesc) modalDesc.innerText = desc;
    if (projectModal) projectModal.classList.remove('hidden');
}

function closeModal() {
    const projectModal = document.getElementById('project-modal');
    if (projectModal) projectModal.classList.add('hidden');
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    // Membuat canvas latar belakang secara otomatis
    const canvas = document.createElement('canvas');
    canvas.id = 'dynamic-bg-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // Kecepatan gerakan partikel
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            // Ukuran partikel lebih besar agar terlihat jelas
            this.size = Math.random() * 3 + 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Pantulan di batas layar
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }

        draw() {
            // Titik partikel berwarna oranye tebal
            ctx.fillStyle = 'rgba(249, 115, 22, 0.85)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        // Kepadatan jumlah partikel
        const numParticles = Math.floor((canvas.width * canvas.height) / 10000);
        for (let i = 0; i < numParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();

            // Hubungkan titik-titik dengan garis jaringan yang lebih tebal dan terhubung
            for (let j = i + 1; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Jarak maksimal garis antar titik
                if (distance < 140) {
                    const opacity = 1 - (distance / 140);
                    ctx.strokeStyle = `rgba(249, 115, 22, ${opacity * 0.4})`; // Warna garis jaringan oranye
                    ctx.lineWidth = 1.5; // Ketebalan garis ditingkatkan
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
});
