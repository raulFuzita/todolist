const xhttp = new XMLHttpRequest();
const todolist = document.getElementById("todoList");
const itemInput = document.getElementById("itemInput");
const close = document.getElementsByClassName("close");
const nodeList = document.getElementsByClassName("todo-item");
const csrfElement = document.getElementById("csrf");

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
    setHeader(req)
}

const sendPutRequest = (url, req) => {
  xhttp.open("PUT", url, true);
  setHeader(req)
}

const sendDeleteRequest = (url, req) => {
  xhttp.open("DELETE", url, true);
  setHeader(req)
}

const setHeader = (req) => {
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  csrf = `&_csrf=${csrfElement.value}`
  xhttp.send(req+csrf);
}

// Create a "close" button and append it to each list item
function renderCloseButton() {
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
function createCloseButton() {
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
function addDeleteEventListener() {
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      const div = this.parentElement;
      div.style.display = "none";
      const id = div.id;
      const req = 'taskId='+id; // Request content
      sendDeleteRequest("task", req);
    }
  }
}

/**
 * This function adds an event listener to an element.
 * This function send a request to the server.
 * Add a "checked" symbol when clicking on a list item.
 */
function addCheckedEventListener() {
  const list = document.querySelector('ul.todo-list');
  list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        const id = ev.target.id;
        const isChecked = ev.target.classList.contains('checked');
        const req = 'taskId='+id+'&status='+isChecked; // Request content
        sendPutRequest("task", req);
    }
  }, false);
}

/**
 * Create a new list item when clicking on the "Add" button
 */
function newElement() {

  let inputValue = DOMPurify.sanitize(itemInput.value);

  // If input is empty an alert message is fired.
  if (inputValue === '') {
    yieldAlert({createTask: {
        status: 'alert-danger',
        message: 'You must write something!'
    }})
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

  const req = 'taskId='+id.value+'&task='+task; // Request content
  sendPostRequest("task", req);

  todolist.appendChild(li);
  itemInput.value = "";
  li.appendChild(createCloseButton());

  addDeleteEventListener();
}