'use strict';

function generateMovies() {
    const loader = document.getElementsByClassName("popcorn")[0];
    const movieListContainer = document.getElementById("movieList"); // Assuming you have a container with id="movieList"

    const delay = 5000; // delay time in milliseconds

    loader.style.display = "block";

    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(movies => {
            // Assuming movies is an array of objects with properties like 'title' and 'description'
            renderMovies(movies);
        })
        .catch(error => console.error(error))
        .finally(() => {
            // Ensure the loader is hidden even in case of an error
            setTimeout(() => {
                loader.style.display = "none";
            }, delay);
        });

    function renderMovies(movies) {
        // Clear existing content
        movieListContainer.innerHTML = '';

        // Iterate through movies and create HTML elements
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.innerHTML = `
                <h2>${movie.title}</h2>
                <p>${movie.description}</p>
                <!-- Add more details as needed -->

                <hr>
            `;
            movieListContainer.appendChild(movieElement);
        });
    }
}

generateMovies();

