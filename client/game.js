// PICTURE AND LATIN NAMES - - - - - - - - - - - - 
// const key = "sk-CtSG645bb2c924947866"; // JESSE BBD EMAIL
const key = "sk-q8UK6466165b60d98975"; // JESSE jess44go EMAIL
// const key = "sk-Ir4T64662d40d85b0978";
const level = 1;
let numberPlants;


// CHANGE GAME GRID SIZE
let winWidth = window.matchMedia("(max-width: 900px)");
let winWidthLess = false;
smallWidth(winWidth);
winWidth.addEventListener('change', smallWidth);

function smallWidth(winWidth) {
    if (winWidth.matches) {
        winWidthLess = true;
    }else{        
        winWidthLess = false;
    }
    setGridCoordinates();
}

// LOADING SCREEN - - - - - - - - - - - - 
const loadingSection = document.getElementById("loading-screen");
const loadingSectionImage = document.getElementById("loading-screen-image")

function displayLoadingScreen() {
    loadingSection.classList.add("display");
}
function hideLoadingScreen() {
    loadingSection.classList.remove("display");
}

// GAME END SCREEN - - - - - - - - - - - - 
const gameEndSection = document.getElementById("game-end-screen");
const gameEndScore = document.getElementById("game-end-score");

function displayGameEndScreen() {
    gameEndSection.classList.add("display");
    gameEndScore.innerText = "Score: " + scoreState;

}
function hideGameEndScreen() {
    gameEndSection.classList.remove("display");
}

const min = 1;
const max = 3000; // There are 3000 plants in the API available to the free version
let tileImages = document.getElementsByClassName("plantPic");
let tile = document.getElementsByClassName("plantTile");

hideGameEndScreen(); 
displayLoadingScreen();

let plantScientificNameArray; 
let plantCommonNameArray; 
let plantIDArray;
let positionArray;

let scoreState = 0;
let liveState = 3;
let numberCompleted = 0;

async function generateLevel(){
    numberCompleted = 0;

    setGridCoordinates();
    resetSelectable();

    plantScientificNameArray = new Array(numberPlants); 
    plantCommonNameArray = new Array(numberPlants); 
    plantIDArray = new Array(numberPlants);
    positionArray = new Array(numberPlants*2);
    
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
    }
    tile = document.getElementsByClassName("plantTile");
    let counter = 0;

    for(let i = 0; i < numberPlants; i++){  
        tile[positionArray[counter]].textContent = plantScientificNameArray[i];
        counter++;
        tile[positionArray[counter]].textContent = plantCommonNameArray[i];
        counter++;            
    }
    if(tile[4].textContent != ""){
        for(let t of tile){
            if(t.textContent == ""){
                t.textContent = tile[4].textContent;
                tile[4].textContent = "";
            }
        }
    }
}

generateLevel().then(() => hideLoadingScreen());



// TILE SELECTED - - - - - - - - - - - - - - - -
let gameTiles = document.getElementsByClassName("plantTile");
let gameScore = document.getElementById("score");
if (gameTiles != null) {
    for(let tile of gameTiles){
        tile.addEventListener("click", () => checkSelected(tile));
    }
}


function renderLives(lives) {
    let currentLivesList = document.getElementById("lives-list");
    currentLivesList.innerHTML = "<li><h1>Lives:</h1></li>";
    for(let i=0; i<lives; i++){
        currentLivesList.innerHTML += "<li><img src='static/leaf-heart.png'></li>";
    }
}

let gameEndPlayAgain = document.getElementById("game-end-play-again");
gameEndPlayAgain.addEventListener("click", () => newGame());

function checkGameEnd(){
    if(liveState <= 0){
        displayGameEndScreen();
    }else{
        renderLives(liveState);
    }

    if(numberCompleted == numberPlants){
        nextLevel();
    }
}

function newGame(){
    scoreState = 0;
    gameScore.textContent = scoreState;

    liveState = 3;
    numberCompleted = 0;
    renderLives(liveState);

    hideGameEndScreen();
    displayLoadingScreen()
    generateLevel().then(() => hideLoadingScreen());
}
function nextLevel(){
    displayLoadingScreen()
    generateLevel().then(() => hideLoadingScreen());
}

