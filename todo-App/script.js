//Hello Hannes

const remBtn = document.querySelector(".removeBtn");
const addBtn = document.querySelector(".addBtn");
const inputField = document.querySelector(".input");
const ulEl = document.querySelector(".todo-container");
const delLsBtn = document.querySelector(".delLsBtn");

//check if something is in the state
const state = {
  todos: [
    { description: "Learn HTML", done: true },
    { description: "Learn CSS", done: true },
    { description: "Learn JavaScript", done: false },
  ],
};

//CLICK-EVENT
addBtn.addEventListener("click", () => {
  addInput();
  inputField.value = ""; //set input-field to empty
});

function addInput() {

  const newTodo = {
    description: inputField.value,
    done: false,
  }

  //remove blank character
  const inputValue = inputField.value.trim(); 

  if (inputValue !== "") {
    state.todos.push(newTodo)
    
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

