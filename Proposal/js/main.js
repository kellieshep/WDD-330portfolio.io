

import NasaPod from "./Picture.js";
console.log("main");
//on load, grab the array and insert it into the page
const nasaPics = new NasaPod('pod', 'picture');
window.addEventListener('load', () => {
    nasaPics.init();
    console.log("main.js");
});
