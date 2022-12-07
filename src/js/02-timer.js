// Напиши скрипт таймера, который ведёт обратный отсчет 
// до определенной даты

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
        // console.log(selectedDates[0]);

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
            // console.log(`Button is blocked`);

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

// Выбор даты
// Метод onClose() из обьекта параметров вызывается каждый раз при закрытии
//  элемента интерфейса который создает flatpickr. Именно в нём стоит 
//  обрабатывать дату выбранную пользователем. Параметр selectedDates 
//  это массив выбранных дат, поэтому мы берем первый элемент.
// Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом 
// "Please choose a date in the future".
// Если пользователь выбрал валидную дату (в будущем), кнопка «Start» 
// становится активной.
// Кнопка «Start» должа быть не активна до тех пор, пока пользователь 
// не выбрал дату в будущем.
// При нажатии на кнопку «Start» начинается отсчет времени до выбранной 
// даты с момента нажатия.

// Отсчет времени
// При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду 
// сколько времени осталось до указанной даты и обновлять интерфейс таймера, 
// показывая четыре цифры: дни, часы, минуты и секунды в формате xx:xx:xx:xx.
// Количество дней может состоять из более чем двух цифр.
// Таймер должен останавливаться когда дошел до конечной даты, 
// то есть 00:00:00:00.
// Для подсчета значений используй готовую функцию convertMs, где 
// ms - разница между конечной и текущей датой в миллисекундах.

// Форматирование времени
// Функция convertMs() возвращает объект с рассчитанным оставшимся 
// временем до конечной даты. Обрати внимание, что она не форматирует 
// результат. То есть, если осталось 4 минуты или любой другой 
// составляющей времени, то функция вернет 4, а не 04. В интерфейсе 
// таймера необходимо добавлять 0 если в числе меньше двух символов. 
// Напиши функцию addLeadingZero(value), которая использует 
// метод padStart() и перед отрисовкой интефрейса форматируй значение.

// Библиотека уведомлений
// Для отображения уведомлений пользователю вместо window.alert() 
// используй библиотеку notiflix.


