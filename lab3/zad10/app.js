let uniqProducts = [];
let cnt = 0;
fetch("dbA.json").then((resp) => {
  resp.json().then((data) => {
    data = data.Products;
    data.forEach((el) => {
      Object.entries(el).map((item) => {
        addUniqList(uniqProducts, item);
      });
    });
    cnt++;
    if (cnt === 3) createList();
  });
});

fetch("dbB.json").then((resp) => {
  resp.json().then((data) => {
    data = data.Products;
    data.forEach((el) => {
      Object.entries(el).map((item) => {
        addUniqList(uniqProducts, item);
      });
    });
    cnt++;
    if (cnt === 3) createList();
  });
});

fetch("dbC.json").then((resp) => {
  resp.json().then((data) => {
    data = data.Products;
    data.forEach((el) => {
      Object.entries(el).map((item) => {
        addUniqList(uniqProducts, item);
      });
    });
    cnt++;
    if (cnt === 3) createList();
  });
});

function addUniqList(orgList, obj) {
  if (obj[1].length > 0) {
    let flag = true;
    orgList.forEach((el) => {
      if (el[0] === obj[0]) {
        flag = false;
      }
    });
    if (flag) {
      orgList.push(obj);
    } else {
      orgList.forEach((el) => {
        if (el[0] === obj[0]) {
          obj[1].forEach((i) => {
            let flag = true;
            el[1].forEach((j) => {
              if (JSON.stringify(i) === JSON.stringify(j)) {
                flag = false;
              }
            });
            if (flag) el[1].push(i);
          });
        }
      });
    }
  }
}
function createList() {
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  uniqProducts.forEach((product) => {
    const category = document.createElement("li");
    category.innerHTML = `<input id="${product[0]}" type="checkbox" />${product[0]}`;
    const container = document.createElement("ul");
    container.classList.add("items");
    left.append(category);
    left.append(container);
    product[1].forEach((item) => {
      const i = document.createElement("li");
      i.innerHTML = `<input id="${item.nazwa}" type="checkbox" />${item.nazwa}`;
      container.append(i);
      const element = document.createElement("h6");
      element.innerHTML = item.nazwa;
      right.append(element);
      const singleProduct = document.getElementById(item.nazwa);
      singleProduct.addEventListener("click", () => {
        if (element.style.display === "block") {
          element.style.display = "none";
        } else {
          element.style.display = "block";
        }
      });
    });

    const checkbox = document.getElementById(product[0]);
    checkbox.addEventListener("click", () => {
      if (container.style.display === "block") {
        container.style.display = "none";
      } else {
        container.style.display = "block";
      }
    });
  });
}
