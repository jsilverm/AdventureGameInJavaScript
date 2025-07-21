'use strict';
const readline = require("readline-sync");
/*
Adventure Game
This game will be a text-based game where the player will be able
to make choices that affect the outcome of the game.
The player will be able to choose their own path and the story will change
based on their decisions.
*/

// Display the game title
console.log("Welcome to the Adventure Game");

// Add a welcome message
console.log("Prepare yourself for an epic journey!");

// Get player name using readline-sync
const playerName = readline.question("Enter your name: ");
console.log(`Hello, ${playerName}!`);
console.log('Welcome to the Dungeon of Doom!');

let startingGold = 500;
console.log("Starting Gold: " + startingGold);