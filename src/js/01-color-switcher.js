const startBtnEl = document.querySelector(`button[data-start]`);
const stopBtnEl = document.querySelector(`button[data-stop]`);

stopBtnEl.setAttribute('disabled', `true`);

startBtnEl.addEventListener(`click`, onStartBtnClick);


let intervalId = null;
let isActiveInterval = null;

function onStartBtnClick() {

    if(!isActiveInterval) {
        function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        };

    intervalId = setInterval(() => {
        let randomBgdColor = getRandomHexColor();
        document.body.style.backgroundColor = randomBgdColor;
    }, 1000);

    isActiveInterval = true;

    startBtnEl.setAttribute('disabled', `true`);
    stopBtnEl.removeAttribute('disabled');
    };  
};

stopBtnEl.addEventListener(`click`, onStopBtnClick);

function onStopBtnClick() {
    if(isActiveInterval) {
        clearInterval(intervalId);
        
        isActiveInterval = false;
        startBtnEl.removeAttribute('disabled');
        stopBtnEl.setAttribute('disabled', `true`); 
    };
};
