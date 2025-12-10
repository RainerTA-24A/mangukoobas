import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'
import TicTacToe from './Tic-Tac-Toe/Tic';
//import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        {/* 1. Juurmarsruut: Kui URL on ainult "/" */}
        <Route path='/' element = {<HomePage/>} />
        {/* 2. Mängu marsruut: Kui URL on "/tictactoe" */}
        <Route path='/tictactoe' element = {<TicTacToe/>} />
        {/* 3. 404 Leht */}
        <Route path='*' element = {<h1>404: Lehte ei leitud</h1>} />
      </Routes>
    </div>
  )
};

export default App; 