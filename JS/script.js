const edit = document.querySelector('.profile__edit');
const close = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_role');
let profileName =document.querySelector('.profile__name');
let profileRole =document.querySelector('.profile__role');

function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileRole.textContent;
    popup.classList.add ('popup_opened');
}
function closePopup() {
    popup.classList.remove('popup_opened');
}

    function formSubmitHandler (evt) {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileRole.textContent = jobInput.value;
        closePopup();
    }

edit.addEventListener('click', openPopup);
close.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

