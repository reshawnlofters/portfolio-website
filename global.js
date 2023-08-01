// variables
let navMenu = document.getElementById('navMenu');

// function to open the navbar menu
function openNavMenu()
{
    navMenu.style.right = '0';
}

// function to close the navbar menu
function closeNavMenu()
{
    navMenu.style.right = '-200px';
}

// change the navbar background on scroll
document.addEventListener('scroll', () =>
{
    const header = document.querySelector('header');

    if (window.scrollY > 0)
    {
        header.classList.add('scrolled');
    } else
    {
        header.classList.remove('scrolled');
    }
})

// display the homepage typing effect
let typingEffect = new Typed('.multi-text',
{
    strings: ['Developer', 'Enthusiast'],
    typeSpeed: 80,
    backSpeed: 80,
    loop: true
})

// update the copyright notice year
const yearSpan = document.querySelector('#currentYear');
yearSpan.innerText = new Date().getFullYear();