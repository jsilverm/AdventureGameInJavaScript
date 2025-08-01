// ===========================================
// The Dragon's Quest - Text Adventure Game
// A progression-based learning project
// ===========================================

// Include readline for player input
const readline = require('readline-sync');

// Game state variables
let playerName = "";
let playerHealth = 100;
let playerGold = 20;  // Starting gold
let inventory = [];

// Weapon damage (starts at 0 until player buys a sword)
let weaponDamage = 0;      // Will increase to 10 when player gets a sword
console.log("Starting weapon damage: " + weaponDamage);
console.log("When you buy a sword, weapon damage will increase to 10!");

// Monster defense (affects combat outcomes)
let monsterDefense = 5;    // Monster's defense value
console.log("Monster defense: " + monsterDefense);
console.log("Monsters can withstand some damage in combat!");

// Healing potion restoration (matches final implementation)
let healingPotionValue = 30;  // How much health is restored
console.log("Healing potion value: " + healingPotionValue);
console.log("A potion will restore 30 health!");

console.log("=================================");
console.log("       The Dragon's Quest        ");
console.log("=================================");
console.log("\nYour quest: Defeat the dragon in the mountains!");

// Get player's name
playerName = readline.question("\nWhat is your name, brave adventurer? ");
console.log("\nWelcome, " + playerName + "!");
console.log("You start with " + playerGold + " gold.");

// Game state variables
let gameRunning = true;
let currentLocation = "village";
let firstVisit = true;
let hasWeapon = true;
let hasPotion = false;
let hasArmor = false;
let monsterDefeated = false;

/**
 * Shows the player's current stats
 * Displays health, gold, and location
 */
function showStatus() {
    console.log("\n=== " + playerName + "'s Status ===");
    console.log("❤️  Health: " + playerHealth);
    console.log("💰 Gold: " + playerGold);
    console.log("📍 Location: " + currentLocation);
}

/**
 * Shows the current location's description and available choices
 */
function showLocation() {
    console.log("\n=== " + currentLocation.toUpperCase() + " ===");
    
    if (currentLocation === "village") {
        console.log("You're in a bustling village. The blacksmith and market are nearby.");
        console.log("\nWhat would you like to do?");
        console.log("1: Go to blacksmith");
        console.log("2: Go to market");
        console.log("3: Enter forest");
        console.log("4: Check status");
        console.log("5: Check inventory");
        console.log("6: Quit game");
    } 
    else if (currentLocation === "blacksmith") {
        console.log("The heat from the forge fills the air. Weapons and armor line the walls.");
        console.log("\nWhat would you like to do?");
        console.log("1: Return to village");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Quit game");
    }
    else if (currentLocation === "market") {
        console.log("Merchants sell their wares from colorful stalls. A potion seller catches your eye.");
        console.log("\nWhat would you like to do?");
        console.log("1: Return to village");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Quit game");
    }
    else if (currentLocation === 'forest') {
        console.log("You are lost in a dark forest.");
        console.log("1: Return to village");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Quit game");
    }
}

/**
 * Handles movement between locations
 * @param {number} choiceNum The chosen option number
 * @returns {boolean} True if movement was successful
 */
function move(choiceNum) {
    let validMove = false;
    
    if (currentLocation === "village") {
        if (choiceNum === 1) {
            currentLocation = "blacksmith";
            console.log("\nYou enter the blacksmith's shop.");
            validMove = true;
        }
        else if (choiceNum === 2) {
            currentLocation = "market";
            console.log("\nYou enter the market.");
            validMove = true;
        }
        else if (choiceNum === 3) {
            currentLocation = "forest";
            console.log("\nYou venture into the forest...");
            validMove = true;
        }
    }
    else if (currentLocation === "blacksmith" || currentLocation === "market") {
        if (choiceNum === 1) {
            currentLocation = "village";
            console.log("\nYou return to the village center.");
            validMove = true;
        }
    }
    else if ( currentLocation === "forest" ) {
        if (choiceNum === 1) {
            currentLocation = "village";
            console.log("\nYou return to the village center.");
            validMove = true;
        }
    }
    
    return validMove;
}

/**
 * Handles updating of player health
 * @param {number} healthChange How much it changed by
 * @returns {boolean} True if movement was successful
 */
function updateHealth( hpAmount ) {
    if ( Number.isNaN( hpAmount ) ) {
        console.log("ERROR invalid hp change for updateHealth() !!");
        return false;
    }
    const minHealth = 0;
    const maxHealth = 100;
    // many games don't always require that
    const direction = hpAmount > 0 ? "up" : "down";
    console.log(`Your health goes ${direction} by ${hpAmount} hp`);
    playerHealth += hpAmount;
    if (playerHealth >= maxHealth) {
        playerHealth = maxHealth;
        console.log(`To your maximum health of ${maxHealth}` );
    }
    else if (playerHealth <= minHealth) {
        console.log("Which unfortunately kills you.");
    }
    return true;
}

