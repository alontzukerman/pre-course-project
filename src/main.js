const viewSectionElement = document.querySelector('#view-section');
const listElement = document.createElement('ul');
viewSectionElement.appendChild(listElement);

const addButtonElement = document.querySelector('#addButton'); // call button element
addButtonElement.addEventListener('click', () => { // add button click function event
    const inputElement = document.querySelector('#textInput');
    const valueInput = inputElement.value;
    inputElement.value = '';
    const lineListElement = document.createElement('li');
    listElement.appendChild(lineListElement);
    lineListElement.innerHTML = valueInput;
})

