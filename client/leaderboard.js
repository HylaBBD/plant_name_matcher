import { leaderboardService } from "./services/leaderboard.service.js";
import { userService } from "./services/user.service.js";

let userRankText = document.getElementById("user-rank");
let userNameText = document.getElementById("user-name");
let userScoreText = document.getElementById("user-score");

let userScoreRank = await userService.getUserScoreAndRank(localStorage.getItem("userId"));
let userHighScore = await userScoreRank.score;
userScoreText.innerText = "Score: " + await userHighScore;

let userRank = await userScoreRank.rank;
userRankText.innerText = "Rank: " + await userRank;



let leaderboard = await leaderboardService.getLeaderboard();
console.log(leaderboard);
let table = document.getElementsByClassName("leaderboard")[0];
deleteAllRows(table);
for(let entry of leaderboard){
    if(entry.user_id == localStorage.getItem("userId")){
        addHighlightRow(table, entry);
    }else{
        addRow(table, entry);
    }
}

function addHighlightRow(table, entry){
    let row = table.insertRow(table.rows.length); 
    let cell1 = row.insertCell(0); 
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = entry.rank;
    cell2.innerHTML = entry.user_name;
    cell3.innerHTML = entry.highscore;
    row.classList.add("highlight");
}

function addRow(table, entry) {
    let row = table.insertRow(table.rows.length); 
    let cell1 = row.insertCell(0); 
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = entry.rank;
    cell2.innerHTML = entry.user_name;
    cell3.innerHTML = entry.highscore;
    row.classList.remove("highlight");
}

  
function deleteAllRows(table) {
    let rowCount = table.rows.length;

    // Start from the last row and remove each row
    for (let i = rowCount - 1; i > 0; i--) {
      table.deleteRow(i);
    }
}