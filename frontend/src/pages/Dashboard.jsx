import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"

export const Dashboard = () => {

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function favoriteMovies(){
            try {
                const response = await axios.get("http://localhost:3000/api/movies/favorites" , {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setFavorites(response.data);
                setLoading(false);
            }
            catch{(error) => {
                console.log(error);
            }
            }
        };
        favoriteMovies();
    }, []);

    const handleAddFavorite = async (movieId, title) => {
        const response = await axios.post("http://localhost:3000/api/movies/favorites", {
            movieId,  title}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
        
        setFavorites([...favorites, response.data]);
    };

    const handleRemoveFavorites = async (movieId) => {
        axios.delete(`http://localhost:3000/api/movies/favorites/${movieId}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });

        setFavorites(favorites.filter(movie => movie.movieId !== movieId));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    }

    return (
        <div>
             <h1>Your Favorite Movies</h1>
         <ul>
        {favorites.map(movie => (
          <li key={movie.movieId}>
            {movie.title}
            <button onClick={() => handleRemoveFavorites(movie.movieId)}>Remove</button>
          </li>
        ))}
        </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}