{
  /* <img
  src="https://drive.google.com/uc?export=view&id=1LpBds9xNfvfSd3xSAYS72gUKeok1mnEZ"
  alt="2"
/>; */
}
const img = document.querySelector("img");
let src1 =
  "https://drive.google.com/uc?export=view&id=1LpBds9xNfvfSd3xSAYS72gUKeok1mnEZ";
let border1 = "5px blue solid";
let src2 =
  "https://drive.google.com/uc?export=view&id=1Ka7X-CvoY8JF6rtHOYJbZJP2zFImb6Pb";
let border2 = "5px red solid";

document.querySelector("button").addEventListener("click", function () {
  img.src = src1;
  img.style.border = border1;
  [src1, src2] = [src2, src1];
  [border1, border2] = [border2, border1];
});
