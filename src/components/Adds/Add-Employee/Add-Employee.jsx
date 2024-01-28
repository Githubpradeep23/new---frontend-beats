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
import "./index.css";
import config from "../../../config";
const API_ENDPOINT = `${config.baseURL}${config.apiEndpoint}/getAllGymBranch`;
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/employee/add`;

const theme = createTheme();

const AddEmployee = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
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
  const [Image, setImage] = useState();
  const [branchInfo, setBranchInfo] = useState("");

  const getBranches = async () => {
    let res = await axios.get(API_ENDPOINT);

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

  const onSubmit = async (data) => {
    event.preventDefault();
    console.log(onSubmit);
    console.log("firstName =>", firstName);
    console.log("lastName =>", lastName);
    console.log("gender =>", gender);
    console.log("postalCode =>", postalCode);
    console.log("email =>", email);
    console.log("number =>", number);
    console.log("employeeAddress =>", employeeAddress);
    console.log("age =>", age);
    console.log("role =>", role);
    console.log("password =>", password);
    console.log("gymBranch =>", gymBranch);
    var data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("gender", gender);
    data.append("email", email);
    data.append("number", number);
    data.append("employee_address", employeeAddress);
    data.append("postal_code", postalCode);
    data.append("age", parseInt(age));
    data.append("password", password);
    data.append("role", role);
    data.append("gym_branch", gymBranch);
    data.append("image", Image);
    let config = {
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
        window.alert("success");
        navigate("/employees");
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
            <Container className="addEmployeeContainer">
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
                  Add Employees
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="firstName"
                        {...register("firstName", { required: true })}
                        name="firstName"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        required
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="lastName"
                        {...register("lastName", { required: false })}
                        name="lastName"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        autoFocus
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                      />
                      {/* {errors.lastName && <p style={{ color: "red" }}>lastName is required</p>} */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        {...register("gender", { required: true })}
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
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          maxLength: 10,
                          minLength: 10,
                        }}
                        {...register("number", { required: true })}
                        autoComplete="number"
                        name="number"
                        fullWidth
                        id="number"
                        label="Number"
                        autoFocus
                        value={number}
                        required
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          maxLength: 6,
                          minLength: 6,
                        }}
                        fullWidth
                        id="postal_code"
                        label="Postal code"
                        autoFocus
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        inputProps={{
                          inputMode: "numeric",
                          maxLength: 3,
                          minLength: 1,
                        }}
                        fullWidth
                        id="age"
                        label="Age"
                        autoFocus
                        value={age}
                        required
                        onChange={(e) => setAge(e.target.value)}
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
                        onChange={(e) => setRole(e.target.value)}
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
                        onChange={(e) => setEmployeeAddress(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        {...register("branch", { required: true })}
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
                              <option key={key} value={x._id}>
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
                      <div className="addEmployeeImg">
                        <button variant="contained" component="label">
                          Upload Image
                          <input
                            hidden
                            accept="image/"
                            multiple
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                          />
                        </button>
                        <img
                          src={Image}
                          style={{ width: 100, height: 100, display: "none" }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <div className="addEmployeeBtn">
                    <button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      // onClick={handleSubmit}
                    >
                      Add Employee
                    </button>
                  </div>
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
      </div>
    </div>
  );
};

export default AddEmployee;
