const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Generate a random number between min and max (inclusive)
function getRandomNumber(min, max) 
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Define an endpoint that generates a random number
app.get('/generate-random-number', (req, res) => 
{
  const min = parseInt(req.query.min) || 1;
  const max = parseInt(req.query.max) || 100;

  const randomNumber = getRandomNumber(min, max);
  res.json({ number: randomNumber });
});

// Define a "wake up" endpoint
app.get('/wake-up', (req, res) => 
{
  // Perform server wake-up actions here (if any)
  res.json({ message: 'Server is awake' });
});

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}; ` +
  'press Ctrl-C to terminate...'));