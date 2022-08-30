// Your code here
document.addEventListener("DOMContentLoaded", () => {
	fetchData().then((movies) => renderNav(movies));
	fetchData(1).then((movie) => renderMovie(movie));
});

function fetchData(id = null) {
	url = id
		? `http://localhost:3000/films/${id}`
		: `http://localhost:3000/films`;
	return fetch(url)
		.then((res) => res.json())
		.catch((err) => console.log(err));
}
let globalTicketsRemaining = [];

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
	buyButton.textContent = "Buy Ticket";
	let ticketsRemaining = movie.capacity - movie.tickets_sold;
	if (globalTicketsRemaining.includes(movie.title)) {
		buyButton.textContent = "Sold Out";
		ticketsRemaining = 0;
	}

	ticketNumber.textContent = ticketsRemaining;
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
		navFilmTitle.setAttribute("id", movie.id);
		navFilmTitle.classList.add("film", "item");
		navFilmTitle.addEventListener("click", () => {
			// debugger;
			fetchData(movie.id).then((movie) => renderMovie(movie));
		});
		ticketsRemaining < 1 ? navFilmTitle.classList.add("sold-out") : null;
		navFilms.appendChild(navFilmTitle);
	});
}

const buyButton = document.querySelector("#buy-ticket");

buyButton.addEventListener("click", () => {
	const ticketNumber = document.querySelector("#ticket-num");
	let ticketsRemaining = parseInt(ticketNumber.textContent);

	if (ticketsRemaining > 0) ticketsRemaining -= 1;
	console.log("t0", ticketsRemaining);
	if (ticketsRemaining == 0) {
		// buyButton.classList.add("disabled");
		buyButton.textContent = "Sold Out";
		buyButton.removeEventListener("click", () => {});

		const movieTitle = document.querySelector("#title");
		const navList = document.querySelectorAll("li");

		console.log(navList);
		globalTicketsRemaining.push(movieTitle.textContent);
		navList.forEach((item) => {
			item.textContent === movieTitle.textContent
				? item.classList.add("sold-out")
				: null;
		});
	}

	return (ticketNumber.textContent = ticketsRemaining);
});
