// variables
const contactForm = document.getElementById('contactForm');
const messageFieldCharCount = document.querySelector('.current-number');

/**
 * This function validates the name input field.
 * @returns {boolean} Returns true if the name is valid, otherwise false.
 */
function validateNameInput() {
    const name = document.getElementById('nameField').value.trim();
    let valid = false;

    if (name === '') {
        setErrorState(nameField, 'Name cannot be blank.');
    } else if (name.length < 3 || name.length > 25) {
        setErrorState(nameField, 'Name must be between 3 and 25 characters.');
    } else {
        setSuccessState(nameField);
        valid = true;
    }

    return valid;
}

/**
 * This function validates the email input field.
 * @returns {boolean} Returns true if the email is valid, otherwise false.
 */
function validateEmailInput() {
    const email = document.getElementById('emailField').value.trim();
    let valid = false;

    if (email === '') {
        setErrorState(emailField, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        setErrorState(emailField, 'Email is not valid.');
    } else {
        setSuccessState(emailField);
        valid = true;
    }

    return valid;
}

/**
 * This function validates if the provided email address is valid.
 * @param {string} email - The email address to validate.
 * @returns {boolean} Returns true if the email is valid, otherwise false.
 */
function isEmailValid(email) {
    return /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}

/**
 * This function validates the subject input field.
 * @returns {boolean} Returns true if the subject is valid, otherwise false.
 */
function validateSubjectInput() {
    const subject = document.getElementById('subjectField').value.trim();
    let valid = false;

    if (subject === '') {
        setErrorState(subjectField, 'Subject cannot be blank.');
    } else if (subject.length < 3 || subject.length > 25) {
        setErrorState(
            subjectField,
            'Subject must be between 3 and 25 characters.'
        );
    } else {
        setSuccessState(subjectField);
        valid = true;
    }

    return valid;
}

/**
 * This function validates the message input field.
 * @returns {boolean} Returns true if the message is valid, otherwise false.
 */
function validateMessageInput() {
    const message = document.getElementById('messageField').value.trim();
    let valid = false;

    if (message === '') {
        setErrorState(messageField, 'Message cannot be blank.');
    } else if (message.length < 8 || message.length > 1000) {
        setErrorState(
            messageField,
            'Message must be between 8 and 1000 characters.'
        );
    } else {
        setSuccessState(messageField);
        valid = true;
    }

    return valid;
}

// This function resets the validation state of a form field
function resetFieldValidationState() {
    const formField = inputElement.parentElement;

    formField.querySelector('small').innerHTML = ''; // clear the error message
    formField.classList.remove('error'); // remove the error class
}

/**
 * This function adds an error class to a form field for styling, displays an error message,
 * and resets the form validation state on user input.
 * @param inputField - The input field element that triggered the error.
 * @param message - The string that represents the error message to be displayed to the user.
 */
function setErrorState(inputField, message) {
    const formField = inputField.parentElement;

    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // display the error message
    formField.querySelector('small').innerHTML = message;

    // clear the field validation state on user input
    inputField.addEventListener('input', resetFieldValidationState);
}

/**
 * This function adds a success class to a form field for styling, hides the error message, and
 * resets the form validation state on user input.
 * @param inputField - The input field element that triggered the success state.
 */
function setSuccessState(inputField) {
    const formField = inputField.parentElement;

    // add the success class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    formField.querySelector('small').innerHTML = '';

    // clear field validation state on user input
    inputField.addEventListener('input', resetFieldValidationState);
}

/**
 * This function delays form field validation feedback to avoid rapid changes.
 * @param {Function} callback - The function to be called after a delay.
 * @param {number} delay - The delay in milliseconds (default is 500).
 * @returns {Function} Returns a function that can be used as an event handler.
 */
function delayFieldFeedback(callback, delay = 500) {
    let timeoutId;

    return function (...args) {
        // cancel any previous timeouts
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // set a new timeout with the specified delay
        timeoutId = setTimeout(() => {
            callback.apply(null, args);
        }, delay);
    };
}

/**
 * Attach an input event listener to the contact form fields to delay field validation and handle input events.
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

/**
 * The function resets the border styles of all form fields by removing the 'success' and 'error'
 * classes when the user submits the form.
 */
function resetFieldBorders() {
    const formFields = document.querySelectorAll('.form-field');

    formFields.forEach((formField) => {
        formField.classList.remove('success', 'error');
    });
}

/**
 * Attach a submit event listener to the form to send it via EmailJS if it's valid.
 * @param {Event} event - The submit event triggered by the user.
 */
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // validate form fields and store the validation results
    const isNameValid = validateNameInput();
    const isEmailValid = validateEmailInput();
    const isSubjectValid = validateSubjectInput();
    const isMessageValid = validateMessageInput();

    // check if the entire form is valid
    const isFormValid =
        isNameValid && isEmailValid && isSubjectValid && isMessageValid;

    if (isFormValid) {
        // if the form is valid, send it via EmailJS
        sendFormViaEmailjs();
    }
});

// This function sends a valid form to email via EmailJS and displays a success or error message
function sendFormViaEmailjs() {
    const formSubmitMessage = document.getElementById('formSubmitMessage');

    // serviceID, templateID, id, publicKey
    emailjs
        .sendForm(
            'service_3fgmcge',
            'template_a6mq49i',
            '#contactForm',
            '9-ljn6pGNdbjVUgzh'
        )
        .then(() => {
            // display a success message
            formSubmitMessage.innerHTML = 'Message sent successfully.';
        })
        .catch(() => {
            // Display an error message
            formSubmitMessage.innerHTML =
                'Error submitting the form. Please try again.';
        });

    // clear the form submission message after a delay
    setTimeout(() => {
        formSubmitMessage.innerHTML = '';
    }, 5000);

    // reset form fields, field borders, and message field character count
    contactForm.reset();
    resetFieldBorders();
    messageFieldCharCount.innerHTML = '0';
}

// This function updates the message field character count on user input
function updateMessageFieldCharCount() {
    let charLength = messageField.value.length;
    messageFieldCharCount.innerHTML = charLength;

    // update the validation state based on the character count
    charLength > 0
        ? messageField.classList.add('active')
        : messageField.classList.remove('active');

    charLength > 1000
        ? messageField.classList.add('error')
        : messageField.classList.remove('error');
}

// attach an input event listener to the message field to update the character count
messageField.addEventListener('input', updateMessageFieldCharCount);
