import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css'

const refs = {
  delayInputEl: document.querySelector(`input[name="delay"]`),
  stepInputEl: document.querySelector(`input[name="step"]`),
  amountInputEl: document.querySelector(`input[name="amount"]`),
  submitBtnEl: document.querySelector(`.form button`),
};

// refs.submitBtnEl.setAttribute(`disabled`,`true`); 
refs.submitBtnEl.addEventListener(`click`, onCreatePromise);

function onCreatePromise(e) {
  e.preventDefault();

  let firstDelay = Number(refs.delayInputEl.value);
  let nextStepDelay = Number(refs.stepInputEl.value);
  let amount = Number(refs.amountInputEl.value);

  for (let i = 1; i <= amount; i += 1) {
    console.log(firstDelay, nextStepDelay, amount);

    createPromise(i, firstDelay).then(({position, delay}) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)})
      .catch(({position, delay}) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)});

    firstDelay += nextStepDelay;
  };
};

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        } 
      }, delay);
    });
  };

// Перевірка 1
// createPromise(4, 500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
// Працює!!!

// ----------------------------------------------------------------------------
// Задание 3 - генератор промисов

// В HTML есть разметка формы, в поля которой пользователь будет 
// вводить первую задержку в миллисекундах, шаг увеличения задержки 
// для каждого промиса после первого и количество промисов которое
//  необходимо создать.

// Напиши скрипт, который при сабмите формы вызывает функцию 
// createPromise(position, delay) столько раз, сколько ввели 
// в поле amount. При каждом вызове передай ей номер создаваемого
//  промиса (position) и задержку учитывая введенную пользователем
//   первую задержку (delay) и шаг (step).

// Дополни код функции createPromise так, чтобы она возвращала 
// один промис, который выполянется или отклоняется через delay 
// времени. Значением промиса должен быть объект, в котором будут 
// свойства position и delay со значениями одноименных параметров.
// Используй начальный код функции для выбора того, что нужно 
// сделать с промисом - выполнить или отклонить.

// Для отображения уведомлений пользователю вместо console.log() 
// используй библиотеку notiflix.

