let podList =[];
const nasa_url = 'https://api.nasa.gov/planetary/apod?api_key=ok2IRhg9AT416LyHuhfKyBbMl67iUr6geZp37adx';
export default class nasaPod {

}
    constructor() {
        this.nasa_Url=
            'https://api.nasa.gov/planetary/apod?api_key=ok2IRhg9AT416LyHuhfKyBbMl67iUr6geZp37adx';
        //  store the last batch of retrieved pictures in the model.
        this.podList = [];
    }

    init(){
        console.log(`initializing data`);
        fetch(`${this.url}`)
            .then(response => response.json())
            .then(data => {
                writeToLS(this.key, data);
                podList = [];
                data.results.forEach(element =>  {
                    podList.push(newPicture(element));
                })
                this.showOneItem();
            });
        showOneItem(itemName){
            console.log(`showOneItem: ${itemName}`);
            const item = this.getItemByName(itemName);
            //this.parentElement.appendChild(renderOneItemFull(item));
            //clear the parent element and build a back button
            this.parentElement.innerHTML = '';

            const div = document.createElement('div');
            div.classList.add('pod');
            div.innerHTML = `<h3>${item.date}</h3>
                         <h2>${item:title}</h2>
                         <img>${item.url}</img>
                         <p>${item.explanation}</p>
            }
function newPicture(picture){
    const newPicture = {
        date: picture.date,
         title: picture.title,
        url: picture.url,
        explanation : picture.explanation
    }
    return newPicture;
}

}