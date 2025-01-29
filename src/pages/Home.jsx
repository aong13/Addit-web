import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { response_hot } from "../assets/DummyData_home";
import styled from "styled-components";

const Home = () => {
  const [hotData, setHotData] = useState([]);

  useEffect(() => {
    setHotData(response_hot.data.relays || []);
  }, []);

  return (
    <div>
      Home
      <Carousel data={hotData} />
    </div>
  );
};

export default Home;
