const tasks = [
    {
        description: 'Ler um livro'
    },
    {
        description: 'Fazer lição de casa'
    },
    {
        description: 'varrer o chao do quarto'
    },
    {
        description: 'Fazer comida'
    }
]

const Card = {
    all: tasks,
    add(task){
        Card.all.push(task);
        App.reload();
    },
    remove(){

    }
}

const DOM = {
    cardContainer: document.querySelector('.cards'),
    addCard(task, index){
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = DOM.innerHTMLCard(task);
        DOM.cardContainer.appendChild(card);
    },
    innerHTMLCard(task){
        const html = `
            <div class="text">${task.description}</div>
            <button class="done"><i class="fa fa-check" aria-hidden="true"></i></button>
            <button class="delete"><i class="fa fa-trash" aria-hidden="true"></i></button> 
        `
        return html;
    },
    clearCards(){
        DOM.cardContainer.innerHTML = "";
    }
}

const App = {
    init(){
        Card.all.forEach(task => {
            DOM.addCard(task)
        })
    },
    reload(){
        DOM.clearCards();
        App.init()
    }
}

App.init();

Card.add({
    description: 'Lavar louça'
})

Card.add({
    description: 'Arrumar o guarda-roupa'
})

Card.add({
    description: 'Lavar a roupa'
})