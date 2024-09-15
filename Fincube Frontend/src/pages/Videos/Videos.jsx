import { useStatStyles } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Videos({ isAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fincubeToken = localStorage.getItem("fincubeToken");
  const parsedToken = JSON.parse(fincubeToken);
  const token = parsedToken?.value;
  React.useEffect(() => {
    if (isAuthenticated === false && !token) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log("fetching");
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/user/videos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        setError(false);
        console.log("data", data);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className=" h-screen w-screen flex flex-col items-center justify-center">
      Videos
    </div>
  );
}

export default Videos;
