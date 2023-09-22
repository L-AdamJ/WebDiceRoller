const diceContainer = document.getElementById("diceContainer");
const rollButton = document.getElementById("rollButton");
const diceInputs = document.querySelectorAll(".dice.number");
const achievementDisplay = document.getElementById("achievement");

// Function to roll a single six-sided die
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

// Function to roll a set of dice and update the input fields
function rollDice() {
    diceContainer.innerHTML = ""; // Clear the previous dice
    const numDice = 5; // Number of dice in Yahtzee
    for (let i = 0; i < numDice; i++) {
        const diceValue = rollDie();
        const diceElement = document.createElement("div");
        diceElement.classList.add("dice");
        diceElement.textContent = diceValue;
        diceContainer.appendChild(diceElement);
        diceInputs[i].value = diceValue;
    }

    determineAchievements(); // Calculate and display achievements after rolling
}

// Function to determine the player's achievements based on the roll
function determineAchievements() {
    const diceValues = Array.from(diceInputs).map(input => parseInt(input.value));

    // Define scoring categories and their scoring functions
    const scoringCategories = {
        'Full House': isFullHouse,
        'Three of a Kind': isThreeOfAKind,
        // Add more scoring categories and functions here...
    };

    let achievements = [];

    // Check each scoring category
    for (const category in scoringCategories) {
        if (scoringCategories[category](diceValues)) {
            achievements.push(category);
        }
    }

    // Display the achievements and their descriptions
    if (achievements.length > 0) {
        achievementDisplay.textContent = `You rolled a: ${achievements.join(', ')}!`;
    } else {
        achievementDisplay.textContent = " ";
    }
}

// Function to check if the roll is a Full House
function isFullHouse(diceValues) {
    const uniqueValues = [...new Set(diceValues)];
    if (uniqueValues.length === 2) {
        for (const value of uniqueValues) {
            const count = diceValues.filter(d => d === value).length;
            if (count !== 2 && count !== 3) {
                return false;
            }
        }
        return true;
    }
    return false;
}

// Function to check if the roll is Three of a Kind
function isThreeOfAKind(diceValues) {
    const counts = Array(6).fill(0);
    for (const value of diceValues) {
        counts[value - 1]++;
        if (counts[value - 1] >= 3) {
            return true;
        }
    }
    return false;
}

// Add a click event listener to the roll button
rollButton.addEventListener("click", rollDice);

// Initial roll when the page loads
rollDice();