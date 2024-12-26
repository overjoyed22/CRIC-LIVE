

import React, { useEffect, useState } from "react";
import circle from "./circle.png";

const CricketScore = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(
        "https://api.cricapi.com/v1/cricScore?apikey=8945c3f1-680e-4f8a-af74-21872e7ce8d0"
      );
      const data = await response.json();
      console.log(data);
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value.toLowerCase()); // Convert input to lowercase for case-insensitive search
  };

  return (
    <div className="main-container">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search Match, Series, or Team"
          onChange={handleInput}
          value={search}
        />
      </div>
      <div className="heading">
        <img src={circle} alt="logo" />
        <p>CRIC-LIVE</p>
      </div>

      <div className="container">
        {data && data.length > 0 ? (
          data
            .filter((curVal) => {
              const { series, t1, t2, status } = curVal;

              // Only show matches that are not "Match not started"
              if (status === "Match not started") return false;

              // Check if search matches series, team 1, or team 2
              return (
                series.toLowerCase().includes(search) ||
                t1.toLowerCase().includes(search) ||
                t2.toLowerCase().includes(search)
              );
            })
            .map((curVal, index) => (
              <div className="card" key={index}>
                <h3>{curVal.series}</h3>
                <h3>{curVal.matchType}</h3>
                <div className="img">
                  <div>
                    <img src={curVal.t1img} alt={curVal.t1} />
                    <p>{curVal.t1}</p>
                    <p>{curVal.t1s}</p>
                  </div>
                  <div>
                    <img src={curVal.t2img} alt={curVal.t2} />
                    <p>{curVal.t2}</p>
                    <p>{curVal.t2s}</p>
                  </div>
                </div>
                <p className="status">Status: {curVal.status}</p>
              </div>
            ))
        ) : (
          <p>Data Not Found!</p>
        )}
      </div>
    </div>
  );
};

export default CricketScore;
