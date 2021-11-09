document.querySelector("button").addEventListener("click", function () {
  const name = prompt("Pass your name: ");
  let sex = "man";
  if (name.slice(-1) == "a") {
    sex = "woman";
  }
  alert(`Hello ${name} u are a ${sex} congrats`);
});
