url = "http://localhost:9000";

const imgSection = document.getElementById("simpsons-characters-img");
// let simpsons;
const fetchApiData = async () => {
  const response = await fetch(url + "/api/data");
  const obj = await response.json();
  return obj;
};

function renderElements(data) {
  data.simpsons.forEach(function (element) {
    const divForEachImg = document.createElement("div");
    divForEachImg.setAttribute("class", "col-4 img-container");
    imgSection.appendChild(divForEachImg);
    const img = document.createElement("img");
    divForEachImg.appendChild(img);
    img.setAttribute("src", `${element.img}`);
    img.setAttribute("class", "simpsons-family-img");
    const divForImgDescription = document.createElement("div");
    divForEachImg.appendChild(divForImgDescription);
    divForImgDescription.innerHTML = `${element.name}`;
  });
}
function addEventListener() {
  [...document.getElementsByClassName("simpsons-family-img")].map((image) => {
    image.addEventListener("click", () => {
      alert("hello World");
    });
  });
}
async function loadPage() {
  const data = await fetchApiData();
  renderElements(data);
  addEventListener();
}

loadPage();
//1. Methode _-----------------------------------------------------
// async function fetchApi() {
//   const response = await fetch(url + "/api/data");
//   const obj = await response.json();
//   console.log(obj);
//   return obj;
// }

// async function displayCharacters() {
//   const data = await fetchApi();
//   displayImgOfCharacters(data);
// }

// function displayImgOfCharacters(data) {
//   console.log(data);
// }
// fetchApi();

//2.Methode ./...............................................................

// async function displayCharacters() {
//   await fetch(url + "/api/data")
//     .then((response) => {
//       console.log(response);
//       return response.json();
//     })
//     .then((data) => {
//       displayImgOfCharacters(data);
//     });
// }
// function displayImgOfCharacters(data) {
//   console.log(data);
// }
// displayCharacters();
