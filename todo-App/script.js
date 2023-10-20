//Hello Hannes

const remBtn = document.querySelector(".removeBtn");
const addBtn = document.querySelector(".addBtn");
const inputField = document.querySelector(".input");
const ulEl = document.querySelector(".todo-container");
const delLsBtn = document.querySelector(".delLsBtn");
const radioContainer = document.querySelector(".filter-container")

//radio-Filter
const filterOptions = ['all', 'done', 'open'];

//template state
const state = {
  filter: 'all',
  todos: [
    { description: "Learn HTML", done: true, id: 1 },
    { description: "Learn CSS", done: true, id: 2 },
    { description: "Learn JavaScript", done: false, id: 3 },
  ],
};

addBtn.addEventListener('click', () => {
  addInput();
  inputField.value = '';
  saveTodoAppStateToLocalStorage();
});

inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addInput();
    inputField.value = '';
  }
});

toDoAppStateDataFromLocalStorage();
render();

function toDoAppStateDataFromLocalStorage() {
  const toDoAppStateJSON = localStorage.getItem('state'); //eintrag wird ausgelesen
  if (toDoAppStateJSON !== null) {
    state = JSON.parse(toDoAppStateJSON);
  } else {
    console.log('keine Daten im local Storage!');
  };
}

function render() {
  ulEl.innerHTML = '';
  const filter = state.filter;

  for (let todo of state.todos) {
    const isDone = todo.done;

    if (
      filter === 'all' ||
      (filter === 'done && isDone') ||
      (filter === 'open' && !isDone)
    ) {
      const newLi = document.createElement('li');
      const newInput = document.createElement('input');

      newLi.setAttribute('data-id', todo.id);

      newInput.addEventListener('input', () => {
        todo.done = newInput.checked; //sync vom state und client-oberfläche
        updateStyling(newLi, newInput, todo.done);
        saveTodoAppStateToLocalStorage();
        console.log(todo.done);
      });
      newInput.setAttribute('type', 'checkbox');
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
    liElement.style.textDecoration = 'line-through';
    checkbox.checked = true;
  } else {
    liElement.style.textDecoration = 'none';
    checkbox.checked = false;
  }
}

function addInput() {
  const inputValue = inputField.value.trim(); //entfernt leerzeichen vor & nach value
  console.log(inputValue);
  if (inputValue !== '' && inputValue.length >=4) {
    const newTodo = {
      id: Math.floor(Math.random() * 30000),
      description: inputValue,
      done: false,
    };
    console.log('Gen ID:', newTodo.id);
    state.todos.push(newTodo);
    inputField.value = '';

    render();
    saveTodoAppStateToLocalStorage(); //neues todo? aktueller Stand wird gespeichert
  } else {
    alert('unzulässige Eingabe!');
    inputField.value = '';
  }
}

function saveTodoAppStateToLocalStorage() {
  const toDoAppStateJSON = JSON.stringify(state); 
  localStorage.setItem('todos', toDoAppStateJSON);
}

remBtn.addEventListener('click', removeDoneToDos);

function removeDoneToDos() {
  const checkboxesChecked = ulEl.querySelectorAll(
    "input[type='checkbox']:checked"
    );

    checkboxesChecked.forEach((checkbox) => {
      const li = checkbox.parentElement;
      const todoId = parseInt(li.getAttribute("data-id"), 10);

      //entfernt todo aus dem state anhand der id
      state.todos = state.todos.filter(
        (todo) => todo.id !== todoId
      );
      li.remove(); 
    });
    saveTodoAppStateToLocalStorage();
}

delLsBtn.addEventListener("click", () => {
  localStorage.clear();
});

//aktualisieren des filters im todo
radioContainer.addEventListener('change', updateFilter);

function updateFilter() {
  const selectedFilter = event.target.value;
  state.filter = selectedFilter;
  render();
}









/*
loadFromLocalStorage();
renderTodos();

//CLICK-EVENT
addBtn.addEventListener("click", (e) => {
  addInput();
  e.preventDefault();
  inputField.focus();
  inputField.value = ""; //set input-field to empty
});

//ulEl.addEventListener('change', updateTodo)

//load in LocalFromStorage & State
function loadFromLocalStorage() {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  console.log("storedTodos", storedTodos);
  if (storedTodos) {
    state.todos = storedTodos;
  }
}
//addInput
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
  const filter = state.filter;
  let filteredTodos = state.todos;

  // if (filterOpen.checked){
  //   filteredTodos = filteredTodos.filter(todo => !todo.done);
  // } else if (filterDone.checked) {
  //   filteredTodos = filteredTodos.filter(todo => todo.done);
  // };
  for ( let todo of state.todos) {
    if (
      filter === "all" ||
      (filter === "done" && isDone) ||
      (filter === "open" && !isDone)
      ){
      const newLi = document.createElement("li");
      const newInput = document.createElement("input");
      };

  }
  

  //change done-status
  for (const todo of filteredTodos) {
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


// radioFilter.forEach((radio) => {
//   radio.addEventListener('change', radioChange)
// });
// function radioChange(e){
//   const selectedRadio = e.target.id;
//   console.log(selectedRadio);
// }
*/

