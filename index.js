const diceContainer = document.getElementById("diceContainer");
const rollButton = document.getElementById("rollButton");
const diceInputs = document.querySelectorAll(".dice.number");
const achievementDisplay = document.getElementById("achievement");

// Function to roll a single six-sided die
function rollDie() 
{
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

  determineAchievements(); // Calculate and display achievements after rolling
}

// Function to determine the player's achievements based on the roll
function determineAchievements() 
{
  const diceValues = Array.from(diceInputs).map(input => parseInt(input.value));

  // Define scoring categories and their scoring functions
  const scoringCategories = {
    'Full House': isFullHouse,
    'Three of a Kind': isThreeOfAKind,
    'Yahtzee': isYahtzee,
  };

  let achievements = [];

  // Check for Full House first
  if (scoringCategories['Full House'](diceValues)) {
    achievements.push('Full House');
  }
  // Check for Three of a Kind only if Full House was not achieved
  else if (scoringCategories['Three of a Kind'](diceValues)) {
    achievements.push('Three of a Kind');
  }

  // Check for Yahtzee
  if (scoringCategories['Yahtzee'](diceValues)) {
    achievements.push('Yahtzee');
  }

  // Display the achievements and their descriptions
  if (achievements.length > 0) {
    achievementDisplay.textContent = `You rolled a: ${achievements.join(', ')}!`;
  } else {
    achievementDisplay.textContent = " ";
  }
}

// Function to check if the roll is a Full House
function isFullHouse(diceValues) 
{
  const uniqueValues = [...new Set(diceValues)];
  if (uniqueValues.length === 2) {
    for (const value of uniqueValues) {
      const count = diceValues.filter(d => d === value).length;
      if (count !== 2 && count !== 3) 
      {
        return false;
      }
    }
    return true;
  }
  return false;
}

// Function to check if the roll is Three of a Kind
function isThreeOfAKind(diceValues) 
{
  const counts = Array(6).fill(0);
  for (const value of diceValues) 
  {
    counts[value - 1]++;
    if (counts[value - 1] >= 3) 
    {
      return true;
    }
  }
  return false;
}

function isYahtzee(diceValues) 
{
  const uniqueValues = [...new Set(diceValues)];
  return uniqueValues.length === 1;
}

// Function to wake up the server
function wakeUpServer() 
{
  fetch('https://ashy-pond-0062ab810.3.azurestaticapps.net/wake-up', { method: 'GET' })
    .then(response => {
      if (response.status === 200) {
        console.log('Node.js server woke up successfully.');
      } else {
        console.error('Failed to wake up the Node.js server.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to generate a random number
function generateRandomNumber() 
{
  fetch('https://ashy-pond-0062ab810.3.azurestaticapps.net/generate-random-number?min=1&max=6', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      console.log('Received random number:', data.number);
      // You can use the received random number as needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Add a click event listener to the roll button
rollButton.addEventListener("click", function () {
  // Disable the button while actions are in progress
  rollButton.disabled = true;

  // First, wake up the server
  wakeUpServer();

  // Then, roll the dice and generate a random number
  setTimeout(function () {
    rollDice();
    generateRandomNumber();

    // Re-enable the button after actions are completed
    rollButton.disabled = false;
  }, 1000); // Adjust the delay as needed
});

// Initial wake-up when the page loads
wakeUpServer();

// Initial roll when the page loads
rollDice();