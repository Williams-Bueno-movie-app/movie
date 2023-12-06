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


        } else
    {
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
        let rating = document.getElementById('rating').value;

        // Create a new movie card element
        let movieContainer = document.getElementById('movie-container');
        let newMovieCard = document.createElement('div');
        newMovieCard.classList.add('col-md-4');
        newMovieCard.innerHTML = `
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <p class="card-text">Rating: ${rating}</p>
                <button class="btn btn-danger" onclick="deleteMovie(this)">Delete</button>
            </div>
        </div>
    `;

        // Append the new movie card to the movie container
        movieContainer.appendChild(newMovieCard);
    }

    function deleteMovie(button) {
        // Traverse the DOM to remove the entire movie card
        let movieCard = button.parentNode.parentNode.parentNode; // Assuming structure: button -> div.card-body -> div.card -> movie card itself
        movieCard.remove();
    }