function resetSelectable(){
    let gameTiles = document.getElementsByClassName("plantTile");
    let counter = 0;
    for(let tile of gameTiles){
        if(counter == 4){
            tile.classList.remove("selectable");
            tile.classList.remove("selected");
            tile.classList.remove("selectedCorrect");
        }else{
            tile.classList.add("selectable");
            tile.classList.remove("selected");
            tile.classList.remove("selectedCorrect");    
        }
        tile.textContent = "";
        counter++;
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
                        scoreState++;
                        gameScore.textContent = scoreState;
                        selectedTiles[1].textContent = "";
                        selectedTiles[0].textContent = "";
                        selectedTiles[1].classList.add("selectedCorrect");
                        selectedTiles[0].classList.add("selectedCorrect");                    
                        selectedTiles[1].classList.remove("selectable");
                        selectedTiles[0].classList.remove("selectable");
                        trueCheck = true;
                        numberCompleted++;
                        checkGameEnd();
                        break;
                } 
        }

        if(!trueCheck){
            selectedTiles[1].classList.remove("selected");
            selectedTiles[0].classList.remove("selected");
            liveState-=1;
            checkGameEnd();
        }       
    }
}


function setGridCoordinates(){
    let gameLives, tiles, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9, gameScore, gameWrapper;
    switch(level){
        case 1: 
            numberPlants = 2;
            if(winWidthLess){
                // TABLET/PHONE VIEW 2x2   
                gameWrapper = document.getElementsByClassName("game_wrapper")[0];
                gameWrapper.style.gridTemplateColumns = "49% 49%";
                gameWrapper.style.gridTemplateRows = "17% 30% 30% 17%";
                gameWrapper.style.padding = "0";

                gameLives = document.getElementsByClassName("game_lives")[0];
                gameLives.style.gridColumn = "1 / span 2";
                gameLives.style.gridRow = "1";
                
                tile1 = document.getElementsByClassName("plantTile1")[0];
                tile1.style.gridColumn = "1";
                tile1.style.gridRow = "2";
                
                tile2 = document.getElementsByClassName("plantTile2")[0];
                tile2.style.gridColumn = "2";
                tile2.style.gridRow = "2";
                
                tile3 = document.getElementsByClassName("plantTile3")[0];
                tile3.style.gridColumn = "1";
                tile3.style.gridRow = "3";
                
                tile4 = document.getElementsByClassName("plantTile4")[0];
                tile4.style.gridColumn = "2";
                tile4.style.gridRow = "3";
                
                gameScore = document.getElementsByClassName("game_score")[0];
                gameScore.style.gridColumn = "1 / span 2";
                gameScore.style.gridRow = "4";
            }else{
                // DESKTOP VIEW 2x2               
                gameWrapper = document.getElementsByClassName("game_wrapper")[0];
                gameWrapper.style.gridTemplateColumns = "17% 30% 30% 17%";
                gameWrapper.style.gridTemplateRows = "49% 49%";
                gameWrapper.style.paddingTop = "1%";
                
                gameLives = document.getElementsByClassName("game_lives")[0];
                gameLives.style.gridColumn = "1";
                gameLives.style.gridRow = "1 / span 2";
                
                tile1 = document.getElementsByClassName("plantTile1")[0];
                tile1.style.gridColumn = "2";
                tile1.style.gridRow = "1";
                
                tile2 = document.getElementsByClassName("plantTile2")[0];
                tile2.style.gridColumn = "3";
                tile2.style.gridRow = "1";
                
                tile3 = document.getElementsByClassName("plantTile3")[0];
                tile3.style.gridColumn = "2";
                tile3.style.gridRow = "2";
                
                tile4 = document.getElementsByClassName("plantTile4")[0];
                tile4.style.gridColumn = "3";
                tile4.style.gridRow = "2";
                
                gameScore = document.getElementsByClassName("game_score")[0];
                gameScore.style.gridColumn = "4";
                gameScore.style.gridRow = "1 / span 2";
            }
            
            tile5 = document.getElementsByClassName("plantTile5")[0];
            tile5.style.display = "none";
            
            tile6 = document.getElementsByClassName("plantTile6")[0];
            tile6.style.display = "none";
            
            tile7 = document.getElementsByClassName("plantTile7")[0];
            tile7.style.display = "none";
            
            tile8 = document.getElementsByClassName("plantTile8")[0];
            tile8.style.display = "none";
            
            tile9 = document.getElementsByClassName("plantTile9")[0];
            tile9.style.display = "none";
            break;
        case 2:
            numberPlants = 4;
            if(winWidthLess){
                // TABLET/PHONE VIEW 3x3   
                gameWrapper = document.getElementsByClassName("game_wrapper")[0];
                gameWrapper.style.gridTemplateColumns = "32% 32% 32%";
                gameWrapper.style.gridTemplateRows = "17% 20% 20% 20% 17%";
                gameWrapper.style.paddingTop = "0";

                gameLives = document.getElementsByClassName("game_lives")[0];
                gameLives.style.gridColumn = "1 / span 3";
                gameLives.style.gridRow = "1";
                
                tile1 = document.getElementsByClassName("plantTile1")[0];
                tile1.style.gridColumn = "1";
                tile1.style.gridRow = "2";
                
                tile2 = document.getElementsByClassName("plantTile2")[0];
                tile2.style.gridColumn = "2";
                tile2.style.gridRow = "2";
                
                tile3 = document.getElementsByClassName("plantTile3")[0];
                tile3.style.gridColumn = "3";
                tile3.style.gridRow = "2";
                
                tile4 = document.getElementsByClassName("plantTile4")[0];
                tile4.style.gridColumn = "1";
                tile4.style.gridRow = "3";
                
                tile5 = document.getElementsByClassName("plantTile5")[0];
                tile5.style.gridColumn = "2";
                tile5.style.gridRow = "3";
                
                tile6 = document.getElementsByClassName("plantTile6")[0];
                tile6.style.gridColumn = "3";
                tile6.style.gridRow = "3";
                
                tile7 = document.getElementsByClassName("plantTile7")[0];
                tile7.style.gridColumn = "1";
                tile7.style.gridRow = "4";
                
                tile8 = document.getElementsByClassName("plantTile8")[0];
                tile8.style.gridColumn = "2";
                tile8.style.gridRow = "4";
                
                tile9 = document.getElementsByClassName("plantTile9")[0];
                tile9.style.gridColumn = "3";
                tile9.style.gridRow = "4";
                
                gameScore = document.getElementsByClassName("game_score")[0];
                gameScore.style.gridColumn = "1 / span 3";
                gameScore.style.gridRow = "5";
                
            }else{
                // DESKTOP VIEW 3x3
                gameWrapper = document.getElementsByClassName("game_wrapper")[0];
                gameWrapper.style.gridTemplateColumns = "17% 20% 20% 20% 17%";
                gameWrapper.style.gridTemplateRows = "32% 32% 32%";
                gameWrapper.style.paddingTop = "2.5%";

                gameLives = document.getElementsByClassName("game_lives")[0];
                gameLives.style.gridColumn = "1";
                gameLives.style.gridRow = "1 / span 3";
                
                tile1 = document.getElementsByClassName("plantTile1")[0];
                tile1.style.gridColumn = "2";
                tile1.style.gridRow = "1";
                
                tile2 = document.getElementsByClassName("plantTile2")[0];
                tile2.style.gridColumn = "3";
                tile2.style.gridRow = "1";
                
                tile3 = document.getElementsByClassName("plantTile3")[0];
                tile3.style.gridColumn = "4";
                tile3.style.gridRow = "1";
                
                tile4 = document.getElementsByClassName("plantTile4")[0];
                tile4.style.gridColumn = "2";
                tile4.style.gridRow = "2";
                
                tile5 = document.getElementsByClassName("plantTile5")[0];
                tile5.style.gridColumn = "3";
                tile5.style.gridRow = "2";
                tile5.style.backgroundColor = "var(--background-color)";
                
                tile6 = document.getElementsByClassName("plantTile6")[0];
                tile6.style.gridColumn = "4";
                tile6.style.gridRow = "2";
                
                tile7 = document.getElementsByClassName("plantTile7")[0];
                tile7.style.gridColumn = "2";
                tile7.style.gridRow = "3";
                
                tile8 = document.getElementsByClassName("plantTile8")[0];
                tile8.style.gridColumn = "3";
                tile8.style.gridRow = "3";
                
                tile9 = document.getElementsByClassName("plantTile9")[0];
                tile9.style.gridColumn = "4";
                tile9.style.gridRow = "3";
                
                gameScore = document.getElementsByClassName("game_score")[0];
                gameScore.style.gridColumn = "5";
                gameScore.style.gridRow = "1 / span 3";
            }
            break;
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