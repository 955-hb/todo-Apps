//Hello Hannes

const remBtn = document.querySelector(".removeBtn");
const addBtn = document.querySelector(".addBtn");
const inputField = document.querySelector(".input");
const ulEl = document.querySelector(".todo-container");
const delLsBtn = document.querySelector(".delLsBtn");
const radioContainer = document.querySelector(".filter-container");
const form = document.querySelector(".todo-input");

const urlApi = "http://localhost:4730/todos";
const todos = await loadApiTasks();

//radio-Filter
//const filterOptions = ["all", "done", "open"];

/*
//template state
let state = {
  filter: 'all',
  todos: [
    { description: "Learn HTML", done: true, id: 1 },
    { description: "Learn CSS", done: true, id: 2 },
    { description: "Learn JavaScript", done: false, id: 3 },
  ],
};
*/




form.addEventListener("submit", (e) => {
  e.preventDefault();
  loadApiTasks()
  addInput();
  inputField.value = "";
  //saveTodoAppStateToLocalStorage();
});

//toDoAppStateDataFromLocalStorage();
//render();

async function loadApiTasks() {
  const response = await fetch(urlApi);
  const todosData = await response.json();
  
  render();
  console.log(todosData);

  return todosData;
}


/*
function toDoAppStateDataFromLocalStorage() {
  const toDoAppStateJSON = localStorage.getItem("state"); //eintrag wird ausgelesen
  if (toDoAppStateJSON !== null) {
    state = JSON.parse(toDoAppStateJSON);
  } else {
    console.log("keine Daten im local Storage!");
  }
}
*/

function render() {
  ulEl.innerHTML = "";
  const filter = todos.filter;

  for (let todo of todos) {
    const isDone = todo.done;

    if (
      filter === "all" ||
      (filter === "done" && isDone) ||
      (filter === "open" && !isDone)
    ) {
      const newLi = document.createElement("li");
      const newInput = document.createElement("input");

      newLi.setAttribute("data-id", todo.id);

      newInput.addEventListener("input", () => {
        todo.done = newInput.checked; //sync vom state und client-oberfläche
        updateStyling(newLi, newInput, todo.done);
        //saveTodoAppStateToLocalStorage();
        console.log(todo.done);
      });
      newInput.setAttribute("type", "checkbox");
      newInput.checked = todo.done;
      updateStyling(newLi, newInput, todo.done);

      const liText = document.createTextNode(todo.description);

      newLi.append(newInput);
      newLi.append(liText);
      ulEl.append(newLi);
    }
  }
}

function updateStyling(liElement, checkbox, isDone) {
  if (isDone) {
    liElement.style.textDecoration = "line-through";
    checkbox.checked = true;
  } else {
    liElement.style.textDecoration = "none";
    checkbox.checked = false;
  }
}

async function addInput() {
  const inputValue = inputField.value.trim(); //entfernt leerzeichen vor & nach value
  console.log(inputValue);
  if (inputValue !== "" && inputValue.length >= 4) {
    const newTodo = {
      id: Math.floor(Math.random() * 30000),
      description: inputValue,
      done: false,
    };
    console.log("Gen ID:", newTodo.id);
    todos.push(newTodo);
    inputField.value = "";

    render();
    //saveTodoAppStateToLocalStorage(); //neues todo? aktueller Stand wird gespeichert
  } else {
    alert("unzulässige Eingabe!");
    inputField.value = "";
  }

  const addTodoRequest = await fetch(urlApi, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newInput),
  });
  const addTodoResponse = await addTodoRequest.json();
  todos.push(addTodoRequest);
}

/*
function saveTodoAppStateToLocalStorage() {
  const toDoAppStateJSON = JSON.stringify(state);
  localStorage.setItem("state", toDoAppStateJSON);
}
*/

remBtn.addEventListener("click", removeDoneToDos);

function removeDoneToDos() {
  const checkboxesChecked = ulEl.querySelectorAll(
    "input[type='checkbox']:checked"
  );

  checkboxesChecked.forEach((checkbox) => {
    const li = checkbox.parentElement;
    const todoId = parseInt(li.getAttribute("data-id"), 10);

    //entfernt todo aus dem state anhand der id
    todos = todos.filter((todo) => todo.id !== todoId);
    li.remove();
  });

  fetch(urlApi + "/" + id, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(todos),
  });
  console.log(todos);

  loadTasksFromApi();
  //saveTodoAppStateToLocalStorage();
}

delLsBtn.addEventListener("click", () => {
  localStorage.clear();
});

//aktualisieren des filters im todo
radioContainer.addEventListener("change", updateFilter);

function updateFilter() {
  const selectedFilter = event.target.value;
  filter = selectedFilter;
  render();
}
