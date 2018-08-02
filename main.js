/* jshint esversion: 6 */

// Create array of todo items

let todos = [];
const addText = document.getElementById('inputItem');
// const todosUl = document.querySelector('ul');
const todosList = document.getElementById('mainList');

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
  todosList.innerHTML = '';
  for (var i = 0; i < todos.length; i++) {
	  let item = todos[i];
	  let todoItem = document.createElement('div');
	  todoItem.id = i;

	  // todoItem.innerText = item.content;
	  let mainLine = todoItem.appendChild(document.createElement('div'));
	  mainLine.className = 'mainLine';
	  mainLine.innerHTML = '<span class="itemText">' + item.content + '</span><input value="' + item.content + '" class="edit hidden" />';
    // todoItem.appendChild(createCompleteButton());
	  mainLine.insertAdjacentElement('afterbegin', createCompleteButton());
	  mainLine.appendChild(createDeleteButton());
    todosList.appendChild(todoItem);
    if (item.completed === false) {
		  todoItem.className = 'active listItem';
	  } else {
			todoItem.className = 'completed listItem';
	  }

	  let optionsLine = todoItem.appendChild(document.createElement('div'));
	  optionsLine.className = 'optionsLine';
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

function editItem(position) {
  let itemText = document.getElementsByClassName('itemText')[position];
  let editedItem = document.getElementsByClassName('edit')[position];
  let itemId = itemText.parentNode.parentNode.id;
	itemText.className = 'itemText hidden';
  editedItem.className = 'edit';

  function saveChanges() {
  	itemText.innerText = editedItem.value;
    itemText.className = 'itemText';
    editedItem.className = 'edit hidden';
    todos[itemId].content = editedItem.value;
  }

  editedItem.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      saveChanges();
    }
  });
  editedItem.onblur = saveChanges;
}

function chooseCorrectButton() {
  //let todosUl = document.querySelector('ul');
  todosList.addEventListener('click', function(event) {
    let elementClicked = event.target;
    if (elementClicked.className === 'deleteBtn') {
      deleteItem(parseInt(elementClicked.parentNode.parentNode.id));
    } else if (elementClicked.className === 'completeBtn') {
    	completeItem(parseInt(elementClicked.parentNode.parentNode.id));
    } else if (elementClicked.className === 'itemText') {
    	editItem(parseInt(elementClicked.parentNode.parentNode.id));
    }
  });
}

chooseCorrectButton();

// Add Complete button

function createCompleteButton() {
	let completeButton = document.createElement('button');
	completeButton.className = 'completeBtn';
	completeButton.innerHTML = '&#10003;';

	return completeButton;
}

// Complete item

function completeItem(position) {
	todos[position].completed = !todos[position].completed;

	// This shit ain't working:  :(
 //  let todoItem = document.getElementById(parseInt(position));
 //  let todoMainLine = todoItem.firstElementChild;
 //  let completeButton = todoMainLine.firstElementChild;
	// completeButton.className = 'completeBtnDone';
	display();
}
