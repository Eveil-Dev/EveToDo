/* Selectors */

const todoInput = document.querySelector('.todo-input')
const addButton = document.querySelector('.add')
const cardsContainer = document.querySelector('.cards')
const filterOption = document.querySelector('.filter-todos')

/* Event Listeners */

document.addEventListener('DOMContentLoaded', setupItems);
addButton.addEventListener('click', addTask);
cardsContainer.addEventListener('click', deleteAndCheckTask);
filterOption.addEventListener('click', filterTodo);


/* functions */

function addTask(e){
    e.preventDefault();

    const value = todoInput.value;
    const id = new Date().getTime().toString();

    /*create new item*/

    const htmlCard = `
        <div class="text">${value}</div>
        <button class="done">
            <i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button class="delete">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
    `
    const card = document.createElement('div');
    let attr = document.createAttribute('data-id');
    attr.value = id;
    card.setAttributeNode(attr);
    card.classList.add('card');
    card.innerHTML = htmlCard;
    cardsContainer.appendChild(card);

    /*add to a LocalStorage*/

    addToLocalStorage(id,value, "");

    /*clear to-do input value*/

    todoInput.value = "";
}

function deleteAndCheckTask(e){
    const item = e.target;

    //Delete

    if(item.classList[0] === 'delete'){
        const todo = item.parentElement;
        const id = todo.dataset.id;
        removeFromLocalStorage(id);
        todo.remove();
    }

    //Check

    if(item.classList[0] === 'done'){
        const todo = item.parentElement;
        const id = todo.dataset.id;

        if(todo.classList.contains('completed')){
            todo.classList.remove('completed');
            unCheckInLocalStorage(id);
        }else{
            todo.classList.add('completed');
            checkInLocalStorage(id);
        }

    }
}

function filterTodo(e){
    const todos = cardsContainer.childNodes;

    
    todos.forEach(function(item){
        switch(e.target.value){
            case "all":
                item.style.display = "flex";
                break;
            case "completed":
                if(item.classList.contains("completed")){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!item.classList.contains("completed")){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
                break;
        }
    })
}

//LOCAL STORAGE

function getLocalStorage(){
    return localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
}

function addToLocalStorage(taskId, taskValue, taskStatus){
    const task = {taskId, taskValue, taskStatus};
    
    let todos = getLocalStorage();

    todos.push(task);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeFromLocalStorage(id){
    let todos = getLocalStorage();

    todos = todos.filter(function(item){
        if(item.taskId !== id){
            return item;
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkInLocalStorage(id){
    let todos = getLocalStorage();

    todos.forEach(function(item){
        if(item.taskId == id){
            item.taskStatus = "checked";
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));

}

function unCheckInLocalStorage(id){
    let todos = getLocalStorage();

    todos.forEach(function(item){
        if(item.taskId == id){
            item.taskStatus = "";
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}

//SETUP ITEMS

function setupItems(){
    let todos = getLocalStorage();

    if(todos.length > 0){
        todos.forEach(function(item){
            createItem(item.taskId, item.taskValue, item.taskStatus);
        });
    }
}

function createItem(id, value, status){
    const htmlCard = `
        <div class="text">${value}</div>
        <button class="done">
            <i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button class="delete">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
    `
    const card = document.createElement('div');
    let attr = document.createAttribute('data-id');
    attr.value = id;
    card.setAttributeNode(attr);
    card.classList.add('card');
    card.innerHTML = htmlCard;
    cardsContainer.appendChild(card);

    if(status == "checked"){
        card.classList.add('completed');
    }

}
