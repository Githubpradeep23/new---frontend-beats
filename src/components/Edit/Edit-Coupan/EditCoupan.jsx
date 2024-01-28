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
import moment from "moment";
import id from "date-fns/esm/locale/id/index.js";
import config from "../../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/updateCopuan`;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const theme = createTheme();

const EditCoupan = ({ route }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();
  const [title, settitle] = useState("");
  const [copuanCode, setCopuanCode] = useState("");
  const [discountpercentage, setDiscountpercentage] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [expireAt, setExpireAt] = useState(null);
  const [Id, setIds] = useState("");
  const params = new URLSearchParams(window.location.search);
  for (const param of params) {
    console.log(param);
    // setIds(param)
  }
  const routeLocation = useLocation();
  useEffect(() => {
    // console.log(routeLocation.state.gym);
    setIds(routeLocation.state.coupan.id);
    settitle(routeLocation.state.coupan.copuanTitle);
    setCopuanCode(routeLocation.state.coupan.copuanCode);
    setDiscountpercentage(routeLocation.state.coupan.discount_percentage ?? "");
    setDiscountAmount(routeLocation.state.coupan.discount_amount ?? "");
    setExpireAt(routeLocation.state.coupan.expireAt);
  }, []);

  const onSubmit = async (data) => {
    event.preventDefault();
    var data = JSON.stringify({
      id: Id,
      copuanCode: copuanCode,
      copuanTitle: title,
      discount_percentage: discountpercentage,
      expireAt: expireAt,
      discount_amount: discountAmount,
    });
    console.log({ data });
    var config = {
      method: "put",
      url: API_ENDPOINT1,
      headers: { "Content-Type": "application/json" },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(response?.data[0]?.res, "==================");
        if (response?.data[0]?.res === "success") {
          toast.success("Coupon update succesfully");
          navigate("/coupan");
        } else {
          toast.success("Coupon not update");
        }
      })
      .catch(function (error) {
        window.alert("error");
        console.log(error);
      });
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
              Edit Coupon
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="title"
                    fullWidth
                    id="title"
                    label="Coupon Title"
                    autoFocus
                    value={title}
                    required
                    onChange={(e) => settitle(e.target.value)}
                    // value={student.title}
                  />
                  {/* {errors.title && (
                    <p style={{ color: "red" }}> Title is required</p>
                  )} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="discountpercentage"
                    fullWidth
                    id="discountpercentage"
                    label="Discount Precentage"
                    autoFocus
                    value={discountpercentage}
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
                    value={discountAmount}
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
                    value={copuanCode}
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
                    value={moment(expireAt).format("YYYY-MM-DD")}
                    required
                    onChange={(e) => {
                      console.log(`Value changed ${e.target.value}`);
                      setExpireAt(e.target.value);
                    }}
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Edit Coupon
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/coupan" variant="body2">
                      Back to coupans
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <ToastContainer />
      </ThemeProvider>
    </form>
  );
};

export default EditCoupan;
