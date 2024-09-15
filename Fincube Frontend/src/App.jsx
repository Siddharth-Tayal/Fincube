import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import About from "./pages/About/About";
import Coins from "./pages/Crypto/Coin/Coins";
import CoinDetails from "./pages/Crypto/Coin/CoinDetails";
import Exchanges from "./pages/Crypto/Exchanges/Exchanges";
import Fraud from "./pages/Fraud/FraudCheck";
import FinanceNews from "./pages/Finance/News.jsx";
import Login from "./pages/Authentication/Login.jsx";
import Register from "./pages/Authentication/Register.jsx";
import axios from "axios";
import Loader from "./components/Loader.jsx";
import SIP from "./pages/Calcualtor/SIP.jsx";
import Videos from "./pages/Videos/Videos.jsx";
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const accessToken = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/user/verifyToken");
      setAuthenticated(true);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setAuthenticated(false);
    }
  };

  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("light");
  const defaultTheme = createTheme({ palette: { mode } });
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  useEffect(() => {
    setLoading(true);
    accessToken();
    setLoading(false);
  }, [authenticated]);
  if (loading) return <Loader />;
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        {authenticated && <Navbar isAuthenticated={authenticated} />}
        <Routes>
          <Route path="/" element={<Home isAuthenticated={authenticated} />} />
          <Route
            path="/about"
            element={<About isAuthenticated={authenticated} />}
          />
          <Route
            path="/login"
            element={<Login isAuthenticated={authenticated} />}
          />
          <Route
            path="/register"
            element={<Register isAuthenticated={authenticated} />}
          />
          <Route
            path="/fraud"
            element={<Fraud isAuthenticated={authenticated} />}
          />
          <Route
            path="/coin"
            element={<Coins isAuthenticated={authenticated} />}
          />
          <Route
            path="/exchange"
            element={<Exchanges isAuthenticated={authenticated} />}
          />
          <Route
            path="/news"
            element={<FinanceNews isAuthenticated={authenticated} />}
          />
          <Route
            path="/coin/:id"
            element={<CoinDetails isAuthenticated={authenticated} />}
          />{" "}
          <Route
            path="/calculator"
            element={<SIP isAuthenticated={authenticated} />}
          />{" "}
          <Route
            path="/videos"
            element={<Videos isAuthenticated={authenticated} />}
          />
        </Routes>
        {authenticated && <Footer />}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
