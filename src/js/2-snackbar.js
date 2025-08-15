import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputForm = document.querySelector('.form');

function createPromise(delay, isFulfilled) {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (isFulfilled) {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });
  return promise;
}

inputForm.addEventListener('submit', evt => {
  evt.preventDefault();

  const delay = Number(evt.currentTarget.elements.delay.value);
  const state = evt.currentTarget.elements.state.value;
  const isFulfilled = state === 'fulfilled';

  createPromise(delay, isFulfilled)
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
