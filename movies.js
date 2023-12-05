'use strict'

function generateMovies() {

    const loader = document.getElementsByClassName("spinner")[0];

    const delay = 5000; // delay time in milliseconds

    loader.style.display = "block"

    fetch('http://localhost:3000/movies')

        .then(response => response.json())
        .then(movies => {
            console.log(movies)
        })
        .catch(error => console.error(error));

    setTimeout(() => {
        loader.style.display = "none";
    }, delay);
}
function createPoster() {
    const movieTitle = ""; // Replace 'your_movie_title' with the actual movie title
    const posterUrl = `http://img.omdbapi.com/?apikey=${MOVIE_API_KEY}&t=${movieTitle}`;

    fetch(posterUrl)
        .then(response => response.json())
        .then(posterData => {
            console.log(posterData);
            // Handle the poster data as needed
        })
        .catch(error => console.log(error));
}

    generateMovies()
    createPoster()
