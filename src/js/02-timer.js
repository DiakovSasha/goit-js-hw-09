// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputE = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysE = document.querySelector('[data-days]');
const hoursE = document.querySelector('[data-hours]');
const minutesE = document.querySelector('[data-minutes]');
const secondsE = document.querySelector('[data-seconds]');

let currentDate = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDate = selectedDates[0].getTime();
    console.log(currentDate);

    if (new Date() > currentDate) {
      // window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
      return;
    } else {
      btnStart.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onBtnStart() {
  const intId = setInterval(() => {
    const timer = currentDate - Date.now();
    inputE.disabled = true;
    btnStart.disabled = true;
    // Notify.success(`All good, go go!!!`);
    if (timer < 0) {
      inputE.disabled = false;
      btnStart.disabled = true;
      clearInterval(intId);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timer);

    daysE.textContent = addLeadingZero(days);
    hoursE.textContent = addLeadingZero(hours);
    minutesE.textContent = addLeadingZero(minutes);
    secondsE.textContent = addLeadingZero(seconds);
  }, 1000);
}
btnStart.addEventListener('click', onBtnStart);

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
