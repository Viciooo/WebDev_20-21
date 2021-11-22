// selecty
const container = document.querySelector(".content-container");
const form = document.querySelector("form");
// addEvent
form.addEventListener("submit", (e) => {
  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  document.querySelector("#name").value = "";
  document.querySelector("#phone").value = "";

  e.preventDefault();

  const newDiv = document.createElement("div");
  newDiv.classList.add("content");
  newDiv.innerHTML += `<div class="data">
            <h1>${name}</h1>
            <h2>${phone}</h2>
          </div>
          <i class="far fa-trash-alt trash"></i>
          `;
  container.append(newDiv);
  const trash = document.querySelector(".trash");
});

container.addEventListener("click", (el) => {
  if (el.target.classList.contains("trash")) {
    el.preventDefault();
    console.log(el);
    el.target.parentElement.remove();
  }
});
