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

const UpdateHrDiscountStatus = ({ route }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    const [status, setStatus] = useState("");
    const [discountId, setDiscountId] = useState("");

    const routeLocation = useLocation();

    useEffect(() => {
        console.log(routeLocation.state.discount);
        setDiscountId(routeLocation.state.discount.id);
        setStatus(routeLocation.state.discount.status);
    }, []);

      const onSubmit = async (data) => {
        console.log("status =>", status)
        var data = new FormData();
        data.append("status", status);

        const res = await axios.put(
            `http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/hr/discount/${discountId}/status`,
            data
          );
          console.log("responce",res);
          if (res.status === 200) {
            window.alert("success")
            navigate('/hr/discount')
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
                        Update Hr Discount Status
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
                                    <option value="PENDING">Pending</option>
                                    <option value="APPROVED">Approved</option>
                                    <option value="DECLINED">Declined</option>
                                </select>
                            </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update Hr Discount Status
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/hr/discount" variant="body2">
                                        Back to all Discounts
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

export default UpdateHrDiscountStatus;