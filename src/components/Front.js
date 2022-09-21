import React, { useEffect, useState, useContext } from "react";
import "./Front.css";
import { globalContext } from "../App";
import img from "../pngegg.png";
import axios from "axios";

function Front() {
  const { frontData,API_KEY } = useContext(globalContext);
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];
 
  function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  let page = generateRandomInteger(10);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=true`
      )
      .then((res) => {
        setMovies(res.data.results);
      });

    // console.log(page);
  }, [frontData]);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const titlecateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  //  console.log(frontData,'From front');
  return (
    <>
      <div className="front_ctr">
        <img
          className="img"
          src={
            frontData[0]
              ? `https://image.tmdb.org/t/p/original/${frontData[3]}`
              : `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
          }
          alt=""
        />
        <div className="header">
          <div className="header_lft">
            <img src={img} alt="" />
          </div>
          <div className="header_rght">
            <button className="login btn">Log In</button>
            <button className="signup btn">sign Up</button>
          </div>
        </div>
        <div className="content_ctr">
          <div className="hdr_txtbtn">
            <h1>
              {frontData[0] ? frontData[0] : titlecateString(movie?.title, 30)}
            </h1>
            <button className="play">Play</button>
            <button className="watchltr">Watch Later</button>
          </div>
          <div className="detail">
            <p className="relase">
              {frontData[0] ? frontData[2] : movie?.release_date}
            </p>
            <p className="story">
              {frontData[0]
                ? truncateString(frontData[1], 150)
                : truncateString(movie?.overview, 150)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Front;
