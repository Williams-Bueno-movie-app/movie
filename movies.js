'use strict';

function generateMovies() {
    const loader = document.querySelector(".popcorn");
    const movieListContainer = document.getElementById("movieList");

    const delay = 2000; // delay time in milliseconds

    setTimeout(() => {
        loader.style.display = "none";
    }, delay);

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

    document.getElementById('movieForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const movieValue = document.getElementById('movieInput').value;

        if (movieValue.trim() !== '') {

            const apiUrl = `http://www.omdbapi.com/?apikey=${MOVIES_API_KEY}&s=${encodeURIComponent(movieValue)}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Process the response data
                    if (data.Response === 'True') {
                        // Movies found
                        renderMovies(data.Search);
                        // console.log(data.Search[0].Poster)
                    } else {
                        // No movies found or an error occurred
                        console.error(data.Error);
                    }
                })
                .catch(error => console.error('Error fetching data:', error))

        } else {
            // Handle the case when the input is empty
            console.error('Please enter a movie title');
        }
    });
}

generateMovies();

function addMovie() {
    // Retrieve values from the form
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let year = document.getElementById('year').value;

    // Create a new movie card element
    let movieContainer = document.getElementById('movie-container');
    let newMovieCard = document.createElement('div');
    newMovieCard.classList.add('col-md-4');
    newMovieCard.innerHTML = `
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <p class="card-text">Year: ${year}</p>
                <button class="btn btn-danger" onclick="deleteMovie(this)">Delete</button>
            </div>
        </div>
    `;

    // Append the new movie card to the movie container
    movieContainer.appendChild(newMovieCard);

    // Example of usage
    const newMovieData = {
        title: title,
        description: description,
        year: year
    };

    createMovie(newMovieData)
        .then(newMovie => {
            console.log('New movie added:', newMovie);
            // Update your UI or perform additional actions as needed
        })
        .catch(error => console.error('Error creating movie:', error));
}

// function deleteMovie(button) {
//     // Traverse the DOM to remove the entire movie card
//     let movieCard = button.parentNode.parentNode.parentNode; // Assuming structure: button -> div.card-body -> div.card -> movie card itself
//     movieCard.remove();
// }

async function createMovie(movie) {
    try {
        const url = 'http://localhost:3000/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        };
        const response = await fetch(url, options);
        const newMovie = await response.json();
        // console.log(newMovie)
        return newMovie;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to handle it outside
    }
}

function deleteMovie(button) {
    let movieCard = button.parentNode.parentNode.parentNode;
    let movieTitle = movieCard.querySelector('.card-title').innerText;

    // Example of usage
    deleteMovieOnServer(movieTitle)
        .then(deletedMovie => {
            console.log('Movie deleted:', deletedMovie);
            // Remove the movie card from the UI
            movieCard.remove();
        })
        .catch(error => console.error('Error deleting movie:', error));
}

