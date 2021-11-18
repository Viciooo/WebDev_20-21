const eve = document.querySelector(".event");
const incr = document.querySelector(".increment");
const cnt = document.querySelector(".cnt");
let flag = 0;

eve.addEventListener("click", incrState);
function incrState() {
  if (flag == 0) {
    addEvent();
    eve.innerHTML = "Stop";
  } else {
    eve.innerHTML = "Start";
    removeEvent();
  }
}

function increment() {
  cnt.innerHTML = parseInt(cnt.innerHTML) + 1;
}
function addEvent() {
  cnt.innerHTML = 0;
  flag = 1;
  incr.addEventListener("click", increment);
}

function removeEvent() {
  cnt.innerHTML = 0;
  flag = 0;
  incr.removeEventListener("click", increment);
}
