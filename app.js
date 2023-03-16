const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//Event Listeneres
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);

function addTodo (event){

    //prevent form from submitting
    event.preventDefault();

    // create a todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create LI 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value; // the value i want to get
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //check mark button
    const completedButton  = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

        //Delete/ Trash button
    const trashButton  = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    // Append List
    todoList.appendChild(todoDiv);
    //clear Todo Input Value
    todoInput.value = '';
}

function deleteCheck(e){
    const item = e.target;
    //Delete Todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement; // remove parent element
        //Animation
        todo.classList.add('fall')
        // first done the animation then remove the item
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
        
    }

    //Check Mark
    if(item.classList[0]==='complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed")

    }
}