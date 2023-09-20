// index.js
const diceContainer = document.getElementById("diceContainer");
const rollButton = document.getElementById("rollButton");
const diceInputs = document.querySelectorAll(".dice.number");

// Function to roll a single six-sided die
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

// Function to roll a set of dice and update the input fields
function rollDice() {
    diceContainer.innerHTML = ""; // Clear the previous dice
    const numDice = 5; // Number of dice in Yahtzee
    for (let i = 0; i < numDice; i++) 
    {
        const diceValue = rollDie();
        const diceElement = document.createElement("div");
        diceElement.classList.add("dice");
        diceElement.textContent = diceValue;
        diceContainer.appendChild(diceElement);
        diceInputs[i].value = diceValue;
    }
}

// Add a click event listener to the roll button
rollButton.addEventListener("click", rollDice);

// Initial roll when the page loads
rollDice();