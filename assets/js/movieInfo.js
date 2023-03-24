// OMDB API : bdf3a323

// http://www.omdbapi.com/?i=tt3896198&apikey=bdf3a323

(function () {
  const movieTitle = document.getElementById("movie-title");
  const year = document.getElementById("released-year");
  const runtime = document.getElementById("runtime");
  const title = document.getElementById("title");
  title.innerHTML = localStorage.getItem("currentMovie");
  const poster = document.getElementById("poster");
  const plot = document.getElementById("plot");
  const director = document.getElementById("director");
  const writer = document.getElementById("writer");
  const genre = document.getElementById("genre");
  const stars = document.getElementById("stars");
  const rating = document.getElementById("rating");
  const total = document.getElementById("totalvote");
  const awards = document.getElementById("awards");

  fetchMovie(title.innerHTML);

  async function fetchMovie(movie_title) {
    const movie_url = `https://www.omdbapi.com/?t=${movie_title}&apikey=bdf3a323`;
    try {
      const response = await fetch(movie_url);
      const data = await response.json();
      console.log(data);
      movieTitle.innerHTML = `${data.Title} (${data.Year}) - IMDb Clone`;
      year.innerHTML = data.Year;
      const formatRuntime = formatTime(data.Runtime);
      runtime.innerHTML = formatRuntime;
      title.innerHTML = data.Title;
      poster.setAttribute("src", `${data.Poster}`);
      plot.innerHTML = data.Plot;
      director.innerHTML = data.Director;
      writer.innerHTML = data.Writer;
      genre.innerHTML = formatGenre(data.Genre);
      stars.innerHTML = data.Actors;
      rating.innerHTML = data.imdbRating;
      const imdbvote = formatNumber(
        parseInt(data.imdbVotes.replace(/,/g, ""), 10)
      );
      total.innerHTML = imdbvote;
      awards.innerHTML = data.Awards;
    } catch (error) {
      console.log(error);
    }
  }

  fetchMovie();
})();

// Formatting number into 'K'

function formatNumber(number) {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  }
  return number.toString();
}

// Formatting time into hours and minutes
function formatTime(time) {
  const strTime = parseInt(time, 10);
  const hours = Math.floor(strTime / 60);
  const minutes = strTime % 60;
  return `${hours}h ${minutes}m`;
}

// Formatting genre removing "," and adding space
function formatGenre(genreStr) {
  const newGenre = genreStr.replace(/,/g, " ");
  return newGenre;
}
