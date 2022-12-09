import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css'

const refs = {
    startBtnEl: document.querySelector(`button[data-start]`),
    daysEl: document.querySelector(`span[data-days]`),
    hoursEl: document.querySelector(`span[data-hours]`),
    minsEl: document.querySelector(`span[data-minutes]`),
    secsEl: document.querySelector(`span[data-seconds]`),
};

refs.startBtnEl.setAttribute(`disabled`,`true`);

let selectedTime = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minIncrement: 1,
    onClose(selectedDates) {

        if (selectedDates[0].getTime() < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');

            selectedDates[0] = new Date();

            refs.startBtnEl.setAttribute('disabled', true);
            return;

        } else {
            refs.startBtnEl.removeAttribute('disabled');
            selectedTime = selectedDates[0].getTime();
            console.log(selectedTime);
        };
    },
};

const flatpickrCalendar = flatpickr(`#datetime-picker`, options);

function addLeadingZero(value) {
    return String(value).padStart(2, `0`);
    }
    
function convertMs(ms) {
    const sec = 1000;
    const min = sec * 60;
    const hour = min * 60;
    const day = hour * 24;
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const mins = addLeadingZero(Math.floor(((ms % day) % hour) / min));
    const secs = addLeadingZero(Math.floor((((ms % day) % hour) % min) / sec));
    return { days, hours, mins, secs };
};

const timer = {
    intervalId: null,
    isActiveInterval: false,

    start() {
        if (this.isActiveInterval) {
            return;
        };
    
        this.isActiveInterval = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();

            const deltaTime = selectedTime - currentTime;
            const timerValues = convertMs(deltaTime);

            apdateTimer(timerValues);
            console.log(deltaTime);
            console.log(timerValues);
            
            refs.startBtnEl.setAttribute(`disabled`,`true`);

            if (deltaTime <= 1000) {
                console.log(`Стоп машина`);
                clearInterval(this.intervalId);
                return;
            };

        }, 1000);
    },
};

refs.startBtnEl.addEventListener(`click`, () => {
    timer.start();
});

refs.startBtnEl.addEventListener('click', () => {
    timer.start();
});

function apdateTimer({days, hours, mins, secs}) {
    refs.daysEl.textContent = `${days}`;
    refs.hoursEl.textContent = `${hours}`;
    refs.minsEl.textContent = `${mins}`;
    refs.secsEl.textContent = `${secs}`;
};

