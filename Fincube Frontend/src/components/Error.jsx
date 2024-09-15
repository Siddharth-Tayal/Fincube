import { ErrorOutline } from "@mui/icons-material";
import React from "react";
import "./style.css";
import { Alert } from "@mui/material";
const Error = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[25px] h-screen w-screen">
      <div className=" font-bold text-[100px]">
        <ErrorOutline color="error" fontSize="inherit" />
      </div>
      Error in fetching the {message}...
    </div>
  );
};

export default Error;
