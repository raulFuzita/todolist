const xhttp = new XMLHttpRequest();
const todolist = document.getElementById("todoList");
const itemInput = document.getElementById("itemInput");
const close = document.getElementsByClassName("close");
const nodeList = document.getElementsByClassName("todo-item");

(function(){
  renderCloseButton();
  addDeleteEventListener();
}());

const sendPostRequest = (url, req) => {
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(req);
}

// Create a "close" button and append it to each list item
function renderCloseButton(){
  for (let i = 0; i < nodeList.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    nodeList[i].appendChild(createCloseButton());
  }
}

// create an html close button with X icon.
function createCloseButton(){
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  return span;
}

// Click on a close button to hide the current list item
function addDeleteEventListener(){
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      const div = this.parentElement;
      div.style.display = "none";
      const id = div.id;
      const req = 'id='+id;
      sendPostRequest("delete", req);
    }
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul.todo-list');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');

      const id = ev.target.id;
      const isChecked = ev.target.classList.contains('checked');
      console.log(isChecked);
      const req = 'id='+id+'&status='+isChecked;
      sendPostRequest("update", req);
  }
}, false);

// Create a new list item when clicking on the "Add" button
newElement = () => {

  let inputValue = itemInput.value;

  if (inputValue === '') {
    alert("You must write something!");
    return;
  }

  let li = document.createElement("li");
  const datatime = new Date().valueOf();
  const id = document.createAttribute("id");
  id.value = datatime.toString();
  const text = document.createTextNode(inputValue);
  const task = text.textContent;

  li.appendChild(text);
  li.setAttributeNode(id);

  const req = 'id='+id.value+'&task='+task;
  sendPostRequest("create", req);

  todolist.appendChild(li);
  itemInput.value = "";
  li.appendChild(createCloseButton());

  addDeleteEventListener();
}