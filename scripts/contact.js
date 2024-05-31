const contactForm = document.getElementById('contactForm');
const nameField = document.getElementById('nameField');
const emailField = document.getElementById('emailField');
const subjectField = document.getElementById('subjectField');
const messageField = document.getElementById('messageField');
const messageFieldCharCount = document.querySelector('.message-field-char-count');

/**
 * Validates the name input in the contact form.
 * @returns {boolean} - True if the name is valid, otherwise false.
 */
function validateNameInput() {
    const name = nameField.value.trim();
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

/**
 * Validates the email input in the contact form.
 * @returns {boolean} - True if the email is valid, otherwise false.
 */
function validateEmailInput() {
    const email = emailField.value.trim();
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

/**
 * Validates the email input in the contact form using a regex.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, otherwise false.
 */
function isEmailValid(email) {
    return /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}

/**
 * Validates the subject input in the contact form.
 * @returns {boolean} - True if the subject is valid, otherwise false.
 */
function validateSubjectInput() {
    const subject = subjectField.value.trim();
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


/**
 * Validates the message input in the contact form.
 * @returns {boolean} - True if the message is valid, otherwise false.
 */
function validateMessageInput() {
    const message = messageField.value.trim();
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

/**
 * Adds an 'error' class to a form field with invalid input and displays an error message.
 * - Resets the form validation state on user input.
 * @param {Element} inputField - The input field that triggered the error.
 * @param {string} message - The error message to display.
 */
function setErrorState(inputField, message) {
    const formField = inputField.parentElement;

    if (formField) {
        formField.classList.remove('success');
        formField.classList.add('error');
        formField.querySelector('small').innerHTML = message;
        inputField.addEventListener('input', resetFormFieldValidationState);
    }
}

/**
 * Adds an 'success' class to a form field with valid input and displays a success message.
 * - Resets the form validation state on user input.
 * @param {Element} inputField - The input field that triggered the success state.
 */
function setSuccessState(inputField) {
    const formField = inputField.parentElement;

    if (formField) {
        formField.classList.remove('error');
        formField.classList.add('success');
        formField.querySelector('small').innerHTML = '';
        inputField.addEventListener('input', resetFormFieldValidationState);
    }
}

/**
 * Resets the validation state of a form field.
 */
function resetFormFieldValidationState(inputField) {
    const formField = inputField.parentElement;

    if (formField) {
        formField.querySelector('small').innerHTML = ''; // Clear error message
        formField.classList.remove('error');
    }
}

/**
 * Adds a delay to form field validation feedback for consistency.
 * @param {Function} callback - The function to be called after a delay.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} - Returns a function that can be used as an event handler.
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
 * Adds an input event listener to form fields to handle input events.
 * - Delays form field validation using 'delayFieldFeedback' function.
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
 * Adds a submit event listener to the contact form to send it if valid.
 * - Utilizes the 'EmailJS' library to send the form.
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

    if (isFormValid) {
        sendFormViaEmailJS();
    }
});

/**
 * Sends a submitted form using 'EmailJS'.
 * - Displays a success message upon successful form submission.
 * - Displays an error message if the form submission fails.
 */
function sendFormViaEmailJS() {
    const formSubmitMessage = document.getElementById('formSubmitMessage');

    // ServiceID, templateID, id, publicKey
    emailjs.sendForm('service_3fgmcge', 'template_a6mq49i', '#contactForm', '9-ljn6pGNdbjVUgzh')
            .then(() => {
                // Display success message
                formSubmitMessage.innerHTML = 'Message sent successfully.';
            })
            .catch(() => {
                // Display error message
                formSubmitMessage.innerHTML = 'Error submitting the form. Please try again.';
            });

    // Reset form
    contactForm.reset();
    resetFormFieldBorders();
    messageFieldCharCount.innerHTML = '0';
}

/**
 * Resets form field border styles on form submission.
 */
function resetFormFieldBorders() {
    const formFields = document.querySelectorAll('.form-field');

    formFields.forEach((formField) => {
        formField.classList.remove('success', 'error');
    });
}

/**
 * Updates the message field character count on user input.
 */
function updateMessageFieldCharCount() {
    let charCount = messageField.value.length;
    messageFieldCharCount.innerHTML = charCount;

    // Update the validation state based on the character count
    charCount > 0 ? messageField.classList.add('active') : messageField.classList.remove('active');
    charCount > 1000 ? messageField.classList.add('error') : messageField.classList.remove('error');
}

messageField.addEventListener('input', updateMessageFieldCharCount);
