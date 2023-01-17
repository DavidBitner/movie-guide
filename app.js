const movieInfoUI = document.querySelector(`.movie`);
const form = document.querySelector(`#form`);

async function queryMovie(movieName) {
  const url = `http://omdbapi.com/?apikey=b03ed45c&t=${movieName}`;
  const data = await fetch(url);
  const result = await data.json();

  if (result.Error) {
    showErrorUi(result.Error);
    return;
  }

  const movie = {
    image: result.Poster,
    title: result.Title,
    rating: result.imdbRating,
    rated: result.Rated,
    year: result.Year,
    duration: result.Runtime,
    genre: result.Genre.replaceAll(",", "").split(" "),
    plot: result.Plot,
    cast: result.Actors,
  };

  return movie;
}

async function showResultUI(event) {
  event.preventDefault();

  const movieName = document.querySelector(`.input`).value;
  const movie = await queryMovie(movieName);

  if (!movie?.title) {
    return;
  }

  let genres = [];
  movie.genre.forEach((genre) => {
    genres.push(`<div class="movie__genre">${genre}</div>`);
  });
  genres = genres.join("\n");

  movieInfoUI.innerHTML = `
    <img src="${movie.image}" class="movie__img"></img>
    <div class="movie__details">
      <h1 class="movie__title">${movie.title}</h1>
      <div class="movie__rating">⭐ ${movie.rating}</div>
      <div class="movie__minor-details">
        <div class="movie__classification">${movie.rated}</div>
        <div class="movie__release-yer">${movie.year}</div>
        <div class="movie__duration">${movie.duration}</div>
      </div>
      <div class="movie__genres">
        ${genres}
      </div>
    </div>
    <div class="movie__plot">
      <h2 class="plot__title">Plot:</h2>
      <p class="plot__paragraph">
        ${movie.plot}
      </p>
    </div>
    <div class="movie__cast">
      <h2 class="cast__title">Cast:</h2>
      <p class="cast__paragraph">
        ${movie.cast}
      </p>
    </div>
  `;

  movieInfoUI.style.display = "grid";
}

function showErrorUi(error) {
  movieInfoUI.innerHTML = `<h1 class="movie__error">${error}</h1>`;
  movieInfoUI.style.display = "grid";
}

//Copyright Year IIFE
(() => {
  const year = document.querySelector("#year");
  const today = new Date();
  year.innerHTML = today.getFullYear();
})();

form.addEventListener("submit", showResultUI);
