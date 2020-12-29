
var xhttp = new XMLHttpRequest();

// Create a "close" button and append it to each list item
var nodeList = document.getElementsByClassName("todo-item");
var i;
for (i = 0; i < nodeList.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  nodeList[i].appendChild(span);
}

var sendPostRequest = (url, req) => {
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(req);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    const id = div.id;
    const req = 'id='+id;
    sendPostRequest("delete", req);
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

  var inputValue = document.getElementById("itemInput").value;

  if (inputValue === '') {
    alert("You must write something!");
    return;
  }

  var li = document.createElement("li");
  const datatime = new Date().valueOf();
  const id = document.createAttribute("id");
  id.value = datatime.toString();
  const text = document.createTextNode(inputValue);
  const task = text.textContent;

  li.appendChild(text);
  li.setAttributeNode(id);

  const req = 'id='+id.value+'&task='+task;
  sendPostRequest("create", req);

  const todolist = document.getElementById("todoList").appendChild(li);
  console.log(todolist);

  document.getElementById("itemInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}