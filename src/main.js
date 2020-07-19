const viewSectionElement = document.querySelector('#view-section');
const listElement = document.createElement('ul');
viewSectionElement.appendChild(listElement);
const counterSpan = document.querySelector('#counter');
const todoArray = [];

const addButtonElement = document.querySelector('#addButton'); // call button element
addButtonElement.addEventListener('click', () => { // add button click function event
    const inputElement = document.querySelector('#textInput');
    const valueInput = inputElement.value;
    inputElement.value = '';
    const priorityElement = document.querySelector('#prioritySeclector');
    const valuePriority = priorityElement.value;

    createItemContainer(valuePriority,valueInput);

});

function createItemContainer (prio,data){
    const containerDiv = document.createElement("div");
    const priorityDiv = document.createElement("div");
    const createdDiv = document.createElement("div");
    const textDiv = document.createElement("div");
    containerDiv.appendChild(priorityDiv);
    containerDiv.appendChild(createdDiv);
    containerDiv.appendChild(textDiv);
    listElement.appendChild(containerDiv);
    containerDiv.setAttribute('class','todoContainer');
    priorityDiv.setAttribute('class','todoPriority');
    createdDiv.setAttribute('class','todoCreatedAt');
    textDiv.setAttribute('class','todoText');
    
    const containerObj = {
        priority: prio,
        created: new Date(),
        text: data
    }
    todoArray.push(containerObj);
    counterSpan.innerHTML = todoArray.length+' TODOs';

    priorityDiv.innerHTML = containerObj.priority;
    createdDiv.innerHTML = containerObj.created;
    textDiv.innerHTML = containerObj.text;
}

const sortButtonElement = document.querySelector('#sortButton');
sortButtonElement.addEventListener('click', () => {
    if (!(containerObj.length === 0)){
        
    }
});


