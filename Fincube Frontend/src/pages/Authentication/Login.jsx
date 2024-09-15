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

export default function AdminLogin({ isAuthenticated }) {
  const fincubeToken = localStorage.getItem("fincubeToken");
  const parsedToken = JSON.parse(fincubeToken);
  const token = parsedToken?.value;
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [loginError, setError] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      setError("");
      await axios
        .post("/api/v1/user/login", formData)
        .then((response) => {
          if (response.data.success) {
            setLoading(false);
            setError("");
            navigate("/");
          } else {
            setError(response.data?.message);
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          setError("Failed to Login");
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to Login");
    }
  };
  React.useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "blue" }}>
            <VerifiedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login{" "}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <br />
            <Link to={"/register"}>Register</Link>
            {loginError}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
