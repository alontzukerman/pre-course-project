const viewSectionElement = document.querySelector('#view-section');
const counterSpan = document.querySelector('#counter');
const todoArray = [];
const todoInfoElement = document.querySelector('#todoInfo');
todoInfoElement.innerHTML = 'NO TODOs TO DO';
var completedTodoCounter = 0;
var idIndexOfContainer = 0;

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 13)
        addTodoList();
});
const addButtonElement = document.querySelector('#addButton');
addButtonElement.addEventListener('click', addTodoList); // add button click function event

function addTodoList() {
    const inputElement = document.querySelector('#textInput');
    const valueInput = inputElement.value;
    const priorityElement = document.querySelector('#prioritySelector');
    const valuePriority = priorityElement.value;
    if (valueInput && valuePriority){
        inputElement.value = '';
        inputElement.focus();

        createItemContainer(valuePriority,valueInput);
    }
}
function createItemContainer (prio,data){ // create container in view section
    const containerDiv = document.createElement("div");
    const deleteButton = document.createElement("button");
    const priorityDiv = document.createElement("div");
    const createdDiv = document.createElement("div");
    const textDiv = document.createElement("div");
    containerDiv.appendChild(deleteButton);
    containerDiv.appendChild(priorityDiv);
    containerDiv.appendChild(createdDiv);
    containerDiv.appendChild(textDiv);
    viewSectionElement.appendChild(containerDiv);
    containerDiv.setAttribute('class','todoContainer');
    deleteButton.setAttribute('id','deleteButton');
    deleteButton.innerHTML = 'X';
    priorityDiv.setAttribute('class','todoPriority');
    createdDiv.setAttribute('class','todoCreatedAt');
    textDiv.setAttribute('class','todoText');
    
    const dateTime = getNowDateAndTime();
    const containerObj = {
        id: idIndexOfContainer,
        priority: prio,
        created: dateTime,
        text: data
    }
    todoArray.push(containerObj);
    containerDiv.setAttribute('id',idIndexOfContainer);
    idIndexOfContainer++;
    counterSpan.innerHTML = todoArray.length;

    priorityDiv.innerHTML = containerObj.priority;
    createdDiv.innerHTML = containerObj.created;
    textDiv.innerHTML = containerObj.text;

    todoInfoElement.innerHTML = completedTodoCounter +'/'+ todoArray.length +' COMPLETED.'

    containerDiv.addEventListener('click',() => { // click on line function event
        if (containerDiv.classList.length === 1){
            containerDiv.setAttribute('class','todoContainer completedTodo');
            completedTodoCounter++;
            if (todoArray.length === 0)
                todoInfoElement.innerHTML = 'NO TODOs TO DO';
            else if (completedTodoCounter == todoArray.length)
                todoInfoElement.innerHTML = '<strong>TODO LIST COMPLETED.</strong>'
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
    deleteButton.addEventListener('click', () => {
        for (let i=0 ; i<todoArray.length ; i++){
            if (todoArray[i].id == deleteButton.parentElement.id){
                todoArray.splice(i,1);
                counterSpan.innerHTML = todoArray.length;
                if (containerDiv.classList.length === 1) 
                    completedTodoCounter--;
                
                break;
            }
        }
        deleteButton.parentElement.remove();
    });
}

const sortButtonElement = document.querySelector('#sortButton');
sortButtonElement.addEventListener('click', () => {
    if (!(todoArray.length === 0)){
        todoArray.sort((a,b) => b.priority - a.priority);
        

        for (let i=1 ; i<viewSectionElement.childElementCount ; i++){
            let bool = true;
            for (let j=0 ; j<viewSectionElement.childElementCount && bool ; j++){
                if (viewSectionElement.children[i].children[1].innerHTML>viewSectionElement.children[j].children[1].innerHTML){
                    viewSectionElement.children[j].before(viewSectionElement.children[i]);
                    bool = false;
                }
            }
        }
    }
});

let draggingElement , x = 0 , y = 0;
let placeholder , wasDraggedOver = false , isDraggingStarted = false;

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
    
    if (isDraggingStarted){
        placeholder && placeholder.parentNode.removeChild(placeholder);
        isDraggingStarted = false;
    }
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
function getNowDateAndTime() {
    let today = new Date();
    let fullYear, month, day, hours, minutes, seconds;
    fullYear = today.getFullYear();
    month = today.getMonth()+1;
    day = today.getDate();
    hours = today.getHours();
    minutes = today.getMinutes();
    seconds = today.getSeconds();
    if (month < 10)
        month = '0'+month;
    if (day < 10)
        day = '0'+day;
    if (hours < 10)
        hours = '0'+hours;
    if (minutes < 10)
        minutes = '0'+minutes;
    if (seconds < 10)
        seconds = '0'+seconds;
    console.log(fullYear);
    return (fullYear+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds);
}