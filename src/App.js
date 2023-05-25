import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movielist, setmovielist] = useState([]);
  const [isloading,setisloading] = useState(false)
  async function FetchMoviesHandler() {
    setisloading(true)
    const Response = await fetch("https://swapi.dev/api/films/");
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
    setisloading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && <MoviesList movies={movielist} />}
        {!isloading && movielist.length===0 && <p>Found No movies</p>}
        {isloading && <p>Loading...</p>}

      </section>
    </React.Fragment>
  );
}

export default App;
