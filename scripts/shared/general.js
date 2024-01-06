const navMenu = document.getElementById('navMenu');
const openNavMenuIcon = document.getElementById('openNavMenuIcon');
const closeNavMenuIcon = document.getElementById('closeNavMenuIcon');

// Adds a click event listeners to the nav menu icons to open and close the menu
openNavMenuIcon.addEventListener('click', () => {
    navMenu.style.right = '0';
});
closeNavMenuIcon.addEventListener('click', () => {
    navMenu.style.right = '-200px';
});

// Attaches a scroll event listener to change the header background on scroll
document.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    window.scrollY > 0 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
});

// Adds a typing effect to the homepage 'multi-text' element
let multiTextEffect = new Typed('.multi-text', {
    strings: ['Developer', 'Enthusiast'],
    typeSpeed: 80,
    backSpeed: 80,
    loop: true,
});

// Updates the footer copyright year
const copyrightYear = document.getElementById('currentYear');
copyrightYear.innerText = new Date().getFullYear();
