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
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { useForm } from "react-hook-form";



import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import config from "../../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/addQuestions`;


const theme = createTheme();
const AddQuestion = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();


    let navigate = useNavigate();

    const [description, setdescription] = useState("");
    const [text1, settext1] = useState("")
    const [text2, settext2] = useState("")
    const [text3, settext3] = useState("")
    const [text4, settext4] = useState("")

    const onSubmit = async (data) => {
        // event.preventDefault();
        console.log("Login submit click");
        console.log("description =>", description)



        var data = JSON.stringify({
            "description": description,
            "alternatives": [
                {
                    "text": text1
                },
                {
                    "text": text2
                },
                {
                    "text": text3
                },
                {
                    "text": text4,
                    "isCorrect": true
                }
            ]
        });
        console.log("Data ==>", data)


        var config = {
            method: 'post',
            url: API_ENDPOINT1,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.alert("success")
                navigate('/questions')
            })
            .catch(function (error) {
                window.alert("error")
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
                            Add Question
                        </Typography>

                        <Box

                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="description"
                                        name="description"
                                        {...register("description", { required: true })}
               
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        autoFocus
                                        value={description}
                                        onChange={(e) => setdescription(e.target.value)}
                                    />
                                    {errors.description && <p style={{ color: "red" }}> description is required</p>}

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="text1"
                                        name="text1"
                                        {...register("text1", { required: true })}

                                        fullWidth
                                        id="text1"
                                        label="option - 1"
                                        autoFocus
                                        value={text1}
                                        onChange={(e) => settext1(e.target.value)}
                                    />
                                    {errors.text1 && <p style={{ color: "red" }}> text is required</p>}

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="text2"
                                        name="text2"
                                        {...register("text2", { required: true })}

                                        fullWidth
                                        id="text2"
                                        label="option - 2"
                                        autoFocus
                                        value={text2}
                                        onChange={(e) => settext2(e.target.value)}
                                    />
                                    {errors.text2 && <p style={{ color: "red" }}> text is required</p>}

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="text3"
                                        name="text3"
                                        {...register("text3", { required: true })}

                                        fullWidth
                                        id="text3"
                                        label="option - 3"
                                        autoFocus
                                        value={text3}
                                        onChange={(e) => settext3(e.target.value)}
                                    />
                                    {errors.text3 && <p style={{ color: "red" }}> text is required</p>}

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="text4"
                                        name="text4"
                                        {...register("text4", { required: true })}

                                        fullWidth
                                        id="text4"
                                        label="option - 4"
                                        autoFocus
                                        value={text4}
                                        onChange={(e) => settext4(e.target.value)}
                                    />
                                    {errors.text4 && <p style={{ color: "red" }}> text is required</p>}

                                </Grid>


                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    // onClick={handleSubmit}

                                >
                                    Add Question
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/questions" variant="body2">
                                            Back to questions
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

export default AddQuestion;
