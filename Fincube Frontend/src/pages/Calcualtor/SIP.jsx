import React from "react";

const SIP = ({ isAuthenticated }) => {
  function calculateSIP(monthlyInvestment, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    let futureValue = 0;

    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
    }

    return futureValue.toFixed(2);
  }
  return (
    <div className=" flex flex-col items-center justify-center h-screen w-screen">
      <h1>SIP Calculator</h1>
      <input
        type="number"
        id="monthlyInvestment"
        placeholder="Enter monthly investment"
      />
      <input
        type="number"
        id="annualRate"
        placeholder="Enter annual rate of interest"
      />
      <input type="number" id="years" placeholder="Enter number of years" />
      <button onClick={() => alert(calculateSIP(50, 2, 5))}>Calculate</button>
    </div>
  );
};

export default SIP;
