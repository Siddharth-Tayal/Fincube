import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "./Chart";
import {
  Container,
  HStack,
  VStack,
  Image,
  Text,
  Box,
  Radio,
  RadioGroup,
  // Center,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
const CoinDetails = ({ isAuthenticated }) => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartsArray, setChartArray] = useState([]);
  const navigate = useNavigate();
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const params = useParams();
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchchartStata = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;

      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
    }
  };
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${params.id}`
        );
        const { data: chartdata } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        console.log(chartdata);
        setCoin(data);
        setChartArray(chartdata.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);
  const fincubeToken = localStorage.getItem("fincubeToken");
  const parsedToken = JSON.parse(fincubeToken);
  const token = parsedToken?.value;
  React.useEffect(() => {
    if (isAuthenticated === false && !token) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (error) return <Error />;
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <RadioGroup
            marginBlockStart={"70px"}
            value={currency}
            p={"8"}
            onChange={setCurrency}
          >
            <HStack>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>
          <Box width={"full"} h={"auto"} borderWidth={1}>
            <Chart arr={chartsArray} currency={currencySymbol} days={days} />
          </Box>
          <HStack p={"4"} overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                key={i}
                onClick={() => {
                  switchchartStata(i);
                }}
              >
                {i}
              </Button>
            ))}
          </HStack>
          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text alignSelf={"center"} opacity={"0.7"} fontSize={"small"}>
              LAST UPDATED ON{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image
              src={coin.image.large}
              w={"20"}
              h={"20"}
              objectFit={"contain"}
              alignSelf={["center", "flex-start"]}
            />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol} {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <Custombar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />
          </VStack>
          <Box w={"full"} p={"8"}>
            <Item title={"Max Supply"} value={coin.market_data.max_supply} />
            <Item
              title={"Circulating Supply"}
              value={coin.market_data.circulating_supply}
            />
            <Item
              title={"Market Capital"}
              value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
            />{" "}
            <Item
              title={"All time Low"}
              value={`${currencySymbol}${coin.market_data.atl[currency]}`}
            />{" "}
            <Item
              title={"All time High"}
              value={`${currencySymbol}${coin.market_data.ath[currency]}`}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

const Custombar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme="teal" w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={"sm"}>24h Range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);
const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"} shadow={"lg"}>
    <Text fontFamily={" Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);
export default CoinDetails;
