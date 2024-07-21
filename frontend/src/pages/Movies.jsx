import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const Movies = () => {

    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=dc546324c2e753395f059e88aa660e1c`)
        .then(response => setMovie(response.data))
    }, [id]);

    return (
        <>
         {movie ? (
                <div>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                    <p>Cast: {movie.credits}</p>
                    <p>Release Date: {movie.release_date}</p>
                    <p>Rating: {movie.vote_average}</p>
                    <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
                </div>
         ) : (
            <p>Loading...</p>
        )}
        </>
    )
}