url = "http://localhost:9000";

let simpsons;

const data = async function fetchSimpsonsCharactersData() {
  const response = await fetch(url + "/api/data");
  const json = await response.json();
  return json;
};

let simpsonsData = fetchSimpsonsCharactersData().then((json) => {
  simposn = json;
  return json;
});
console.log(simpsonsData);

//------------------------------------------
// const simpsonsData = async function fetchData() {
//   const response = await fetch(url + "/api/data");
//   const json = await response.json();
//   return json;
// };

// console.log(simpsonsData);
