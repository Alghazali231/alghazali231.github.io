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