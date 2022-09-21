import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { globalContext } from "../App";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from "axios";
import { useRef } from "react";
import "./Upcoming.css";

function App() {
  const{func,API_KEY}=useContext(globalContext)

  const [data, setData] = useState([]);
  const settings = {
    dots: false,
    autoplay: true,
    speed: 300,
    infinite: true,
    slidesToShow: 9,
    slidesToScroll: 1,
  };
  const sliderRef = useRef(null);

  function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
  }
  let page = generateRandomInteger(5);


  useEffect(() => {
  
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&${page}&include_adult=true`
      )
      .then((res) => {
        setData(res.data.results);
      });
  },[]);
  // console.log(ID)
  return (
    <div className="main_ctr">
      <h2>Upcoming on Netflix</h2>
      <div className="container">
        <MdChevronLeft
          className="lft_btn arrow_btn"
          size={"3rem"}
          onClick={() => sliderRef.current.slickPrev()}
        />
        <div className="inner_ctr">
          <Slider {...settings} ref={sliderRef}>
            {data.map((item) => {
              return (
                <div  className="img_bx" key={item.title}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                    alt=""
                    onClick={()=>func(item?.title,item?.overview,item?.release_date,item?.backdrop_path)}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <MdChevronRight
          className="rght_btn arrow_btn"
          onClick={() => sliderRef.current.slickNext()}
          size={"3rem"}
        />
      </div>
    </div>
  );
}

export default App;
