const url = "http://localhost:9000";
// import characters from "../backend/simpsons.json" assert { type: "json" };
// console.log(characters);

// let selectedUserCharacters = [];
let simpsons = [];

const imgSection = document.getElementById("simpsons-characters-img");
const input = document.querySelector(".search-input");
const autocompleteOutput = document.querySelector(".autocomplete-output");

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
}

async function getData() {
  const response = await fetch("http://localhost:9000/api", {
    method: "GET",
  });

  const obj = await response.json();
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

function searchForASimpsonsCharacter() {
  input.addEventListener("input", autocompleteSearchForCharacter);

  function autocompleteSearchForCharacter(event) {
    event.preventDefault();
    let userInput = input.value.slice(0, 2);
    fetch(url + "/api/data", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.simpsons.map((simpsonMember) => {
          if (
            userInput.toLowerCase() ===
            simpsonMember.name.slice(0, 2).toLowerCase()
          ) {
            autocompleteOutput.innerHTML += `<ul><li class="autocomplete-name">${simpsonMember.name}</li></ul>`;
            simpsons.push(simpsonMember);
            displaySearchedFamilyMember(simpsonMember);
          }
        });
      });
  }
}
function displaySearchedFamilyMember(simpsonMember) {
  let list = document.getElementsByClassName("autocomplete-name");
  let modal = document.getElementById("myModal");
  let close = document.querySelector(".close");
  let modalContent = document.querySelector(
    ".modal-content-simpsonsFamilyMember"
  );

  for (let element of list) {
    element.addEventListener("click", () => {
      autocompleteOutput.innerHTML = "";
      for (let familyMember of simpsons) {
        if (familyMember.name === element.innerText) {
          modal.style.display = "block";
          modalContent.innerHTML = `Name: ${familyMember.name} <br /> Born: ${familyMember.born} <br /> Age: ${familyMember.age} <br /> Characteristic: ${familyMember.characteristic}`;
        }
      }
    });
  }
  close.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

async function loadPage() {
  const data = await fetchApiData();
  if (
    window.location.href === "http://localhost:9000/choose-your-character" ||
    window.location.href ===
      "http://localhost:9000/built-your-character#important"
  ) {
    renderElements(data);
    addEventListener(); //sendPostRequest
    searchForASimpsonsCharacter();
  }

  if (window.location.href === "http://localhost:9000/your-characters") {
    const selectedCharacterFromUser = await getData();
    displaySelectedCharacterFromUser(selectedCharacterFromUser);
  }
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
