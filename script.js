const btnEl = document.getElementById('btn');
const bmiImputEl = document.getElementById('bmi-result');
const weightConditionEl = document.getElementById('weight-condition');
const conditionTextEl = document.querySelector('.info-text');
const motivationTextEl = document.getElementById('motivation-text');

// put into its own function
function randomQuote() {
  fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      // Do something with the data
      const randNum = Math.floor(Math.random() * data.length);
      console.log(randNum);
      console.log(data[randNum].quote);
      motivationTextEl.textContent = data[randNum].quote;
    });
}

// fetch('quotes.json')
//   .then((response) => response.json())
//   .then((data) => {
//     const randomIndex = Math.floor(Math.random() * data.length);
//     const randomQuote = data[randomIndex];
//     console.log(`Random Quote: "${randomQuote.quote}" - ${randomQuote.author}`);
//   });

function calcBmi() {
  const heightValue = document.getElementById('height').value / 100;
  const weightValue = document.getElementById('weight').value;

  const bmiValue = Number((weightValue / heightValue ** 2).toFixed(2));
  bmiImputEl.value = bmiValue;

  conditionTextEl.style.display = 'block';

  if (bmiValue < 18.5) {
    weightConditionEl.textContent = 'under weight';
    randomQuote();
  } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
    weightConditionEl.textContent = 'Normal weight';
    randomQuote();
  } else if (bmiValue >= 25 && bmiValue < 29.9) {
    weightConditionEl.textContent = 'Over weight';
    randomQuote();
  } else if (bmiValue >= 30) {
    weightConditionEl.textContent = 'Obese';
    randomQuote();
  }
}

btnEl.addEventListener('click', calcBmi);
