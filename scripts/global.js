// variables
const navMenu = document.getElementById('navMenu');

function openNavMenu() {
    navMenu.style.right = '0';
}

function closeNavMenu() {
    navMenu.style.right = '-200px';
}

// attach a scroll event listener to change the navbar background on scroll
document.addEventListener('scroll', () => {
    const header = document.querySelector('.header');

    window.scrollY > 0
        ? header.classList.add('scrolled')
        : header.classList.remove('scrolled');
});

// This code executes the typing effect on the homepage
let homepageTypingEffect = new Typed('.multi-text', {
    strings: ['Developer', 'Enthusiast'],
    typeSpeed: 80,
    backSpeed: 80,
    loop: true
})

// This code updates the copyright year in the footer, yearly
const copyrightYear = document.getElementById('currentYear');
copyrightYear.innerText = new Date().getFullYear();