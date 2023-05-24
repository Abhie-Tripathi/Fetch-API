import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movielist, setmovielist] = useState([]);
  async function FetchMoviesHandler() {
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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movielist} />
      </section>
    </React.Fragment>
  );
}

export default App;
