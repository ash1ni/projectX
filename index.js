function newElement() {
  var inputElement = document.createElement("input");
  inputElement.setAttribute("type", "checkbox");

  var inputValue = document.getElementById("myInput").value;
  var label = document.createElement("label");
  label.innerHTML = inputValue;

  var mainBox = document.getElementById("todoList")

  // add the item to the main todo list
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    mainBox.appendChild(inputElement);
    mainBox.appendChild(label);
    mainBox.appendChild(document.createElement("br"));
  }

  // clear the console
  document.getElementById("myInput").value = "";
}
