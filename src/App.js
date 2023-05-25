import React, { useState,useRef } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movielist, setmovielist] = useState([]);
  const [isloading,setisloading] = useState(false)
  const [error,seterror] =useState(null)
  

  async function FetchMoviesHandler() {
    seterror(null)
    setisloading(true)
    try {
    const Response = await fetch("https://swapi.dev/api/film/");
    if(!Response.ok){
      throw new Error("Something Went Wrong") 
    }
    const data = await Response.json();
    const transformeddata = data.results.map((moviedata) => {
      return {
        id: moviedata.episode_id,
        title: moviedata.title,
        openingText: moviedata.opening_crawl,
        releaseDate: moviedata.release_date,
      };
    });
    
    setmovielist(transformeddata);
    } catch (error) {
      setisloading(false)
      seterror(error.message)
      setTimeout(FetchMoviesHandler,5000)
      
      
    }
    
    setisloading(false)
  }


  let content = <p>Found No Movies</p>
  
  if(movielist.length >0){
    content = <MoviesList movies={movielist}/>
  }
  if(error){
    content = <><p>{`${error} Retrying...`}</p>
    <button onClick={clearTimeout}>Cancel</button>
    </>
  }
  if(isloading){
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}

      </section>
    </React.Fragment>
  );
}

export default App;
