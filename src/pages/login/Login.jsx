import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import "./login.scss";
import config from "../../config";

const theme = createTheme();

const Login = () => {
  const { register, formState, handleSubmit, setError } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!data.email) {
      setError("email", {
        type: "manual",
        message: "Email is required",
      });
      toast.error("Email is required");
      return;
    }

    try {
      const response = await axios.post(
        `${config.baseURL}${config.apiEndpoint}/adminLogin`,
        data
      );

      if (response.status === 200) {
        toast.success("Login Success");
        navigate("home");
      } else {
        toast.error("Login Error");
      }
    } catch (error) {
      console.log("login wala error => ", error);
      toast.error("Login Fail");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
          <Container>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              className="loginContainer"
            >
              <img src="logo.png" alt="Logo" />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <Box sx={{ mt: 1 }}>
                <TextField
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!formState.errors.email}
                  helperText={formState.errors.email?.message}
                />

                <TextField
                  {...register("password", { required: true })}
                  margin="normal"
                  fullWidth
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
