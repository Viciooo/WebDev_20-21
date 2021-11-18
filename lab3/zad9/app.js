const reviews = [
  {
    id: 1,
    name: "Rico",
    role: "pirotechnik",
    img: "./img/rico.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustasperiores debitis incidunt, eius earum ipsam cupiditate libero? Iste, doloremque nihil?",
  },
  {
    id: 2,
    name: "Kowalski",
    role: "mózg operacji",
    img: "./img/kowalski.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustasperiores debitis incidunt, doloremque",
  },
  {
    id: 3,
    name: "szeregowy",
    role: "lurker",
    img: "./img/szeregowy.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustasperiores debitis incidunt, doloremque Lorem ipsum dolor sit amet consectetur",
  },
  {
    id: 4,
    name: "skipper",
    role: "szef",
    img: "./img/skipper.png",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustasperiores debitis incidunt, doloremque Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustasperiores debitis incidunt, doloremque Lorem ipsum dolor sit amet consectetur",
  },
];
const img = document.querySelector("#penguin");
const name = document.querySelector("#name");
const role = document.querySelector("#role");
const info = document.querySelector("#info");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

let currentItem = 1;

window.addEventListener("DOMContentLoaded", function () {
  const item = reviews[currentItem];
  img.src = item.img;
  name.textContent = item.name;
  role.textContent = item.role;
  info.textContent = item.text;
});

nextBtn.addEventListener("click", function () {
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0;
  }
  showPerson(currentItem);
});

prevBtn.addEventListener("click", function () {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  showPerson(currentItem);
});

randomBtn.addEventListener("click", function () {
  currentItem = Math.floor(Math.random() * reviews.length);
  showPerson(currentItem);
});

function showPerson(person) {
  const item = reviews[person];
  img.src = item.img;
  name.textContent = item.name;
  role.textContent = item.role;
  info.textContent = item.text;
}
