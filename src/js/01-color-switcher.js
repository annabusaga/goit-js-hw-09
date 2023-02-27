const buttonStartRef = document.querySelector('[data-start]');
const buttonStopRef = document.querySelector('[data-stop]');

let intervalId = null;
buttonStopRef.disabled = true;

buttonStartRef.addEventListener('click', onButtonStartClick);
function onButtonStartClick(event) {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  event.target.disabled = true;
  buttonStopRef.disabled = false;
}

buttonStopRef.addEventListener('click', onButtonStopClick);
function onButtonStopClick(event) {
  clearInterval(intervalId);
  buttonStartRef.disabled = false;
  event.target.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
