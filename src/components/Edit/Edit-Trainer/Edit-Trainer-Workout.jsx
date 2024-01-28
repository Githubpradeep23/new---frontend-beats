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
import { useNavigate,useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { EditAttributesOutlined } from "@mui/icons-material";

const theme = createTheme();

const EditWorkout = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();
    const [workoutId, setWorkoutId] = useState("");
    const [day, setDay] = useState("");
    const [name, setName] = useState("");
    const [set1Exercise1, setSet1Exercise1] = useState(""); const [set1Exercise1Id, setSet1Exercise1Id] = useState("");
    const [set1Reps1, setSet1Reps1] = useState("");
    const [set1Exercise2, setSet1Exercise2] = useState(""); const [set1Exercise2Id, setSet1Exercise2Id] = useState("");
    const [set1Reps2, setSet1Reps2] = useState("");
    const [set1Exercise3, setSet1Exercise3] = useState(""); const [set1Exercise3Id, setSet1Exercise3Id] = useState("");
    const [set1Reps3, setSet1Reps3] = useState("");
    const [set1Exercise4, setSet1Exercise4] = useState(""); const [set1Exercise4Id, setSet1Exercise4Id] = useState("");
    const [set1Reps4, setSet1Reps4] = useState("");
    const [numberOfRounds1, setNumberOfRounds1] = useState("");
    const [set2Exercise1, setSet2Exercise1] = useState(""); const [set2Exercise1Id, setSet2Exercise1Id] = useState("");
    const [set2Reps1, setSet2Reps1] = useState("");
    const [set2Exercise2, setSet2Exercise2] = useState(""); const [set2Exercise2Id, setSet2Exercise2Id] = useState("");
    const [set2Reps2, setSet2Reps2] = useState("");
    const [set2Exercise3, setSet2Exercise3] = useState(""); const [set2Exercise3Id, setSet2Exercise3Id] = useState("");
    const [set2Reps3, setSet2Reps3] = useState("");
    const [set2Exercise4, setSet2Exercise4] = useState(""); const [set2Exercise4Id, setSet2Exercise4Id] = useState("");
    const [set2Reps4, setSet2Reps4] = useState("");
    const [numberOfRounds2, setNumberOfRounds2] = useState("");
    const [exercises, setExercises] = useState("");

    const getExercises = async () => {
        let res = await axios.get(
          "http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/trainer/exercise/all"
        );
    
        console.log("responce=============->", res.data.exercises);
    
        const modifiedData = res.data.exercises.reduce(
          (prev, current) => [
            ...prev,
            {
              ...current,
              id: current._id
            },
          ],
          []
        );
        setExercises(modifiedData);
      };

    useEffect(() => {
        getExercises();
    }, []);

    const routeLocation = useLocation();

    useEffect(() => {
        console.log(routeLocation.state.workout);
        setWorkoutId(routeLocation.state.workout.id);
        setDay(routeLocation.state.workout.day);
        setName(routeLocation.state.workout.name);
        setSet1Exercise1(routeLocation.state.workout.set1Exercise1 || '');
        setSet1Exercise1Id(routeLocation.state.workout.set1Exercise1Id || '');
        setSet1Reps1(routeLocation.state.workout.set1Reps1 || '');
        setSet1Exercise2(routeLocation.state.workout.set1Exercise2  || '');
        setSet1Exercise2Id(routeLocation.state.workout.set1Exercise2Id  || '');
        setSet1Reps2(routeLocation.state.workout.set1Reps2  || '');
        setSet1Exercise3(routeLocation.state.workout.set1Exercise3 || '');
        setSet1Exercise3Id(routeLocation.state.workout.set1Exercise3Id || '');
        setSet1Reps3(routeLocation.state.workout.set1Reps3 || '');
        setSet1Exercise4(routeLocation.state.workout.set1Exercise4  || '');
        setSet1Exercise4Id(routeLocation.state.workout.set1Exercise4Id  || '');
        setSet1Reps4(routeLocation.state.workout.set1Reps4  || '');
        setNumberOfRounds1(routeLocation.state.workout.numberOfRounds1);
        setSet2Exercise1(routeLocation.state.workout.set2Exercise1 || '');
        setSet2Exercise1Id(routeLocation.state.workout.set2Exercise1Id || '');
        setSet2Reps1(routeLocation.state.workout.set2Reps1 || '');
        setSet2Exercise2(routeLocation.state.workout.set2Exercise2  || '');
        setSet2Exercise2Id(routeLocation.state.workout.set2Exercise2Id  || '');
        setSet2Reps2(routeLocation.state.workout.set2Reps2  || '');
        setSet2Exercise3(routeLocation.state.workout.set2Exercise3 || '');
        setSet2Exercise3Id(routeLocation.state.workout.set2Exercise3Id || '');
        setSet2Reps3(routeLocation.state.workout.set2Reps3 || '');
        setSet2Exercise4(routeLocation.state.workout.set2Exercise4 || '');
        setSet2Exercise4Id(routeLocation.state.workout.set2Exercise4Id || '');
        setSet2Reps4(routeLocation.state.workout.set2Reps4  || '');
        setNumberOfRounds2(routeLocation.state.workout.numberOfRounds2);
      }, []);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        var data = new FormData();
        data.append("workoutId", workoutId);
        data.append("day", day);
        data.append("name",name);
        let set1 = [];
        if(set1Exercise1Id && set1Reps1) { set1.push({ exercise: set1Exercise1Id, reps: set1Reps1}) }
        if(set1Exercise2Id && set1Reps2) { set1.push({ exercise: set1Exercise2Id, reps: set1Reps2}) }
        if(set1Exercise3Id && set1Reps3) { set1.push({ exercise: set1Exercise3Id, reps: set1Reps3}) }
        if(set1Exercise4Id && set1Reps4) { set1.push({ exercise: set1Exercise4Id, reps: set1Reps4}) }
        data.append("set1", JSON.stringify(set1));
        data.append("numberOfRounds1",numberOfRounds1);
        let set2 = [];
        if(set2Exercise1Id && set2Reps1) { set2.push({ exercise: set2Exercise1Id, reps: set2Reps1}) }
        if(set2Exercise2Id && set2Reps2) { set2.push({ exercise: set2Exercise2Id, reps: set2Reps2}) }
        if(set2Exercise3Id && set2Reps3) { set2.push({ exercise: set2Exercise3Id, reps: set2Reps3}) }
        if(set2Exercise4Id && set2Reps4) { set2.push({ exercise: set2Exercise4Id, reps: set2Reps4}) }
        data.append("set2", JSON.stringify(set2));
        data.append("numberOfRounds2",numberOfRounds2); 
        let config = {
        method: 'put',
        url: 'http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/trainer/workout',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.alert("success")
            navigate('/trainer/workout')
        })
        .catch(function (error) {
            console.log(error);
            window.alert("fail")
        });
    }
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
                        <EditAttributesOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Medical Record
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="day"
                                    name="day"
                                    fullWidth
                                    id="day"
                                    label="Day"
                                    autoFocus
                                    value={day}
                                    onChange={(e)=> setDay(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    fullWidth
                                    id="name"
                                    label="name"
                                    autoFocus
                                    value={name}
                                    onChange={(e)=> setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    id="set1Exercise1"
                                    className="form-select"
                                    name={set1Exercise1}
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
                                    onChange={(e)=>setSet1Reps1(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    id="set1Exercise2"
                                    className="form-select"
                                    name={set1Exercise2}
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
                                    onChange={(e)=>setSet1Reps2(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    id="set1Exercise3"
                                    className="form-select"
                                    name={set1Exercise3}
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
                                    onChange={(e)=>setSet1Reps3(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    id="set1Exercise4"
                                    className="form-select"
                                    name={set1Exercise4}
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
                                    onChange={(e)=>setSet1Reps4(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="numberOfRounds1"
                                    label="numberOfRounds1"
                                    value={numberOfRounds1}
                                    onChange={(e)=>setNumberOfRounds1(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    id="set2Exercise1"
                                    className="form-select"
                                    name={set2Exercise1}
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
                                    onChange={(e)=>setSet2Reps1(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    id="set2Exercise2"
                                    className="form-select"
                                    name={set2Exercise2}
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
                                    onChange={(e)=>setSet2Reps2(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    id="set2Exercise3"
                                    className="form-select"
                                    name={set2Exercise3}
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
                                    onChange={(e)=>setSet2Reps3(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    id="set2Exercise4"
                                    className="form-select"
                                    name={set2Exercise4}
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
                                    onChange={(e)=>setSet2Reps4(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="numberOfRounds2"
                                    label="numberOfRounds2"
                                    value={numberOfRounds2}
                                    onChange={(e)=>setNumberOfRounds2(e.target.value)}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Edit Medical Record
                            </Button>
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
    );
};

export default EditWorkout;