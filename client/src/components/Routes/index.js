import React from 'react';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Navbar from '../Navbar';

export default function index() {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element = {<Home />}/>
            <Route path="/profil" element = {<Profil />} />
            <Route path="/trending" element = {<Trending />}/>
            <Route path="*" element = {<Navigate to="/" replace />} />
        </Routes>
    </Router>
  )
}
