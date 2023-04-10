var TASKS_SECTION = document.querySelector('.tasks');
var TASKS_COUNT = 0;
var ADD_TASK_BUTTON = document.getElementById('add-task-btn')
var INPUT_FIELD = document.querySelector('#new-task-form input');
var TASK_COUNT_ELEMENT = document.querySelector('.task-count');

function addActionNewTaskButton() {
  ADD_TASK_BUTTON.addEventListener("click", function (ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();

    appendNewTaskToTasksSection();
  });
}

function appendNewTaskToTasksSection() {
  TASKS_SECTION.appendChild(createNewTask(INPUT_FIELD.value));
  INPUT_FIELD.value = '';
}

function createNewTask(taskString) {
  let task = document.createElement('div');
  task.classList.add('task');
  let taskID = `task-${TASKS_COUNT++}`;

  let inputElem = document.createElement('input');
  inputElem.setAttribute('type', 'checkbox');
  inputElem.id = taskID;

  let taskLabel = createTaskLabel(taskID, taskString);
  let deleteTaskButton = createDeleteTaskButton();

  task.appendChild(inputElem);
  task.appendChild(taskLabel);
  task.appendChild(deleteTaskButton);

  return task;
}

function createTaskLabel(taskID, taskString) {
  let label = document.createElement('label');
  label.htmlFor = taskID;

  let customCheckbox = document.createElement('span');
  customCheckbox.classList.add('custom-checkbox');

  label.appendChild(customCheckbox);
  label.appendChild(document.createTextNode(taskString));

  return label;
}

function createDeleteTaskButton() {
  let deleteBtn = document.createElement('button');

  deleteBtn.classList.add('delete-task');
  deleteBtn.setAttribute('type', 'button'); // this button does nothing
  deleteBtn.innerText = '\u274c'; // basically ❌
  deleteBtn.addEventListener('click', deleteTaskListener);

  return deleteBtn;
}

function deleteTaskListener(ev) {
  ev.preventDefault();
  // ev.stopImmediatePropagation();
  
  taskToBeDeleted = ev.target.parentElement;
  TASKS_SECTION.removeChild(taskToBeDeleted);
  TASKS_COUNT--;

  updateTaskCount();
}

function updateTaskCount() {
  TASK_COUNT_ELEMENT.textContent = `${TASKS_COUNT} tasks remaining`;
}

addActionNewTaskButton();
updateTaskCount();