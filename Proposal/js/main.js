
import podList from "./Picture";
//on load, grab the array and insert it into the page
const nasaPod = new podList('date', 'picture');
window.addEventListener('load', () => {
    nasaPod.init();
});
