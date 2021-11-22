function addElement(data, parent) {
  const container = document.createElement("div");
  container.classList.add("table");
  container.innerHTML = `
          <div>Nazwa</div>
          <div>Powiat</div>
          <div>Województwo</div>
          <div>Powierzchnia</div>
          <div>Liczba mieszkańców</div>
          <div>Gęstość zaludnienia</div>
        `;
  Object.entries(data).map((item) => {
    const obj = item[1];

    const name = document.createElement("div");
    name.innerHTML = obj["name"];
    const township = document.createElement("div");
    township.innerHTML = obj["township"];
    const province = document.createElement("div");
    province.innerHTML = obj["province"];
    const area = document.createElement("div");
    area.innerHTML = obj["area"];
    const people = document.createElement("div");
    people.innerHTML = obj["people"];
    const dentensity = document.createElement("div");
    dentensity.innerHTML = obj["dentensity"];

    container.append(name);
    container.append(township);
    container.append(province);
    container.append(area);
    container.append(people);
    container.append(dentensity);
  });
  parent.append(container);
}

function addElementTaskD(data, parent) {
  const container = document.createElement("div");
  container.classList.add("table");
  container.innerHTML = `
          <div>Nazwa</div>
          <div>Powiat</div>
          <div>Województwo</div>
          <div>Powierzchnia</div>
          <div>Liczba mieszkańców</div>
          <div>Gęstość zaludnienia</div>
        `;
  Object.entries(data).map((item) => {
    const obj = item[1];

    const name = document.createElement("div");
    name.innerHTML = `${obj["name"]} city`;
    const township = document.createElement("div");
    township.innerHTML = obj["township"];
    const province = document.createElement("div");
    province.innerHTML = obj["province"];
    const area = document.createElement("div");
    area.innerHTML = obj["area"];
    const people = document.createElement("div");
    people.innerHTML = obj["people"];
    const dentensity = document.createElement("div");
    dentensity.innerHTML = obj["dentensity"];

    container.append(name);
    container.append(township);
    container.append(province);
    container.append(area);
    container.append(people);
    container.append(dentensity);
  });
  parent.append(container);
}
fetch("db.json").then((resp) => {
  resp.json().then((data) => {
    data = data.cities.filter((value) => {
      return value.province === "małopolskie";
    });
    const parent = document.querySelector("#a");
    addElement(data, parent);
  });
});

fetch("db.json").then((resp) => {
  resp.json().then((data) => {
    data = data.cities;
    const newData = data.filter((obj) => {
      const str = obj["name"];
      let cnt = 0;
      [...str].forEach((c) => {
        if (c === "a") cnt++;
      });
      return cnt >= 2;
    });

    const parent = document.querySelector("#b");
    addElement(newData, parent);
  });
});

fetch("db.json").then((resp) => {
  resp.json().then((data) => {
    data = data.cities;
    const parent = document.querySelector("#c");
    data.sort((a, b) => (a.dentensity > b.dentensity ? -1 : 1));
    let tmp = data[4];
    let obj = { tmp };
    addElement(obj, parent);
  });
});

fetch("db.json").then((resp) => {
  resp.json().then((data) => {
    data = data.cities;
    const parent = document.querySelector("#d");

    addElementTaskD(
      data.filter((item) => item.people > 100000),
      parent
    );
  });
});

fetch("db.json").then((resp) => {
  resp.json().then((data) => {
    data = data.cities;
    const parent = document.querySelector("#e");
    const moreThan80k = data.filter((item) => item.people > 80000).length;
    const lessThan80k = data.filter((item) => item.people < 80000).length;
    const container = document.createElement("div");
    const answer = document.createElement("div");

    answer.innerHTML = `Miast powyżej 80,000 : ${moreThan80k}, Miast poniżej 80,000 : ${lessThan80k}  czyli wartość ${
      moreThan80k > lessThan80k
    } ma wyrażenie ,że więcej jest tych mających powyżej 80,000`;
    container.append(answer);
    parent.append(container);
  });
});

fetch("db.json").then((resp) => {
  resp.json().then((data) => {
    data = data.cities;
    const parent = document.querySelector("#f");
    const newData = data.filter((d) => d.township.startsWith("P"));
    let mean = newData.reduce((xs, x) => xs + x["area"], 0) / newData.length;
    console.log(newData);
    const answer = document.createElement("div");
    answer.innerHTML = `Średnia to: ${mean}`;
    parent.append(answer);
  });
});
