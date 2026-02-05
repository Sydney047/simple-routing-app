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
                    Highlights
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