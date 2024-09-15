import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SIP = ({ isAuthenticated }) => {
  const [result, setResult] = useState(null);
  const [monthInv, setMonthInv] = useState(0);
  const [rate, setRate] = useState(0);
  const [year, setYear] = useState(0);
  const navigate = useNavigate();
  function calculateSIP(monthlyInvestment, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    let futureValue = 0;

    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
    }
    setResult(futureValue.toFixed(2));
  }
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <div className=" flex flex-col items-center justify-center h-screen w-screen gap-4">
      <h1 className=" text-3xl">SIP Calculator</h1>{" "}
      <h1 className="  text-start w-[350px]">Monthly Investment</h1>
      <input
        type="number"
        id="monthlyInvestment"
        className=" p-3 w-[350px] rounded-md border"
        placeholder="Enter monthly investment"
        onChange={(e) => setMonthInv(e.target.value)}
      />{" "}
      <h1 className="  text-start w-[350px]">Rate of Intreset</h1>
      <input
        type="number"
        id="annualRate"
        className=" p-3 w-[350px] rounded-md border"
        placeholder="Enter annual rate of interest"
        onChange={(e) => setRate(e.target.value)}
      />{" "}
      <h1 className="  text-start w-[350px]">Total Years</h1>
      <input
        type="number"
        className=" p-3 w-[350px] rounded-md border"
        id="years"
        placeholder="Enter number of years"
        onChange={(e) => setYear(e.target.value)}
      />
      <button
        className="p-3 w-[350px] bg-blue-500 text-white rounded-md"
        onClick={() => calculateSIP(monthInv, rate, year)}
      >
        Calculate
      </button>
      {result && (
        <h1 className=" w-[350px] rounded-md bg-green-500 text-white p-3">
          Total Amount : {" " + result}
        </h1>
      )}
    </div>
  );
};

export default SIP;
