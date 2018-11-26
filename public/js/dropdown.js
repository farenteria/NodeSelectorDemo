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
    $.get(`/country/${event.target.value}`, function(data, status){
        console.log("sent", data, status);
    }).done((data) => {
        clearOptionElement(citySelect);
        updateOptionElement(data.states, stateSel);
    });
}

// get cities
function stateChangeHandler(event){
    $.get(`/state/${event.target.value}`, function(data, status){
        console.log("sent", data, status);
    }).done((data) => {        
        updateOptionElement(data.cities, citySelect);
    });
}

// remove old selections
function clearOptionElement(selectElement){
    while(selectElement.firstChild){
        selectElement.removeChild(selectElement.firstChild);
    }
}

// remove old selections and insert newest additions based on ajax request
function updateOptionElement(locations, selectElement){
    clearOptionElement(selectElement);

    locations.forEach(location => {
        let option = document.createElement("option");
        let content = document.createTextNode(location);
        option.appendChild(content);
        selectElement.appendChild(option);
    });
}
