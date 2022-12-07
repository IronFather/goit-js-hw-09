// Напиши скрипт таймера, который ведёт обратный отсчет 
// до определенной даты

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    inputEl: document.querySelector(`#datetime-picker`),
    startBtnEl: document.querySelector(`button[data-start]`),
    fieldEl: document.querySelectorAll(`.field`),
    daysEl: document.querySelector(`span[data-days]`),
    hoursEl: document.querySelector(`span[data-hours]`),
    minutesEl: document.querySelector(`span[data-minutes]`),
    secondsEl: document.querySelector(`span[data-seconds]`),
};

refs.startBtnEl.setAttribute(`disabled`,`true`);
let selectedDates = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        onInputDate(selectedDates[0]);
    },
};

const fpStartConditions = flatpickr(`#datetime-picker`, options);

function pad(value) {
return String(value).padStart(2, `0`);
}

function getTimeComponent(time) {
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
}

const timer = {
    intervalId: null,
    isActive: false,

    start() {
        const finishTime = new Date('Jan 1 2023 00:00:00');
        console.log(finishTime);

    this.intervalID = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = endTime - currentTime;
        const { days, hours, mins, secs } = getTimeComponent(deltaTime);

        console.log(this.intervalID);
    }, 1000)
},
    stop() {
        clearInterval(this.intervalId);
    }
}





//   const fp = flatpickr('#datetime-picker', options);
//   refs.buttonStartEl.setAttribute('disabled', 'disabled');
//   let timeId = null;
//   const INTERVAL = 1000;
//   /** functions */
//   function onInputDate(selectedDates) {
//     if (selectedDates <= Date.now()) {
//       // alert('Please choose a date in the future');
//       Notiflix.Notify.failure('Please choose a date in the future');
//     } else {
//       refs.buttonStartEl.removeAttribute('disabled', 'disabled');
//       onStartedTimer(selectedDates);
//     }
//   }
//   function onStartedTimer(selectedDates) {
//     let timerValueInMs = Date.parse(selectedDates) - Date.now();
//     let objTimerValue = convertMs(timerValueInMs);
//     refs.buttonStartEl.addEventListener('click', () => {
//       refs.buttonStartEl.setAttribute('disabled', 'disabled');
//       refs.inputDateEl.setAttribute('disabled', 'disabled');
//       timeId = setInterval(() => {
//         if (timerValueInMs <= 0) {
//           clearInterval(timeId);
//           return;
//         }
//         objTimerValue = convertMs(timerValueInMs);
//         refs.daysEl.textContent = addLeadingZero(objTimerValue.days);
//         refs.hoursEl.textContent = addLeadingZero(objTimerValue.hours);
//         refs.minutesEl.textContent = addLeadingZero(objTimerValue.minutes);
//         refs.secondsEl.textContent = addLeadingZero(objTimerValue.seconds);
//         timerValueInMs -= INTERVAL;
//       }, INTERVAL);
//     });
//   }

