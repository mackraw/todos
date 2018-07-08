/* jshint esversion: 6 */

// Create array of todo items

let todos = [];
const addText = document.getElementById('inputItem');
const todosUl = document.querySelector('ul');

// Add item to array

function addItem() {
  todos.push(
  	{
  		content : addText.value,
  		completed : false
  	});
  addText.value = '';
  display();
}

const buttonAdd = document.getElementById('btnAdd');
buttonAdd.onclick = addItem;

// Add on enter press

addText.addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		buttonAdd.click();
	}
});

// Display array

function display() {
  // let todosUl = document.querySelector('ul');
  todosUl.innerHTML = '';
  for (var i = 0; i < todos.length; i++) {
	  let item = todos[i];
	  let todoLi = document.createElement('li');
	  todoLi.id = i;
	  todoLi.innerText = item.content;
    todoLi.appendChild(createCompleteButton());
	  todoLi.appendChild(createDeleteButton());
    todosUl.appendChild(todoLi);
    if (item.completed === false) {
		  todoLi.className = 'active';
	  } else {
			todoLi.className = 'completed';
	  }
	}
}

// Add delete button

function createDeleteButton() {
  let deleteButton = document.createElement('button');
	deleteButton.innerText = 'Delete';
	deleteButton.className = 'deleteBtn';
	return deleteButton;
}

// Delete item

function deleteItem(position) {
	todos.splice(position, 1);
	display();
}

function chooseCorrectButton() {
  //let todosUl = document.querySelector('ul');
  todosUl.addEventListener('click', function(event) {
    let elementClicked = event.target;
    if (elementClicked.className === 'deleteBtn') {
      deleteItem(parseInt(elementClicked.parentNode.id));
    } else if (elementClicked.className === 'completeBtn') {
    	completeItem(parseInt(elementClicked.parentNode.id));
    }
  });
}

chooseCorrectButton();

// Add Complete button

function createCompleteButton() {
	let completeButton = document.createElement('button');
	completeButton.className = 'completeBtn';
	completeButton.innerText = 'Toggle';
	// if (todos[position].completed === false) {
	// 	completeButton.innerText = 'Complete';
	// } else {
	// 	completeButton.innerText = 'UnComplete';
	// }
	return completeButton;
}

// Complete item

function completeItem(position) {
	todos[position].completed = !todos[position].completed;
  // let todoLi = document.getElementById(parseInt(position));
  // let completeButton = todoLi.firstElementChild;  // document.getElementByTagName('button');
	// if (todos[position].completed === false) {
	// 	// completeButton.innerText = 'Complete';
	// 	todoLi.className = 'nope';
	// } else {
	// 	// completeButton.innerText = 'UnComplete';
	// 	todoLi.className = 'completed';
	// }
	display();
}
