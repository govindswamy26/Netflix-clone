import React, { useState, useEffect } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

function Player(props) {
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2E2N2Y5NmIxMWZhNWRhODNjZTJhYjY2M2JhNGVhOCIsIm5iZiI6MTc1NDQyMjIyOS42MDgsInN1YiI6IjY4OTI1YmQ1N2VjYTBkMzE4NmRiZjk5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JIG9B5GfsDiZPNe-34pYgopqUSQHE-TDCfWOSyg49rE",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/755898/videos?language=en-US",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]); // Only set if there's a result
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="back" />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player;
