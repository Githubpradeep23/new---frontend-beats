import React, { useSate, useEffect } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/addCoin`;

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import config from "../../../config";

const theme = createTheme();
const AddUserCoin = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [Image, setImage] = useState("");
  const [coin, setCoin] = useState("");
  const [Id, setIds] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const routeLocation = useLocation();
  useEffect(() => {
    console.log(routeLocation.state.gym);
    setIds(routeLocation.state.gym.id);
    setCoin(routeLocation.state.gym.coin);
  }, []);
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    // event.preventDefault();
    console.log("Login submit click");
    console.log("dataaaaa =>", data);

    var data = JSON.stringify({
      id: Id,
      coin: parseInt(coin),
    });

    var config = {
      method: "post",
      url: API_ENDPOINT1,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate("/users");
      })
      .catch(function (error) {
        console.log(error);
      });

    //     let userLogin = await axios.post("http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/addNewUser", {
    //         username,
    //         number,
    //         coin,
    //     });
    //     if (userLogin.status === 200) {
    //         <Alert severity="success">This is a success alert — check it out!</Alert>
    //         navigate('/users')

    //     }
    //     else {
    //         <Alert severity="error">This is an error alert — check it out!</Alert>

    //     }
    //     console.log(
    //         "🚀 ~ file: Login.jsx ~ line 31 ~ handleSubmit ~ userLogin",
    //         userLogin
    //     );
    // };
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
              Add Users Coin
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Grid item md={12}>
                      <TextField
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        {...register("coin", { required: true })}
                        fullWidth
                        id="coin"
                        label="coin"
                        name="coin"
                        autoComplete="coin"
                        required
                        value={coin}
                        onChange={(e) => setCoin(e.target.value)}
                      />
                      {errors.coin && (
                        <p style={{ color: "red" }}>Coin is required</p>
                      )}
                    </Grid>
                  </Stack>
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

export default AddUserCoin;
