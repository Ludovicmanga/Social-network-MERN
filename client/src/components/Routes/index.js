import React from 'react';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';

export default function index() {
  return (
    <Router>
        <Routes>
            <Route path="/" element = {<Home />}/>
            <Route path="/profil" element = {<Profil />} />
            <Route path="/trending" element = {<Trending />}/>
            <Route path="*" element = {<Navigate to="/" replace />} />
        </Routes>
    </Router>
  )
}
