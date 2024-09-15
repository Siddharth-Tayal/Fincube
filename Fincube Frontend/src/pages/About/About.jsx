import React from "react";
import { useNavigate } from "react-router-dom";
const About = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const fincubeToken = localStorage.getItem("fincubeToken");
  const parsedToken = JSON.parse(fincubeToken);
  const token = parsedToken?.value;
  React.useEffect(() => {
    if (isAuthenticated === false && !token) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className=" h-screen w-screen bg-blue-100 flex items-center justify-center">
      About
    </div>
  );
};
export default About;
