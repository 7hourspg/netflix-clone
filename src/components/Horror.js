import React, { useState, useEffect,useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Popular.css";
import { globalContext } from "../App";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from "axios";
import { useRef } from "react";
function Popular() {
  const{func,API_KEY}=useContext(globalContext)
  const [data, setData] = useState([]);
  const settings = {
    dots: false,
    autoplay: true,
    speed: 300,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  const sliderRef = useRef(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=Horror&page=${1}`
      )
      .then((res) => {
        setData(res.data.results);
      });
  }, []);
  return (
    <div className="main_ctr">
      <h2>Horror</h2>
      <div className="container">
        <MdChevronLeft
          className="lft_btn arrowP_btn"
          size={"3rem"}
          onClick={() => sliderRef.current.slickPrev()}
        />
        <div className="inner_ctr">
          <Slider {...settings} ref={sliderRef}>
            {data.map((item) => {
              return (
                <div className=" popular_img_bx" key={item.title}>
                  <div className="m_box" onClick={()=>func(item?.title,item?.overview,item?.release_date,item?.backdrop_path)}>
                    <div className="m_title">
                      <p>{item.title}</p>
                    </div>
                  </div>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                    alt=""
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <MdChevronRight
          className="rght_btn arrowP_btn"
          onClick={() => sliderRef.current.slickNext()}
          size={"3rem"}
        />
      </div>
    </div>
  );
}

export default Popular;
