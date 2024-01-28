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
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { useForm } from "react-hook-form";
import FormGroup from '@mui/material/FormGroup';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';



import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import config from "../../../config";
const API_ENDPOINT = `${config.baseURL}${config.apiEndpoint}/addDemo`;
const theme = createTheme();
const AddDemo = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    // ===========================================================
    const [id , setId] = React.useState()
    const [date, setDate] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [time, setTime] = React.useState(dayjs('2014-08-18T21:11:54'));

    const DateChange = (newValue) => {
        setDate(newValue);
    };
    const TimeChange = (newValue) => {
        setTime(newValue);
    };
    // ================================

    let navigate = useNavigate();



    const onSubmit = async (data) => {
        //        event.preventDefault();
        console.log("Login submit click");
        console.log("date =>", date)
        console.log("id =>", id)
        console.log("time =>", time)
        
        var data = JSON.stringify({
            "Date": date,
            "Time": time,
            "Service_id": id
          });
          
          var config = {
            method: 'post',
            url: API_ENDPOINT,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.alert("success")
            navigate('/services')
          })
          .catch(function (error) {
            console.log(error);
            window.alert("fail")

          });
    }
       
    const routeLocation = useLocation();
    useEffect(() => {
        console.log("location of service", routeLocation.state.gym);
        setId(routeLocation.state.gym.id)
       
    }, []);

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
                            Add Demo
                        </Typography>

                        <Box

                            sx={{ mt: 3 }}
                        >
                   
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="Date"
                                        inputFormat="MM/DD/YYYY"
                                        value={date}
                                        onChange={DateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                          
                                    <TimePicker
                                        label="Time"
                                        value={time}
                                        onChange={TimeChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                    
                                </Stack>
                            </LocalizationProvider>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            // onClick={handleSubmit}

                            >
                                Add Demo
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/services" variant="body2">
                                        Back to gym branch service
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

        </form>

    );
};

export default AddDemo;
