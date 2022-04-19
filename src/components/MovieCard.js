import React from 'react'
import "../App.css"

const MovieCard = ({movie, swipe}) => {
    return (
        <div className={`movie ${swipe ? "swipe" : ""}`}>
            {console.log("MovieCard has been called")}
            {movie.poster_path ?
                <div>
                    <h3>{movie.title}</h3>
                    <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title}/>
                </div>
            : "no image"}
        </div>
    );
}

export default MovieCard;
