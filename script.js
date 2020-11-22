const edit = document.querySelector('.button_edit');
const close = document.querySelector('.button_close');
const popup = document.querySelector('.popup');

edit.addEventListener('click', openPopup);
close.addEventListener('click', openPopup);


function openPopup() {
    popup.classList.toggle ('popup_opened');
}
// Находим форму в DOM
let formElement = document.querySelector('.popup__container');

    function formSubmitHandler (evt) {
        evt.preventDefault();

        let nameInput = document.querySelector('.popup__input_type_name');
        let jobInput = document.querySelector('.popup__input_type_role');

        nameInput.getAttribute('value');
        jobInput.getAttribute('value');

        let profileName =document.querySelector('.profile__name');
        let profileRole =document.querySelector('.profile__role');

        profileName.textContent = nameInput.value;
        profileRole.textContent = jobInput.value;

        openPopup();
    }

formElement.addEventListener('submit', formSubmitHandler);




