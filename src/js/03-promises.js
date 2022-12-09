import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css'

const refs = {
  delayInputEl: document.querySelector(`input[name="delay"]`),
  stepInputEl: document.querySelector(`input[name="step"]`),
  amountInputEl: document.querySelector(`input[name="amount"]`),
  formBtnEl: document.querySelector(`.form`),
};

refs.formBtnEl.addEventListener(`submit`, onCreatePromise);

function onCreatePromise(e) {
  e.preventDefault();

  let firstDelay = Number(refs.delayInputEl.value);
  let nextStepDelay = Number(refs.stepInputEl.value);
  let amount = Number(refs.amountInputEl.value);

  for (let i = 1; i <= amount; i += 1) {
    console.log(firstDelay, nextStepDelay, amount);

    createPromise(i, firstDelay).then(({position, delay}) => {
      Notiflix.Notify.success(`🎄 Fulfilled promise ${position} in ${delay}ms`)})
      .catch(({position, delay}) => {
      Notiflix.Notify.failure(`💣 Rejected promise ${position} in ${delay}ms`)});

    firstDelay += nextStepDelay;
  };
  refs.formBtnEl.reset();
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
//     console.log(`💚 Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`💔 Rejected promise ${position} in ${delay}ms`);
//   });
