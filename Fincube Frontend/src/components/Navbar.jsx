import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import { Link } from "react-router-dom";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

function AppAppBar({ mode, toggleColorMode, setLogin, isAuthenticated }) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          boxShadow: 0,
          bgcolor: "white",
          backgroundImage: "none",
        }}
      >
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderRadius: "",
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(24px)",
            maxHeight: 40,
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              // ml: "-18px",
              px: 0,
            }}
          >
            <img
              src={
                "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
              }
              style={logoStyle}
              alt="logo of sitemark"
            />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <div
                className="  pl-8 flex items-center justify-center gap-9
              h-[100%] font-mono  "
              >
                <a href={"https://seuejvdappt9mqd4p44uvuv.streamlit.app"}>
                  <Typography variant="body2" color="text.primary">
                    Fraud
                  </Typography>
                </a>{" "}
                <Link to={"/coin"}>
                  <Typography variant="body2" color="text.primary">
                    Coins
                  </Typography>
                </Link>
                <Link to={"/exchange"}>
                  <Typography variant="body2" color="text.primary">
                    Exchanges
                  </Typography>
                </Link>
                <Link to={"/calculator"}>
                  <Typography variant="body2" color="text.primary">
                    FPI Calculator
                  </Typography>
                </Link>
                <Link to={"/news"}>
                  <Typography variant="body2" color="text.primary">
                    Finance News
                  </Typography>
                </Link>
                <Link to={"/videos"}>
                  <Typography variant="body2" color="text.primary">
                    Trending Videos
                  </Typography>
                </Link>
              </div>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              alignItems: "center",
            }}
          >
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            <Button
              color="primary"
              variant="text"
              size="small"
              component="a"
              onClick={() => setLogin(true)}
              target="_blank"
            >
              Sign in
            </Button>
          </Box>
          <Box sx={{ display: { sm: "", md: "none" } }}>
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: "30px", p: "4px" }}
            >
              <MenuIcon />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: "60dvw",
                  p: 2,
                  backgroundColor: "background.paper",
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    flexGrow: 1,
                  }}
                >
                  <ToggleColorMode
                    mode={mode}
                    toggleColorMode={toggleColorMode}
                  />
                </Box>
                <div className="  pl-6 flex flex-col gap-[10px] pb-[15px]">
                  <a href={"https://seuejvdappt9mqd4p44uvuv.streamlit.app"}>
                    Fraud
                  </a>{" "}
                  <Link to={"/coin"}>Coins</Link>
                  <Link to={"/exchange"}>Exchanges</Link>
                  <Link to={"/calculator"}>FPI Calculator</Link>
                  <Link to={"/news"}>Finance News</Link>
                  <Link to={"/videos"}>Trending Videos</Link>
                </div>
                <Divider />
                <MenuItem>
                  <Button
                    color="primary"
                    variant="contained"
                    component="a"
                    href="/material-ui/getting-started/templates/sign-up/"
                    target="_blank"
                    sx={{ width: "100%" }}
                  >
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    component="a"
                    href="/material-ui/getting-started/templates/sign-in/"
                    target="_blank"
                    sx={{ width: "100%" }}
                  >
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
