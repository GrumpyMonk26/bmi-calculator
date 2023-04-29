// const btnEl = document.getElementById('btn');
// const bmiImputEl = document.getElementById('bmi-result');
// const weightConditionEl = document.getElementById('weight-condition');
// const conditionTextEl = document.querySelector('.info-text');
// const motivationTextEl = document.getElementById('motivation-text');

// // put into its own function obese
// async function obeseRandomQuote(condtion) {
//   fetch('data_quotes.json')
//     .then((response) => response.json())
//     .then((data) => {
//       const obeseCount = data.obese_quotes.length;
//       const overweightCount = data.overweight_quotes.length;
//       const normalWeightCount = data.normalweight_quotes.length;
//       const underweightCount = data.underweight_quotes.length;

//       console.log(`Obese count: ${obeseCount}`);
//       console.log(`Overweight count: ${overweightCount}`);
//       console.log(`Normal weight count: ${normalWeightCount}`);
//       console.log(`Underweight count: ${underweightCount}`);

//       const randNum = Math.floor(Math.random() * obeseCount);
//       console.log(`Random_number: ${randNum}`);
//       motivationTextEl.textContent = data.obese_quotes[randNum].quote;
//     })
//     .catch((error) => console.error(error));
// }

// // put into its own function overweight
// async function overweightRandomQuote() {
//   fetch('data_quotes.json')
//     .then((response) => response.json())
//     .then((data) => {
//       const obeseCount = data.obese_quotes.length;
//       const overweightCount = data.overweight_quotes.length;
//       const normalWeightCount = data.normalweight_quotes.length;
//       const underweightCount = data.underweight_quotes.length;

//       console.log(`Obese count: ${obeseCount}`);
//       console.log(`Overweight count: ${overweightCount}`);
//       console.log(`Normal weight count: ${normalWeightCount}`);
//       console.log(`Underweight count: ${underweightCount}`);

//       const randNum = Math.floor(Math.random() * obeseCount);
//       console.log(`Random_number: ${randNum}`);
//       motivationTextEl.textContent = data.overweight_quotes[randNum].quote;
//     })
//     .catch((error) => console.error(error));
// }

// // put into its own function normal weight
// async function normalWeightRandomQuote() {
//   fetch('data_quotes.json')
//     .then((response) => response.json())
//     .then((data) => {
//       const obeseCount = data.obese_quotes.length;
//       const overweightCount = data.overweight_quotes.length;
//       const normalWeightCount = data.normalweight_quotes.length;
//       const underweightCount = data.underweight_quotes.length;

//       console.log(`Obese count: ${obeseCount}`);
//       console.log(`Overweight count: ${overweightCount}`);
//       console.log(`Normal weight count: ${normalWeightCount}`);
//       console.log(`Underweight count: ${underweightCount}`);

//       const randNum = Math.floor(Math.random() * obeseCount);
//       console.log(`Random_number: ${randNum}`);
//       motivationTextEl.textContent = data.normalweight_quotes[randNum].quote;
//     })
//     .catch((error) => console.error(error));
// }

// // put into its own function under weigh
// async function underWeightRandomQuote() {
//   fetch('data_quotes.json')
//     .then((response) => response.json())
//     .then((data) => {
//       const obeseCount = data.obese_quotes.length;
//       const overweightCount = data.overweight_quotes.length;
//       const normalWeightCount = data.normalweight_quotes.length;
//       const underweightCount = data.underweight_quotes.length;

//       console.log(`Obese count: ${obeseCount}`);
//       console.log(`Overweight count: ${overweightCount}`);
//       console.log(`Normal weight count: ${normalWeightCount}`);
//       console.log(`Underweight count: ${underweightCount}`);

//       const randNum = Math.floor(Math.random() * obeseCount);
//       console.log(`Random_number: ${randNum}`);
//       motivationTextEl.textContent = data.underweight_quotes[randNum].quote;
//     })
//     .catch((error) => console.error(error));
// }

// function calcBmi() {
//   const heightValue = document.getElementById('height').value / 100;
//   const weightValue = document.getElementById('weight').value;

//   const bmiValue = Number((weightValue / heightValue ** 2).toFixed(2));
//   bmiImputEl.value = bmiValue;

//   conditionTextEl.style.display = 'block';

//   if (bmiValue < 18.5) {
//     weightConditionEl.textContent = 'under weight';
//     underWeightRandomQuote();
//   } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
//     weightConditionEl.textContent = 'Normal weight';
//     normalWeightRandomQuote();
//   } else if (bmiValue >= 25 && bmiValue < 29.9) {
//     weightConditionEl.textContent = 'Overweight';
//     overweightRandomQuote();
//   } else if (bmiValue >= 30) {
//     weightConditionEl.textContent = 'Obese';
//     obeseRandomQuote();
//   }
// }

// btnEl.addEventListener('click', calcBmi);

// refactored code
const btnEl = document.getElementById('btn');
const bmiInputEl = document.getElementById('bmi-result');
const weightConditionEl = document.getElementById('weight-condition');
const conditionTextEl = document.querySelector('.info-text');
const motivationTextEl = document.getElementById('motivation-text');
const quotes = {};

async function fetchQuotes() {
  const response = await fetch('data_quotes.json');
  const data = await response.json();
  quotes.obese = data.obese_quotes;
  quotes.overweight = data.overweight_quotes;
  quotes.normalWeight = data.normalweight_quotes;
  quotes.underweight = data.underweight_quotes;
}

function getRandomQuote(condition) {
  const count = quotes[condition].length;
  const randNum = Math.floor(Math.random() * count);
  return quotes[condition][randNum].quote;
}

async function calcBmi() {
  const heightValue = document.getElementById('height').value / 100;
  const weightValue = document.getElementById('weight').value;

  const bmiValue = Number((weightValue / heightValue ** 2).toFixed(2));
  bmiInputEl.value = bmiValue;

  conditionTextEl.style.display = 'block';

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

  weightConditionEl.textContent = condition;
  motivationTextEl.textContent = getRandomQuote(condition);
}

fetchQuotes().then(() => {
  btnEl.addEventListener('click', calcBmi);
});
