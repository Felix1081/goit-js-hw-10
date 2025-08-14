const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let intervalId = null;
let userSelectedDate = null;
startBtn.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error!!!',
        message: 'Please, choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const timer = {
  start() {
    this.stop();
    intervalId = setInterval(() => {
      const leftTime = userSelectedDate - Date.now();

      if (leftTime <= 1000) {
        this.stop();

        input.disabled = false;
      }

      const objTime = convertMs(leftTime);
      daysEl.textContent = addLeadingZero(objTime.days);
      hoursEl.textContent = addLeadingZero(objTime.hours);
      minutesEl.textContent = addLeadingZero(objTime.minutes);
      secondsEl.textContent = addLeadingZero(objTime.seconds);
    }, 1000);
  },
  stop() {
    clearInterval(intervalId);
    intervalId = null;
  },
};

startBtn.addEventListener('click', () => {
  timer.start();
  startBtn.disabled = true;
  input.disabled = true;
});
