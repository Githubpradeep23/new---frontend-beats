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
const API_ENDPOINT = `${config.baseURL}${config.apiEndpoint}/getUsers/ALL`;
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllGymService`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/cms/enquiry`;

const theme = createTheme();

const AddEnquiry = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();

  const [source, setSource] = useState("");
  const [user, setUser] = useState("");
  const [gymService, setGymService] = useState("");
  const [remarks, setRemarks] = useState("");
  const [allUsers, setAllUsers] = useState("");
  const [allServices, setAllServices] = useState("");

  const getUsers = async () => {
    let res = await axios.get(
      API_ENDPOINT
    );

    console.log("responce=============->", res.data.users);

    const modifiedData = res.data.users.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          userName: current.firstName + (current.lastName ?? ""),
          email: current.email,
          clientNumber: current.number,
          id: current._id,
        },
      ],
      []
    );
    setAllUsers(modifiedData);
  };

  const getGymService = async () => {
    let res = await axios.get(
      API_ENDPOINT1
    );

    console.log("responce=============->", res.data.data);

    const modifiedData = res.data.data.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          id: current._id,
        },
      ],
      []
    );
    setAllServices(modifiedData);
  };

  useEffect(() => {
    getUsers();
    getGymService();
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log("source =>", source);
    console.log("user =>", user);
    console.log("remarks =>", remarks);
    console.log("gymService =>", gymService);
    var data = new FormData();
    data.append("source", source);
    data.append("user", user);
    data.append("remarks", remarks);
    data.append("gymService", gymService);
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
        navigate("/cms/enquiry");
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
                <Avatar sx={{ m: 1, backgroundColor: "#fd9206" }}>
                  <AddCircleOutlineIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Cms Enquiry Record
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <div className="AddEnquiryContent">
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="source"
                        {...register("source", { required: true })}
                        name="source"
                        fullWidth
                        id="source"
                        label="Source"
                        autoFocus
                        required
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        {...register("users", { required: true })}
                        id="user"
                        className="form-select"
                        value={user}
                        onChange={(e) => {
                          setUser(e.target.value);
                        }}
                      >
                        <option value={""} disabled>
                          Choose User
                        </option>

                        {allUsers.length &&
                          allUsers?.map((x, key) => {
                            return (
                              <option key={key} value={x.id}>
                                {x.userName}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <select
                        {...register("service", { required: true })}
                        id="gymService"
                        className="form-select"
                        value={gymService}
                        onChange={(e) => {
                          setGymService(e.target.value);
                        }}
                      >
                        <option value={""} disabled>
                          Choose Service
                        </option>

                        {allServices.length &&
                          allServices?.map((x, key) => {
                            return (
                              <option key={key} value={x.id}>
                                {x.title}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="remarks"
                        {...register("remarks", { required: true })}
                        name="remarks"
                        fullWidth
                        id="remarks"
                        label="Remarks"
                        autoFocus
                        required
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                      />
                    </Grid>
                    <button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Add Enquiry
                    </button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/cms/enquiry" variant="body2">
                          Back to all Enquiries Records
                        </Link>
                      </Grid>
                    </Grid>
                  </div>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </form>
      </div>
    </div>
  );
};

export default AddEnquiry;
