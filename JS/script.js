const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit');
const popupProfile = document.querySelector('.popup_edit-profile');
const profileForm = document.forms.profile;
const nameInput = profileForm.elements.userName;
const roleInput = profileForm.elements.userRole;
const profileName =document.querySelector('.profile__name');
const profileRole =document.querySelector('.profile__role');
const profileSubmitButton = document.querySelector('.popup__submit_profile');

const addPlaceButton = document.querySelector('.profile__add');
const popupAddPlace = document.querySelector('.popup_add-place');
const placeForm = document.forms.place;
const placeNameInput = placeForm.elements.placeName;
const placePicInput = placeForm.elements.placeLink;
const picturePopupImg = document.querySelector('.popup__picture');
const picturePopupName = document.querySelector('.popup__picture-name');
const placeSubmitButton = document.querySelector('.popup__submit_place');

const placeTemplate = document.querySelector('.place-template').content;
const placeItem = document.querySelector('.place');
const picturePopup = document.querySelector('.popup_picture');


function listenEscapeKey(evt) {
    if(evt.key === 'Escape')
        closePopup();
}

function openPopup(popup) {
    document.addEventListener('keydown', listenEscapeKey);
    popup.classList.add('popup_opened');
}
function closePopup(popup) {
    const currentPopup = document.querySelector('.popup_opened');
    document.removeEventListener('keydown', listenEscapeKey);
    currentPopup.classList.remove('popup_opened');
}

function validateProfileForm() {
    nameInput.value = profileName.textContent;
    roleInput.value = profileRole.textContent;

    toggleSubmitButton(profileSubmitButton, [nameInput, roleInput], 'popup__submit_disabled');

    errorElements = Array.from(profileForm.querySelectorAll('.popup__error'));
    errorElements.forEach((errorItem) => {
        errorItem.classList.remove('popup__error_visible');
    });

    inputElements = Array.from(profileForm.querySelectorAll('.popup__input'));
    inputElements.forEach((inputItem) => {
        inputItem.classList.remove('popup__input_type_error');
    });
}

function openPopupProfile() {
    validateProfileForm();
    openPopup(popupProfile);
}

function submitProfileForm(evt) {
    profileName.textContent = nameInput.value;
    profileRole.textContent = roleInput.value;
    closePopup();
}

function toggleLike(evt) {
    evt.target.classList.toggle('place__like_active');
}

function removePlace(evt) {
    evt.target.closest('.place__item').remove();
}
function createPlace(name, link) {
    const newPlace = placeTemplate.cloneNode(true);
    const newPlaceName = newPlace.querySelector('.place__name');
    const newPlacePic = newPlace.querySelector('.place__picture');

    newPlaceName.textContent = name;
    newPlaceName.title = name;

    newPlacePic.src = link;
    newPlacePic.alt = name;
    newPlacePic.title = name;

    newPlacePic.addEventListener('click', (evt) => {
        picturePopupName.textContent = evt.target.title;
        picturePopupImg.src = evt.target.src;
        picturePopupImg.alt = evt.target.alt;
        openPopup(picturePopup)
    });

    newPlace.querySelector('.place__like').addEventListener('click',toggleLike);
    newPlace.querySelector('.place__delete').addEventListener('click',removePlace)

    return newPlace;
}

function addPlace(container, element) {
    container.prepend(element);
}

function submitPlaceForm(evt) {

    addPlace(placeItem,createPlace(placeNameInput.value,placePicInput.value));
    placeForm.reset();
    toggleSubmitButton(placeSubmitButton, [placeNameInput, placePicInput], 'popup__submit_disabled');
    closePopup();
}

popups.forEach((item) => {
    item.addEventListener('click', function (evt) {
        if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close'))
            closePopup(item);
    });
});

document.addEventListener('DOMContentLoaded',() => {
    initialCards.forEach((item) => {
        addPlace(placeItem,createPlace(item.name,item.link));
    });
});


editButton.addEventListener('click',openPopupProfile);
profileForm.addEventListener('submit', submitProfileForm);
addPlaceButton.addEventListener('click',() => {openPopup(popupAddPlace);});
placeForm.addEventListener('submit',submitPlaceForm);