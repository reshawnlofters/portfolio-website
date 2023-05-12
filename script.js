// variables
let navMenu = document.getElementById('navMenu');
    inputContainer = document.querySelector('.form-textarea-container'),
    textarea = inputContainer.querySelector('textarea'),
    currentNumber = inputContainer.querySelector('.current-number');
    const contactForm = document.getElementById('contactForm'),
    contactMessage = document.getElementById('formSubmitMessage')

// function to show toggle menu
function showMenu()
{
    navMenu.style.right = '0';
}

// function to hide toggle menu
function hideMenu()
{
    navMenu.style.right = '-200px';
}

// track number of characters inputted into contact form textarea
textarea.addEventListener('keyup', () =>
{
    let characterLength = textarea.value.length;
        currentNumber.innerHTML = characterLength;

    characterLength > 0 
        ? inputContainer.classList.add('active') 
        : inputContainer.classList.remove('active');

    characterLength > 1000 
        ? inputContainer.classList.add('error') 
        : inputContainer.classList.remove('error');
})

// send email when contact form is submitted
const sendEmail = (e) =>
{
    e.preventDefault()

    // serviceID, templateID, id, publicKey
    emailjs.sendForm('service_3fgmcge', 'template_a6mq49i', '#contactForm', '9-ljn6pGNdbjVUgzh')
        .then(() =>
        {
            // display success message
            contactMessage.textContent = 'Message sent successfully'

            // remove message after five seconds
            setTimeout(() =>
            {
                contactMessage.textContent = ''
                
            }, 5000)

            // clear input fields
            contactForm.reset()

        }, () =>
        {
            // display error message
            contactMessage.textContent = 'Message not sent (service error)'
        })
}

contactForm.addEventListener('submit', sendEmail)

// auto update year in footer copyright notice
const yearSpan = document.querySelector('#currentYear');
yearSpan.innerText = new Date().getFullYear();

// change navbar background on scroll
document.addEventListener('scroll', () =>
{
    const header = document.querySelector('header');

    if (window.scrollY > 0)
    {
        header.classList.add('scrolled');
    }

    else
    {
        header.classList.remove('scrolled');
    }
})