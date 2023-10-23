let tasks = [];
let mode = 'save';
let selectedTask = null;

const formInputTask = document.getElementById('formInputTask');
const inputTask = document.getElementById('task');
const taskList = document.getElementById('taskList');

function validateForm() {
  if (inputTask.value === '') {
    alert('inputTask is required');
    return false;
  }
  console.log('masuk sini');
  return true;
}

function submitFormInputTask(e) {
  e.preventDefault();

  if (validateForm()) {
    if (selectedTask && selectedTask.id && mode === 'update') {
      updateTask({
        ...selectedTask,
        name: inputTask.value,
      });
      return;
    }

    addTask(inputTask.value);
  }
}

function addTask(taskValue) {
  tasks.push({
    name: taskValue,
    id: Date.now(),
  });
  inputTask.value = '';
  displayTasks(tasks);
}

function updateTask(selectedTask) {
  const newTasks = [...tasks].map((item) => {
    if (item.id === selectedTask.id) {
      return {
        ...item,
        name: selectedTask.name,
      };
    }
    return { ...item };
  });
  tasks = newTasks;
  inputTask.value = '';
  mode = 'save';
  displayTasks(tasks);
}

function handleRemove(id) {
  tasks = [...tasks].filter((item) => item.id !== id); // hapus data .splice
  displayTasks(tasks);
}

function handleUpdate(id) {
  selectedTask = tasks.find((item) => item.id === id);
  inputTask.value = selectedTask.name;
  mode = 'update';
}

function displayTasks(tasks) {
  const taskElements = [...tasks]
    .map(
      (item) => `
        <li>
            <div>
                <span>${item.name}</span>
                <button type="button" onclick="handleRemove(${item.id})">remove</button>
                <button type="button" onclick="handleUpdate(${item.id})">update</button>
            </div>
        </li>
    `
    )
    .join('');
  taskList.innerHTML = taskElements;
}

formInputTask.addEventListener('submit', submitFormInputTask);
