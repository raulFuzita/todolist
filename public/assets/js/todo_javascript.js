const xhttp = new XMLHttpRequest();
const todolist = document.getElementById("todoList");
const itemInput = document.getElementById("itemInput");
const close = document.getElementsByClassName("close");
const nodeList = document.getElementsByClassName("todo-item");

/*
 * This function is an IIFE (Immediately Invoked Function Expression).
 * It should run as soon as the js file is loaded.
 * Javascript & Jquery, Interactive front-end web development, John Duckett, 2014, page 97.
 */
(function(){
  renderCloseButton();
  addDeleteEventListener();
  addCheckedEventListener();
}());

/**
 * This method send a post request to a specified URL
 * @param {HTTP} url - Request to URL
 * @param {string} req - Format of URL variables
 */
const sendPostRequest = (url, req) => {
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(req);
}

// Create a "close" button and append it to each list item
renderCloseButton = () =>{
  for (let i = 0; i < nodeList.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    nodeList[i].appendChild(createCloseButton());
  }
}

/**
 * This function creates an html close button with X icon.
 * It returns a span element
 * @returns HTML span element
 */
createCloseButton = () => {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  return span;
}

/**
 * This function adds an event listener to an element and 
 * when the function is fored the element is changed to none.
 * This function send a request to the server.
 * Click on a close button to hide the current list item.
 */
addDeleteEventListener = () => {
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      const div = this.parentElement;
      div.style.display = "none";
      const id = div.id;
      const req = 'id='+id; // Request content
      sendPostRequest("delete", req);
    }
  }
}

/**
 * This function adds an event listener to an element.
 * This function send a request to the server.
 * Add a "checked" symbol when clicking on a list item.
 */
addCheckedEventListener = () => {
  const list = document.querySelector('ul.todo-list');
  list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        const id = ev.target.id;
        const isChecked = ev.target.classList.contains('checked');
        const req = 'id='+id+'&status='+isChecked; // Request content
        sendPostRequest("update", req);
    }
  }, false);
}

/**
 * Create a new list item when clicking on the "Add" button
 */
newElement = () => {

  let inputValue = DOMPurify.sanitize(itemInput.value);

  // If input is empty an alert message is fired.
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

  const req = 'id='+id.value+'&task='+task; // Request content
  sendPostRequest("create", req);

  todolist.appendChild(li);
  itemInput.value = "";
  li.appendChild(createCloseButton());

  addDeleteEventListener();
}