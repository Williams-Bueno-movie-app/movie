
    const loader = document.querySelector(".popcorn");
    const movieListContainer = document.getElementById("movieList");
    let searchStop = document.querySelector("#movieForm")
        searchStop.style.display ="none";
    let movieFormBlock = document.querySelector("#add-movie-form")
        movieFormBlock.style.display = "none";
    const delay = 11000; // delay time in milliseconds

    setTimeout(() => {
        loader.style.display = "none";
    }, delay);


    async function searchMovie(searchValue) {
        try {
            const movieData = await fetch("http://localhost:3000/movies");
            const movies = await movieData.json();

            const filteredMovies = movies.filter(function (movie) {
                return movie.title.toLowerCase().includes(searchValue.toLowerCase());
            });

            return filteredMovies;
        } catch (error) {
            console.error("Error searching movies:", error);
            throw error; // Re-throw the error to handle it outside
        }
    }

document.addEventListener("DOMContentLoaded", () => {
    // const loadingElement = document.getElementById("loading");
    const movieListElement = document.getElementById("movies-list");
    const addMovieForm = document.getElementById("add-movie-form");

    // Function to fetch movies
    const fetchMovies = async () => {
        try {
            const response = await fetch("http://localhost:3000/movies");
            const movies = await response.json();
            return movies;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error; // Re-throw the error to handle it outside
        }
    };

    // Function to render movies
    const renderMovies = (movies) => {
        movieListElement.innerHTML = "";
        movies.forEach((movie) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${movie.title} - Rating: ${movie.rating}</span> 
                <img src="${movie.poster}" alt="poster">
                <button onclick="editMovie(${movie.id})">Edit</button>
                <button onclick="deleteMovie(${movie.id})">Delete</button>`;
            movieListElement.appendChild(listItem);
        });
    };

    // Function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const rating = document.getElementById("rating").value;
        const poster = document.getElementById("poster").value; // Assuming you have an input field for the poster

        try {
            const response = await fetch("http://localhost:3000/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, rating, poster }),
            });

            const newMovie = await response.json();
            // Fetch and render updated movie list
            const movies = await fetchMovies();
            renderMovies(movies);
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    };

    // ... (other functions remain unchanged)

    // Event listeners
    addMovieForm.addEventListener("submit", handleFormSubmit);

    // Initial setup
    const init = async () => {
        try {
            // Start JSON server
            await fetch("http://localhost:3000/movies");
            // Fetch movies and render
            const movies = await fetchMovies();
            renderMovies(movies);
            // Remove loading message
            loader.style.display = "none";
            searchStop.style.display = "block";
            movieFormBlock.style.display = "block";

        } catch (error) {
            console.error("Error initializing app:", error);
        }
    };

    // Event listeners
    addMovieForm.addEventListener("submit", handleFormSubmit);
    // Initialize app
    init();
});

