// Напиши скрипт, который после нажатия кнопки «Start», 
// раз в секунду меняет цвет фона <body> на случайное значение 
// используя инлайн стиль. При нажатии на кнопку «Stop», 
// изменение цвета фона должно останавливаться.

// Учти, на кнопку «Start» можно нажать бесконечное количество раз. 
// Сделай так, чтобы пока изменение темы запушено, кнопка «Start» 
// была не активна (disabled).

// Для генерации случайного цвета используй функцию getRandomHexColor.


const startBtnEl = document.querySelector(`button[data-start]`);
const stopBtnEl = document.querySelector(`button[data-stop]`);

stopBtnEl.setAttribute('disabled', `true`);

startBtnEl.addEventListener(`click`, onStartBtnClick);


let intervalId = null;
let activeInterval = null;

function onStartBtnClick() {

    if(!activeInterval) {
        function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        };

    intervalId = setInterval(() => {
        let randomBgdColor = getRandomHexColor();
        document.body.style.backgroundColor = randomBgdColor;
    }, 1000);

    activeInterval = true;

    startBtnEl.setAttribute('disabled', `true`);
    stopBtnEl.removeAttribute('disabled');
    };  
};

stopBtnEl.addEventListener(`click`, onStopBtnClick);

function onStopBtnClick() {
    if(activeInterval) {
        clearInterval(intervalId);
        
        activeInterval = false;
        startBtnEl.removeAttribute('disabled');
        stopBtnEl.setAttribute('disabled', `true`); 
    }
}








