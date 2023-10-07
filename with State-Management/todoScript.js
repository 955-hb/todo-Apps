 // Hello Hannes

const todoDescription = document.querySelector('#todo-description');
const btnAdd = document.querySelector('#btn-add');
const btnClear = document.querySelector('#btn-clear');


//check if something is in the state 
const state = JSON.parse(localStorage.getItem('state')) || {
    todos: [],
};


btnAdd.addEventListener('click', addTodo);




function addTodo(e) {
    e.preventDefault(); //button automatically reloads the page & preventDefault stops this 

    const newTodo = {
        description: todoDescription.value,
        done: false,
    }

    state.todos.push(newTodo);
    localStorage.setItem('state', JSON.stringify(state))
    todoDescription.value = '';
    todoDescription.focus(); //inputfield stays active
    location.reload();
}

//show todos on app
function renderTodos() {
    const todosList = document.querySelector('#todos-list');
    
    for (const todo of state.todos) {

        //create <li> 
        const newTodoLi = document.createElement('li');

        //create <input> 
       const doneCheckbox = document.createElement('input');

       //<input type='checkbox'>
       doneCheckbox.type = 'checkbox';

       //<input type='checkbox' id=''
       doneCheckbox.id = todo.description.toLowerCase().replaceAll(' ', '') + Math.floor(Math.random() * 145681465); //each new todo gets new id

       //<input type='checkbox' id=''>
       doneCheckbox.checked = todo.done; //checked if true

       //create <label> 
       const todoLabel = document.createElement('label');

       // <label for=''>
       todoLabel.setAttribute('for', doneCheckbox.id);

       //<label> Description </label>
       todoLabel.innerText = todo.description;

       //<input type='checkbox'> & append <label> on <li> 
       newTodoLi.append(doneCheckbox, todoLabel);

       //<li> append on <ul> (as child-Element)
       todosList.append(newTodoLi);
    }
};
renderTodos();

//clear LocalStorage
btnClear.addEventListener('click', () => {
    localStorage.clear();
    console.log('clear LS');
});