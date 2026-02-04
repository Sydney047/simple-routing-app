import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function PostMatches ( { match = "Arsenal vs Chelsea" } ) {
    const [ game, setGame ] = useState( '' );
    const [ error, setError ] = useState( false );

    function handleError() {
        setError( !error );
    }

    function splitInput () {
        const splittedMatch = match.split( 'vs' );
        return splittedMatch;
    }

    useEffect( ()=>{
      // we are going to add loading here
      const input = splitInput()

      const url = 'https://www.thesportsdb.com/api/v1/json/123/searchevents.php?e=' + input[0] + 'vs' + input[1];

      async function fetchData() {
        try {
            const response = await fetch( url );
            if ( ! response.ok ) {
                console.log( "Something went wrong" );
                handleError();
            } else {
                const data = await response.json();
                console.log( data );
                setGame( data );
            }
             
        } catch ( error ) {
            console.log( 'Something went wrong ' + error );
            handleError();
            
        }
        
      } 
      // stop the loading animation
      fetchData();
      
        
    }, [ match ])

    if ( !( game === ( '' ) ) ) {
        return (<>
            <div className="searchResults" >
                <header>
                    <h2>{ game.event[0].strLeague }</h2> 
                    <img src={ game.event[0].strLeagueBadge } alt="League badge here" className="leagueBadge" />
                </header>
                <div className="home team">
                    <img src={ game.event[0].strHomeTeamBadge } alt="Home Team Badge" />
                    <h3>{ game.event[0].strHomeTeam }</h3>
                </div>
                <div className="scores">
                    <h1>{ game.event[0].intHomeScore } - { game.event[0].intAwayScore }</h1>
                </div>
                <div className="away team">
                    <img src={ game.event[0].strAwayTeamBadge } alt="Away Team Badge" />
                    <h3>{ game.event[0].strAwayTeam }</h3>
                </div>
                <footer>
                    <p><b>Venue: { game.event[0].strVenue } | Match Date: { game.event[0].dateEvent }</b></p>
                    <p><b>Status: { game.event[0].strStatus }</b></p>
                </footer>
                { !( game.event[0].strVideo === ( '' || null ) ) && 
                <button><a href={ game.event[0].strVideo } >
                    <svg viewBox="0 0 48 48" version="1.1" id="Shopicons" xmlns="http://www.w3.org/2000/svg" x="0" y="0" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style></style> <g id="youtube_00000103975802115179222730000012269648027945476753_"> 
                    <path d="M0 .011h48v48H0v-48z" fill="none"></path> <path d="M24 38.519c-1.171 0-11.525-.022-14.481-.815a6.474 6.474 0 0 1-4.574-4.574c-.807-3.007-.815-8.872-.815-9.12s.009-6.113.815-9.12a6.484 6.484 0 0 1 4.575-4.575c2.955-.793 13.309-.816 14.48-.816s11.525.022 14.482.815a6.481 6.481 0 0 1 4.574 4.574v.001h.001c.805 3.007.813 8.871.813 9.119s-.009 6.113-.814 9.12a6.48 6.48 0 0 1-4.576 4.575c-2.955.793-13.309.816-14.48.816z"></path> 
                    <path d="M20.887 29.986a1 1 0 0 1-1-1v-9.953a.998.998 0 0 1 1.5-.866l8.619 4.977a1 1 0 0 1 0 1.732l-8.619 4.977a1.012 1.012 0 0 1-.5.133z" fill="#ffffff"></path> </g> </g></svg> 
                    Watch Highlights
                </a></button>}
            </div>
        </>)
    }

    return(<>
        { error && 
        <div>
            <h2>Ooops... Failed to fetch data</h2>
            <h3><Link to='/' onClick={ handleError }>Click here to go back</Link></h3>

        </div>}
    </>)

}