import React from 'react';
import './App.css';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { Header } from './Components/Header/Header';
export const App = () =>  {
    return (
      <div className="App">
        <Header/>
        <Dashboard/>
      </div>
    )
}

