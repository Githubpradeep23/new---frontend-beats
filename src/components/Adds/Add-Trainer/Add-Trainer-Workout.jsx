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
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import config from "../../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/trainer/exercise/all`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/trainer/workout/submit`;
const theme = createTheme();

const AddWorkout = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();

  const [day, setDay] = useState("");
  const [name, setName] = useState("");
  const [set1Exercise1, setSet1Exercise1] = useState("");
  const [set1Exercise1Id, setSet1Exercise1Id] = useState("");
  const [set1Reps1, setSet1Reps1] = useState("");
  const [set1Exercise2, setSet1Exercise2] = useState("");
  const [set1Exercise2Id, setSet1Exercise2Id] = useState("");
  const [set1Reps2, setSet1Reps2] = useState("");
  const [set1Exercise3, setSet1Exercise3] = useState("");
  const [set1Exercise3Id, setSet1Exercise3Id] = useState("");
  const [set1Reps3, setSet1Reps3] = useState("");
  const [set1Exercise4, setSet1Exercise4] = useState("");
  const [set1Exercise4Id, setSet1Exercise4Id] = useState("");
  const [set1Reps4, setSet1Reps4] = useState("");
  const [numberOfRounds1, setNumberOfRounds1] = useState("");
  const [set2Exercise1, setSet2Exercise1] = useState("");
  const [set2Exercise1Id, setSet2Exercise1Id] = useState("");
  const [set2Reps1, setSet2Reps1] = useState("");
  const [set2Exercise2, setSet2Exercise2] = useState("");
  const [set2Exercise2Id, setSet2Exercise2Id] = useState("");
  const [set2Reps2, setSet2Reps2] = useState("");
  const [set2Exercise3, setSet2Exercise3] = useState("");
  const [set2Exercise3Id, setSet2Exercise3Id] = useState("");
  const [set2Reps3, setSet2Reps3] = useState("");
  const [set2Exercise4, setSet2Exercise4] = useState("");
  const [set2Exercise4Id, setSet2Exercise4Id] = useState("");
  const [set2Reps4, setSet2Reps4] = useState("");
  const [numberOfRounds2, setNumberOfRounds2] = useState("");
  const [exercises, setExercises] = useState("");

  const getExercises = async () => {
    let res = await axios.get(
      API_ENDPOINT1
    );

    console.log("responce=============->", res.data.exercises);

    const modifiedData = res.data.exercises.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          id: current._id,
        },
      ],
      []
    );
    setExercises(modifiedData);
  };

  useEffect(() => {
    getExercises();
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    var data = new FormData();
    data.append("day", day);
    data.append("name", name);
    let set1 = [];
    if (set1Exercise1Id && set1Reps1) {
      set1.push({ exercise: set1Exercise1Id, reps: set1Reps1 });
    }
    if (set1Exercise2Id && set1Reps2) {
      set1.push({ exercise: set1Exercise2Id, reps: set1Reps2 });
    }
    if (set1Exercise3Id && set1Reps3) {
      set1.push({ exercise: set1Exercise3Id, reps: set1Reps3 });
    }
    if (set1Exercise4Id && set1Reps4) {
      set1.push({ exercise: set1Exercise4Id, reps: set1Reps4 });
    }
    data.append("set1", JSON.stringify(set1));
    data.append("numberOfRounds1", numberOfRounds1);
    let set2 = [];
    if (set2Exercise1Id && set2Reps1) {
      set2.push({ exercise: set2Exercise1Id, reps: set2Reps1 });
    }
    if (set2Exercise2Id && set2Reps2) {
      set2.push({ exercise: set2Exercise2Id, reps: set2Reps2 });
    }
    if (set2Exercise3Id && set2Reps3) {
      set2.push({ exercise: set2Exercise3Id, reps: set2Reps3 });
    }
    if (set2Exercise4Id && set2Reps4) {
      set2.push({ exercise: set2Exercise4Id, reps: set2Reps4 });
    }
    data.append("set2", JSON.stringify(set2));
    data.append("numberOfRounds2", numberOfRounds2);
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
        navigate("/trainer/workout");
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
            <Container className="addWorkOutContainer">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 4,
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="day"
                        {...register("day", { required: true })}
                        name="day"
                        fullWidth
                        id="day"
                        label="Day"
                        autoFocus
                        required
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="name"
                        {...register("name", { required: false })}
                        name="name"
                        fullWidth
                        id="name"
                        label="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        id="set1Exercise1"
                        className="form-select"
                        value={set1Exercise1Id}
                        onChange={(e) => {
                          setSet1Exercise1Id(e.target.value);
                        }}
                      >
                        <option value={""} disabled>
                          Choose Exercise
                        </option>
                        {exercises.length &&
                          exercises?.map((x, key) => {
                            return (
                              <option key={key} value={x.id}>
                                {x.name}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="set1Reps1"
                        label="Set1Reps1"
                        value={set1Reps1}
                        onChange={(e) => setSet1Reps1(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        id="set1Exercise2"
                        className="form-select"
                        value={set1Exercise2Id}
                        onChange={(e) => {
                          setSet1Exercise2Id(e.target.value);
                        }}
                      >
                        <option value={""} disabled>
                          Choose Exercise
                        </option>
                        {exercises.length &&
                          exercises?.map((x, key) => {
                            return (
                              <option key={key} value={x.id}>
                                {x.name}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="set1Reps2"
                        label="Set1Reps2"
                        value={set1Reps2}
                        onChange={(e) => setSet1Reps2(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        id="set1Exercise3"
                        className="form-select"
                        value={set1Exercise3Id}
                        onChange={(e) => {
                          setSet1Exercise3Id(e.target.value);
                        }}
                      >
                        <option value={""} disabled>
                          Choose Exercise
                        </option>
                        {exercises.length &&
                          exercises?.map((x, key) => {
                            return (
                              <option key={key} value={x.id}>
                                {x.name}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="set1Reps3"
                        label="Set1Reps3"
                        value={set1Reps3}
                        onChange={(e) => setSet1Reps3(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        id="set1Exercise4"
                        className="form-select"
                        value={set1Exercise4Id}
                        onChange={(e) => {
                          setSet1Exercise4Id(e.target.value);
                        }}
                      >
                        <option value={""} disabled>
                          Choose Exercise
                        </option>
                        {exercises.length &&
                          exercises?.map((x, key) => {
                            return (
                              <option key={key} value={x.id}>
                                {x.name}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="set1Reps4"
                        label="Set1Reps4"
                        value={set1Reps4}
                        onChange={(e) => setSet1Reps4(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="numberOfRounds1"
                        label="numberOfRounds1"
                        required
                        value={numberOfRounds1}
                        onChange={(e) => setNumberOfRounds1(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        id="set2Exercise1"
                        className="form-select"
                        value={set2Exercise1Id}
                        onChange={(e) => {
                          setSet2Exercise1Id(e.target.value);
                        }}
                      >
                        <option value={""} disabled>
                          Choose Exercise
                        </option>
                        {exercises.length &&
                          exercises?.map((x, key) => {
                            return (
                              <option key={key} value={x.id}>
                                {x.name}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="set2Reps1"
                        label="Set2Reps1"
                        value={set2Reps1}
                        onChange={(e) => setSet2Reps1(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        id="set2Exercise2"
                        className="form-select"
                        value={set2Exercise2Id}
                        onChange={(e) => {
                          setSet2Exercise2Id(e.target.value);
                        }}
                      >
                        <option value={""} disabled>
                          Choose Exercise
                        </option>
                        {exercises.length &&
                          exercises?.map((x, key) => {
                            return (
                              <option key={key} value={x.id}>
                                {x.name}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="set2Reps2"
                        label="Set2Reps2"
                        value={set2Reps2}
                        onChange={(e) => setSet2Reps2(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        id="set2Exercise3"
                        className="form-select"
                        value={set2Exercise3Id}
                        onChange={(e) => {
                          setSet2Exercise3Id(e.target.value);
                        }}
                      >
                        <option value={""} disabled>
                          Choose Exercise
                        </option>
                        {exercises.length &&
                          exercises?.map((x, key) => {
                            return (
                              <option key={key} value={x.id}>
                                {x.name}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="set2Reps3"
                        label="Set2Reps3"
                        value={set2Reps3}
                        onChange={(e) => setSet2Reps3(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        id="set2Exercise4"
                        className="form-select"
                        value={set2Exercise4Id}
                        onChange={(e) => {
                          setSet2Exercise4Id(e.target.value);
                        }}
                      >
                        <option value={""} disabled>
                          Choose Exercise
                        </option>
                        {exercises.length &&
                          exercises?.map((x, key) => {
                            return (
                              <option key={key} value={x.id}>
                                {x.name}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="set2Reps4"
                        label="Set2Reps4"
                        value={set2Reps4}
                        onChange={(e) => setSet2Reps4(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="numberOfRounds2"
                        label="numberOfRounds2"
                        value={numberOfRounds2}
                        onChange={(e) => setNumberOfRounds2(e.target.value)}
                      />
                    </Grid>
                    <div className="workoutBtn">
                    <button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Add Medical Record
                    </button>
                    </div>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/trainer/workout" variant="body2">
                          Back to all Workout Records
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </form>
      </div>
    </div>
  );
};

export default AddWorkout;
