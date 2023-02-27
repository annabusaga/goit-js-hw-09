import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const btnRef = document.querySelector('[data-start]');
const inputRef = document.querySelector('#datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let selectedDate = null;
btnRef.disabled = true;
let intervalId = null;

btnRef.addEventListener('click', onBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    btnRef.disabled = false;
    selectedDate = selectedDates[0];
  },
};

flatpickr(inputRef, options);

function onBtnClick(event) {
  btnRef.disabled = true;
  intervalId = setInterval(() => {
    const difference = selectedDate - Date.now();
    if (difference <= 0) {
      clearInterval(intervalId);
      return;
    }
    const dataObject = convertMs(difference);
    daysRef.textContent = dataObject.days;
    hoursRef.textContent = dataObject.hours;
    minutesRef.textContent = dataObject.minutes;
    secondsRef.textContent = dataObject.seconds;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
