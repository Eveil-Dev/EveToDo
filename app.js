const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("eveTodo:tasks")) || []
    },
    set(tasks){
        localStorage.setItem("eveTodo:tasks", JSON.stringify(tasks))
    }
}

const Card = {
    all: Storage.get(),
    add(task){
        Card.all.push(task);
        App.reload();
    },
    remove(index){
        Card.all.splice(index, 1);
        App.reload();
    }
}

const DOM = {
    cardContainer: document.querySelector('.cards'),
    addCard(task, index){
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = DOM.innerHTMLCard(task, index);
        card.dataset.index = index;
        DOM.cardContainer.appendChild(card);
    },
    innerHTMLCard(task, index){
        const html = `
            <div class="text">${task.description}</div>
            <button class="done"><i class="fa fa-check" aria-hidden="true"></i></button>
            <button class="delete" onclick="Card.remove(${index})"><i class="fa fa-trash" aria-hidden="true"></i></button> 
        `
        return html;
    },
    clearCards(){
        DOM.cardContainer.innerHTML = "";
    }
}

const Form = {
    description: document.querySelector('input#todoInput'),

    getValues(){
        return {
            description: Form.description.value
        }
    },
    validateField(){
        const { description } = Form.getValues();
        if(description.trim() === ""){
            throw new Error("Preencha o campo");
        }
    },
    clearField(){
        Form.description.value = ""
    },
    submit(event){
        event.preventDefault();

        try{
            Form.validateField();
            Card.add(this.getValues());
            Form.clearField();
        }catch(error){
            alert(error.message);
        }       
    }
}

const App = {
    init(){
        Card.all.forEach(DOM.addCard)
        Storage.set(Card.all);
    },
    reload(){
        DOM.clearCards();
        App.init()
    }
}

App.init();