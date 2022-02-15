const weather = document.querySelector("form");
const input = document.querySelector("input");
const content = document.querySelector("#p1");
const error = document.querySelector("#p2");

const fetchData = (address) => {
  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        error.textContent = "";
        error.textContent = data.error;
      } else {
        content.textContent = "";
        error.textContent = "";
        error.textContent = data.location;
        // content.textContent = data.location;
        content.textContent = data.forcast;
        // content.textContent = `${data.location}, ${data.forcast}.😊😉`;
      }
    });
  });
};

weather.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = input.value;
  fetchData(address);

  input.value = "";
});
