import { userService } from "./services/user.service.js";
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
const key = "sk-2rX3646d0076019bc952"; // I KNOW THIS IS BAD WE WILL TAKE IT OUT LOL
const min = 1;
const max = 3000; // There are 3000 plants in the API available to the free version
navControlMax.innerText = max;
let plantID = 1;
navControlIndex.innerText = plantID;
onSelectorClick(0)

// let userFavouritePlants = userService.getUserFavouritePlant(localStorage.getItem('userID'));
let userFavouritePlants = await userService.getUserFavouritePlant(35);
console.log(userFavouritePlants);


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
    let description = document.getElementById("description");
    displayLoadingScreen()

    plantID = plantID + change;
    if(plantID < min){
        plantID = min;
    }else if(plantID > max){
        plantID = max;
    }
    navControlIndex.innerText = plantID;
    let link = "https://perenual.com/api/species/details/" + plantID + "?key=" + key
    
    const plantData = JSON.parse(JSON.stringify(await (await fetch(link)).json()))
    commonName.textContent = plantData.common_name;
    scientificName.textContent = "Scientific Name: " + plantData.scientific_name;
    glossaryImage.src = plantData.default_image.original_url;
    description.textContent = plantData.description;
    hideLoadingScreen()
}


// ADD TO FAVOURITES BUTTON
let addToFavourites = document.getElementById("add-to-favourites");
addToFavourites.addEventListener('click', () => addPlantToUserFavourites());

async function addPlantToUserFavourites(){
    if(!addToFavourites.classList.contains("disabled")){
        // MATT LOOK HERE
        userService.saveUserPlant(localStorage.getItem('userID'), plantID).then(() => disableButton(addToFavourites));
        disableButton(addToFavourites);
    }
}

function disableButton(button){
    button.classList.add("disabled");
    console.log("DISABLING BRO");
}