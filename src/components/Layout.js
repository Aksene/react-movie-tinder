import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Auth/auth';
import '../App.css'

const Layout = ({children}) => {
    const auth = useAuth();

    return (
        <div>
            {/* Navbar */}
            <header className={"header"}>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    {/* Logic to display Sign-in when user is signed out &a vice-versa */}
                    {auth.user ? 
                        <>
                            <li>
                                <Link to={"/profile"}>Profile</Link>
                            </li>  
                            <li>
                                <Link to={"/watchlist"}>Watchlist</Link>
                            </li>
                            <li>
                                <button onClick={auth.logout} to={"/log-out"}>Log-out</button>
                            </li>
                        </>
                        :
                        <li>
                            <Link to={"/sign-in"}>Sign-in</Link>
                        </li>
                    }
                    

                </ul>
            </header>

            {/* Body */}
            <main className={"container"}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
