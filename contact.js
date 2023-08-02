// variables
let contactForm = document.getElementById('contactForm'),
    nameField = document.getElementById('nameField'),
    emailField = document.getElementById('emailField'),
    subjectField = document.getElementById('subjectField'),
    messageField = document.getElementById('messageField'),
    formSubmitMessage = document.getElementById('formSubmitMessage'),
    currentNumber = document.querySelector('.current-number');

// check name field
const checkName = () =>
{
    // variables
    let valid = false;
    const name = nameField.value.trim();

    name === ''
        ? displayError(nameField, 'Name cannot be blank.')
        : name.length < 3 || name.length > 25
        ? displayError(nameField, 'Name must be between 3 and 25 characters.')
        : (displaySuccess(nameField), valid = true);

    return valid;
};

// check email field
const checkEmail = () =>
{
    // variables
    let valid = false;
    const email = emailField.value.trim();

    email === ''
        ? displayError(emailField, 'Email cannot be blank.')
        : !isEmailValid(email)
        ? displayError(emailField, 'Email is not valid.')
        : (displaySuccess(emailField), valid = true);

    return valid;
};

// check subject field
const checkSubject = () =>
{
    // variables
    let valid = false;
    const subject = subjectField.value.trim();

    subject === ''
        ? displayError(subjectField, 'Subject cannot be blank.')
        : subject.length < 3 || subject.length > 25
        ? displayError(subjectField, 'Subject must be between 3 and 25 characters.')
        : (displaySuccess(subjectField), valid = true);
    
    return valid;
}

// check message field
const checkMessage = () =>
{
    // variables
    let valid = false;
    const message = messageField.value.trim();

    message === ''
        ? displayError(messageField, 'Message cannot be blank.')
        : message.length < 8 || message.length > 1000
        ? displayError(messageField, 'Message must be between 8 and 1000 characters.')
        : (displaySuccess(messageField), valid = true);

    return valid;
};

// function to determine if user email is valid
const isEmailValid = (emailField) =>
{
    return /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailField);
};

// function to reset the form error state
function resetFormValidationState()
{
    // get the form-field element
    const formField = input.parentElement;

    // display the error message
    const error = formField.querySelector('small');

    // clear the error message and remove the error class
    error.innerText = '';
    formField.classList.remove('error');
}

// function to display error state
const displayError = (input, message) =>
{
    // get the form-field element
    const formField = input.parentElement;

    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // display the error message
    const error = formField.querySelector('small');
    error.textContent = message;

    // clear the form validation state on user input
    input.addEventListener('input', resetFormValidationState);
};

// function to display success state
const displaySuccess = (input) =>
{
    // get the form-field element
    const formField = input.parentElement;

    // add the success class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';

    // clear form validation state on user input
    input.addEventListener('input', resetFormValidationState);
}

// function to delay form validation feedback
const delayFeedback = (fn, delay = 500) =>
{
    let timeoutId;
    
    return (...args) =>
    {
        // cancel the previous timer
        if (timeoutId)
        {
            clearTimeout(timeoutId);
        }

        // create a new timer
        timeoutId = setTimeout(() =>
        {
            fn.apply(null, args)
        }, delay);
    };
};

// event listener to provide immediate form validation feedback
contactForm.addEventListener('input', delayFeedback(function (e)
{
    switch (e.target.id)
    {
        case 'nameField':
            checkName();
            break;

        case 'emailField':
            checkEmail();
            break;

        case 'subjectField':
            checkSubject();
            break;

        case 'messageField':
            checkMessage();
            break;
    }
}));

// function to reset the form field borders on submit
function resetFormFieldBorders()
{
    const formFields = document.querySelectorAll('.form-field');
  
    formFields.forEach((formField) =>
    {
        formField.classList.remove('success', 'error');
    });
}

// event listener to submit the form to email if valid
contactForm.addEventListener('submit', function (e)
{
    // prevent form submission
    e.preventDefault();

    // validate form fields
    let isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isSubjectValid = checkSubject(),
        isMessageValid = checkMessage();

    let isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

    // submit the form if valid
    if (isFormValid)
    {
        // serviceID, templateID, id, publicKey
        emailjs.sendForm('service_3fgmcge', 'template_a6mq49i', '#contactForm', '9-ljn6pGNdbjVUgzh')
            .then(() =>
            {
                // display success message 
                formSubmitMessage.textContent = 'Message sent successfully.';
            })

            .catch(() =>
            {
                // display error message
                formSubmitMessage.textContent = 'Error submitting form. Please try again.';
            });
            
            // clear form submission message after delay
            setTimeout(() =>
            {
                formSubmitMessage.textContent = '';
            }, 5000)

            // clear the form fields
            contactForm.reset();
            resetFormFieldBorders();
    }
});

// function to update the message field character count
function updateMessageCharacterCount()
{
    let charLength = messageField.value.length;
    currentNumber.innerHTML = charLength;
  
    // update the validation state based on inputted characters
    charLength > 0
        ? messageField.classList.add('active')
        : messageField.classList.remove('active');
  
    charLength > 1000
        ? messageField.classList.add('error')
        : messageField.classList.remove('error');
}
  
messageField.addEventListener('input', updateMessageCharacterCount);  

// function to reset the message field character count
function resetMessageCharacterCount()
{
    currentNumber.innerHTML = '0';
}