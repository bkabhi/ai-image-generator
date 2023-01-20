import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './pages'

const App = () => {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default App