import React from "react";
import { Typography } from "@mui/material";
const ServiceCard = ({ image, text }) => {
  return (
    <div className="flex items-center justify-center relative h-[175px] w-[90vw] md:h-[200px] md:w-[300px] m-5 text-center">
      <div
        className=" h-[100%] w-[100%] bg-blue-600 bg-cover bg-center bg-blend-multiply"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>{" "}
      <Typography position={"absolute"} color={"white"} variant="h3">
        {text}
      </Typography>
    </div>
  );
};

export default ServiceCard;
