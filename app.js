const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeneres
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

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

    //Add Todo To Local Stroge
    saveLocalTodos(todoInput.value);

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
        removeLocalTodos(todo);
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
//filter option
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all" : 
            todo.style.display = "flex";
            break;
            case "completed" :
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
            break;
            case "uncompleted" :
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
            break;
        }

    })
}


function saveLocalTodos(todo){
    // CHECK -- hay do i already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];   
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    let todos;
    // CHECK -- hay do i already have thing in there?
    if (localStorage.getItem('todos') === null) {
      todos = [];   
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }   
    todos.forEach(function(todo){       
    // create a todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create LI 
    const newTodo = document.createElement('li');
    newTodo.innerText = todo; // the value i want to get
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

    });
}

// remove Todos from the local storage after delete the todos
function removeLocalTodos(todo){
    let todos;
    // CHECK -- hay do i already have thing in there?
    if (localStorage.getItem('todos') === null) {
      todos = [];   
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }  
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));

}
