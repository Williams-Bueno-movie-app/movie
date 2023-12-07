'use strict';

function generateMovies() {
    const loader = document.querySelector(".popcorn");
    const movieListContainer = document.getElementById("movieList");

    const delay = 2000; // delay time in milliseconds

    setTimeout(() => {
        loader.style.display = "none";
    }, delay);
}
    function renderMovies(movies) {
        // Clear existing content
        movieListContainer.innerHTML = '';

        // Iterate through movies and create HTML elements
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.innerHTML = `
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
                <img src="${movie.Poster}" alt="${movie.Title} Poster">
                <!-- Add more details as needed -->
                <hr>
            `;
            movieListContainer.appendChild(movieElement);
        });
    }

    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(movie => {
            console.log(movie);
        })
        .catch(error => console.error(error));
