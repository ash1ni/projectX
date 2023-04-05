function newElement() {
  var todoItem = document.createElement("div");
  var inputElement = document.createElement("input");
  inputElement.setAttribute("type", "checkbox");

  var inputValue = document.getElementById("myInput").value;
  var label = document.createElement("label");
  label.innerHTML = inputValue;

  var mainBox = document.getElementById("todoList");

  // add the item to the main todo list
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    todoItem.appendChild(inputElement);
    todoItem.appendChild(label);
    todoItem.appendChild(document.createElement("br"));

    todoItem.setAttribute("id", create_UUID())
    todoItem.setAttribute("class", "todoItem")

    label.addEventListener("click", () => {
      console.log("inside listener")

      if (inputElement.checked) {
        label.classList.add('markAsComplete');
      } else {
        label.classList.remove('markAsComplete');
      }
    });

    mainBox.appendChild(todoItem);
  }

  // clear the console
  document.getElementById("myInput").value = "";
  
}

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}
