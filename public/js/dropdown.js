let countSel = document.getElementById("count-select");

// will listen for a change within the dropdown menu
document.addEventListener("DOMContentLoaded", function(){
    countSel.onchange=changeEventHandler;
}, false);

function changeEventHandler(event){
    console.log(event.target.value);
}