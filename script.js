// refactored code
// Define variables to store elements from the DOM
const btnEl = document.getElementById('btn');
const bmiInputEl = document.getElementById('bmi-result');
const weightConditionEl = document.getElementById('weight-condition');
const conditionTextEl = document.querySelector('.info-text');
const motivationTextEl = document.getElementById('motivation-text');

// Define an empty object to store the quotes fetched from the JSON file
const quotes = {};

// Define an asynchronous function to fetch quotes from the JSON file
async function fetchQuotes() {
  // Fetch the JSON file from the server
  const response = await fetch('data_quotes.json');

  // Parse the JSON data and store it in a variable
  const data = await response.json();

  // Store the quotes in the `quotes` object using keys that match the condition
  quotes.obese = data.obese_quotes;
  quotes.overweight = data.overweight_quotes;
  quotes.normalWeight = data.normalweight_quotes;
  quotes.underweight = data.underweight_quotes;
}

// Define a function to get a random quote based on the condition passed as an argument
function getRandomQuote(condition) {
  // Get the length of the array of quotes for the specified condition
  const count = quotes[condition].length;

  // Generate a random number between 0 and the length of the array
  const randNum = Math.floor(Math.random() * count);

  // Return a random quote from the array of quotes for the specified condition
  return quotes[condition][randNum].quote;
}

// Define a function to calculate BMI
async function calcBmi() {
  // Get the height and weight values from the input fields
  const heightValue = document.getElementById('height').value / 100;
  const weightValue = document.getElementById('weight').value;

  // Calculate BMI using the formula: weight / (height * height)
  const bmiValue = Number((weightValue / heightValue ** 2).toFixed(2));

  // Display the calculated BMI value in the result input field
  bmiInputEl.value = bmiValue;

  // Display the weight condition text below the BMI result input field
  conditionTextEl.style.display = 'block';

  // Determine the weight condition based on the calculated BMI value
  let condition;
  if (bmiValue < 18.5) {
    condition = 'underweight';
  } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
    condition = 'normalWeight';
  } else if (bmiValue >= 25 && bmiValue < 29.9) {
    condition = 'overweight';
  } else if (bmiValue >= 30) {
    condition = 'obese';
  }

  // Display the weight condition text based on the determined condition
  weightConditionEl.textContent = condition;

  // Display a random motivational quote based on the determined condition
  motivationTextEl.textContent = getRandomQuote(condition);
}

// Call the fetchQuotes function and then add an event listener to the "Calculate" button to call the calcBmi function
fetchQuotes().then(() => {
  btnEl.addEventListener('click', calcBmi);
});
