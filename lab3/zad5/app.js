const outer = document.querySelector(".outer");
const middle = document.querySelector(".middle");
const inner = document.querySelector(".inner");
const counter = document.querySelector(".counter");
const propagation = document.querySelector(".propagation");
const reset = document.querySelector(".reset");
let prop = 0;

function blue(e) {
  add(1, `blue`);
  if (prop === 1) {
    e.stopPropagation();
  }
}
function red(e) {
  add(2, `red`);
  if (prop === 1) {
    e.stopPropagation();
  }
}
function yellow(e) {
  add(5, `yellow`);
  if (prop === 1) {
    e.stopPropagation();
  }
}

function add(val, name) {
  let curr = parseInt(counter.innerHTML) + val;
  alert(`U pressed ${name} btn adding ${val}`);
  counter.innerHTML = curr;
  if (middle.style.backgroundColor !== "rgb(204, 204, 202)" && curr > 30) {
    middle.removeEventListener("click", red);
    middle.style.backgroundColor = "rgb(204, 204, 202)";
  }
  if (inner.style.backgroundColor !== "rgb(204, 204, 202)" && curr > 50) {
    inner.removeEventListener("click", yellow);
    inner.style.backgroundColor = "rgb(204, 204, 202)";
  }
  if (outer.style.backgroundColor !== "rgb(204, 204, 202)" && curr === 60) {
    outer.removeEventListener("click", blue);
    outer.style.backgroundColor = "rgb(204, 204, 202)";
  }
}

outer.addEventListener("click", blue);
middle.addEventListener("click", red);
inner.addEventListener("click", yellow);
reset.addEventListener("click", function () {
  counter.innerHTML = 0;
  middle.style.backgroundColor = "rgb(204, 127, 153)";
  outer.style.backgroundColor = "rgb(148, 182, 212)";
  inner.style.backgroundColor = "rgb(220, 226, 171)";
  outer.addEventListener("click", blue);
  middle.addEventListener("click", red);
  inner.addEventListener("click", yellow);
  prop = 0;
  propagation.innerHTML = "Stop";
});

propagation.addEventListener("click", function () {
  if (prop === 0) {
    prop = 1;
    propagation.innerHTML = "Start";
  } else {
    prop = 0;
    propagation.innerHTML = "Stop";
  }
});
