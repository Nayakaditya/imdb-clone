// http://www.omdbapi.com/?i=tt3896198&apikey=bdf3a323
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const suggestedMovieContainer = document.getElementById(
  "suggested-movie-container"
);
const favMovieListContainer = document.getElementById("fav-list");
const reloadBtn = document.getElementById("reload-btn");

addFavMovieToDOM();
var suggestedMovieList = [];
var favMovieList = [];

// FUNCTION FOR FETCHING MOVIES FROM PROVIDED API USING FETCH API
async function fetchMovies(movie) {
  const movie_url = `http://www.omdbapi.com/?t=${movie}&apikey=bdf3a323`;

  try {
    const response = await fetch(movie_url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in fetching movies");
  }
}

searchInput.addEventListener("keyup", () => {
  (async () => {
    const data = await fetchMovies(searchInput.value);
    addSuggestedMovieToDOM(data);
    // console.log(data);
  })();
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  (async () => {
    const data = await fetchMovies(searchInput.value);
    addSuggestedMovieToDOM(data);
  })();
});

// THIS FUNCTION WILL SHOW MOVIE TO THE suggestionContainer
function addSuggestedMovieToDOM(data) {
  // ITERATE OVER THE suggestionMovieList ARRAY and TO PUSH DATA
  var isInArray = false;

  suggestedMovieList.forEach((movie) => {
    if (data.Title == movie.Title) {
      isInArray = true;
    }
  });

  if (!isInArray && data.Title != undefined) {
    console.log(data);
    suggestedMovieList.push(data);

    const movieCard = document.createElement("div");
    movieCard.setAttribute("class", "movie-card");

    movieCard.innerHTML = `
    <a href="movieInfo.html" data-id="${data.Title}">
      <img
        width="200"
        src=${data.Poster}
        alt="${data.Title}"
        data-id="${data.Title}"
      />
      <div class="movie-text d-flex justify-content-center mt-3">
        <div class="movie-link mb-3">
          <a href="movieInfo.html" data-id="${data.Title}">${data.Title}</a>
        </div>
        <button>
          <i class="fa-solid fa-heart add-to-fav" data-id=$"${data.Title}"></i>
        </button>
      </div>
    </a>
  `;

    suggestedMovieContainer.prepend(movieCard);
  }
}

// SAVE FAV MOVIE TO LOCALSTORAGE
async function favMovieBtn(e) {
  const target = e.target;
  let data = await fetchMovies(target.dataset.id);
  console.log(data);

  // fetching the movie from localStorage
  const fetchedMovie = localStorage.getItem("favMovieInLocalStorage");

  // checking if movie already stored in localStorage
  if (fetchedMovie) {
    // if present then convert fetched movie into array
    favMovieList = Array.from(JSON.parse(fetchedMovie));
  } else {
    // other wise set a new movie to the localStorage as a String
    localStorage.setItem("favMovieInLocalStorage", JSON.stringify(data));
  }

  let isInArray = false;
  // checking if that movie is already in the list
  favMovieList.forEach((movie) => {
    if (data.Title === movie.Title) {
      window.alert("This movie is alreay in the favourite list");
      isInArray = true;
    }
  });

  // if movie is not in fav movie list then push it
  if (!isInArray) {
    favMovieList.push(data);
  }

  localStorage.setItem("favMovieInLocalStorage", JSON.stringify(favMovieList));
  isInArray != isInArray;

  addFavMovieToDOM();
}

function deleteMovieFromLocal(movie_name) {
  const favMovieList = JSON.parse(
    localStorage.getItem("favMovieInLocalStorage")
  );

  const newFavList = Array.from(favMovieList).filter((movie) => {
    return movie.Title != movie_name;
  });

  localStorage.setItem("favMovieInLocalStorage", JSON.stringify(newFavList));

  addFavMovieToDOM();
}

function addFavMovieToDOM() {
  favMovieListContainer.innerHTML = "";

  var favMovieLists = JSON.parse(
    localStorage.getItem("favMovieInLocalStorage")
  );

  if (favMovieLists) {
    favMovieLists.forEach((movie) => {
      const favMovieCard = document.createElement("div");
      favMovieCard.classList.add(
        "single-fav-movie-card",
        "d-flex",
        "my-3",
        "justify-content-between",
        "align-content-center"
      );

      favMovieCard.innerHTML = `
      <img
        src="${movie.Poster}"
        alt="movie-poster"
      />

      <div class="movie-name-container">
        <p>
          <a href="movieInfo.html" class="movie-name" data-id="${movie.Title}">${movie.Title}</a>
        </p>
      </div>

      <div class="del-btn-icon">
        <i class="fa-solid fa-trash del-fav-btn" data-id="${movie.Title}"></i>
      </div>`;

      favMovieListContainer.prepend(favMovieCard);
    });
  }
}

// Handling the event here for adding and removing movie from favourite list
document.addEventListener("click", async (e) => {
  let target = e.target;

  if (target.classList.contains("add-to-fav")) {
    e.preventDefault();
    favMovieBtn(e);
  } else if (target.classList.contains("del-fav-btn")) {
    deleteMovieFromLocal(target.dataset.id);
  }

  localStorage.setItem("currentMovie", `${target.dataset.id}`);
});

function refereshPage() {
  location.reload();
}

reloadBtn.addEventListener("click", refereshPage);
