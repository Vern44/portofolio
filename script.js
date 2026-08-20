// --- 1. EFEK MENGETIK OTOMATIS (AUTO-TYPING EFFECT) ---
const typingText = document.getElementById('typing-text');
const words = ['Web Developer.', 'Siswa SIJA.', 'Tech Enthusiast.', 'Data Analyst.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1200; // Durasi diam saat kata selesai diketik
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 300; // Jeda sebelum mulai mengetik kata baru
    }

    setTimeout(typeEffect, typeSpeed);
}
// Jalankan efek mengetik saat dokumen siap
document.addEventListener('DOMContentLoaded', typeEffect);


// --- 2. GLASS STICKY NAVBAR & ACTIVE NAV LINKS ON SCROLL ---
const header = document.getElementById('header');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    // Efek Sticky
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Deteksi Halaman Aktif berdasarkan posisi scroll
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});


// --- 3. FILTER PROYEK DINAMIS (PROJECT FILTER SYSTEM) ---
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Hapus kelas aktif dari tombol lama, pasang pada yang baru
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});


// --- 4. DARK & LIGHT MODE MANAGER ---
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = themeToggleBtn.querySelector('i');

const savedTheme = localStorage.getItem('selected-theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('selected-theme', newTheme);
    
    if (newTheme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});


// --- 5. MOBILE MENU MENU (HAMBURGER TOGGLE) ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Otomatis menutup menu setelah diklik pada perangkat mobile
navItems.forEach(item => {
    item.addEventListener('click', () => navLinks.classList.remove('active'));
});


// --- 6. VALIDASI & PENGIRIMAN FORM DENGAN INTERAKSI ---
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // Tampilkan notifikasi kustom yang menarik
    alert(`⚡ [Pesan Terenkripsi Send] \nTerima kasih ${name}, tanggapan Anda berhasil dikirim! Kami akan menghubungi Anda kembali melalui alamat email: ${email}`);
    
    contactForm.reset();
});