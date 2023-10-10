//Hello Hannes

const remBtn = document.querySelector(".removeBtn");
const addBtn = document.querySelector(".addBtn");
const inputField = document.querySelector(".input");
const ulEl = document.querySelector(".todo-container");
const delLsBtn = document.querySelector(".delLsBtn");

//template state
const state =  {
  todos: [
    { description: "Learn HTML", done: true, id: 1 },
    { description: "Learn CSS", done: true, id: 2 },
    { description: "Learn JavaScript", done: false, id: 3 },
  ],
};

//CLICK-EVENT
addBtn.addEventListener("click", () => {
  addInput();
  
  inputField.value = ""; //set input-field to empty
});

function loadInLocalStorage() {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  console.log("storedTodos", storedTodos);
  if (storedTodos) {
    state.todos = storedTodos;
  }
}

function addInput(e) {
  //e.preventDefault();  //errormessage, why?

  const newTodo = {
    description: inputField.value,
    done: false,
    id: Math.floor(Math.random() *30000),

    
  };
  //update State
  state.todos.push(newTodo);
  //update LocalStorage
  localStorage.setItem('todos', JSON.stringify(state.todos));

  //funktionaufruf
  renderTodos();
  loadInLocalStorage();
}


function renderTodos() {
  //remove blank character
  const inputValue = inputField.value.trim(); 
  
  //change done-status
//   const doneCheckbox = document.createElement("input");

//   //<input type='checkbox' id=''>
//   doneCheckbox.checked = todos.done; //checked if true

//   doneCheckbox.addEventListener('change', (e) => {
//     const newTodoDoneState = e.target.checked;
//     todos.done = newTodoDoneState
// })

  if (inputValue !== "" && inputValue.length >= 4) {
    
    
    // show todos in DOM
    

    const newLi = document.createElement("li");
    const newInput = document.createElement("input");
    newInput.setAttribute("type", "checkbox");
    const liText = document.createTextNode(inputField.value);
    
    ulEl.appendChild(newLi);
    newLi.appendChild(newInput);
    newLi.appendChild(liText);
  } else {
    alert("unzulässige Eingabe!");
  }
}




remBtn.addEventListener("click", () => {
  const toDoItems = ulEl.querySelectorAll("li");

  toDoItems.forEach((item) => {
    const checkbox = item.querySelector("input[type='checkbox']");
    if (checkbox.checked) {
      item.remove();
    }
  });
});

delLsBtn.addEventListener("click", () => {
  localStorage.clear();
  addInput();
});

