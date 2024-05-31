const navMenu = document.getElementById('navMenu');
const openNavMenuIcon = document.getElementById('openNavMenuIcon');
const closeNavMenuIcon = document.getElementById('closeNavMenuIcon');

/**
 * Adds click event listeners to nav menu icons to open and close the nav menu.
 */
openNavMenuIcon.addEventListener('click', () => {
    navMenu.style.right = '0';
});
closeNavMenuIcon.addEventListener('click', () => {
    navMenu.style.right = '-200px';
});

/**
 * Adds a scroll event listener to update the header background color based on scroll direction.
 * - Adds a class to the header when scrolling down to update the header styling.
 * - Removes the class from the header when scrolling up to revert the header styling.
 */
document.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    window.scrollY > 0 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
});

/**
 * Initializes the typing effect for the 'role-heading' element on the homepage.
 * - Targets the 'multi-text-effect' element within 'role-heading'.
 */
new Typed('.multi-text-effect', {
    strings: ['Developer', 'Enthusiast'],
    typeSpeed: 80,
    backSpeed: 80,
    loop: true,
});

/**
 * Automatically updates the copyright year in the footer.
 */
const copyrightYear = document.getElementById('copyrightYear');
copyrightYear.textContent = new Date().getFullYear();
