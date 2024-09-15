import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import VerifiedIcon from "@mui/icons-material/Verified";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { InputLabel, MenuItem, Select } from "@mui/material";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AdminLogin({ isAuthenticated }) {
  const fincubeToken = localStorage.getItem("fincubeToken");
  const parsedToken = JSON.parse(fincubeToken);
  const token = parsedToken?.value;
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [loginError, setError] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      setError(false);
      await axios
        .post("http://localhost:4000/api/v1/user/register", formData)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setLoading(false);
            setError(false);
            navigate("/login");
          } else {
            setError(response.data.error);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (isAuthenticated === true && token) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh" }}
      className=" flex justify-center items-center"
    >
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            my: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "blue" }}>
            <VerifiedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Admin{" "}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="username"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />{" "}
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="email"
              type="password"
              autoFocus
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />{" "}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register{" "}
            </Button>
            <Link to={"/register"}>Login</Link>
            {loginError ? <Typography>Unable to Register</Typography> : ""}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
