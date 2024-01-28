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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Stack from '@mui/material/Stack';
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/editUser`;
const theme = createTheme();

const EditUser = ({ route }) => {
  let navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [coin, setcoin] = useState("");
  const [branch, setbranch] = useState("");
  const [user_Address, setUser_Address] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [userType, setUserType] = useState("");
  const [Id, setIds] = useState("");
  const [date, setDate] = React.useState(dayjs("2014-08-18T21:11:54"));
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [image1, setImage1] = useState(null);
  const DateChange = (newValue) => {
    setDate(newValue);
  };

  const params = new URLSearchParams(window.location.search);
  for (const param of params) {
    console.log(param);
  }
  const routeLocation = useLocation();
  useEffect(() => {
    setIds(routeLocation.state.gym.id);
    setnumber(routeLocation.state.gym.number);
    setcoin(routeLocation.state.gym.coin);
    setUser_Address(routeLocation.state.gym.user_Address);
    setbranch(routeLocation.state.gym.postal_code);
    setfirstName(routeLocation.state.gym.firstName);
    setemail(routeLocation.state.gym.email);
    setImage1(routeLocation.state.gym.Image);
    setDate(routeLocation.state.gym.Date);
    setlastName(routeLocation.state.gym.lastName);
    setgender(routeLocation.state.gym.gender);
    setUserType(routeLocation.state.gym.userType);
  }, []);

  const onSubmit = async (data) => {
    console.log("Login submit click");
    console.log("Ids of user =>", Id);
    console.log("firstName =>", firstName);
    console.log("number =>", number);
    console.log("coin =>", coin);
    console.log("branch =>", branch);
    console.log("postal_code =>", user_Address);
    console.log("Image =>", Image);

    var data = new FormData();
    data.append("id", Id);
    data.append("profilePicture", Image);
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("gender", gender);
    data.append("userType", userType);
    data.append("DOB", date);
    data.append("email", email);
    data.append("number", number);
    data.append("user_Address", user_Address);
    data.append("postal_code", branch);
    data.append("coin", coin);

    console.log("data dek loo =>", data)

    const res = await axios.put(
      "http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/editUser",
      data
    );
    console.log("responce",res);
    if (res.status === 200) {
      window.alert("success")
      navigate("/users");
    } else{
      window.alert("fail")

      console.log("error");
  
    } 
      
  };

  const handleUpdate = async () => {
    try {
      event.preventDefault();
         var formData = new FormData();
         formData.append("id", Id);
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
        // formData.append("profilePicture", image1);

        const response = await axios.put(API_ENDPOINT1, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(JSON.stringify(response.data));
        navigate("/users");
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
              Edit User
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="Fisrt Name"
                    autoFocus
                    value={firstName}
                    required
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="Last Name"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoFocus
                    required
                    value={lastName}
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
                      Choose Gender
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
                    onChange={(e) => setUserType(e.target.value)}>
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
                        value={date}
                        onChange={DateChange}
                        renderInput={(params) => <TextField {...params} />}
                 />
                    </Stack>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="user_Address"
                    label="User Address"
                    name="User Address"
                    autoComplete="User Address"
                    value={user_Address}
                    onChange={(e) => setUser_Address(e.target.value)}
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
                    fullWidth
                    required
                    id="number"
                    label="Number"
                    name="Number"
                    autoComplete="Number"
                    value={number}
                    onChange={(e) => setnumber(e.target.value)}
                  />
                 
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="coin"
                    label="Coin"
                    name="Coin"
                    autoComplete="Coin"
                    value={coin}
                    onChange={(e) => setcoin(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 
                  maxLength: 6,
                  minLength: 6,
                                                         
             }}
                    fullWidth
                    id="branch"
                    label="Postal Code"
                    name="Branch"
                    autoComplete="Branch"
                    value={branch}
                    onChange={(e) => setbranch(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button  onClick={() =>
                          document.getElementById("imageInput").click()
                        } variant="contained" component="label">
                    Upload Image
                    <input
                        id="imageInput"
                        hidden
                        accept="image/*"
                        multiple={false}
                        type="file"
                        onChange={handleImageSelect1}
                        required
                      />
                  </Button>
                  <img src={selectedImage1} style={{ width: 100, height: 100 }} />
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={()=>handleUpdate()}
                >
                  edit User
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/users" variant="body2">
                      Back to all Users
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <ToastContainer />
      </ThemeProvider>
  );
};

export default EditUser;
