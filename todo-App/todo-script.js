// Hello Hannes

const remBtn = document.querySelector(".removeBtn");
const addBtn = document.querySelector(".addBtn");
const inputField = document.querySelector(".input");
const outputContainer = document.querySelector(".todo-container");
const remLsBtn = document.querySelector(".delLsBtn");

const state = JSON.parse(localStorage.getItem("state")) || {
  todos: [
    { description: "Learn HTML", done: true, id: 1 },
    { description: "Learn CSS", done: true, id: 2 },
    { description: "Learn JavaScript", done: false, id: 3 },
  ],
};

// click-Events
addBtn.addEventListener("click", () => {
  addTodo();
  const storedTodos = JSO.parse(localStorage.getItem("todos"));
  console.log(storedTodos);
});

function addTodo(e) {
  e.preventDefault();

  const newTodo = {
    description: todoDescription.value,
    done: false,
    //id: Math.floor(Math.random() * 50000),
  };

  state.todos.push(newTodo);
  localStorage.setItem("state", JSON.stringify(state));
  todoDescription.value = "";
  todoDescription.focus(); // inputfield stay active
  location.reload();

  //funktionaufruf
  renderTodos();
}

function renderTodos() {
  //remove blank characters
  const inputValue = inputField.value.trim();

  //change done-status
  const doneCheckbox = document.createElement("input");
  doneCheckbox.type = "checkbox";

  //<input type='checkbox' id=''>
  doneCheckbox.id =
    todo.description.toLowerCase().replaceAll(" ", "") +
    Math.floor(Math.random() + 145681465);
  doneCheckbox.checked = state.todos.done;

  doneCheckbox.addEventListener("change", (e) => {
    const newTodoDoneState = e.target.checked;
    state.todos.done = newTodoDoneState;
  });

  //create <label>
  const todoLabel = document.createElement("label");

  // <label for=''>
  todoLabel.setAttribute("for", doneCheckbox.id);

  //<label> Description </label>
  todoLabel.innerText = todo.description;

  //<input type='checkbox'> & append <label> on <li>
  newTodoLi.append(doneCheckbox, todoLabel);

  //<li> append on <ul> (as child-Element)
  todosList.append(newTodoLi);
};
renderTodos();

//clear LocalStorage
remLsBtn.addEventListener('click', () => {
    localStorage.clear();
    
})

