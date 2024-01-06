const contactForm = document.getElementById('contactForm');
const messageFieldCharCount = document.querySelector('.message-field-char-count');

function validateNameInput() {
    const name = document.getElementById('nameField').value.trim();
    let valid = false;

    if (name === '') {
        setErrorState(nameField, 'Name cannot be blank');
    } else if (name.length < 3 || name.length > 25) {
        setErrorState(nameField, 'Name must be between 3 and 25 characters');
    } else {
        setSuccessState(nameField);
        valid = true;
    }

    return valid;
}

function validateEmailInput() {
    const email = document.getElementById('emailField').value.trim();
    let valid = false;

    if (email === '') {
        setErrorState(emailField, 'Email cannot be blank');
    } else if (!isEmailValid(email)) {
        setErrorState(emailField, 'Email is not valid');
    } else {
        setSuccessState(emailField);
        valid = true;
    }

    return valid;
}

function isEmailValid(email) {
    return /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}

function validateSubjectInput() {
    const subject = document.getElementById('subjectField').value.trim();
    let valid = false;

    if (subject === '') {
        setErrorState(subjectField, 'Subject cannot be blank');
    } else if (subject.length < 3 || subject.length > 25) {
        setErrorState(subjectField, 'Subject must be between 3 and 25 characters');
    } else {
        setSuccessState(subjectField);
        valid = true;
    }

    return valid;
}

function validateMessageInput() {
    const message = document.getElementById('messageField').value.trim();
    let valid = false;

    if (message === '') {
        setErrorState(messageField, 'Message cannot be blank');
    } else if (message.length < 8 || message.length > 1000) {
        setErrorState(messageField, 'Message must be between 8 and 1000 characters');
    } else {
        setSuccessState(messageField);
        valid = true;
    }

    return valid;
}

// Resets the validation state of a form field
function resetFormFieldValidationState() {
    const formField = inputElement.parentElement;

    formField.querySelector('small').innerHTML = ''; // clear the error message
    formField.classList.remove('error');
}

/**
 * Adds an 'error' class to a form field for styling, displays an error message,
 * and resets the form validation state on user input.
 * @param {Element} inputField - The input field that triggered the error.
 * @param {string} message - The error message to be displayed to the user.
 */
function setErrorState(inputField, message) {
    const formField = inputField.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');
    formField.querySelector('small').innerHTML = message;
    inputField.addEventListener('input', resetFormFieldValidationState);
}

/**
 * Adds a 'success' class to a form field for styling, hides an error message, and
 * resets the form validation state on user input.
 * @param {Element} inputField - The input field that triggered the success state.
 */
function setSuccessState(inputField) {
    const formField = inputField.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');
    formField.querySelector('small').innerHTML = '';
    inputField.addEventListener('input', resetFormFieldValidationState);
}

/**
 * Delays form field validation feedback to avoid immediate changes.
 * @param {Function} callback - The function to be called after a delay.
 * @param {number} delay - The delay in milliseconds (default is 500).
 * @returns {Function} Returns a function that can be used as an event handler.
 */
function delayFieldFeedback(callback, delay = 500) {
    let timeoutId;

    return function (...args) {
        // Cancel any previous timeouts
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set a new timeout with the delay
        timeoutId = setTimeout(() => {
            callback.apply(null, args);
        }, delay);
    };
}

/**
 * Attaches an input event listener to form fields to handle input events
 * while delaying form field validation.
 * @param {Event} event - The input event triggered by the user.
 */
contactForm.addEventListener(
    'input',
    delayFieldFeedback((event) => {
        const fieldId = event.target.id;

        switch (fieldId) {
            case 'nameField':
                validateNameInput();
                break;

            case 'emailField':
                validateEmailInput();
                break;

            case 'subjectField':
                validateSubjectInput();
                break;

            case 'messageField':
                validateMessageInput();
                break;
        }
    })
);

// Resets form field border styles on form submission.
function resetFormFieldBorders() {
    const formFields = document.querySelectorAll('.form-field');

    formFields.forEach((formField) => {
        formField.classList.remove('success', 'error');
    });
}

/**
 * Attaches a submit event listener to the form to send it via 'EmailJS' if valid.
 * @param {Event} event - The submit event triggered by the user.
 */
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Validate form fields
    const isNameValid = validateNameInput();
    const isEmailValid = validateEmailInput();
    const isSubjectValid = validateSubjectInput();
    const isMessageValid = validateMessageInput();
    const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

    if (isFormValid) sendFormViaEmailjs();
});

// Sends a submitted form via 'EmailJS' and displays a success or error message
function sendFormViaEmailjs() {
    const formSubmitMessage = document.getElementById('formSubmitMessage');

    // ServiceID, templateID, id, publicKey
    emailjs
        .sendForm('service_3fgmcge', 'template_a6mq49i', '#contactForm', '9-ljn6pGNdbjVUgzh')
        .then(() => {
            // Display success message
            formSubmitMessage.innerHTML = 'Message sent successfully.';
        })
        .catch(() => {
            // Display error message
            formSubmitMessage.innerHTML = 'Error submitting the form. Please try again.';
        });

    // Clear the form submission message after a delay
    setTimeout(() => {
        formSubmitMessage.innerHTML = '';
    }, 500);

    // Reset form
    contactForm.reset();
    resetFormFieldBorders();
    messageFieldCharCount.innerHTML = '0';
}

// Updates the message field character count on user input
function updateMessageFieldCharCount() {
    let charCount = messageField.value.length;
    messageFieldCharCount.innerHTML = charCount;

    // Update the validation state based on the character count
    charCount > 0 ? messageField.classList.add('active') : messageField.classList.remove('active');
    charCount > 1000 ? messageField.classList.add('error') : messageField.classList.remove('error');
}

messageField.addEventListener('input', updateMessageFieldCharCount);
