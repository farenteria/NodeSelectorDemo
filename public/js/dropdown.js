let countSel = document.getElementById("count-select");
let dropdownForm = document.getElementById("location-form");
let dropButton = document.getElementById("sub-but");

dropButton.addEventListener("click", (event) => {
    // event.preventDefault();
});


// will listen for a change within the dropdown menu
document.addEventListener("DOMContentLoaded", function(){
    countSel.onchange=changeEventHandler;
}, false);

function changeEventHandler(event){
    console.log(event.target.value);

    // let oReq = new XMLHttpRequest();
    // oReq.open("GET", 'localhost:8081/data');
    // oReq.send(event.target.value);
    $.get(`/data:${event.target.value}`, function(data, status){
        console.log("sent", data, status);
    });
}

function exListener(){
    // console.log(this.responseText);
}