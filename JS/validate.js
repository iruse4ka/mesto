function hasInvalidInput(inputList) {
    return inputList.some((inputItem) => {
        return !inputItem.validity.valid;
    })
}

function toggleSubmitButton(buttonItem, inputList, inactiveButtonClass) {
    if(hasInvalidInput(inputList)) {
        buttonItem.classList.add(inactiveButtonClass);
        buttonItem.disabled = true;
    }
    else {
        buttonItem.classList.remove(inactiveButtonClass);
        buttonItem.disabled = false;
    }
}

function showValidityError(formItem, inputItem, errorText, inputErrorClass, errorClass) {
    inputItem.classList.add(inputErrorClass);
    const errorItem = formItem.querySelector(`.${inputItem.id}-error`);
    errorItem.classList.add(errorClass);
    errorItem.textContent = errorText;
}

function hideValidityError(formItem, inputItem, inputErrorClass, errorClass) {
    inputItem.classList.remove(inputErrorClass);
    const errorItem = formItem.querySelector(`.${inputItem.id}-error`);
    errorItem.classList.remove(errorClass);
    errorItem.textContent = '';
}

function checkValidity(formItem, inputItem, inputErrorClass, errorClass) {
    if(inputItem.validity.valid) {
        hideValidityError(formItem, inputItem, inputErrorClass, errorClass);
    }
    else {
        showValidityError(formItem, inputItem, inputItem.validationMessage, inputErrorClass, errorClass);
    }
}

function setEventListeners(formList, set) {
    formList.forEach((formItem) => {
        const inputList = Array.from(formItem.querySelectorAll(set.inputSelector));
        const buttonItem = formItem.querySelector(set.submitButtonSelector);
        toggleSubmitButton(buttonItem, inputList, set.inactiveButtonClass);
        inputList.forEach(function (inputItem) {
            inputItem.addEventListener('input', function () {
                checkValidity(formItem, inputItem, set.inputErrorClass, set.errorClass);
                toggleSubmitButton(buttonItem, inputList, set.inactiveButtonClass);
            });
        });
    });
}

function enableValidation(set) {

    const formList = Array.from(document.querySelectorAll(set.formSelector));
    delete set.formSelector;
    formList.forEach((formItem) => {
        formItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    });

    setEventListeners(formList, set);
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});