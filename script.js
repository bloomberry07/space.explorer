const apiKey = "6diCKjwnhGQCfUw9X7S4czHD34idf9jtYHSBrqL6";
const resultdiv = document.getElementById("result");
const dateInput = document.getElementById("dateInput");
const fetchBtn = document.getElementById("fetchBtn");
const randomBtn = document.getElementById("randomBtn");


const today = new Date().toISOString().split("T")[0]; 
dateInput.max = today;


function getApod(date) {
  resultdiv.innerHTML = "<p>Loading...</p>";

  let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  if (date) {
    url += `&date=${date}`;
  }


fetch(url)
  .then(response => {
    if (!response.ok) {
        throw new Error("No data available for that date. Try another one.");
    }
    return response.json();
    })
  .then(data => {
    resultdiv.innerHTML =`
       <h2>${data.title}</h2>
       <p>${data.date}</p>
       <img src="${data.url}" alt="${data.title}" style="max-width: 500px;" />
       <p>${data.explanation}</p>
    `;
    })
  .catch(error => {
    resultdiv.innerHTML = `<p>Something went wrong: ${error}</p>`;
    });
}
fetchBtn.addEventListener("click", () => {
  getApod(dateInput.value);
});
randomBtn.addEventListener("click", () => {
  const start = new Date(1995, 5, 16);
  const end = new Date();
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTime).toISOString().split("T")[0];

  dateInput.value = randomDate;
  getApod(randomDate);
});

getApod();     