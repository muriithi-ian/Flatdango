// Your code here
document.addEventListener("DOMContentLoaded", () => {
	fetchData(1).then((movie) => renderMovie(movie));
	fetchData().then((movies) => renderNav(movies));
});

function fetchData(id = null) {
	url = id
		? `http://localhost:3000/films/${id}`
		: `http://localhost:3000/films`;
	return fetch(url)
		.then((res) => res.json())
		.catch((err) => console.log(err));
}

function renderMovie(movie) {
	const moviePoster = document.querySelector("#poster");
	const movieTitle = document.querySelector("#title");
	const movieRuntime = document.querySelector("#runtime");
	const filmInfo = document.querySelector("#film-info");
	const movieShowtime = document.querySelector("#showtime");
	const ticketNumber = document.querySelector("#ticket-num");

	moviePoster.src = movie.poster;
	moviePoster.alt = movie.title;
	movieTitle.textContent = movie.title;
	movieRuntime.textContent = `${movie.runtime} minutes`;
	filmInfo.textContent = movie.description;
	movieShowtime.textContent = movie.showtime;

	const ticketsRemaining = movie.capacity - movie.tickets_sold;
	ticketNumber.textContent =
		ticketsRemaining >= 0 ? ticketsRemaining : "Sold Out";
}

function renderNav(movies) {
	const navFilms = document.querySelector("#films");

	//remove placeholders
	navFilms.textContent = "";

	movies.forEach((movie) => {
		//display movie title and style
		const ticketsRemaining = movie.capacity - movie.tickets_sold;
		const navFilmTitle = document.createElement("li");
		navFilmTitle.textContent = movie.title;
		navFilmTitle.classList.add("film", "item");
        navFilmTitle.addEventListener("click", () => {
					fetchData(movie.id).then((movie) => renderMovie(movie));
				});
		ticketsRemaining < 1 ? navFilmTitle.classList.add("sold-out") : null;
		navFilms.appendChild(navFilmTitle);
	});
}
