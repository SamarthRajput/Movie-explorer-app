import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export const FrontPage = () => {
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState("");


    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=dc546324c2e753395f059e88aa660e1c')
        .then(response => setMovies(response.data.results));
    }, []);

    const filteredMovies = movies.filter(movie => 
        movie.title[0].toLowerCase().includes(filter)
    )

    return (

        <div>
            <div className="input-field">
                <form action="">
                    <input type="text" name="" id="" onChange={(e) => {
                        setFilter(e.target.value)
                    }} />
                </form>
            </div>
            <h2>Movie finder</h2>
            <div>
                {filteredMovies.map(movie => (
                    <Link key={movie.id} to={`./movies/${movie.id}`}>
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>Rating: {movie.vote_average}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}