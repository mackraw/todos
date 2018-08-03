/* jshint esversion: 6 */

// Create array of todo items
let todos = [];

// Global
const addText = document.getElementById('inputItem');
const todosList = document.getElementById('mainList');
const buttonAdd = document.getElementById('btnAdd');

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

buttonAdd.onclick = addItem;

// Add on enter press
addText.addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		buttonAdd.click();
	}
});

// Display array
function display() {
  todosList.innerHTML = '';
  for (var i = 0; i < todos.length; i++) {
	  let item = todos[i];
	  let listItem = document.createElement('div');
	  listItem.id = i;
	  listItem.classList.add('listItem');

	  let mainLine = listItem.appendChild(document.createElement('div'));
	  mainLine.classList.add('mainLine');
	  
	  //add text content of list item
	  let itemText = mainLine.appendChild(document.createElement('span'));
	  itemText.innerText = item.content;
	  itemText.classList.add('itemText');
	  if (item.completed === false) {
		  itemText.classList.add('activeText');
		  itemText.classList.remove('doneText');
	  } else {
			itemText.classList.add('doneText');
			itemText.classList.remove('activeText');
	  }

	  // add, hide and populate input element
	  let itemEdit = mainLine.appendChild(document.createElement('input'));
	  itemEdit.value = item.content;
	  itemEdit.classList.add('edit', 'hidden');

	  // add complete button
	  let completeButton = document.createElement('button');
	  completeButton.innerHTML = '&#10004;';
	  completeButton.classList.add('completeBtn');
	  
	  if (item.completed !== false) {
      completeButton.classList.add('doneBtn');
    } else {
    completeButton.classList.remove('doneBtn');
    }

	  mainLine.insertAdjacentElement('afterbegin', completeButton);

	  // add delete button
	  mainLine.appendChild(createDeleteButton());

	  // add options line 
	  let optionsLine = listItem.appendChild(document.createElement('div'));
	  optionsLine.className = 'optionsLine';

	  todosList.appendChild(listItem);
	}
}

// Create delete button
function createDeleteButton() {
  let deleteButton = document.createElement('button');
	deleteButton.innerHTML = '&#10060;';
	deleteButton.className = 'deleteBtn';
	return deleteButton;
}

// Delete item
function deleteItem(position) {
	todos.splice(position, 1);
	display();
}

// Edit item
function editItem(position) {
  let itemText = document.getElementsByClassName('itemText')[position];
  let editedItem = document.getElementsByClassName('edit')[position];
  let itemId = itemText.parentNode.parentNode.id;
	itemText.classList.add('hidden');
  editedItem.classList.remove('hidden');
  editedItem.focus();

  function saveChanges() {
  	itemText.innerText = editedItem.value;
    itemText.classList.remove('hidden');
    editedItem.classList.add('hidden');
    todos[itemId].content = editedItem.value;
    display();
  }

  editedItem.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      saveChanges();
    }
  });
  editedItem.onblur = saveChanges;
}

// Complete item
function completeItem(position) {
	todos[position].completed = !todos[position].completed;
	display();
}

// work only on the correct list item
function chooseCorrect() {
  todosList.addEventListener('click', function(event) {
    let elClicked = event.target;
    if (elClicked.classList.contains('deleteBtn')) {
      deleteItem(parseInt(elClicked.parentNode.parentNode.id));
    } else if (elClicked.classList.contains('completeBtn')) {
    	completeItem(parseInt(elClicked.parentNode.parentNode.id));
    } else if (elClicked.classList.contains('itemText')) {
    	editItem(parseInt(elClicked.parentNode.parentNode.id));
    }
  });
}
chooseCorrect();
