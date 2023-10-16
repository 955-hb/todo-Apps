//Hello Hannes

const remBtn = document.querySelector(".removeBtn");
const addBtn = document.querySelector(".addBtn");
const inputField = document.querySelector(".input");
const ulEl = document.querySelector(".todo-container");
const delLsBtn = document.querySelector(".delLsBtn");

//template state
const state = {
  todos: [
    { description: "Learn HTML", done: true, id: 1 },
    { description: "Learn CSS", done: true, id: 2 },
    { description: "Learn JavaScript", done: false, id: 3 },
  ],
};

loadFromLocalStorage();
renderTodos();

//CLICK-EVENT
addBtn.addEventListener("click", () => {
  addInput();

  inputField.value = ""; //set input-field to empty
});

//load in LocalFromStorage & State
function loadFromLocalStorage() {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  console.log("storedTodos", storedTodos);
  if (storedTodos) {
    state.todos = storedTodos;
  }
}

function addInput(e) {
  //e.preventDefault();  //errormessage, why?

  //remove blank character
  const inputValue = inputField.value.trim();

  if (inputValue !== "" && inputValue.length >= 4) {
    const newTodo = {
      description: inputField.value,
      done: false,
      id: Math.floor(Math.random() * 30000),
    };

    //update State
    state.todos.push(newTodo);

    //funktionaufruf
    renderTodos();
    updateLocalStorage();
  } else {
    alert("unzulässige Eingabe!");
  }
}

function renderTodos() {
  ulEl.innerHTML = "";
  //change done-status
  for (let todo of state.todos) {
    const doneCheckbox = document.createElement("input");
    doneCheckbox.type = "checkbox";
    doneCheckbox.checked = todo.done;
    doneCheckbox.addEventListener("change", function (e) {
      const newTodoDoneState = e.target.checked;
      todo.done = newTodoDoneState;
      updateLocalStorage();
    });
    const newLi = document.createElement("li");
    const liText = document.createTextNode(todo.description);
    ulEl.appendChild(newLi);
    newLi.appendChild(doneCheckbox);
    newLi.appendChild(liText);
  }
}

//remove done-tasks
remBtn.addEventListener("click", () => {
  state.todos = state.todos.filter((todo) => !todo.done);

  //update State ....wie?

  updateLocalStorage();
  renderTodos();
});

//clear LocalStorage
delLsBtn.addEventListener("click", () => {
  localStorage.clear();
});

function updateLocalStorage() {
  //update LocalStorage
  localStorage.setItem("todos", JSON.stringify(state.todos));
}
