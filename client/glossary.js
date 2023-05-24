import { userService } from "./services/user.service.js";
import { plantService } from "./services/plant.service.js";

// NAV CONTROLLER
const navControlIndex = document.getElementById("navigation-control-index");
const navControlMax = document.getElementById("navigation-control-max");

navControlIndex.addEventListener("change", (event) => plantIdValueChange(event));

function plantIdValueChange(event){
    let value = event.target.value;
    console.log(value);

    if(Number.isInteger(value)){
        if(value <= 1){
            value = 1;
        }else if(value >= 150){
            value = 150;
        }
    }else{
        value = 1;
    }
    plantID = value-1;
    navControlIndex.value = value;
    displayLoadingScreen();
    onSelectorClick(0).then(() => hideLoadingScreen());    
}

// LEFT AND RIGHT SELECTORS
let leftSelector = document.getElementById("leftSelector");
if (leftSelector != null) {
    leftSelector.addEventListener("click", function () { onSelectorClick(-1) });
}
let rightSelector = document.getElementById("rightSelector");
if (rightSelector != null) {
    rightSelector.addEventListener("click", function () { onSelectorClick(1) });
}


// LOADING SCREEN - - - - - - - - - - - - 
const loadingSection = document.getElementById("loading-screen");
const loadingSectionImage = document.getElementById("loading-screen-image")

function displayLoadingScreen() {
    loadingSection.classList.add("display");
}
displayLoadingScreen();

function hideLoadingScreen() {
    loadingSection.classList.remove("display");
}

// PICTURE AND LATIN NAMES - - - - - - - - - - - - 
let plants = await plantService.getPlants();
navControlMax.innerText = plants.length;
let plantID = 0;
navControlIndex.value = plantID+1;

let userFavouritePlants = await userService.getUserFavouritePlant(localStorage.getItem("userId"));
let userFavouritePlantIDs = userFavouritePlants.map((favouritePlant) => {return favouritePlant.id});

// ADD TO FAVOURITES BUTTON
let addToFavourites = document.getElementById("add-to-favourites");
addToFavourites.addEventListener('click', () => addPlantToUserFavourites());

async function addPlantToUserFavourites(){
    if(!addToFavourites.classList.contains("disabled")){
        await userService.saveUserFavouritePlant(localStorage.getItem('userId'), plantID+1).then((response) => {
            if(response.status == 200){
                disableButton(addToFavourites);
                enableButton(removeFromFavourites);
                userFavouritePlantIDs.push(plantID+1);
            }   
        });
    }
}

// REMOVE FROM FAVOURITES BUTTON
let removeFromFavourites = document.getElementById("remove-from-favourites");
removeFromFavourites.addEventListener('click', () => removePlantFromUserFavourites());

async function removePlantFromUserFavourites(){
    if(!removeFromFavourites.classList.contains("disabled")){
        await userService.deleteUserFavouritePlant(localStorage.getItem('userId'), plantID).then((response) => {
            if(response.status == 200){
                disableButton(removeFromFavourites);
                enableButton(addToFavourites);
                let index = userFavouritePlantIDs.findIndex((obj) => obj === plantID+1);
                if(index >= 0){
                    userFavouritePlantIDs.splice(index,1);
                }
            }
        });
    }
}



displayLoadingScreen();
onSelectorClick(0).then(() => hideLoadingScreen());


async function onSelectorClick(change){
    let glossaryImage = document.getElementById("glossary-image");
    let commonName = document.getElementById("common-name");
    let scientificName = document.getElementById("scientific-name");

    plantID = plantID + change;
    if(plantID <= 0){
        plantID = 0;
        leftSelector.classList.add("disabled");
    }else if(plantID >= 149){
        plantID = 149;
        rightSelector.classList.add("disabled");
    }else{
        leftSelector.classList.remove("disabled");
        rightSelector.classList.remove("disabled");
    }
    navControlIndex.value = plantID+1;
    commonName.textContent = plants[plantID].commonName;
    scientificName.textContent = plants[plantID].scientificName;
    glossaryImage.src = plants[plantID].defaultImage.original_url;

    if(userFavouritePlantIDs.includes(plantID+1)){
        disableButton(addToFavourites);
        enableButton(removeFromFavourites);
    }else{
        enableButton(addToFavourites);
        disableButton(removeFromFavourites);
    }
}

function disableButton(button){
    button.classList.add("disabled");
}

function enableButton(button){
    button.classList.remove("disabled");
}
