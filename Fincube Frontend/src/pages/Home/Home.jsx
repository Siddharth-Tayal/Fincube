import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppAppBar from "./components/AppAppBar";
import Hero from "./components/Hero";
import LogoCollection from "./components/LogoCollection";
import Highlights from "./components/Highlights";
import Pricing from "./components/Pricing";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Modal from "@mui/material/Modal";
import Close from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function LandingPage({ isAuthenticated }) {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState("light");
  const defaultTheme = createTheme({ palette: { mode } });

  React.useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className=" h-screen w-screen fixed z-50 bg-white">
      <CssBaseline />
      <Hero />
      <Box sx={{ bgcolor: "background.default" }}>
        {/* <Features />
        <Divider />
        <Testimonials />
        <Divider /> */}
        {/* <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider /> */}
      </Box>
      {/* <Modal
        open={login}
        onClose={() => setLogin(false)}
        className="flex items-center justify-center backdrop:blur-3xl "
      >
        <div className=" relative flex  items-center justify-center w-fit bg-white shadow-md shadow-slate-800">
          <Close
            className=" absolute top-5 right-5 cursor-pointer rounded-full text-slate-800 hover:bg-gray-200"
            onClick={() => setLogin(false)}
          />
          <SignIn />
        </div>
      </Modal> */}
    </div>
  );
}
