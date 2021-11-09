const ul = document.querySelector("ul");
const btnAdd = document.getElementById("add");
const btnDelete = document.getElementById("delete");
let counter = 0;

btnAdd.addEventListener("click", function () {
  let elem = document.createElement("li");
  counter++;
  elem.innerHTML = `element ${counter}`;
  ul.appendChild(elem);
});

btnDelete.addEventListener("click", function () {
  counter--;
  ul.removeChild(ul.childNodes[0]);
});
