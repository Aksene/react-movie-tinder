import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import axios from "axios";
import TinderCard from 'react-tinder-card';
import MovieCard from '../components/MovieCard';
import { supabase } from '../database/Database';
import {useAuth} from "../Auth/auth"

function Home() {
    const auth = useAuth()
    const [movies, setMovies] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        if(auth.user){
            fetchMovies()
        }
    }, [auth])

    const fetchMovies = async () => {
        const {data} = await axios.get("https://api.themoviedb.org/3/discover/movie", {
            params:{
                page: Math.random()* 501,
                api_key: "05d6a8fbf9af3d6f7fae90a1b75a3055"
            }
        })

        console.log(data)
        setMovies(data.results)
    }

    const addToWatchlist = async (movie) => {
        const {data, error} = await supabase.from("watchList").insert({movie_id: movie.id, user_id: auth.user.id})

        if(error){
            console.log(error)

        }

        if(data) {
            setMessage("Movie has been added to your watchlist")
        }
    }

    const renderMovies = () => {
        return movies.map(movie => (
            <TinderCard 
                onSwipe={direction => direction === "right" ? addToWatchlist(movie) : null}
                key={movie.id}
            >
                <MovieCard movie={movie} swipe={true}/>
            </TinderCard>
        ))

    }





    return (
        <Layout>
            {message && message}

            <h1>Home</h1>

            <div className="movie-wrapper">
                {!auth.user && <h2> Please sign up!</h2>}
                {renderMovies()}
            </div>
            
        </Layout>
    )
}

export default Home
