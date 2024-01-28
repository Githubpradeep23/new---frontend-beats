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
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/addWeight`;

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import config from "../../../config";

const theme = createTheme();
const AddWeight = () => {
  let navigate = useNavigate();

  const [weight, setWeight] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("weight =>", weight);

    let userLogin = await axios.post(API_ENDPOINT1, {
      weight,
    });
    if (userLogin.status === 200) {
      <Alert severity="success">This is a success alert — check it out!</Alert>;
    } else {
      <Alert severity="error">This is an error alert — check it out!</Alert>;
    }
    console.log(
      "🚀 ~ file: Login.jsx ~ line 31 ~ handleSubmit ~ userLogin",
      userLogin
    );
  };

  return (
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
            Add Weight
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  autoComplete="number"
                  name="number"
                  required
                  fullWidth
                  id="number"
                  label="Weight"
                  autoFocus
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Grid>

              <Button
                // type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Add weight
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/weight" variant="body2">
                    Back to weight
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddWeight;
