// Initialize variables
let bankBalance = 100;
let point = 0;

// Function to handle dice roll
function rollDice() {
    // Get user's bet amount 
    const betInput = document.getElementById("betInput").value;
    const betAmount = parseFloat(betInput);

    // See if the bet  is valid
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet.");
        return;
    }

    // Assure user has enough money
    if (betAmount > bankBalance) {
        alert("Oops. You do not have enough money!.");
        return;
    }

    // Call the method to calculate the score and update 
    calculateScore(betAmount);
}

// Function to calculate score - Craps rules
function calculateScore(bet) {
    // Generate random dice values
    const dice1Value = Math.floor(Math.random() * 6) + 1;
    const dice2Value = Math.floor(Math.random() * 6) + 1;
    const sum = dice1Value + dice2Value;

    // Display the dice 
    document.getElementById("dice1").src = "img/dice" + dice1Value + ".png";
    document.getElementById("dice2").src = "img/dice" + dice2Value + ".png";

    // Get Elements for displaying the outcome and changing the background color
    const outcomeElement = document.getElementById("outcome");
    const bodyElement = document.body;

    if (point === 0) {
        // First throw
        if (sum === 7 || sum === 11) {
            // Win condition
            outcomeElement.innerText = "Yay! You win!";
            bankBalance += bet;
            bodyElement.style.backgroundColor = "#2ecc71"; // Green for win
        } else if (sum === 2 || sum === 3 || sum === 12) {
            // Lose condition
            outcomeElement.innerText = "Craps!";
            bankBalance -= bet;
            bodyElement.style.backgroundColor = "#e74c3c"; // Red for lose
        } else {
            // Set the point for subsequent throws
            point = sum;
            outcomeElement.innerText = "Point is " + point;
        }
    } else {
        // Subsequent throws
        if (sum === point) {
            // Win condition by making the point
            outcomeElement.innerText = "You rolled a " + point + "! You win!";
            bankBalance += bet;
            point = 0;
            bodyElement.style.backgroundColor = "#2ecc71"; 
        } else if (sum === 7) {
            // Lose condition by rolling a 7 before making the point
            outcomeElement.innerText = "You rolled a 7. Bummer, you lose!";
            bankBalance -= bet;
            point = 0;
            bodyElement.style.backgroundColor = "#e74c3c"; 
        }
    }

    // Update the bank balance
    document.getElementById("balance").innerText = bankBalance.toFixed(2);
}
