let toDo = [];

const mylist = document.getElementsByTagName("li");
let i;
let nextid = 1000;
for (i = 0; i < mylist.length; i++) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    mylist[i].appendChild(span);
}
// Click on a close button to hide the current list item
const close = document.getElementsByClassName("close");

for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        const div = this.parentElement;
        div.style.display = "none";
    }
}
// Add a "checked" symbol when clicking on a list item

const list = document.querySelector('UL');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        for (const toDoElement of toDo) {
            if(toDoElement.id === ev.target.id){
                toDoElement.done=!toDoElement.done;
            }
        }
    }
}, false);
function newItem() {
    const li = document.createElement("li");
    const inputValue = document.getElementById("newItem").value;
    const t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myList").appendChild(li);
    }
    document.getElementById("newItem").value = "";

    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";

    span.appendChild(txt);
    li.appendChild(span);
    li.id = nextid;
    let newList = {id:nextid, item:inputValue, done:false};
    nextid++;
    toDo.push(newList);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            const div = this.parentElement;
            div.style.display = "none";
        }
    }

//function saveList(){
  //  let itemName = document.getElementById("inputValue").value
   // let itemHTML = document.getElementById("newList").value
   // localStorage.setItem(itemName, itemHTML)
}
// UI actions
// Show a list of tasks
// Add a new task
// Complete a task
// Remove a task
// Filter tasks (complete/incomplete)
//Data sources: localStorage
//todo: { id : timestamp, content: string, completed: bool }
//toDoList = [toDo];
//Initial Module list: ToDos.js, localStorage helpers (ls.js), utilities.js

//let leftToDo = (myList) => (document.getElementById("myNodeList").innerHTML=myList.getElementsByClassName("checked").length);
//function myFunction() {
//     var x = document.getElementsByClassName("checked").classList.length;
//   document.getElementsByClassName("totals").innerHTML = x;
// }