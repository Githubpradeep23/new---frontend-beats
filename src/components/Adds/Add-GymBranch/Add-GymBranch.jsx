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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Stack from "@mui/material/Stack";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import "./index.css";
import config from "../../../config";
const API_ENDPOINT = `${config.baseURL}${config.apiEndpoint}/addGymBranch`;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const theme = createTheme();
const AddGymBranch = () => {
  let navigate = useNavigate();
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [branchCode, setbranchCode] = useState("");
  const [branchTiming, setbranchTiming] = useState("");
  const [location, setlocation] = useState("");
  const [managerName, setmanagerName] = useState("");
  const [manager_Phone_Number, setmanager_Phone_Number] = useState("");
  const [Image, setimage] = useState("");
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [image1, setImage1] = useState(null);

  const onSubmit = async () => {
    try {
      const validations = [
        { condition: !name, message: "Enter branch name" },
        { condition: !address, message: "Enter branch address" },
        { condition: !city, message: "Enter city" },
        { condition: !phoneNumber, message: "Enter phone number" },
        { condition: !branchCode, message: "Enter branch code" },
        { condition: !location, message: "Enter location" },
        { condition: !managerName, message: "Enter manager name" },
        {
          condition: !manager_Phone_Number,
          message: "Enter manager phone number",
        },
        { condition: !image1, message: "Select Image" },
      ];

      const error = validations.find((validation) => validation.condition);

      if (error) {
        toast.error(error.message);
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("phoneNumber", phoneNumber);
        formData.append("branchCode", branchCode);
        formData.append("location", location);
        formData.append("managerName", managerName);
        formData.append("manager_Phone_Number", manager_Phone_Number);
        formData.append("image", image1); 
        const response = await axios.post(API_ENDPOINT, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const res = JSON.stringify(response?.data)
        console.log(res);
        console.log(response.data?.success);
        if (response?.data?.success === true) {
          toast.success(response.data?.message);
          navigate("/Gym-list");
        } else {
          toast.error(response.data?.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
    });
  }, []);

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
          <Container className="addGymBranchContainer">
            <Box className="addGymBranchContent">
              <Avatar sx={{ m: 1, backgroundColor: "#fd9206" }}>
                <AddCircleOutlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add Gym branch
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      fullWidth
                      id="name"
                      label="Branch Name"
                      autoFocus
                      value={name}
                      required
                      onChange={(e) => setname(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="address"
                      label="Address "
                      name="address"
                      autoComplete="address"
                      required
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="city"
                      name="city"
                      fullWidth
                      id="city"
                      label="City"
                      autoFocus
                      value={city}
                      required
                      onChange={(e) => setcity(e.target.value)}
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
                      autoComplete="phoneNumber"
                      name="phoneNumber"
                      fullWidth
                      id="phoneNumber"
                      label="GYM Phone Number"
                      autoFocus
                      required
                      value={phoneNumber}
                      onChange={(e) => setphoneNumber(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="branchCode"
                      name="branchCode"
                      fullWidth
                      id="branchCode"
                      label="Branch Code"
                      autoFocus
                      required
                      value={branchCode}
                      onChange={(e) => setbranchCode(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="location"
                      name="location"
                      fullWidth
                      id="location"
                      label="Location"
                      autoFocus
                      value={location}
                      required
                      onChange={(e) => setlocation(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="managerName"
                      name="managerName"
                      fullWidth
                      id="managerName"
                      label="Manager Name"
                      autoFocus
                      required
                      value={managerName}
                      onChange={(e) => setmanagerName(e.target.value)}
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
                      autoComplete="manager_Phone_Number"
                      name="manager_Phone_Number"
                      fullWidth
                      id="manager_Phone_Number"
                      label="Manager Phone Number"
                      autoFocus
                      required
                      value={manager_Phone_Number}
                      onChange={(e) => setmanager_Phone_Number(e.target.value)}
                    />
                  </Grid>
                  <div className="addGymBtnSection">
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
                    <button type="submit" onClick={() => onSubmit()}>
                      Add Gym branch
                    </button>
                  </div>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/Gym-list" variant="body2">
                        Back to gym branch
                      </Link>
                    </Grid>
                  </Grid>
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
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddGymBranch;
