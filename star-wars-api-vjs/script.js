
//This selects the 'main' element on the document, which is where the card with the applicable data will eventually go.
const mainElement = document.querySelector('main');

let filmData;

//This function calls the Star Wars API and returns data about each Star Wars film. 
async function getFilms() {
  let results = await fetch("https://swapi.dev/api/films/");
  const data = await results.json();
  console.log(data);
  let films = data.results;
  setSort(films);
  addCards(films);
  filmData = films;
}

getFilms();

//This function takes in the created card with it's assoicated data from the filmCardContents function, appends all that information an 'article' element on the card, and then appends the card to the page.
async function createCard(data) {
  const card = document.createElement('article');
  card.innerHTML = filmCardContents(data);
  mainElement.appendChild(card);
}

//This function takes in the data recieved from the API call and creates the html elements need for making the card and displaying the card data.
const filmCardContents = (data) => {
  let html = `<h2>${data.title}</h2>`;
  html += `<h3><strong>Episode:</strong> ${data.episode_id}</h3>`;
  html += `<p><strong>Released:</strong> ${data.release_date}</p>`;
  html += `<p><strong>Director:</strong> ${data.director}</p>`;
  html += `<p><strong>Story line: </strong>${data.opening_crawl}</p>`;
  return html;
}

//This function take the value from the select section on the form element and runs a different sort based on that value.
const setSort = (array) => {
  const sortOrder = document.getElementById('sortorder').value;
  switch (sortOrder) {
    case 'episode_id':
      array.sort((a, b) => (a.episode_id > b.episode_id) ? 1 : -1);
      break;
    case 'title':
      array.sort((a, b) => (a.title > b.title) ? 1 : -1);
      break;
    case 'release_date':
      array.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1);
      break;
  }
}
//This loops through the array passed into it and creates a new card for each item in the array.
const addCards = (array) => {
  array.forEach(eachItem => {
    createCard(eachItem);
  });
}
//This event listener captures when the user changes the value of the sort field.
document.getElementById('sortorder').addEventListener('change', () => {
  mainElement.innerHTML = '';
  setSort(filmData);
  addCards(filmData);
});
