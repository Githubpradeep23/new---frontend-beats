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
import { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import "./index.css";
import config from "../../../config";
const API_ENDPOINT = `${config.baseURL}${config.apiEndpoint}/addCopuan`;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const theme = createTheme();
const AddCoupan = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();

  const [title, settitle] = useState("");
  const [copuanCode, setCopuanCode] = useState("");
  const [discountpercentage, setDiscountpercentage] = useState("");
  const [expireAt, setExpireAt] = useState(null);
  const [discountAmount, setDiscountAmount] = useState("");

  const onSubmit = async () => {
    if (!title) {
      toast.error("Enter coupon title");
    } else if (!discountpercentage) {
      toast.error("Enter coupon discount percentage");
    } else if (!discountAmount) {
      toast.error("Enter coupon discount amount");
    } else if (!copuanCode) {
      toast.error("Enter coupon code");
    } else if (!expireAt) {
      toast.error("Enter coupon expiry");
    } else {
      var data = JSON.stringify({
        copuanCode: copuanCode,
        copuanTitle: title,
        discount_percentage: discountpercentage,
        expireAt: expireAt,
        discount_amount: discountAmount,
      });

      var config = {
        method: "post",
        url: API_ENDPOINT,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          console.log(response.data?.success === true);
          if (response.data?.success === true) {
            toast.error("Coupon created successfully");
            navigate("/coupan");
          } else {
            toast.error("Coupon created successfully");
          }
        })
        .catch(function (error) {
          window.alert("error");
          console.log(error);
        });
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ThemeProvider theme={theme}>
          <Container>
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
                Add Coupon
              </Typography>

              <Box sx={{ mt: 3 }}>
                <div className="addCouponContainer">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="title"
                      fullWidth
                      id="title"
                      label="Coupon Title"
                      autoFocus
                      required
                      onChange={(e) => settitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="discountpercentage"
                      fullWidth
                      id="discountpercentage"
                      label="Discount Precentage"
                      autoFocus
                      onChange={(e) => setDiscountpercentage(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="discountAmount"
                      fullWidth
                      id="discountAmount"
                      label="Discount Amount"
                      autoFocus
                      onChange={(e) => setDiscountAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="copuanCode"
                      fullWidth
                      id="copuanCode"
                      label="Coupon Code"
                      autoFocus
                      required
                      onChange={(e) => setCopuanCode(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="date"
                      autoComplete="given-name"
                      name="expireAt"
                      fullWidth
                      id="expireAt"
                      label="Expired At"
                      autoFocus
                      required
                      onChange={(e) => {
                        console.log(`Value changed ${e.target.value}`);
                        setExpireAt(e.target.value);
                      }}
                    />
                  </Grid>
                  <div className="addCouponBtn">
                    <button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => onSubmit()}
                    >
                      Add Coupon
                    </button>
                  </div>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/coupan" variant="body2">
                        Back to coupons
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCoupan;
