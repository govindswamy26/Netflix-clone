import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
function TitleCards({ title, category }) {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2E2N2Y5NmIxMWZhNWRhODNjZTJhYjY2M2JhNGVhOCIsIm5iZiI6MTc1NDQyMjIyOS42MDgsInN1YiI6IjY4OTI1YmQ1N2VjYTBkMzE4NmRiZjk5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JIG9B5GfsDiZPNe-34pYgopqUSQHE-TDCfWOSyg49rE",
    },
  };

  function handleWheel(event) {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results)) // taking results from the api data
      .catch((err) => console.error(err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener("wheel", handleWheel);
    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TitleCards;
