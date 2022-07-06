const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', changeBackgroundColor);

function changeBackgroundColor() {
  btnDisabled();
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
btnStop.addEventListener('click', removeBackgroundColor);
function removeBackgroundColor() {
  btnDisabled();
  clearInterval(timerId);
}
function btnDisabled() {
  if (btnStart.disabled) {
    btnStart.disabled = false;
    btnStop.disabled = true;
  } else {
    btnStart.disabled = true;
    btnStop.disabled = false;
  }
}
