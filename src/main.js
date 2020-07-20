const viewSectionElement = document.querySelector('#view-section');
// const listElement = document.createElement('ul');
// viewSectionElement.appendChild(listElement);
const counterSpan = document.querySelector('#counter');
const todoArray = [];
const todoInfoElement = document.querySelector('#todoInfo');
var completedTodoCounter = 0;

const addButtonElement = document.querySelector('#addButton'); // call button element
addButtonElement.addEventListener('click', () => { // add button click function event
    const inputElement = document.querySelector('#textInput');
    const valueInput = inputElement.value;
    if (valueInput){
        inputElement.value = '';
        const priorityElement = document.querySelector('#prioritySelector');
        const valuePriority = priorityElement.value;

        createItemContainer(valuePriority,valueInput);
    }
});

function createItemContainer (prio,data){
    const containerDiv = document.createElement("div");
    const priorityDiv = document.createElement("div");
    const createdDiv = document.createElement("div");
    const textDiv = document.createElement("div");
    containerDiv.appendChild(priorityDiv);
    containerDiv.appendChild(createdDiv);
    containerDiv.appendChild(textDiv);
    viewSectionElement.appendChild(containerDiv);
    containerDiv.setAttribute('class','todoContainer');
    priorityDiv.setAttribute('class','todoPriority');
    createdDiv.setAttribute('class','todoCreatedAt');
    textDiv.setAttribute('class','todoText');
    
    let date = new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDay();
    let time = new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();       
    const containerObj = {
        priority: prio,
        created: date+' '+time,
        text: data
    }
    todoArray.push(containerObj);
    counterSpan.innerHTML = todoArray.length;

    priorityDiv.innerHTML = containerObj.priority;
    createdDiv.innerHTML = containerObj.created;
    textDiv.innerHTML = containerObj.text;

    todoInfoElement.innerHTML = completedTodoCounter +'/'+ todoArray.length +' COMPLETED.'

    containerDiv.addEventListener('click',() => {
        if (containerDiv.classList.length === 1){
            containerDiv.setAttribute('class','todoContainer completedTodo');
            completedTodoCounter++;
            if (completedTodoCounter === todoArray.length)
                todoInfoElement.innerHTML = 'TODO LIST COMPLETED.'
            else
                todoInfoElement.innerHTML = completedTodoCounter +'/'+ todoArray.length +' COMPLETED.'

        }
        else{
            containerDiv.setAttribute('class','todoContainer');
            completedTodoCounter--;
            todoInfoElement.innerHTML = completedTodoCounter +'/'+ todoArray.length +' COMPLETED.'
        }
    });
    
    containerDiv.addEventListener('mousedown',mouseDownHandler);
}

const sortButtonElement = document.querySelector('#sortButton');
sortButtonElement.addEventListener('click', () => {
    if (!(todoArray.length === 0)){
        todoArray.sort((a,b) => b.priority - a.priority);
        

        for (let i=1 ; i<viewSectionElement.childElementCount ; i++){
            let bool = true;
            for (let j=0 ; j<viewSectionElement.childElementCount && bool ; j++){
                if (viewSectionElement.children[i].children[0].innerHTML>viewSectionElement.children[j].children[0].innerHTML){
                    viewSectionElement.children[j].before(viewSectionElement.children[i]);
                    bool = false;
                }
            }
        }
    }
});

let draggingElement , x = 0 , y = 0;
let placeholder , isDraggingStarted = false;

const mouseDownHandler = function(e) {
    draggingElement = e.target.parentNode;

    const rect = draggingElement.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;

    document.addEventListener('mousemove',mouseMoveHandler);
    document.addEventListener('mouseup',mouseUpHandler);
};

const mouseMoveHandler = function(e) {
    draggingElement.style.position = 'absolute';
    draggingElement.style.top = `${e.pageY - y}px`;
    draggingElement.style.left =  `${e.pageX - x}px`;

    const draggingRect = draggingElement.getBoundingClientRect();

    if (!isDraggingStarted) {
        isDraggingStarted = true;

        placeholder = document.createElement('div');
        placeholder.classList.add('placeholder');
        draggingElement.parentNode.insertBefore(placeholder,draggingElement.nextSibling);

        placeholder.style.height = `${draggingRect.height}px`;
    }
    const prevElement = draggingElement.previousElementSibling;
    const nextElement = placeholder.nextElementSibling;
    if (prevElement && isAbove(draggingElement,prevElement)){
        swap(placeholder,draggingElement);
        swap(placeholder,prevElement);
    }
    if (nextElement && isAbove(nextElement,draggingElement)){
        swap(nextElement,placeholder);
        swap(nextElement,draggingElement);
    }
};

const mouseUpHandler = function() {
    draggingElement.style.removeProperty('top');
    draggingElement.style.removeProperty('left');
    draggingElement.style.removeProperty('position');

    x = null;
    y = null;
    draggingElement = null;

    document.removeEventListener('mousemove',mouseMoveHandler);
    document.removeEventListener('mouseup',mouseUpHandler);

    placeholder && placeholder.parentNode.removeChild(placeholder);
    isDraggingStarted = false;
}

const isAbove = function(a,b) {

    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();

    return (rectA.top+rectA.height/2 < rectB.top+rectB.height/2);
}
const swap = function(a,b) {
    const parentA = a.parentNode;
    const siblingA = a.nextSibling === b ? a : a.nextSibling;

    b.parentNode.insertBefore(a,b);
    parentA.insertBefore(b,siblingA);
}


