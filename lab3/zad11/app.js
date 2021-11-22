do {
  input = prompt("I will not close untill u give me your name ");
} while (input === null || input === "");

console.log(input);

document.addEventListener("DOMContentLoaded", function () {
  let score = 0;
  const minPos = 20;
  const maxPos = 360;
  const minSpeed = 3;
  const maxSpeed = 5;
  const minSize = 0.3;
  const maxSize = 1;
  let lives = 3;

  function takePoints() {
    score -= 6;
    scoreValue.innerText = score;
  }

  let scoreValue = document.querySelector(".score");
  const board = document.querySelector(".board");
  const userName = document.querySelector(".name");
  userName.innerText += ` ${input}`;
  board.addEventListener("click", takePoints);

  const intervalId = setInterval(function () {
    const zombie = document.createElement("div");
    zombie.classList.add("zombie");

    const bottomPos = Math.random() * (maxPos - minPos) + minPos;
    zombie.style.bottom = bottomPos + "px";
    zombie.style.zIndex = 360 - bottomPos;

    const walkSpeed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    zombie.style.animationDuration = "0.5s," + walkSpeed + "s";

    const size = Math.random() * (maxSize - minSize) + minSize;
    zombie.style.transform = `scale(${size})`;
    board.appendChild(zombie);

    zombie.addEventListener("animationend", function (e) {
      if (e.animationName === "walk") {
        e.target.remove();
        lives--;

        if (lives === 0) {
          board.removeEventListener("click", takePoints);
          clearInterval(intervalId);
          document.querySelector(".end").style.display = "block";
          let zombies = board.getElementsByClassName("zombie");
          while (zombies.length !== 0) {
            zombies[0].parentNode.removeChild(zombies[0]);
          }
        }
      }
      scoreValue.innerText = score;
    });
  }, 800);

  board.addEventListener("click", function (e) {
    if (e.target.classList.contains("zombie")) {
      score += 12;
      e.target.remove();
      scoreValue.innerText = score;
    }
  });
});
