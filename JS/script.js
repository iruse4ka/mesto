const initialCards = [
    {   name: 'Белиз',
        link: 'images/belize.jpg'    },
    {   name: 'Канада',
        link: 'images/canada.jpg'    },
    {   name: 'Малайзия',
        link: 'images/malaysia.jpg'    },
    {   name: 'Новая Зеландия',
        link: 'images/newZealand.jpg'    },
    {   name: 'Южная Африка',
        link: 'images/southAfrica.jpg'},
    {   name: 'Судан',
        link: 'images/sudan.jpg'    }];

const editButton = document.querySelector('.profile__edit');
const closeProfileButton = document.querySelector('.popup__close_edit-profile');
const popupProfile = document.querySelector('.popup_edit-profile');
const formElementProfile = document.querySelector('.popup__container_profile');
const profileNameInput = document.querySelector('.popup__input_type_name');
const roleInput = document.querySelector('.popup__input_type_role');
const profileName =document.querySelector('.profile__name');
const profileRole =document.querySelector('.profile__role');

const addPlaceButton = document.querySelector('.profile__add');
const popupAddPlace = document.querySelector('.popup_add-place');
const formElementPlace = document.querySelector('.popup__container_place');
const closePlaceButton = document.querySelector('.popup__close_add-place');
const placeTemplate = document.querySelector('.place-template').content;
const placeItem = document.querySelector('.place');
const placeNameInput = document.querySelector('.popup__input_type_place-name');
const placePicInput = document.querySelector('.popup__input_type_link');

const picturePopup = document.querySelector('.popup_picture');
const closePictureButton = document.querySelector('.popup__close_picture');
const picturePopupImg = document.querySelector('.popup__picture');
const picturePopupName = document.querySelector('.popup__picture-name');


/*Всплывающие окна*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');

}
function openPopupProfile() {
    profileNameInput.value = profileName.textContent;
    roleInput.value = profileRole.textContent;
    openPopup(popupProfile);
}

function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileRole.textContent = roleInput.value;
    closePopup(popupProfile);
}


editButton.addEventListener('click',openPopupProfile);
closeProfileButton.addEventListener('click', () =>  {
    closePopup(popupProfile);
});
formElementProfile.addEventListener('submit', submitProfileForm);


/*Карточки мест*/

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
    evt.preventDefault();
    addPlace(placeItem,createPlace(placeNameInput.value,placePicInput.value));
    formElementPlace.reset();
    closePopup(popupAddPlace);
}


document.addEventListener('DOMContentLoaded',() => {
    initialCards.forEach((item) => {
        addPlace(placeItem,createPlace(item.name,item.link));
    });
});

addPlaceButton.addEventListener('click',() => {
    openPopup(popupAddPlace);
});
closePlaceButton.addEventListener('click',() => {
    closePopup(popupAddPlace);
});
formElementPlace.addEventListener('submit',submitPlaceForm);

closePictureButton.addEventListener('click',() => {
    closePopup(picturePopup);
});