import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import "./index.css";
import config from "../../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/addNewUser`;
const theme = createTheme();
const AddUser = () => {
  let navigate = useNavigate();
  const [date, setDate] = React.useState(dayjs("2014-08-18T21:11:54"));
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [coin, setCoin] = useState("");
  const [branch, setBranch] = useState("");
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [image1, setImage1] = useState(null);
  const [user_Address, setuser_Address] = useState("");

  const DateChange = (newValue) => {
    setDate(newValue);
  };
  const handleCreateUser = async () => {
    try {
      const validations = [
        { condition: !firstName, message: "Enter first name" },
        { condition: !lastName, message: "Enter last name" },
        { condition: !gender, message: "Select gender" },
        { condition: !userType, message: "Select user type" },
        { condition: !date, message: "Select date" },
        { condition: !email, message: "Enter email" },
        { condition: !number, message: "Enter mobile number" },
        { condition: !branch, message: "Enter postal code" },
        { condition: !user_Address, message: "Enter address" },
        { condition: !image1, message: "Select Image" },
      ];

      const error = validations.find((validation) => validation.condition);

      if (error) {
        toast.error(error.message);
      } else {
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("gender", gender);
        formData.append("userType", userType);
        formData.append("DOB", date);
        formData.append("email", email);
        formData.append("number", number);
        formData.append("user_Address", user_Address);
        formData.append("postal_code", branch);
        formData.append("coin", parseInt(coin));
        formData.append("image", image1);

        const response = await axios.post(API_ENDPOINT1, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(JSON.stringify(response.data));
        navigate("/users");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleImageSelect1 = (event) => {
    const file = event.target.files[0];
    setImage1(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage1(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ThemeProvider theme={theme}>
          <Container className="addUserContainer">
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
                Add Users
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="firstName"
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
                      name="lastName"
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      autoFocus
                      value={lastName}
                      required
                      onChange={(e) => setlastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <select
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <select
                      id="type"
                      className="form-select"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <option value={""} disabled>
                        Choose Type
                      </option>
                      <option value="PERMANENT">Permanent</option>
                      <option value="TEMPORARY">Temporary</option>
                    </select>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <DesktopDatePicker
                          label="Date"
                          inputFormat="MM/DD/YYYY"
                          required
                          value={date}
                          onChange={DateChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
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
                      value={branch}
                      required
                      onChange={(e) => setBranch(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="user_Address"
                      label="User_Address"
                      name="user_Address"
                      autoComplete="user_Address"
                      required
                      value={user_Address}
                      onChange={(e) => setuser_Address(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      fullWidth
                      id="coin"
                      label="Coin"
                      name="coin"
                      autoComplete="coin"
                      value={coin}
                      required
                      onChange={(e) => setCoin(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="addUserBtn">
                      <button
                        onClick={() =>
                          document.getElementById("imageInput").click()
                        }
                      >
                        Upload Image
                      </button>
                      <input
                        id="imageInput"
                        hidden
                        accept="image/*"
                        multiple={false}
                        type="file"
                        onChange={handleImageSelect1}
                        required
                      />
                      <button type="submit" onClick={() => handleCreateUser()}>
                        Add Users
                      </button>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {selectedImage1 ? (
                    <>
                      <img
                        src={selectedImage1}
                        width="25%"
                        height="300px"
                        style={{ marginTop: "1rem", borderRadius: 10 }}
                      />
                    </>
                  ) : null}
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/users" variant="body2">
                      Back to all Users
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddUser;
