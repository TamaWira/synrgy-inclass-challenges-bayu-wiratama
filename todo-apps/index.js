let todos = [];

// === Events
const todoForm = document.getElementById("formInputTask");
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo();
});

// === Event Handlers
function addTodo() {
  const task = document.getElementById("task").value;
  todos.push(task);

  showTodo();
  checkTodo();
}

function checkTodo() {
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const index = event.target.getAttribute("data-index");
      console.log(`Clicked remove button from ${todos[index]}`);
      todos.splice(index, 1);
      console.log(todos);
    });
  });
  showTodo();
}

function showTodo() {
  const todoItems = document.getElementById("taskList");
  todoItems.innerHTML = "";

  console.log(`Showing tasks from these ${todos}`);

  for (let i in todos) {
    const taskItem = document.createElement("li");
    const taskTitle = document.createElement("span");
    const deleteButton = document.createElement("button");
    const updateButton = document.createElement("button");

    taskTitle.innerText = todos[i];

    deleteButton.innerText = "Remove";
    deleteButton.setAttribute("class", "remove-btn");
    deleteButton.setAttribute("data-index", i);

    updateButton.innerText = "Update";
    updateButton.setAttribute("class", "update-btn");
    updateButton.setAttribute("data-index", i);

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(updateButton);

    todoItems.appendChild(taskItem);
  }

  console.log(document.body);
}
