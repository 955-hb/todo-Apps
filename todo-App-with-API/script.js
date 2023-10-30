//Hello Hannes

const remBtn = document.querySelector(".removeBtn");
const addBtn = document.querySelector(".addBtn");
const inputField = document.querySelector(".input");
const ulEl = document.querySelector(".todo-container");
const delLsBtn = document.querySelector(".delLsBtn");
const radioContainer = document.querySelector(".filter-container");
const form = document.querySelector(".todo-input");

const urlApi = "http://localhost:4730/todos";

//radio-Filter
const filterOptions = ["all", "done", "open"];

//template state
let state = {
  filter: "all",
  todos: [],
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await addInput();
  await loadApiTasks();

  inputField.value = "";
});

async function init() {
  state.todos = await loadApiTasks();
  render();
}
init();

async function loadApiTasks() {
  const response = await fetch(urlApi);
  const todosData = await response.json();

  render();
  //console.log(todosData);

  return todosData;
}

function render() {
  ulEl.innerHTML = "";
  const filter = state.filter;
  //console.log(todos);

  for (let todo of state.todos) {
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
        //console.log(todo.done);
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
      //id: Math.floor(Math.random() * 30000), ID wird von todo-Api erzeugt!
      description: inputValue,
      done: false,
    };

    const addTodoRequest = await fetch(urlApi, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    const addTodoResponse = await addTodoRequest.json();
    state.todos.push(addTodoRequest);
    inputField.value = "";

    render();
  } else {
    alert("unzulässige Eingabe!");
    inputField.value = "";
  }
}

remBtn.addEventListener("click", removeDoneToDos);

function removeDoneToDos() {
  const checkboxesChecked = ulEl.querySelectorAll(
    "input[type='checkbox']:checked"
  );

  checkboxesChecked.forEach(async (checkbox) => {
    const li = checkbox.parentElement;
    const todoId = parseInt(li.getAttribute("data-id"), 10);

    //entfernt todo aus dem state anhand der id
    state.todos = state.todos.filter((todo) => todo.id !== todoId);

    await fetch(urlApi + "/" + todoId, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });

    li.remove();
  });

  //console.log(state.todos);
  loadApiTasks();
}

delLsBtn.addEventListener("click", () => {
  localStorage.clear();
});

//aktualisieren des filters im todo
radioContainer.addEventListener("change", updateFilter);

function updateFilter() {
  const selectedFilter = event.target.value;
  state.filter = selectedFilter;
  render();
}
