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
const API_ENDPOINT = `${config.baseURL}${config.apiEndpoint}/delteVerify`;
const theme = createTheme();

const DeleteAccount = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const { register, formState, handleSubmit, setError } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!data.number) {
      setError("otp", {
        type: "manual",
        message: "Mobile number is required",
      });
      toast.error("Mobile number is required");
      return;
      // }
      // if (!data.otp) {
      //   setError("otp", {
      //     type: "manual",
      //     message: "Otp is required",
      //   });
      //   toast.error("Otp is required");
      //   return;
    } else {
      try {
        const response = await axios.post(
          `${config.baseURL}${config.apiEndpoint}/sendOtpForDelete`,
          data
        );
        if (response.data?.[0]?.res === "success") {
          toast.success("Otp send on your mobile number");
          setShow(true);
        } else {
          toast.error("Otp not send !!!!");
        }
      } catch (error) {
        console.log("login wala error => ", error);
        toast.error("Login Fail");
      }
    }
  };

  const onSubmit1 = async () => {
    if (!mobile) {
      toast.success("Enter mobile number");
    } else if (!otp) {
      toast.success("Enter otp");
    } else {
      const params = {
        otp: otp,
        number: mobile,
      };

      var config = {
        method: "post",
        url: API_ENDPOINT,
        data: params,
      };
      axios(config)
        .then(function (response) {
          if (response.data?.[0]?.res === "success") {
            toast.success("Account delete successfully");
          } else {
            toast.error("Account not delete !!!!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
              <Typography component="h2" variant="h5">
                Delete Account
              </Typography>
              <Typography component="h5" variant="h6" textAlign="center">
                Enter mobile number and otp to remove account
              </Typography>

              <Box sx={{ mt: 1 }}>
                <TextField
                  {...register("number", {
                    required: "Mobile no is required",
                  })}
                  margin="normal"
                  fullWidth
                  id="number"
                  label="Mobile Number"
                  name="number"
                  autoComplete=""
                  autoFocus
                  disabled={show}
                  // error={!!formState.errors.mobile}
                  // helperText={formState.errors.mobile?.message}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                {show && (
                  <TextField
                    {...register("password", { required: true })}
                    margin="normal"
                    fullWidth
                    required
                    name="otp"
                    label="OTP"
                    type="otp"
                    id="otp"
                    autoComplete="current-password"
                    // error={!!formState.errors.otp}
                    // helperText={formState.errors.otp?.message}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                )}
                {show == false ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                ) : (
                  <Button
                    onClick={() => onSubmit1()}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Delete Account
                  </Button>
                )}
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DeleteAccount;
