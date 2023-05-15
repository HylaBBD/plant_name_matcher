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
// END OF MENU HAMBURGER - - - - - - - - - - - - 