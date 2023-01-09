'use strict';
//clear local storag
// localStorage.clear()
///////////////////////
//Selecting elements//
/////////////////////
const form = document.querySelector('.todo__form');
const addBtn = document.querySelector('#add');
const taskInput = document.querySelector('.todo__input');
const listTasks = document.querySelector('.list-tasks');

// Create Arr to save Tasks
let tasksList = [];


// Function Add task

const addTask = (e) => {
  e.preventDefault();
  const createDiv = document.createElement('div');
  createDiv.classList.add('task');

  // Check Button
  const checkedButton = document.createElement('label');
  checkedButton.innerHTML = '<input type="checkbox"/><span class="checkbox"</span>';
  checkedButton.classList.add('check-btn');
  createDiv.appendChild(checkedButton);


  // Create Task
  if (taskInput.value == "" || taskInput.value.trim().length === 0) {
    alert('You have no tasks to add 😏')
  }
  if (taskInput.value.trim().length > 1) {
    const task = document.createElement('li');
    task.innerHTML = taskInput.value;

    task.classList.add('task-item');
    createDiv.appendChild(task);
    // Add task to LocalStorage
    addToLocalStorage(taskInput.value);


    // Clean up the input field after adding the task
    taskInput.value = '';
    // Edit the task
    const editButton = document.createElement('button');
    editButton.innerHTML = '📝';
    editButton.classList.add('edit-btn');
    createDiv.appendChild(editButton);
    // Delete the task
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '❌';
    deleteButton.classList.add('delete-btn');
    createDiv.appendChild(deleteButton);
    listTasks.appendChild(createDiv);
  }
};

// Function for Delete, complete and edit the task 
const deleteTask = (e) => {
  // console.log(e.target.classList[0]);
  const item = e.target;
  if (item.classList[0] === 'edit-btn') {
    const task = item.parentElement;
    // console.log(task)
    // taskInput.value = task.innerText;
    editTaskInLocalStorage(task);
    deleteTaskFromLocalStorage(task);
    task.remove();
  };
  if (item.classList[0] === 'delete-btn') {
    const task = item.parentElement;
    deleteTaskFromLocalStorage(task);
    task.remove();
  };
  if (item.classList[0] === 'checkbox') {
    const task = item.parentElement;
    task.classList.toggle('checked');
  };
};

// Check if we have tasks in localStorage or not
const checkLocalStorag = () => {
  // Check if we have tasks in localStorage or not
  if (localStorage.getItem('tasks') === null) {
    tasksList;
  }
  if (localStorage.getItem('tasks')) {
    tasksList = JSON.parse(localStorage.getItem('tasks'));
  };
}

// Function to store tasks in the local storage
const addToLocalStorage = (task) => {

  checkLocalStorag();

  tasksList.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};

// Function to render Tasks from localStorage
const renderFromLocalStorage = () => {
  checkLocalStorag();
  tasksList.forEach((tasks) => {
    const createDiv = document.createElement('div');
    createDiv.classList.add('task');
    // Check Button
    const checkedButton = document.createElement('label');
    checkedButton.innerHTML = '<input type="checkbox"/><span class="checkbox"</span>';
    checkedButton.classList.add('check-btn');
    createDiv.appendChild(checkedButton);
    // Create Task
    const task = document.createElement('li');
    task.innerText = tasks;
    task.classList.add('task-item');
    createDiv.appendChild(task);
    // Edit Task
    const editButton = document.createElement('button');
    editButton.innerHTML = '📝';
    editButton.classList.add('edit-btn');
    createDiv.appendChild(editButton);
    // Delete Task
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '❌';
    deleteButton.classList.add('delete-btn');
    createDiv.appendChild(deleteButton);
    listTasks.appendChild(createDiv);
  });
};
// Function to delete task from local storage
const deleteTaskFromLocalStorage = (task) => {
  checkLocalStorag();
  // console.log(task.children[1].innerText)
  const taskIndex = task.children[1].innerHTML;
  tasksList.splice(tasksList.indexOf(taskIndex), 1);
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};
// Function to edit task
const editTaskInLocalStorage = (task) => {
  checkLocalStorag();
  // console.log(task.children[1].innerText)
  const taskIndex = task.children[1].innerHTML;
  // console.log(taskIndex)
  // console.log(task)
  taskInput.value = taskIndex;
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};

// Call the functions
document.addEventListener('DOMContentLoaded', renderFromLocalStorage);
addBtn.addEventListener('click', addTask);
listTasks.addEventListener('click', deleteTask);