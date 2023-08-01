// variables
let contactForm = document.getElementById('contactForm'),
    nameField = document.getElementById('nameField'),
    emailField = document.getElementById('emailField'),
    subjectField = document.getElementById('subjectField'),
    messageField = document.getElementById('messageField'),
    currentNumber = document.querySelector('.current-number'),
    formSubmitMessage = document.getElementById('formSubmitMessage');


// check name field
const checkName = () =>
{
    let valid = false;
    const name = nameField.value.trim();

    if (name === '')
    {
        displayError(nameField, 'Name cannot be blank.');
    }
    
    else if (name.length < 3 || name.length > 25)
    {
        displayError(nameField, 'Name must be between 3 and 25 characters.')
    }

    else
    {
        displaySuccess(nameField);
        valid = true;
    }

    return valid;
};

// check email field
const checkEmail = () =>
{
    let valid = false;
    const email = emailField.value.trim();

    if (email === '')
    {
        displayError(emailField, 'Email cannot be blank.');
    } 
    
    else if (!isEmailValid(email))
    {
        displayError(emailField, 'Email is not valid.')
    } 
    
    else
    {
        displaySuccess(emailField);
        valid = true;
    }

    return valid;
};

// check subject field
const checkSubject = () =>
{
    let valid = false;
    const subject = subjectField.value.trim();

    if (subject === '')
    {
        displayError(subjectField, 'Subject cannot be blank.');
    } 
    
    else if (subject.length < 3 || subject.length > 25)
    {
        displayError(subjectField, 'Subject must be between 3 and 25 characters.')
    }
    
    else
    {
        displaySuccess(subjectField);
        valid = true;
    }
    
    return valid;
}

// check message field
const checkMessage = () =>
{
    let valid = false;
    const message = messageField.value.trim();

    if (message === '')
    {
        displayError(messageField, 'Message cannot be blank.');
    }
    
    else if (message.length < 8 || message.length > 1000)
    {
        displayError(messageField, 'Message must be between 8 and 1000 characters.');
    }
    
    else
    {
        displaySuccess(messageField);
        valid = true;
    }

    return valid;
};

// function to determine if email is valid
const isEmailValid = (emailField) =>
{
    return /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailField);
};

// function to reset form error state
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

// function to display error
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

    // clear form validation state if user retypes
    input.addEventListener('input', resetFormValidationState);
};

// function to display success
const displaySuccess = (input) =>
{
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';

    // clear form validation state if user retypes
    input.addEventListener('input', resetFormValidationState);
}

// function to delay form feedback
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

// event listener to provide instant form feedback
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

// function to reset form field borders on submit
function resetFormFieldBorders()
{
    const formFields = document.querySelectorAll('.form-field');
  
    formFields.forEach((formField) =>
    {
      formField.classList.remove('success', 'error');
    });
}

// event listener to submit the form if valid
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

// function to update the message feild character count
function updateMessageCharacterCount()
{
    let charLength = messageField.value.length;
    currentNumber.innerHTML = charLength;
  
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