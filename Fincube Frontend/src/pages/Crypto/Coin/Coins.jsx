import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinCard from "./CoinCard";
import { Button, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import { useNavigate } from "react-router-dom";

const Coins = ({ isAuthenticated }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const navigate = useNavigate();
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const changePage = (page) => {
    setPages(page);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${pages}&sparkline=false`
        );
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, pages]);
  const fincubeToken = localStorage.getItem("fincubeToken");
  const parsedToken = JSON.parse(fincubeToken);
  const token = parsedToken?.value;
  React.useEffect(() => {
    if (isAuthenticated === false && !token) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const pgArray = new Array(100).fill(1);
  if (error) return <Error message={"coins"} />;
  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <div className=" mt-[70px]">
          <RadioGroup value={currency} p={"8"} onChange={setCurrency}>
            <HStack>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>
          <div className=" flex items-center justify-center gap-4 flex-wrap">
            {coins.map((i) => {
              return (
                <CoinCard
                  key={i.id}
                  id={i.id}
                  name={i.name}
                  image={i.image}
                  symbol={i.symbol}
                  url={i.url}
                  price={i.current_price}
                  currency={currencySymbol}
                />
              );
            })}
          </div>
          <div className=" flex items-center px-9 pb-9 gap-3 overflow-x-scroll">
            {pgArray.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                className=" p-2 rounded-sm"
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Coins;
