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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Stack from '@mui/material/Stack';

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const theme = createTheme();

const EditEmployee = ({ route }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setgender] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [employeeAddress, setEmployeeAddress] = useState("");
    const [age, setAge] = useState("");
    const [role, setRole] = useState();
    const [password, setPassword] = useState("");
    const [gymBranch, setGymBranch] = useState("");
    const [Image, setImage] = useState(null);
    const [branchInfo, setBranchInfo] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    const getBranches = async () => {
        let res = await axios.get(
          "http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/getAllGymBranch"
        );
    
        console.log("responce=============->", res.data.getAllGymBranch);
    
        const modifiedData = res.data.getAllGymBranch.reduce(
          (prev, current) => [
            ...prev,
            {
              ...current,
              name: `${current.branchName}`,
              id: current._id,
              opening_branchTiming: new Date(
                current.opening_branchTiming
              ).toLocaleTimeString(),
              closing_branchTiming: new Date(
                current.closing_branchTiming
              ).toLocaleTimeString(),
            },
          ],
          []
        );
        setBranchInfo(modifiedData);
    };

    useEffect(() => {
        getBranches();
    }, []);

    const routeLocation = useLocation();

    useEffect(() => {
        console.log(routeLocation.state.employee);
        setEmployeeId(routeLocation.state.employee.id);
        setfirstName(routeLocation.state.employee.firstName);
        setlastName(routeLocation.state.employee.lastName);
        setgender(routeLocation.state.employee.gender);
        setEmail(routeLocation.state.employee.email);
        setNumber(routeLocation.state.employee.number);
        setEmployeeAddress(routeLocation.state.employee.employee_address);
        setPostalCode(routeLocation.state.employee.postal_code);
        setAge(routeLocation.state.employee.age);
        setPassword(routeLocation.state.employee.password);
        setRole(routeLocation.state.employee.role);
        setGymBranch(routeLocation.state.employee.gym_branch._id);
        setImage(routeLocation.state.employee.image);
      }, []);

      const onSubmit = async (data) => {
        console.log("firstName =>", firstName)
        console.log("lastName =>", lastName)
        console.log("gender =>", gender)
        console.log("postalCode =>", postalCode)
        console.log("email =>", email)
        console.log("number =>", number)
        console.log("employeeAddress =>", employeeAddress)
        console.log("age =>", age)
        console.log("role =>", role)
        console.log("password =>", password)
        console.log("gymBranch =>", gymBranch)
        var data = new FormData();
        data.append("employeeId", employeeId);
        data.append("firstName", firstName);
        data.append("lastName",lastName);
        data.append("gender",gender);
        data.append("email", email);
        data.append("number",number);
        data.append("employee_address", employeeAddress);
        data.append("postal_code", postalCode);
        data.append("age",parseInt(age));
        data.append("password", password);
        data.append("role", role);
        data.append("gym_branch", gymBranch);
        data.append("image",Image);

        const res = await axios.put(
            "http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/employee/updateProfile",
            data
          );
          console.log("responce",res);
          if (res.status === 200) {
            window.alert("success")
            navigate('/employees')
          } else{
            console.log(error);
            window.alert("fail")
          } 
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
                        Edit Employees
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="firstName"
                                    // {...register("firstName", { required: false })}
                                    name="firstName"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    required
                                    value={firstName}
                                    onChange={(e)=> setfirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="lastName"
                                    // {...register("lastName", { required: false })}
                                    name="lastName"
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    autoFocus
                                    value={lastName}
                                    onChange={(e)=> setlastName(e.target.value)}
                                />
                            {/* {errors.lastName && <p style={{ color: "red" }}>lastName is required</p>} */}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    // {...register("gender", { required: false })}
                                    id="gender"
                                    className="form-select"
                                    value={gender}
                                    onChange={(e) => setgender(e.target.value)}
                                >
                                    <option value={""} disabled>
                                    Choose gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {errors.gender && (
                                    <p style={{ color: "red" }}>gender is required</p>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    required
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10,
                                    minLength: 10, }}
                                    // {...register("number", { required: false })}
                                    autoComplete="number"
                                    name="number"
                                    fullWidth
                                    id="number"
                                    label="Number"
                                    autoFocus
                                    value={number}
                                    required
                                    onChange={(e)=>setNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 
                                maxLength: 6,
                                minLength: 6,                                     
                                }}
                                fullWidth
                                id="postal_code"
                                label="Postal code"
                                autoFocus
                                value={postalCode}
                                required
                                onChange={(e)=>setPostalCode(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                inputProps={{ inputMode: 'numeric', 
                                maxLength: 3,
                                minLength: 1,                                     
                                }}
                                fullWidth
                                id="age"
                                label="Age"
                                autoFocus
                                value={age}
                                required
                                onChange={(e)=>setAge(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                fullWidth
                                id="role"
                                label="Role"
                                autoFocus
                                value={role}
                                required
                                onChange={(e)=>setRole(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="user_Address"
                                    label="Employee_Address"
                                    name="employee_Address"
                                    autoComplete="employee_Address"
                                    required
                                    value={employeeAddress}
                                    onChange={(e)=>setEmployeeAddress(e.target.value)}
                                />
                            </Grid> 
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    required
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    // {...register("branch", { required: false })}
                                    id="branch"
                                    className="form-select"
                                    value={gymBranch}
                                    onChange={(e) => {
                                    setGymBranch(e.target.value);
                                    }}
                                >
                                    <option value={""} disabled>
                                    Choose branch
                                    </option>
                                    {branchInfo.length &&
                                    branchInfo?.map((x, key) => {
                                        return (
                                        <option
                                        key={key}
                                            value={x._id}
                                        >
                                            {x.branchName}
                                        </option>
                                        );
                                    })}
                                </select>
                                {errors.branch && (
                                    <p style={{ color: "red" }}> Branch is required</p>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" component="label">
                                    Upload Image
                                    <input hidden accept="image/*"
                                        multiple type="file"
                                        value={Image}
                                    onChange={(e) => setImage(e.target.files[0])} />
                                </Button>
                                <img src={Image} style={{width:100, height:100, "display":"none"}} />
                            </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Edit Employee
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/employees" variant="body2">
                                        Back to all Employee
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

export default EditEmployee;