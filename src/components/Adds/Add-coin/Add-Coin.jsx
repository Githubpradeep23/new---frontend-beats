import React, { useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import config from "../../../config";
const API_ENDPOINT = `${config.baseURL}${config.apiEndpoint}/addCoin`;
const theme = createTheme();
const AddCoin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();

  const [coin, setcoin] = useState("");
  const [Id, setIds] = useState("");

  const routeLocation = useLocation();
  useEffect(() => {
    console.log(routeLocation.state.gym);
    setcoin(routeLocation.state.gym.coin);
    setIds(routeLocation.state.gym.id);
  }, []);

  const onSubmit = async (data) => {
    // event.preventDefault();
    console.log("Login submit click");

    // var data = JSON.stringify({
    //     "id": Id,
    //     "coin": coin
    //   });
    //   console.log("data=>", data)
    var data = new FormData();
    data.append("id", Id);
    data.append("coin", coin);

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
        navigate("/users");
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
              Add Coins
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="coin"
                    name="coin"
                    {...register("coin", { required: true })}
                    required
                    fullWidth
                    id="coin"
                    label="coin"
                    autoFocus
                    value={coin}
                    onChange={(e) => setcoin(e.target.value)}
                  />
                  {/* {errors.coin && <p style={{color:"red"}}>coin is required</p>} */}
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // onClick={handleSubmit}
                >
                  Add Coin
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/users" variant="body2">
                      Back to all Users
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

export default AddCoin;
