const appData = {
  listArray: []
};

const state = {};

function animateMenu() {
  const menu = document.getElementsByClassName("nav-bar");
  return (
    Array.from(menu).forEach(item => {
      console.log(item);
      item.classList.toggle("change");
      // See if container or individual bars need to have class name changed
    }),
    dropMenu()
  );
}

function dropMenu() {
  const menu = document.getElementById("drop-down-menu");
  console.log(menu);
  menu.classList.toggle("active-menu");
}

function highlightForDeletion(e) {
  if (e.target.className === "list-item") {
    e.target.classList.toggle("highlighted");
  }
}

function adjustListWidth() {
  let list = document.getElementById("list-of-tasks");
  console.dir(list);
  if (list.children.length > 0) {
    if (list.style.height === "550px") {
      console.log("Isa workin!");
    } else {
      throw "No bueno";
    }
  }
}

function renderToDoList() {
  //create new list item to be added to check-list
  const { listArray } = appData;
  const textBoxValue = document.getElementById("text-box");
  let taskList = document.createElement("ul");
  taskList.classList.add("list-of-tasks");
  taskList.id = "list-of-tasks";
  //append newly created list item to unordered list in index.html
  for (let item in state) {
    //create list item node w/ inner contents
    console.dir(state[item]);
    const liNode = document.createElement("li");
    liNode.classList.add("list-item");
    liNode.id = item;
    const txtNode = document.createTextNode(state[item]);
    liNode.appendChild(txtNode);
    liNode.addEventListener("click", highlightForDeletion);
    //create button node to append to liNode
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&times;";
    deleteButton.classList.add("delete-button");
    liNode.appendChild(deleteButton);
    //append finished list node to list of tasks
    taskList.appendChild(liNode);

    //Get rid of text-box to make room for ul to display
    if (textBoxValue) {
      textBoxValue.style.display = "none";
    }
    document.getElementById("check-list-entries").appendChild(taskList);
  }
}

// Open up a text area/new page to write on when user presses #add-entry-button
function openTextBox() {
  const textBox = `<textarea id="text-box"/>`;
  document.getElementById("check-list-entries").innerHTML = textBox;
  document.getElementById("save-entry-button").classList.add("visible");
  document.getElementById("text-box").focus();
  // Call submitEntry() if user hits "Enter"
  document.getElementById("text-box").addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
      submitEntry();
    }
  });
}

function removeListItem(e) {
  //1. select the delete buttons
  // const deleteButton = document.getElementsByClassName('delete-button');
  //2. console.log the event to get a hold of the li element
  if (e.target.className === "delete-button") {
    const listItem = e.target.parentNode;
    const listOfTasks = listItem.parentNode;
    listOfTasks.removeChild(listItem);
  }
  // Filter through state object for the key that matches the id of the list item that is to be removed
  // Once a match is found, remove that key/value pair from the state object
  Object.keys(state).filter(key => {
    if (key === e.target.parentNode.id) delete state[key];
    console.log(state);
  });
  //3. you're going to have to somehow remove this item from "state" and then re-run the renderToDoList function
}

function submitEntry() {
  const textBoxValue = document.getElementById("text-box").value;
  const { listArray } = appData;
  listArray.push(textBoxValue);

  //1. add timestamp as key and textbox value as value to state object
  let timeStamp = Date.now();
  state[timeStamp] = textBoxValue;
  console.log(state);
  console.log(appData.listArray);

  try {
    renderToDoList();
  } catch (err) {
    console.error(err);
  }

  document.getElementById("save-entry-button").classList.remove("visible");
}

document
  .getElementById("menu-icon-container")
  .addEventListener("click", animateMenu);

// document
//   .getElementById("menu-icon-container")
//   .addEventListener("click", dropMenu);

document
  .getElementById("save-entry-button")
  .addEventListener("click", submitEntry);

document
  .getElementById("add-entry-button")
  .addEventListener("click", openTextBox);

document.addEventListener("change", adjustListWidth);

document.addEventListener("click", removeListItem);
