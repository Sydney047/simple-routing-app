import { Link, Outlet } from "react-router";
import PostMatches from "./PostMatches";
import ball from './image/football-svgrepo-com.svg';

import './App.css';
import { useState } from "react";

const App = () => {

  const [ match, setMatch ] = useState( '' );

  function handleMatch ( e ) {
    setMatch( e.target.value );
  }

  useState( ()=> {
    
    
    
  })

  return (
    <>
      <header className="header">
        <img src={ ball } alt="This is an image of a ball" /> <h3>The Game</h3> 
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
          <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <p>Search For Matches</p>
      </header>
      { !match.toLowerCase().includes( 'vs' ) && <Outlet /> }
      <input type="text" placeholder="Search match" onInput={ handleMatch } />
      { match.toLowerCase().includes( 'vs' ) && <PostMatches match={ match } /> }
      
    </>
  );
};

export default App;