// variables
let navMenu = document.getElementById("navMenu");
    inputContainer = document.querySelector(".form-textarea-container"),
    textarea = document.getElementById("messageFeild");
    currentNumber = document.querySelector(".current-number");
    contactForm = document.getElementById("contactForm"),
    contactMessage = document.getElementById("formSubmitMessage")
    emailField = document.getElementById("emailFeild");
    emailErrorMessage = document.getElementById("emailErrorMessage");

// function to show the navbar menu
function showMenu()
{
    navMenu.style.right = "0";
}

// function to close the navbar menu
function closeMenu()
{
    navMenu.style.right = "-200px";
}

// count the number of textarea characters
textarea.addEventListener("keyup", () =>
{
    let characterLength = textarea.value.length;
        currentNumber.innerHTML = characterLength;

    characterLength > 0 
        ? inputContainer.classList.add("active") 
        : inputContainer.classList.remove("active");

    characterLength > 1000 
        ? inputContainer.classList.add("error") 
        : inputContainer.classList.remove("error");
})

// function to reset textarea character counter
function resetCharacterCounter()
{
    currentNumber.innerHTML = "0";
}

// send an email when the contact form is submitted
const sendEmail = (e) =>
{
    e.preventDefault()

    // serviceID, templateID, id, publicKey
    emailjs.sendForm("service_3fgmcge", "template_a6mq49i", "#contactForm", "9-ljn6pGNdbjVUgzh")
        .then(() =>
        {
            // display success message
            contactMessage.textContent = "Message sent successfully"

            // remove success message after a period
            setTimeout(() =>
            {
                contactMessage.textContent = ""
                
            }, 5000)

            // clear input fields
            contactForm.reset()

        }, () =>
        {
            // display error message
            contactMessage.textContent = "Message not sent (service error)"
        })
}

contactForm.addEventListener("submit", sendEmail)

// update copyright notice year
const yearSpan = document.querySelector("#currentYear");
yearSpan.innerText = new Date().getFullYear();

// change navbar background on scroll
document.addEventListener("scroll", () =>
{
    const header = document.querySelector("header");

    if (window.scrollY > 0)
    {
        header.classList.add("scrolled");
    }

    else
    {
        header.classList.remove("scrolled");
    }
})

// set homepage role heading typing effect
let typingEffect = new Typed(".multi-text",
{
    strings: ["Developer", "Enthusiast"],
    typeSpeed: 80,
    backSpeed: 80,
    loop: true
})

// function to determine if user email is valid
function validateEmail()
{
    if (!emailField.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    {
        // display error message
        emailErrorMessage.innerHTML = "Please enter a valid email";
        
        return false;
    }

    // remove error message
    emailErrorMessage.innerHTML = "";

    return true;
}

// determine if user email is valid before submitting contact form
document.getElementById("contactForm").addEventListener("submit", function(event)
{
    if (!validateEmail())
    {
        // prevent form submission
        event.preventDefault();

        return false;
    }
});