/**
 * Displays what you are carrying: weapon, potions armor

 */
function showInventory() {
    console.log("You are currently carrying:");
    if (!hasWeapon && !hasArmor && !hasPotion) console.log("Not a sausage!");
    if (hasWeapon) console.log("I've got a shiny sword!");
    if (hasArmor) console.log("I am wearing some armor, trusty and not rusty!");
    if (hasPotion) console.log("I currently have a healing potion!");
}

/**
 * Handles Combat!! between you and a monster
 * @returns {boolean} True if you won
 */
function handleCombat() {

    console.log(`Before you can carry out that action, a terrifying monster jumps out and attacks you!!`);
    // requires weapon or we beat a hasty retreat
    if (hasWeapon === false) {
        console.log("You are completely unarmed!!  So,");
        console.log("Like brave Sir Robin, ")
        console.log("You run, run away!!");
        console.log("The monster does 10 damage to you as you flee!");
        updateHealth( -10 );
        currentLocation = "village";
        return false;
    }
    // player health, monster defense
    // armor not yet implemented, lose 
    // monsterDefense per turn?
    let monsterHealth = 40;
    while (playerHealth > 0 && monsterHealth >0) {
        updateHealth( -monsterDefense );
        monsterHealth -= 10;
        console.log(`You deal 10 damage to the monster and lose
                     ${monsterDefense} hit points from its attack!`);

    }
    if (playerHealth > 0) {
        console.log("You defeat the horrendous monster!!");
        let bonusGold = 50;
        console.log(`You find ${bonusGold} gold pieces on its bloody corpse!`);
        playerGold += bonusGold;
        monsterDefeated = true;
        return true;
    }
    console.log("Sadly, brave adventurer, you have died!");
    return false;
}

// Main game loop
while (gameRunning) {
    // Show current state
    showLocation();
    showStatus();
    
    // Get and validate player choice
    let validChoice = false;
    while (!validChoice) {
        try {
            let choice = readline.question("\nEnter choice (number): ");
            
            // Check for empty input
            if (choice.trim() === "") {
                throw "Please enter a number!";
            }
            
            // Convert to number and check if it's a valid number
            let choiceNum = parseInt(choice);
            if (isNaN(choiceNum)) {
                throw "That's not a number! Please enter a number.";
            }
            
            // Handle choices based on location
            if (currentLocation === "village") {
                if (choiceNum < 1 || choiceNum > 6) {
                    throw "Please enter a number between 1 and 6.";
                }
                
                validChoice = true;
                
                if (choiceNum <= 3) {
                    if (!move(choiceNum)) {
                        console.log("\nYou can't go there!");
                    }
                }
                else if (choiceNum === 4) {
                    showStatus();
                }
                else if (choiceNum === 5) {
                    showInventory();
                }
                else if (choiceNum === 6) {
                    gameRunning = false;
                    console.log("\nThanks for playing!");
                }
            }
            else if (currentLocation === "blacksmith" || currentLocation === "market") {
                if (choiceNum < 1 || choiceNum > 4) {
                    throw "Please enter a number between 1 and 4.";
                }
                
                validChoice = true;
                
                if (choiceNum === 1) {
                    if (!move(choiceNum)) {
                        console.log("\nYou can't go there!");
                    }
                }
                else if (choiceNum === 2) {
                    showStatus();
                }
                else if (choiceNum === 3) {
                    showInventory();
                }
                else if (choiceNum === 4) {
                    gameRunning = false;
                    console.log("\nThanks for playing!");
                }
            }
            else if (currentLocation === 'forest') {
                console.log("The dark forest fills you with a sense of dread!");
                validChoice = true;
                if (!monsterDefeated && handleCombat() ) {
                    // hooray, we won!
                    showStatus();
                    console.log("Victory is yours!");
                }
                else {
                    // we lost or ran away
                    // death is handled below
                    showStatus();
                    if (playerHealth <= 0) {
                        console.log("\nOh man, so sad you died!!");
                    }
                    else { 
                        console.log("With a sense of emptiness you return to the village.");
                        currentLocation = 'village';
                    }

                }
            }
            
        } catch (error) {
            console.log("\nError: " + error);
            console.log("Please try again!");
        }
    }

    // Check if player died
    if (playerHealth <= 0) {
        console.log("\nGame Over! Your health reached 0!");
        gameRunning = false;
    }
}
