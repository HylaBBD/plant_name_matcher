// PICTURE AND LATIN NAMES - - - - - - - - - - - - 
const key = "sk-CtSG645bb2c924947866"; // I KNOW THIS IS BAD WE WILL TAKE IT OUT LOL
const level = 1;
let numberPlants;

switch(level){
    case 1: 
        numberPlants = 2;
        break;
    case 2:
        numberPlants = 4;
        break;
    default: 
        numberPlants = 2;
}















/*
    const loadImage = src => 
        new Promise((resolve, reject) =>{
            const img = tileImages[i].image;
            img.onload = () => resolve(img);
            img.src = src   
        });

    loadImage(plantPhotoURL).then(image => counter++ );
    // tileImages[i].src = plantPhotoURL
    // tileImages[i].onload
}

if(counter == 2){
    hideLoadingScreen()
}
*/










// LOADING ICON - - - - - - - - - - - - 
const loadingSection = document.getElementById("loading-screen");
const loadingSectionImage = document.getElementById("loading-screen-image")

function displayLoadingScreen() {
    loadingSection.classList.add("display");
}
function hideLoadingScreen() {
    loadingSection.classList.remove("display");
}



const min = 1;
const max = 3000; // There are 3000 plants in the API available to the free version
let tileImages = document.getElementsByClassName("plantPic");
let tile = document.getElementsByClassName("plantTile");

displayLoadingScreen()

const plantPicURLArray = new Array(numberPlants); 
const plantScientificNameArray = new Array(numberPlants); 
const plantCommonNameArray = new Array(numberPlants); 
const plantIDArray = new Array(numberPlants);
const positionArray = new Array(numberPlants*2);

let scoreState = 0;
let liveState = 3;

for(let i = 0; i < numberPlants*2; i++){
    positionArray[i] = i;
}

positionArray.sort(() => (Math.random() > .5) ? 1 : -1);

for(let i = 0; i < numberPlants; i++){  
    plantIDArray[i] = Math.floor(Math.random() * (max - min + 1)) + min;

    let link = "https://perenual.com/api/species/details/" + plantIDArray[i] + "?key=" + key
    const plantData = JSON.parse(JSON.stringify(await (await fetch(link)).json()))

    plantScientificNameArray[i] = plantData.scientific_name
    plantCommonNameArray[i] = plantData.common_name

    console.log(i + " SCIENTIFIC NAME: " + plantScientificNameArray[i]);
    console.log(i + " COMMON NAME: " + plantCommonNameArray[i]);
}

let counter = 0;
for(let i = 0; i < numberPlants; i++){  
    tile[positionArray[counter]].textContent = plantScientificNameArray[i];
    counter++;
    tile[positionArray[counter]].textContent = plantCommonNameArray[i];
    counter++;
}
hideLoadingScreen()




// TILE SELECTED - - - - - - - - - - - - - - - -
let gameTiles = document.getElementsByClassName("tile");
let gameScore = document.getElementById("score");
if (gameTiles != null) {
    for(let tile of gameTiles){
        tile.addEventListener("click", () => checkSelected(tile));
    }
}



function checkSelected(tile){
    tile.classList.toggle("selected");  
    let selectedTiles = document.getElementsByClassName("selected selectable");
    let trueCheck = false;
    if(selectedTiles.length == 2){
        for(let i = 0; i < numberPlants; i++){
            if((selectedTiles[0].textContent.trim() == plantScientificNameArray[i]
                && selectedTiles[1].textContent.trim() == plantCommonNameArray[i])
                ||(selectedTiles[1].textContent.trim() == plantScientificNameArray[i]
                    && selectedTiles[0].textContent.trim() == plantCommonNameArray[i])){
                        scoreState = scoreState+2;
                        gameScore.textContent = scoreState;
                        selectedTiles[1].textContent = "";
                        selectedTiles[0].textContent = "";
                        selectedTiles[1].classList.add("selectedCorrect");
                        selectedTiles[0].classList.add("selectedCorrect");                    
                        selectedTiles[1].classList.remove("selectable");
                        selectedTiles[0].classList.remove("selectable");
                        trueCheck = true;
                        break;
                } 
        }

        if(!trueCheck){
            selectedTiles[1].classList.remove("selected");
            selectedTiles[0].classList.remove("selected");  
        }       
    }
}




/*
<!-- Example JSON Output -->  
{
    "id": 1,
    "common_name": "European Silver Fir",
    "scientific_name": [
        "Abies alba"
    ],
    "other_name": [
        "Common Silver Fir"
    ],
    "family": "",
    "origin": null,
    "type": "tree",
    "dimension": "Height:  60 feet",
    "cycle": "Perennial",
    "watering": "Frequent",
    "attracts":[
    "bees",
    "birds",
    "rabbits"
    ],
    "propagation":[
        "seed",
        "cutting"
    ],
    "hardiness": {
        "min": "7",
        "max": "7"
    },
    "hardiness_location": {
    "full_url": "https://perenual.com/api/hardiness-map-sample?map=h&key=[YOUR-API-KEY]",
    "full_iframe": "<iframe src='https://perenual.com/api/hardiness-map-sample?map=1-13&key=[YOUR-API-KEY]'
    width=1000 height=550 ></iframe>"
    },
    "flowers": true,
    "flowering_season": "Spring",
    "color": "",
    "sunlight": [
        "full sun",
        "part shade"
    ],
    "soil": [],
    "problem": "Coming Soon",
    "pest_susceptibility": null,
    "cones": true,
    "fruits": false,
    "edible_fruit": false,
    "edible_fruit_taste_profile": "Coming Soon",
    "fruit_nutritional_value": "Coming Soon",
    "fruit_color": null,
    "fruiting_season": null,
    "harvest_season": null,
    "harvest_method": "Coming Soon",
    "leaf": true,
    "leaf_color": [
        "green"
    ],
    "edible_leaf": false,
    "edible_leaf_taste_profile": "Coming Soon",
    "leaf_nutritional_value": "Coming Soon",
    "growth_rate": "High",
    "maintenance": "Low",
    "medicinal": true,
    "medicinal_use": "Coming Soon",
    "medicinal_method": "Coming",
    "poisonous_to_humans": false,
    "poison_effects_to_humans": "Coming Soon",
    "poison_to_humans_cure": "Coming Soon",
    "poisonous_to_pets": false,
    "poison_effects_to_pets": "Coming Soon",
    "poison_to_pets_cure": "Coming Soon",
    "drought_tolerant": false,
    "salt_tolerant": false,
    "thorny": false,
    "invasive": false,
    "rare": false,
    "rare_level": "Coming Soon",
    "tropical": false,
    "cuisine": false,
    "cuisine_list": "Coming Soon",
    "indoor": false,
    "care_level": "Medium",
    "description": "Coming Soon",
    "default_image": {
    "image_id": 9,
    "license": 5,
    "license_name": "Attribution-ShareAlike License",
    "license_url": "https://creativecommons.org/licenses/by-sa/2.0/",
    "original_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg",
    "regular_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/regular/49255769768_df55596553_b.jpg",
    "medium_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/medium/49255769768_df55596553_b.jpg",
    "small_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/small/49255769768_df55596553_b.jpg",
    "thumbnail": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/thumbnail/49255769768_df55596553_b.jpg"
*/