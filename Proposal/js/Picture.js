
function writeToLS(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}
function readFromLS(key) {
    console.log('readFromLS initialized');
    return JSON.parse(window.localStorage.getItem(key));
}
if (typeof (localStorage.podList) !== "undefined" && localStorage.podList != "") {
    toDo = JSON.parse(localStorage.podList);
    console.log(podList);
}
let podList = [];
const pod_url = 'https://api.nasa.gov/planetary/apod?api_key=ok2IRhg9AT416LyHuhfKyBbMl67iUr6geZp37adx';
export default class nasaPod {

    constructor(elementID){
        console.log('your in');
        this.key = elementID;
        this.parentElement = document.getElementById(elementID);
        this.backButton = this.buildBackButton();

        this.url = `${pod_url}`;
    }


    init(){
        console.log(`initializing data`);
        fetch(`${pod_url}`)
            .then(response => response.json())
            .then(data => {
                writeToLS(this.key, data);
                podList = [];
                console.log(data);
                podList.push(newPicture(data));

                console.log(podList);
                this.showOneItem(data.date);
            });
    }
    showFullList(){
        const data = readFromLS(this.key);
        console.log(`showFullList initialized`);
        const container = this.parentElement;
        //clear the parent element
        container.innerHTML = '';
        //fill with the new list

        podList.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = `${element.date}`;
            container.appendChild(li);
        })
        this.backButton.classList.add('hide');
        this.addListeners();

    }
    addListeners() {
        // get all 'li' children of the 'ul' element and attach a listener to each
        const listArr = Array.from(this.parentElement.children);
        console.log(listArr);
        listArr.forEach(item => {
            item.addEventListener('load', event => {
                this.showOneItem(event.currentTarget.innerText);
            })
        })
    }
    getItemByDate(item, podList) {
        return podList.find(item => item.date === data.date);
    }
    showOneItem(data) {
        console.log('showOneItem:' + data.date);
        const item = this.getItemByDate(data.date);
        //this.parentElement.appendChild(renderOneItemFull(item));
        //clear the parent element and build a back button
        //this.parentElement.innerHTML = '';

        const div = document.createElement('div');
        div.classList.add('full-detail');
        div.innerHTML = `<h3>${item.date}</h3>
                         <h2>${item.title}</h2>
                         <img src='{${item.url}'}></img>
                         <p>${item.explanation}</p>`
            
                   this.backButton.classList.remove('hide');
       // document.getElementById('date').classList.add('hide');
        }
    
    


    buildBackButton(){
        const backButton = document.createElement("button");
        backButton.textContent = "Past Images";
        backButton.onclick = () => {this.showFullList();};
        backButton.classList.add('back-button');
        this.parentElement.after(backButton);
        return backButton;
    }
}

function newPicture(picture){
    const newPicture = {
        date: picture.date,
         title: picture.title,
        url: picture.url,
        explanation : picture.explanation
    };
    return newPicture;
}
