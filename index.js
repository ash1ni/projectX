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
  TASKS_SECTION.appendChild(createNewTask(INPUT_FIELD.value));
  INPUT_FIELD.value = "";
}

function createNewTask(taskString) {
  let task = document.createElement("div");
  task.classList.add("task");
  let taskID = `task-${TASKS_COUNT++}`;

  let inputElem = document.createElement("input");
  inputElem.setAttribute("type", "checkbox");
  inputElem.id = taskID;

  let taskLabel = createTaskLabel(taskID, taskString);
  let deleteTaskButton = createDeleteTaskButton();

  task.appendChild(inputElem);
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
    ev.stopPropagation();
    
    let tasks = document.querySelector(".tasks").childNodes;

    console.log(`tasks: ${tasks}`);

    for (let i=0; i<tasks.length;i++) {
      let task = tasks[i].childNodes;

      if (task[0].checked) {
        TASKS_SECTION.removeChild(tasks[i]);
      } 
      console.log(`tasks[i]: ${tasks[i]}`);
    }
  });
}

clearCompletedTasks();

function updateTaskCount() {
  TASK_COUNT_ELEMENT.textContent = `${TASKS_COUNT} tasks remaining`;
}

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