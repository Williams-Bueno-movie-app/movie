'use strict'

//variable for loading animation
const loader = document.querySelector(".popcorn");

// variables created to group elements together to give them a display:none so that they do not show during loading
const movieListContainer = document.getElementById("movieList");
let searchStop = document.querySelector("#movieForm")
searchStop.style.display = "none";
let movieFormBlock = document.querySelector("#add-movie-form")
movieFormBlock.style.display = "none";
const delay = 2000; // delay time in milliseconds

// timeout set for loading animation
setTimeout(() => {
    loader.style.display = "none";
}, delay);

// function to load all movies
async function loadMovies() {
    try {
        const response = await fetch("http://localhost:3000/movies");
        const movies = await response.json();
        // after getting a response, cards are created with the for of loop below
        let htmlString = "";
        for (let movie of movies) {
            htmlString += "<div class='container'>"
            htmlString += "<div class='card'>";
            htmlString += "<div class='card-body'>";
            htmlString += " <h2 class='card-text movieTitle' class='text'>" + `${movie.title}` + "</h2>";
            htmlString += ` <img src=${movie.poster} alt="poster">`
            htmlString += "<p class='card-text' class='text'>" + ` Movie Rating: ${movie.rating}` + "</p>";
            htmlString += "<button type=button class='btn btn-danger card-textm delete-button' class='text' data-id='" + `${movie.id}` + "'>" + "Delete" + "</button>";
            // htmlString += "<button class='card-textm edit-button' class='text' data-id='" + `${movie.id}` + "'>" + "Edit" + "</button>";

            htmlString += `<button type="button" class="btn btn-primary movieEditButton" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${movie.id}">
                Edit
            </button>`
            htmlString += "</div>";
            htmlString += "</div>";
            htmlString += "</div>";
            // language = html
//             htmlString += `<!-- Button trigger modal -->
// <!-- Modal -->
//                 <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                   <div class="modal-dialog">
//                     <div class="modal-content">
//                       <div class="modal-header">
//                         <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
//                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                       </div>
//                       <div class="modal-body">
//                       <div class="row">
//                       <label>Edit Title</label>
//                           <input id="userEditedTitle" type="text" class="userEditedTitle">
//                       <label>Give Rating</label>
//                           <input id="userEditedRating" type="text" class="userEditedRating">
//
//                        </div>
//                       </div>
//                       <div class="modal-footer">
//                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                         <button type="button" id="saveMovieEditsBtn" class=" btn btn-primary" data-id="${movie.id}">Save changes</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>`
        }
        htmlString = "<div class='card-container'>" + htmlString + "</div>";
        document.getElementById("movie-container").innerHTML = htmlString;

        // Delete button event listener
        const deleteButtons = document.getElementsByClassName('delete-button');
        for (let button of deleteButtons) {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                deleteMovie(id);
            });
        }

        // Edit button event listener
        const editButtons = document.querySelectorAll('.movieEditButton');
        for (let button of editButtons) {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                editMovie(id);

            })
        }
    } catch (error) {
        console.error(error);
    }
}

// async function to search movies
async function searchMovie(searchValue) {
    try {
        const movieData = await fetch("http://localhost:3000/movies");
        const movies = await movieData.json()

        // filters through movies even if lower case is entered
        const filteredMovies = movies.filter(function (movie) {
            return movie.title.toLowerCase().includes(searchValue.toLowerCase());
        });
        // card generates from searched value
        let htmlString = "";
        for (let movie of filteredMovies) {
            htmlString += "<div class='card' style='width: 20rem'>";
            htmlString += "<div class='card-body'>";
            htmlString += " <h2 class='card-text' class='text'>" + `${movie.title}` + "</h2>";
            htmlString += ` <img src=${movie.poster} alt="poster">`

            htmlString += "<p class='card-text' class='text'>" + ` Movie Rating: ${movie.rating}` + "</p>";
            htmlString += "<button class='card-text delete-button' class='text' data-id='" + `${movie.id}` + "'>" + "Delete" + "</button>";
            htmlString += "<button class='card-text edit-button' class='text' data-id='" + `${movie.id}` + "'>" + "Edit" + "</button>";
            htmlString += "</div>";
            htmlString += "</div>";
        }
        htmlString = "<div class='card-container'>" + htmlString + "</div>";
        document.getElementById("movie-container").innerHTML = htmlString;


    } catch (error) {
        console.error("Error searching movies:", error);
        throw error;
    }
}

// async function to delete movie
async function deleteMovie(id) {
    try {
        const fetchMovie = await fetch(`http://localhost:3000/movies/${id}`, {
            method: "DELETE"
        })
        const data = await fetchMovie.json()
        console.log(data)
        const deleteElement = document.querySelector(`.card[data-id="${id}"]`)
        if (deleteElement) {
            deleteElement.remove()
        }
        await loadMovies()

    } catch (error) {
        console.log(error)
    }
};

// Edit movie function
async function editMovie(id) {
    try {
        // Fetch the details of the movie to be edited
        const response = await fetch(`http://localhost:3000/movies/${id}`);
        const movieData = await response.json();
        populateEditForm(movieData)

        //Targeting html values of the edit form
        const userEditedTitle = document.querySelectorAll('.userEditedTitle')
        const userEditedRating = document.querySelectorAll('.userEditedRating')
      document.getElementById("saveMovieEditsBtn").addEventListener(`click`, (event) =>  {
            // Update the movie details using a PUT request

            const updateResponse =  fetch(`http://localhost:3000/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: movieData.id,
                    title: document.getElementById('userEditedTitle').value,
                    rating: document.getElementById('userEditedRating').value,
                    poster: document.getElementById('userEditedPoster').value

                })
            });
           let myEditModal = document.getElementById('exampleModal')
          let myModal = bootstrap.Modal.getOrCreateInstance(myEditModal);
           myModal.hide()
          loadMovies()

        })


        // const updateData = await updateResponse.json();
        // console.log(updateData);
        // Reload movies after editing
        // await loadMovies();
    } catch (error) {
        console.error(error);
    }
}

function populateEditForm (movie) {
    document.getElementById('userEditedTitle').value = movie.title
    document.getElementById('userEditedRating').value = movie.rating
    document.getElementById('userEditedPoster').value = movie.poster
}
document.addEventListener("DOMContentLoaded", () => {
    // const movieListElement = document.getElementById("movies-list");
    const addMovieForm = document.getElementById("add-movie-form");

    // Function to fetch movies from .json
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


    // Function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const rating = document.getElementById("rating").value;
        const poster = document.getElementById("poster").value; // Assuming you have an input field for the poster

        // posts information from add dorm to .json
        try {
            const response = await fetch("http://localhost:3000/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title, rating, poster}),
            });

            const newMovie = await response.json();
            // Fetch and render updated movie list
            const movies = await fetchMovies();
            renderMovies(movies);
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    };

    // Event listeners
    addMovieForm.addEventListener("submit", handleFormSubmit);

    // Initial setup
    const init = async () => {
        try {
            // Start JSON server
            await fetch("http://localhost:3000/movies");

            // Fetch movies and render
            const movies = await fetchMovies();
            console.log(movies)
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

// event listener for search button
document.querySelector(".searchButton").addEventListener("click", function (e) {
    e.preventDefault();
    let movieValue = document.getElementById("movieInput")
    let searchValue = movieValue.value;
    searchMovie(searchValue)
});

// loads all movies as soon as the page begins loading
window.onload = loadMovies;
