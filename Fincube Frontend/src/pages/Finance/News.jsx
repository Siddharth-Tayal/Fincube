import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Home = ({ isAuthenticated }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo`
        );
        console.log(data.feed);
        setNewsData(data.feed);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchNews();
  }, [loading, error]); const fincubeToken = localStorage.getItem("fincubeToken");
  const parsedToken = JSON.parse(fincubeToken);
  const token = parsedToken?.value;
  React.useEffect(() => {
    if (isAuthenticated === false && !token) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (error === true) return <h1>Error</h1>;
  else
    return (
      <Fragment>
        {loading ? (
          <h1>Loading....</h1>
        ) : (
          <div className=" pt-[80px] md:pt-[120px] flex-1 flex flex-col items-center justify-center gap-7">
            <Typography variant="h5">Finance Related News</Typography>
            <div className=" flex flex-wrap gap-4  items-center justify-center">
              {newsData.map((item, index) => (
                <NewsCard key={index} data={item} />
              ))}
            </div>
          </div>
        )}
      </Fragment>
    );
};

export default Home;
