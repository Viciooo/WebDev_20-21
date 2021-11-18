const baloon = document.createElement("span");
const center = document.querySelector(".center");
baloon.innerHTML = `&#127880`;
let fontSize = 10;
const fontUnit = `rem`;
const minSize = 5;
const maxSize = 20;
center.append(baloon);
let exploded = false;

function shrinkBaloon() {
  fontSize -= 0.1 * fontSize;
  baloon.style.fontSize = `${fontSize}${fontUnit}`;
}

function growBaloon() {
  fontSize += 0.1 * fontSize;
  baloon.style.fontSize = `${fontSize}${fontUnit}`;
}

function explode() {
  baloon.innerHTML = `&#128165;`;
  fontSize = 10;
  exploded = true;
}

document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (key === "ArrowUp" && !exploded) {
    if (fontSize > maxSize) {
      explode();
    } else growBaloon();
  }
  if (key === "ArrowDown" && fontSize > minSize && !exploded) {
    shrinkBaloon();
  }
});

// content menu
const content = document.querySelector("#content");
baloon.addEventListener("contextmenu", (e) => {
  if (window.event.ctrlKey) {
    e.preventDefault();
    content.style.display = "block";
    content.innerHTML = `fontSize:${fontSize}${fontUnit}`;
  }
});
