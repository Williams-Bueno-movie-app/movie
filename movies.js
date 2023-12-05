'use strict'
function generateMovies(){
    const loader = document.getElementsByClassName(".spinner")


    fetch('http://localhost:3000/movies')

        .then(response => response.json())
        .then(movies => {
            console.log(movies)
        })
        .then(loader => {
            loader.style.display = "block"
            loader.style.display = "none"

    })

        .catch(error => console.error(error));

    console.log(generateMovies())
}