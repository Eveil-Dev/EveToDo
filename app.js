/* Selectors */

const todoInput = document.querySelector('.todo-input')
const addButton = document.querySelector('.add')
const cardsContainer = document.querySelector('.cards')
const filterOption = document.querySelector('.filter-todos')

/* Event Listeners */

document.addEventListener('DOMContentLoaded', getTodos);
addButton.addEventListener('click', addTask);
cardsContainer.addEventListener('click', deleteAndCheckTask);
filterOption.addEventListener('click', filterTodo);


/* functions */

function addTask(event){
    event.preventDefault();

    /*create new item*/

    const htmlCard = `
        <div class="text">${todoInput.value}</div>
        <button class="done">
            <i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button class="delete">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
    `
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = htmlCard;
    cardsContainer.appendChild(card);

    /*add to a LocalStorage*/

    saveLocalTodos(todoInput.value);

    /*clear to-do input value*/

    todoInput.value = "";
}

function deleteAndCheckTask(e){
    const item = e.target;

    //Delete

    if(item.classList[0] === 'delete'){
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }

    //Check

    if(item.classList[0] === 'done'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
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

function saveLocalTodos(todo){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(item){
        const htmlCard = `
        <div class="text">${item}</div>
        <button class="done">
            <i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button class="delete">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
    `
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = htmlCard;
    cardsContainer.appendChild(card);
    });
}

function removeLocalTodos(todo){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
    
}