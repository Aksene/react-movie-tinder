import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signin from './pages/Signin'
import Home from './pages/Home'
import {AuthProvider} from './Auth/auth'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import Watchlist from './pages/Watchlist'

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path={"sign-in"} element={<Signin/>}/>
        <Route path={"watchlist"} element={<ProtectedRoute> <Watchlist/> </ProtectedRoute>}/>
        <Route path={"Profile"} element={<ProtectedRoute> <Profile/> </ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);