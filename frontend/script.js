url = "http://localhost:9000";
// let userObj = [];
let selectedUserCharacters = [];

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
    image.addEventListener("click", sendSelectedCharacterToServer);
  });
}

async function sendSelectedCharacterToServer(event) {
  let selectedImg = event.target.parentElement.firstChild.src;
  let selectedName = event.target.parentElement.lastChild.innerHTML;
  //Create Post Request to send it to the server:

  await fetch("http://localhost:9000/api", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      img: selectedImg,
      name: selectedName,
    }),
  });
  // let hey = await si.json();
  // console.log(hey);
  // console.log("Si" + si.json());
}

async function getData() {
  const response = await fetch("http://localhost:9000/api", {
    method: "GET",
  });

  const obj = await response.json();
  // selectedUserCharacters.push(obj);
  return obj;
}

function displaySelectedCharacterFromUser(getDataFromUser) {
  console.log(getDataFromUser);
  let imgOfSelectedCharacter = document.getElementById("selected-img");
  let nameOfSelectedCharacter = document.getElementById("selected-name");

  getDataFromUser.userData.forEach(function (element) {
    let img = document.createElement("img");
    img.setAttribute("src", `${element.img}`);
    img.setAttribute("class", "simpsons-family-img");
    imgOfSelectedCharacter.appendChild(img);
    let name = document.createElement("span");
    name.innerHTML = element.name;
    nameOfSelectedCharacter.appendChild(name);
  });
}

async function loadPage() {
  const data = await fetchApiData();
  console.log(window.location);
  if (
    window.location.href === "http://localhost:9000/choose-your-character" ||
    window.location.href ===
      "http://localhost:9000/built-your-character#important"
  ) {
    renderElements(data);
    addEventListener(); //sendPostRequest
  }

  const selectedCharacterFromUser = await getData();
  displaySelectedCharacterFromUser(selectedCharacterFromUser);
}

loadPage();

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
