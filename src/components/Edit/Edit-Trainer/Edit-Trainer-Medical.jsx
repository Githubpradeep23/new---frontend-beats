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
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const theme = createTheme();

const EditMedical = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    const [medicalRecordId, setMedicalRecordId] = useState("");
    const [allergies, setAllergies] = useState("");
    const [user, setUser] = useState("");
    const [userName, setUserName] = useState("");
    const [conditions, setConditions] = useState("");
    const [medications, setMedications] = useState("");
    const [previousInjury, setPreviousInjury] = useState("");
    const [permanentUsers, setPermanentUsers] = useState([]);

    const getUsers = async () => {
        let res = await axios.get(
          "http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/getUsers/PERMANENT"
        );
    
        console.log("responce=============->", res.data.users);
    
        const modifiedData = res.data.users.reduce(
          (prev, current) => [
            ...prev,
            {
              ...current,
              userName: current.firstName + (current.lastName ?? ''),
              email: current.email,
              clientNumber: current.number,
              id: current._id
            },
          ],
          []
        );
        setPermanentUsers(modifiedData);
      };

    useEffect(() => {
        getUsers();
      }, []);

    const routeLocation = useLocation();

    useEffect(() => {
        console.log(routeLocation.state.medicalRecord);
        setMedicalRecordId(routeLocation.state.medicalRecord.id);
        setAllergies(routeLocation.state.medicalRecord.allergies);
        setConditions(routeLocation.state.medicalRecord.conditions);
        setMedications(routeLocation.state.medicalRecord.medications);
        setPreviousInjury(routeLocation.state.medicalRecord.previousInjury);
        setUser(routeLocation.state.medicalRecord.userId  || '');
        setUserName(routeLocation.state.medicalRecord.userName  || '');
      }, []);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log(onSubmit);
        console.log("allergies =>", allergies)
        console.log("user =>", user)
        console.log("conditions =>", conditions)
        console.log("medications =>", medications)
        console.log("previousInjury =>", previousInjury)
        var data = new FormData();
        data.append("medicalRecordId", medicalRecordId);
        data.append("allergies", allergies);
        data.append("user",user);
        data.append("conditions", conditions);
        data.append("medications",medications);
        data.append("previousInjury",previousInjury);  
        let config = {
        method: 'put',
        url: 'http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/trainer/medicalRecord',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.alert("success")
            navigate('/trainer/medical')
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
                        <AddCircleOutlineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Medical Record
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="allergies"
                                    name="allergies"
                                    fullWidth
                                    id="allergies"
                                    label="Allergies"
                                    autoFocus
                                    required
                                    value={allergies}
                                    onChange={(e)=> setAllergies(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="conditions"
                                    name="conditions"
                                    fullWidth
                                    id="conditions"
                                    label="Conditions"
                                    autoFocus
                                    value={conditions}
                                    onChange={(e)=> setConditions(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="medications"
                                    label="Medications"
                                    required
                                    value={medications}
                                    onChange={(e)=>setMedications(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    id="user"
                                    className="form-select"
                                    value={user}
                                    name={userName}
                                    onChange={(e) => {
                                    setUser(e.target.value);
                                    }}
                                >
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
                                    onChange={(e)=>setPreviousInjury(e.target.value)}
                                />
                            </Grid>
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
                                <Link href="/trainer/medical" variant="body2">
                                    Back to all Medical Records
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

export default EditMedical;