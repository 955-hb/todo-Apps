const remBtn = document.querySelector('.removeBtn');
const addBtn = document.querySelector('.addBtn');
const inputField = document.querySelector('.input');
const ulEl = document.querySelector('.todo-container');

addBtn.addEventListener('click', () => {
  addInput();
  inputField.value = ''; //set input-field to empty
})

function addInput() {
  const inputValue = inputField.value.trim(); //remove blank character
  console.log(inputValue);
  if (inputValue !== '') {
    const newLi = document.createElement('li');
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'checkbox');
    const liText = document.createTextNode(inputField.value);

    ulEl.appendChild(newLi);
    newLi.appendChild(newInput);
    newLi.appendChild(liText);
    
  } else {
    alert('unzulässige Eingabe!');
  }
}

remBtn.addEventListener('click', () => {
  const toDoItems = ulEl.querySelectorAll('li');

  toDoItems.forEach((item) => {
    const checkbox = item.querySelector("input[type='checkbox']");
    if (checkbox.checked) {
      item.remove();
    }
  });
});
















// const btnRemove = document.querySelector(".removeBtn");
// const btnAdd = document.querySelector(".btn-add");
// const inputTodo = document.querySelector(".todoInput");

// // empty Array
// const todos = [];

// btnAdd.addEventListener("click", (e) => {
//   e.preventDefault(); //button automatically reloads the page & preventDefault stops this
//   todos.push(inputTodo.value);
//   inputTodo.value = "";
//   console.log(todos);
// });

// function renderTodos() {
//   const todoContainer = document.querySelector(".todo-container");

//     const newTodoUl = document.createElement("ul");
//     const newTodoLi = document.createElement("li");
//     const doneCheckbox = document.createElement("input");
//     const todoLabel = document.createElement('label');
//     //doneCheckbox.type = "checkbox";
//     doneCheckbox.setAttribute('class', 'todo-container');
//     doneCheckbox.setAttribute('type', 'checkbox');

//     todoLabel.setAttribute("for", doneCheckbox.id);
//     todoLabel.innerText = todos;
//     newTodoUl.append(doneCheckbox, todoLabel);
//     //todoContainer.append(newTodoUl);
  
// }
// renderTodos();







