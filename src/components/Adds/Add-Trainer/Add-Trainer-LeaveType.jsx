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
import "./index.css"
import config from "../../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/trainer/leaveType/submit`;
const theme = createTheme();

const AddLeaveType = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();

  const [employee_role, setEmployeeRole] = useState("");
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [carryForwardLeaves, setCarryForwardLeaves] = useState(0);

  const onSubmit = async (data) => {
    event.preventDefault();
    console.log(onSubmit);
    console.log("employee_role =>", employee_role);
    console.log("totalLeaves =>", totalLeaves);
    console.log("carryForwardLeaves =>", carryForwardLeaves);
    var data = new FormData();
    data.append("employee_role", employee_role);
    data.append("totalLeaves", totalLeaves);
    data.append("carryForwardLeaves", carryForwardLeaves);
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
        navigate("/trainer/leaveType");
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
            <Container className="addTrainerContainer">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 6,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Avatar sx={{ m: 1, backgroundColor: "#fd9206" }}>
                  <AddCircleOutlineIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Leave Type
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <div className="addTrainerContent">
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="employee_role"
                        {...register("employee_role", { required: true })}
                        name="employee_role"
                        fullWidth
                        id="employee_role"
                        label="Employee Role"
                        autoFocus
                        required
                        value={employee_role}
                        onChange={(e) => setEmployeeRole(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="totalLeaves"
                        {...register("totalLeaves", { required: false })}
                        name="totalLeaves"
                        fullWidth
                        id="totalLeaves"
                        label="Total Leaves"
                        autoFocus
                        value={totalLeaves}
                        onChange={(e) => setTotalLeaves(e.target.value)}

                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="carryForwardLeaves"
                        label="Carry Forward Leaves"
                        required
                        value={carryForwardLeaves}
                        onChange={(e) => setCarryForwardLeaves(e.target.value)}
                        sx={{ mt: 2 }}

                      />
                    </Grid>
                    <button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Add Leave Type
                    </button>
                    
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/trainer/leaveType" variant="body2">
                          Back to all Leave Type
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

export default AddLeaveType;
