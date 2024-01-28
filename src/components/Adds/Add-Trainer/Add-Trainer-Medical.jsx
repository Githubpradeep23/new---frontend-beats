import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import config from "../../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getUsers/PERMANENT`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/trainer/medicalRecord/submit`;
const theme = createTheme();

const AddMedical = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();

  const [allergies, setAllergies] = useState("");
  const [user, setUser] = useState("");
  const [conditions, setConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [previousInjury, setPreviousInjury] = useState("");
  const [permanentUsers, setPermanentUsers] = useState("");

  const getUsers = async () => {
    let res = await axios.get(API_ENDPOINT1);

    console.log("responce=============->", res.data.users);

    const modifiedData = res.data.users.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          userName: current.firstName + (current.lastName ?? ""),
          email: current.email,
          clientNumber: current.number,
          id: current._id,
        },
      ],
      []
    );
    setPermanentUsers(modifiedData);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(onSubmit);
    console.log("allergies =>", allergies);
    console.log("user =>", user);
    console.log("conditions =>", conditions);
    console.log("medications =>", medications);
    console.log("previousInjury =>", previousInjury);
    var data = new FormData();
    data.append("allergies", allergies);
    data.append("user", user);
    data.append("conditions", conditions);
    data.append("medications", medications);
    data.append("previousInjury", previousInjury);
    let config = {
      method: "post",
      url: API_ENDPOINT2,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.alert("success");
        navigate("/trainer/medical");
      })
      .catch(function (error) {
        console.log(error);
        window.alert("fail");
      });
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 6,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, backgroundColor: "#fd9206" }}>
                  <AddCircleOutlineIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Medical Record
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <div className="addMedicalContent">
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="allergies"
                        {...register("allergies", { required: true })}
                        name="allergies"
                        fullWidth
                        id="allergies"
                        label="Allergies"
                        autoFocus
                        required
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="conditions"
                        {...register("conditions", { required: false })}
                        name="conditions"
                        fullWidth
                        id="conditions"
                        label="Conditions"
                        autoFocus
                        value={conditions}
                        onChange={(e) => setConditions(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="medications"
                        label="Medications"
                        required
                        value={medications}
                        onChange={(e) => setMedications(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        {...register("users", { required: true })}
                        id="user"
                        className="form-select"
                        value={user}
                        onChange={(e) => {
                          setUser(e.target.value);
                        }}
                      >
                        <option value={""} disabled>
                          Choose User
                        </option>

                        {permanentUsers.length &&
                          permanentUsers?.map((x, key) => {
                            return (
                              <option key={key} value={x.id}>
                                {x.userName}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="previousInjury"
                        label="PreviousInjury"
                        required
                        value={previousInjury}
                        onChange={(e) => setPreviousInjury(e.target.value)}
                        sx={{ mt: 2 }}
                      />
                    </Grid>
                    <button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Add Medical Record
                    </button>

                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/trainer/medical" variant="body2">
                          Back to all Medical Records
                        </Link>
                      </Grid>
                    </Grid>
                  </div>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </form>
      </div>
    </div>
  );
};

export default AddMedical;
