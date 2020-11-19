let editButton = document.querySelector('.button__edit');
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=430px,height=330px`;

editButton.addEventListener('click', addName);

function addName () {
    window.open(url, name, params)
}
