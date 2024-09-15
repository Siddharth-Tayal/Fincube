import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import { useNavigate } from "react-router-dom";
const Exchanges = ({ isAuthenticated }) => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/exchanges`
        );
        // console.log(data);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);
  const fincubeToken = localStorage.getItem("fincubeToken");
  const parsedToken = JSON.parse(fincubeToken);
  const token = parsedToken?.value;
  React.useEffect(() => {
    if (isAuthenticated === false && !token) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (error) return <Error message={"exchanges"} />;
  return (
    <div className=" flex">
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack
            wrap={"wrap"}
            justifyContent={"center"}
            marginBlockStart={"70px"}
          >
            {exchanges.map((i) => {
              return (
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  image={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                />
              );
            })}
          </HStack>
        </>
      )}
    </div>
  );
};
const ExchangeCard = ({ key, name, image, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"xl"}
        transition={"all 0.3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={image}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt="Exchanges"
        />
        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};
export default Exchanges;
