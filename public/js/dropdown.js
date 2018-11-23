let countSel = document.getElementById("count-select");
let stateSel = document.getElementById("state-select");
let citySelect = document.getElementById("city-select");

// will listen for a change within the dropdown menu
document.addEventListener("DOMContentLoaded", function(){
    countSel.onchange=changeEventHandler;
    stateSel.onchange=stateChangeHandler;
}, false);

// get states
function changeEventHandler(event){
    console.log(event.target.value);

    // let oReq = new XMLHttpRequest();
    // oReq.open("GET", 'localhost:8081/data');
    // oReq.send(event.target.value);
    $.get(`/country/${event.target.value}`, function(data, status){
        console.log("sent", data, status);
    }).done((data) => {
        console.log("done", data);
        // remove old children
        while(stateSel.firstChild){
            stateSel.removeChild(stateSel.firstChild);
        }

        data.states.forEach(state => {
            let option = document.createElement("option");
            let content = document.createTextNode(state);
            option.appendChild(content);

            stateSel.appendChild(option);
        });
    });
}

// get cities
function stateChangeHandler(event){
    $.get(`/state/${event.target.value}`, function(data, status){
        console.log("sent", data, status);
    }).done((data) => {
        while(citySelect.firstChild){
            citySelect.removeChild(citySelect.firstChild);
        }

        data.cities.forEach(state => {
            let option = document.createElement("option");
            let content = document.createTextNode(state);
            option.appendChild(content);

            citySelect.appendChild(option);
        });
    });
}