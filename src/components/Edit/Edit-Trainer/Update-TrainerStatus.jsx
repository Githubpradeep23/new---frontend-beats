import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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

const theme = createTheme();

const UpdateTrainerStatus = ({ route }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    const [status, setStatus] = useState("");
    const [leaveId, setLeaveId] = useState("");
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
        console.log(routeLocation.state.leave);
        setLeaveId(routeLocation.state.leave.id);
        setStatus(routeLocation.state.leave.status);
    }, []);

      const onSubmit = async (data) => {
        console.log("status =>", status)
        var data = new FormData();
        data.append("status", status);

        const res = await axios.put(
            `http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/trainer/leave/${leaveId}/status`,
            data
          );
          console.log("responce",res);
          if (res.status === 200) {
            window.alert("success")
            navigate('/trainer/leaves')
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
                        Update Trainer Leave Status
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <select
                                    id="status"
                                    className="form-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value={""} disabled>
                                    Choose Status
                                    </option>
                                    <option value="APPROVED">Approved</option>
                                    <option value="DECLINED">Declined</option>
                                </select>
                                {errors.gender && (
                                    <p style={{ color: "red" }}>status is required</p>
                                )}
                            </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update Leave Status
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/trainer/leaves" variant="body2">
                                        Back to all Leaves
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

export default UpdateTrainerStatus;