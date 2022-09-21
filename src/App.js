import React,{useState} from "react";
import Front from "./components/Front";
import Popular from "./components/Popular";
import Horror from "./components/Horror";
import Upcoming from "./components/Upcoming";
import Trending from "./components/Trending";
import Hindi from "./components/Hindi";
import "./App.css";
import { createContext } from "react";
export const globalContext = createContext();

function App() {
  const [getData, setGetData] = useState([])
  const getNewData=(...item)=>{
    setGetData(item)
  }
  const API_KEY=process.env.REACT_APP_API_KEY
  return (
    <>
      <globalContext.Provider value={{func:getNewData,frontData:getData,API_KEY:API_KEY}}>
        <Front />
        <Upcoming />
        <Hindi />
        <Popular />
        <Trending />
        <Horror />
      </globalContext.Provider>
    </>
  );
}

export default App;
