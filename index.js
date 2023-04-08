var TASKS_SECTION = document.querySelector('.tasks');
var TASKS_COUNT = 0;
var count = 0;
var ADD_TASK_BUTTON = document.getElementById('add-task-btn')
var INPUT_FIELD = document.querySelector('#new-task-form input');

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

  // create new checkbox, with ID equals the global task count
  let inputElem = document.createElement('input');
  inputElem.setAttribute('type', 'checkbox');
  inputElem.id = taskID;

  // create new item, with associate checkbox
  let taskLabel = createTaskLabel(taskID, taskString);

  task.appendChild(inputElem);
  task.appendChild(taskLabel);

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

addActionNewTaskButton();
