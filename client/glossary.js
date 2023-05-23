import { userService } from "./services/user.service.js";
import { plantService } from "./services/plant.service.js";

// LOADING ICON - - - - - - - - - - - - 
const loadingSection = document.getElementById("loading-screen");
const loadingSectionImage = document.getElementById("loading-screen-image");
const navControlIndex = document.getElementById("navigation-control-index");
const navControlMax = document.getElementById("navigation-control-max");

// LEFT AND RIGHT SELECTORS
let leftSelector = document.getElementById("leftSelector");
if (leftSelector != null) {
    leftSelector.addEventListener("click", function () { onSelectorClick(-1) });
}
let rightSelector = document.getElementById("rightSelector");
if (rightSelector != null) {
    rightSelector.addEventListener("click", function () { onSelectorClick(1) });
}

// PICTURE AND LATIN NAMES - - - - - - - - - - - - 
let plants = await plantService.getPlants();
navControlMax.innerText = plants.length;
let plantID = 1;
navControlIndex.innerText = plantID;

let userFavouritePlants = await userService.getUserFavouritePlant(localStorage.getItem("userId"));
let userFavouritePlantIDs = userFavouritePlants.map((favouritePlant) => {return favouritePlant.id});


// ADD TO FAVOURITES BUTTON
let addToFavourites = document.getElementById("add-to-favourites");
addToFavourites.addEventListener('click', () => addPlantToUserFavourites());

async function addPlantToUserFavourites(){
    if(!addToFavourites.classList.contains("disabled")){
        await userService.saveUserFavouritePlant(localStorage.getItem('userId'), plantID).then((response) => {
            if(response.status == 200){
                disableButton(addToFavourites);
                enableButton(removeFromFavourites);
                userFavouritePlantIDs.push(plantID);
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
                let index = userFavouritePlantIDs.findIndex((obj) => obj === plantID);
                if(index >= 0){
                    userFavouritePlantIDs.splice(index,1);
                }
            }
        });
    }
}


await onSelectorClick(0);

function displayLoadingScreen() {
    loadingSection.classList.add("display");
}
function hideLoadingScreen() {
    loadingSection.classList.remove("display");
}

async function onSelectorClick(change){
    let glossaryImage = document.getElementById("glossary-image");
    let commonName = document.getElementById("common-name");
    let scientificName = document.getElementById("scientific-name");
    displayLoadingScreen()

    plantID = plantID + change;
    if(plantID < 0){
        plantID = 0;
    }else if(plantID > plants.length){
        plantID = plants.length;
    }
    navControlIndex.innerText = plantID;
    commonName.textContent = "Common Name: " + plants[plantID].commonName;
    scientificName.textContent = "Scientific Name: " + plants[plantID].scientificName;
    glossaryImage.src = plants[plantID].defaultImage.original_url;

    if(userFavouritePlantIDs.includes(plantID)){
        disableButton(addToFavourites);
        enableButton(removeFromFavourites);
    }else{
        enableButton(addToFavourites);
        disableButton(removeFromFavourites);
    }
    hideLoadingScreen()
}

function disableButton(button){
    button.classList.add("disabled");
}

function enableButton(button){
    button.classList.remove("disabled");
}