import React,{ useEffect, useState} from 'react'
import Layout from '../components/Layout'
import { supabase } from '../database/Database'
import { useAuth } from '../Auth/auth'
import axios from 'axios'
import MovieCard from '../components/MovieCard'

const Watchlist = () => {
    const auth = useAuth();
    const [movies, setMovies] = useState([])

    const getWatchlist = async () => {
        let movies = [];
        const {data, error} = await supabase
            .from("watchList")
            .select()
            .match({user_id: auth.user.id})

        if(error){
            console.log(error)
        }
        if(data){
            // console.log(data)

            for(const movie of data){
                const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movie.movie_id}`, {
                    params: {
                        api_key: "05d6a8fbf9af3d6f7fae90a1b75a3055"
                    }
                })

                movies.push(data)
            }

            console.log("Here's your watchlist: ")
            console.log(movies)
            setMovies(movies)
        }
    }

    useEffect(() => {
        getWatchlist()
    })

    const removeFromWatchList = async(id) => {
        const {data, error} = await supabase
            .from("watchList")
            .delete()
            .match({movie_id: id, user_id: auth.user.id})

            if(error){
                console.log(error)
            }
            if(data) {
                getWatchlist()
            }
    }

    const renderWatchlist = () => {
        return movies.map(movie => (
            <div>
                <MovieCard movie={movie}/>
                <button className="button" onClick={() => removeFromWatchList(movie.id)}>Remove from Watchlist</button>
            </div>
        ))
    }

    return (
        <Layout>
            <h1>Protected Watchlist Page</h1>

            <div className="grid">
                {renderWatchlist()}
            </div>

        </Layout>
    )
}

export default Watchlist
