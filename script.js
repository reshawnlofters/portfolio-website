// variables
let navMenu = document.getElementById("navMenu"),
    inputContainer = document.querySelector(".form-textarea-container"),
    textarea = inputContainer.querySelector("textarea"),
    currentNumber = inputContainer.querySelector(".current-number");

// function to show toggle menu
function showMenu()
{
    navMenu.style.right = "0";
}

// function to hide toggle menu
function hideMenu()
{
    navMenu.style.right = "-200px";
}

// function to track the contact form textarea characters
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