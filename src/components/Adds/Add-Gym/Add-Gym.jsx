import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import config from "../../../config";
const API_ENDPOINT = `${config.baseURL}${config.apiEndpoint}/addGYM`;
const theme = createTheme();
const AddGym = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();

  const [gymName, setGymName] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [gymCity, setGymCity] = useState("");
  const [gymPhoneNumber, setGymPhoneNumber] = useState("");

  const onSubmit = async (data) => {
    //        event.preventDefault();
    console.log("Login submit click");
    console.log("User =>", gymName);
    console.log("GymAddress =>", gymAddress);
    console.log("GymPhoneNumber =>", gymPhoneNumber);
    console.log("GymCity =>", gymCity);

    var data = JSON.stringify({
      name: gymName,
      address: gymAddress,
      city: gymCity,
      phoneNumber: gymPhoneNumber,
    });

    var config = {
      method: "post",
      url: API_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.alert("success");
        navigate("/all-gym");
      })
      .catch(function (error) {
        window.alert("error");
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AddCircleOutlineIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Gym
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="GymName"
                    // {...register("gymName", { required: true })}
                    required="true"
                    fullWidth
                    id="gymName"
                    label="User Name"
                    autoFocus
                    value={gymName}
                    onChange={(e) => setGymName(e.target.value)}
                  />
                  {/* {errors.gymName && <p style={{ color: "red" }}>Gym Name is required</p>} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // {...register("gymAddress", { required: true })}
                    required="true"
                    fullWidth
                    id="GymAddress"
                    label="GymAddress "
                    name="GymAddress"
                    autoComplete="GymAddress"
                    value={gymAddress}
                    onChange={(e) => setGymAddress(e.target.value)}
                  />
                  {/* {errors.gymAddress && <p style={{ color: "red" }}>Gym Address is required</p>} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="GymCity"
                    name="GymCity"
                    // {...register("gymCity", { required: true })}
                    required="true"
                    fullWidth
                    id="GymCity"
                    label="GymCity"
                    autoFocus
                    value={gymCity}
                    onChange={(e) => setGymCity(e.target.value)}
                  />
                  {/* {errors.gymCity && <p style={{ color: "red" }}>Gym City is required</p>} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 10,
                      minLength: 10,
                    }}
                    autoComplete="gymPhoneNumber"
                    name="gymPhoneNumber"
                    // {...register("gymPhoneNumber", { required: true })}
                    required="true"
                    fullWidth
                    id="gymPhoneNumber"
                    label="Gym Phone Number"
                    autoFocus
                    value={gymPhoneNumber}
                    onChange={(e) => setGymPhoneNumber(e.target.value)}
                  />
                  {/* {errors.gymPhoneNumber && <p style={{ color: "red" }}>Gym Phone Number is required</p>} */}
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // onClick={handleSubmit}
                >
                  Add gym
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/all-gym" variant="body2">
                      Back to gym
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </form>
  );
};

export default AddGym;
