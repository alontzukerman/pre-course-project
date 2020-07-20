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

    containerDiv.addEventListener('click', () => {
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



