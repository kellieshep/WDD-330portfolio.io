//localStorage.toDoList = [];
let toDo = [];
let notDone = [];
let nextid = 1000;
// Click on a close button to hide the current list item
const close = document.getElementsByClassName("close");

if(typeof(localStorage.toDoList) !== "undefined" && localStorage.toDoList != ""){
    toDo = JSON.parse(localStorage.toDoList);
    console.log(toDo);

    //toDo.forEach()
    //alert(toDo.length);

    let countStop = toDo.length;
    for(let i = 0; i<countStop; i++){
        //console.log(toDo[i]);
        let item = toDo[i];
        //console.log(item);
        //console.log("hi");
        buildItem(item.item, item.id, item.done, true);

    }

    //localStorage.toDoList = [];
    totals();
}

const mylist = document.getElementsByTagName("li");
let i;

for (i = 0; i < mylist.length; i++) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    mylist[i].appendChild(span);
}


// this one removes from the list
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        const div = this.parentElement;
        div.style.display = "none";

        // remove from toDo array of objects
        let id = div.getAttribute("id");
        let objIndex = toDo.findIndex((obj => obj.id == id));
        toDo.splice(objIndex,1);
    }
}
// Add a "checked" symbol when clicking on a list item

const list = document.querySelector('UL');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName = 'LI') {
        ev.target.classList.toggle('checked');
        for (const toDoElement of toDo) {
            if(toDoElement.id == ev.target.id){
                toDoElement.done=!toDoElement.done;
                //console.log(toDo);
            }

        }
    }



    // update local storage
    let toDoJson = JSON.stringify(toDo);
    localStorage.toDoList = toDoJson;


    // update not done number
    totals();
}, false);

//Creating a new list item and adding it to local storage.

function newItem() {

    const inputValue = document.getElementById("newItem").value;
    buildItem(inputValue);
// stringify to JSON and adding it to local storage.
    let toDoJson = JSON.stringify(toDo)
    localStorage.toDoList = toDoJson;
    console.log(toDoJson);

    // update not done number
    totals();

}
//Building the item from local storage and the new list items added.

function buildItem(inputValue, id=1, done=null, initialBuild = false) {
    const li = document.createElement("li");
    const t = document.createTextNode(inputValue);
    //localStorage.setItem(li, inputValue);
    li.appendChild(t);
    // Making sure that there is an item on the list
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myList").appendChild(li);
    }
    //building the list with the entered information.
    document.getElementById("newItem").value = "";

    const span = document.createElement("SPAN");
    //adding the x to be able to remove the item.
    const txt = document.createTextNode("\u00D7");
    span.className = "close";

    span.appendChild(txt);
    li.appendChild(span);
    if (id !== null) {
        li.id = id;
    } else {
        // adding a date as the id.
        li.id = new Date().getTime();
    }
// adding done to the object
    if (done !== null) {
        li.done = done;
        if(done == true){
            li.classList.add("checked");
        }
    } else {
        li.done = false;
    }

    let newList = {id: new Date().getTime(), item: inputValue, done: li.done};
    nextid++;
    //adding the elements to the array.
    if (!initialBuild) {
        toDo.push(newList);
    }

// If the x is pressed to delete item this hides the item. **needs to delete the object from the array and updates storage as well.
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            const div = this.parentElement;
            console.log('hello');
            div.remove();

            //objIndex = toDo.findIndex((obj => obj.id == 1));



//            for (const toDoElement of toDo) {
//                if (toDoElement.id = ev.target.id) {
//
//
//                }
//
//
//            }
        }
    }
}
//***Adding the total to the bottom of the list.
function checkDone(done) {
    return done == true;
}

function totals() {
    //document.getElementById("result").innerHTML = toDo.some(checkDone);
    notDone = toDo.filter(function(toDoItem){
        return toDoItem.done == false;
    });
    complete = toDo.filter(function(toDoItem){
        return toDoItem.done == true;
    });
    console.log(notDone);
    document.getElementById("result").innerHTML = notDone.length + " left to do /    " + complete.length + " completed";
}