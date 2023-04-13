var TASKS_SECTION = document.querySelector(".tasks");
var TASKS_COUNT = 0;
var ADD_TASK_BUTTON = document.getElementById("add-task-btn");
var INPUT_FIELD = document.querySelector("#new-task-form input");
var TASK_COUNT_ELEMENT = document.querySelector(".task-count");
var CLEAR_LIST_BTN = document.getElementById("clear-data");

function addActionNewTaskButton() {
  ADD_TASK_BUTTON.addEventListener("click", function (ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();

    appendNewTaskToTasksSection();
    updateTaskCount();
  });
}

function appendNewTaskToTasksSection() {
  if (INPUT_FIELD.value != '') {
    TASKS_SECTION.appendChild(createNewTask(INPUT_FIELD.value));
    INPUT_FIELD.value = "";
  }
}

function createNewTask(taskString) {
  let task = document.createElement("div");
  task.classList.add("task");
  let taskID = `task-${TASKS_COUNT++}`;

  let inputElement = document.createElement("input");
  inputElement.setAttribute("type", "checkbox");
  inputElement.id = taskID;
  inputElement.addEventListener('change', addActionMarkTaskAsCompleted);

  let taskLabel = createTaskLabel(taskID, taskString);
  let deleteTaskButton = createDeleteTaskButton();

  task.appendChild(inputElement);
  task.appendChild(taskLabel);
  task.appendChild(deleteTaskButton);

  return task;
}

function createTaskLabel(taskID, taskString) {
  let label = document.createElement("label");
  label.htmlFor = taskID;

  let customCheckbox = document.createElement("span");
  customCheckbox.classList.add("custom-checkbox");

  label.appendChild(customCheckbox);
  label.appendChild(document.createTextNode(taskString));

  return label;
}

function createDeleteTaskButton() {
  let deleteBtn = document.createElement("button");

  deleteBtn.classList.add("delete-task");
  deleteBtn.setAttribute("type", "button"); // this button does nothing
  deleteBtn.innerText = "\u274c"; // basically ❌
  deleteBtn.addEventListener("click", deleteTaskListener);

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

function clearCompletedTasks() {
  CLEAR_LIST_BTN.addEventListener('click', (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();

    let allTasks = document.getElementsByClassName('tasks')[0].querySelectorAll('.task');

    // make a list of nodes which are to be removed
    // remove them all at once after the iteration is done
    let tasksToBeRemoved = [];
    for (let i = 0; i < allTasks.length; i++) {
      let currentTask = allTasks[i];

      // children[0] contains checkbox element
      if (currentTask.children[0].checked) {
        tasksToBeRemoved.push(currentTask);
      }
    }

    for (let task of tasksToBeRemoved) {
      TASKS_SECTION.removeChild(task);
    }
  });
}

function updateTaskCount() {
  TASK_COUNT_ELEMENT.textContent = `${TASKS_COUNT} tasks remaining`;
}

function addActionMarkTaskAsCompleted(ev) {
  let checkBox = ev.target;

  if (checkBox.checked) {
    TASKS_COUNT -= 1;
    updateTaskCount();
  } else {
    TASKS_COUNT += 1;
    updateTaskCount();
  }
}

clearCompletedTasks();
addActionNewTaskButton();
updateTaskCount();


function func(){
  const payload =  returnAllTasks()
  console.log(payload)
  console.log(JSON.stringify(payload));

   const options = {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  };
  fetch('http://localhost:3000/request',options)
  
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // handle the data (e.g. display the tasks in the UI)
  })
  .catch(error => console.error(error));


}
 function returnAllTasks(){
  var result = [];
  var allTasks = document.querySelector(".tasks").childNodes;

   // console.log(`tasks: ${tasks}`);

    for (let i=0; i<allTasks.length;i++) {
      let currentTask = allTasks[i];
      let taskID = currentTask.children[0].id;
      let taskContent = currentTask.children[1].textContent;
      let taskStatus = currentTask.children[0].checked;
      let obj = {
        id:taskID,
        content:taskContent,
        status:taskStatus
      }
      result.push({
        id: taskID,
        task: obj

      })
     // console.log(obj)
      
      
    }
    console.log(result);
    return result;

 }