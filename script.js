const btnEl = document.getElementById('btn');
const bmiImputEl = document.getElementById('bmi-result');
const weightConditionEl = document.getElementById('weight-condition');

function calcBmi() {
  const heightValue = document.getElementById('height').value / 100;
  const weightValue = document.getElementById('weight').value;

  const bmiValue = Math.round(weightValue / heightValue ** 2);
  bmiImputEl.value = bmiValue;

  if (bmiValue < 18.5) {
    weightConditionEl.textContent = 'under weight';
  } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
    weightConditionEl.textContent = 'Normal weight';
  } else if (bmiValue >= 25 && bmiValue < 29.9) {
    weightConditionEl.textContent = 'Over weight';
  } else if (bmiValue >= 30) {
    weightConditionEl.textContent = 'Over weight';
  }
}

btnEl.addEventListener('click', calcBmi);
