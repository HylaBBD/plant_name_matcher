// TILE SELECTED - - - - - - - - - - - - - - - -
let gameTiles = document.getElementsByClassName("tile");
if (gameTiles != null) {
    for(var tile of gameTiles){
        (function(tile){
            tile.addEventListener("click", function () {
                tile.classList.toggle("selected");  
                console.log("TILE"); // need to deselect other tiles
            });
        })(tile);
    }
}
// END OF TILE SELECTED - - - - - - - - - - - - 
const key = "sk-Eeg16458985ba86b9801"; // I KNOW THIS IS BAD WE WILL TAKE IT OUT LOL
let numberPlants = 2
const min = 1;
const max = 3000; // There are 3000 plants in the API available to the free version
let tileImages = document.getElementsByClassName("plantPic");
let tileScientificNames = document.getElementsByClassName("plantScientificName");

for(let i = 0; i < numberPlants; i++){
    let plantID = Math.floor(Math.random() * (max - min + 1)) + min;
    let link = "https://perenual.com/api/species/details/" + plantID + "?key=" + key
    
    const plantData = JSON.parse(JSON.stringify(await (await fetch(link)).json()))
    let plantCommonName = plantData.common_name
    let plantScientificName = plantData.scientific_name
    let plantPhotoURL = plantData.default_image.original_url
    tileImages[i].src = plantPhotoURL
    tileScientificNames[i].textContent = plantScientificName
    
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