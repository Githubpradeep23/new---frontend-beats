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
import { useNavigate, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import FormGroup from "@mui/material/FormGroup";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Tooltip from "@mui/material/Tooltip";
// import '../Add-Voucher/add-voucher.css'
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/addCopuan`;

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import config from "../../../config";

const theme = createTheme();
const AddVoucher = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // ===========================================================

  // ================================

  let navigate = useNavigate();

  const onSubmit = async (data) => {
    //        event.preventDefault();
    console.log("On submit hittttt");
    console.log("titlees ==>", title);
    console.log("count ===> ", count);
    console.log("packageDuration ===> ", packageDuration * 24 * 60);
    console.log("packageDurationhour ===> ", packageDurationhour * 60);
    console.log("id  ===> ", Id);
    console.log("expireTime ==>", expireTime);
    var data = JSON.stringify({
      copuanTitle: title,
      // "discount_percentage": parseInt(count),
      discount_percentage: packageDuration * 24 * 60 + packageDurationhour * 60,
      user_id: Id,
      expirationTime: parseInt(expireTime),
    });

    var config = {
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
        alert("success");
      })
      .catch(function (error) {
        console.log(error);
        alert("fail");
      });
  };
  const [Id, setIds] = useState();
  const [packageDuration, setPackageDuration] = useState();
  const [packageDurationhour, setPackageDurationHour] = useState();
  const routeLocation = useLocation();
  useEffect(() => {
    console.log("location of service", routeLocation.state.gym);
    setIds(routeLocation.state.gym.id);
  }, []);

  const [count, setCount] = useState(0);
  const [title, settitle] = useState("");
  const IncNum = () => {
    // setCount(count + 1);
    if (count < 100) setCount(count + 1);
    else {
      setCount(100);
      alert("max limit reached");
    }
  };
  const DecNum = () => {
    if (count > 0) setCount(count - 1);
    else {
      setCount(0);
      alert("min limit reached");
    }
  };
  const [expireTime, setExpireTime] = React.useState(
    dayjs("2014-08-18T21:11:54")
  );
  const [expireTimes, setExpireTimes] = React.useState(
    dayjs("2014-08-18T21:11:54")
  );

  const handleChangeTIme = (newValue) => {
    const time = newValue;
    setExpireTime(time * 24 * 60);
    setExpireTimes(newValue);
  };

  let durationArrayDays = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  let durationArrayHour = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23,
  ];

  //   const selectHour =(newValue,)=>{
  //      console.log(newValue)
  //     //  const time= (newValue);
  //     //  const times = parseInt(time)
  //     //  setPackageDurationHour(newValue)
  //     //  setPackageDurationHour(newValue*60)

  //   }

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
              Add Coupon
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="title"
                    fullWidth
                    id="firstName"
                    label="Copuan Title"
                    autoFocus
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={16} ml={-2}>
                  <div>
                    <h1> Discount Percentage </h1>
                    <h2>{count} %</h2>
                    <div className="btn_div">
                      <Tooltip title="Delete">
                        <Button onClick={IncNum}>
                          <AddIcon />
                        </Button>
                      </Tooltip>

                      <Button onClick={DecNum}>
                        <RemoveCircleIcon />
                      </Button>
                    </div>
                  </div>
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3} mt={3}>
                    {/* <DateTimePicker
                                            label="expirationTime"
                                            value={expireTimes}
                                            onChange={handleChangeTIme}
                                            renderInput={(params) => <TextField {...params} />}
                                        /> */}
                    <Grid>
                      <select
                        id="d"
                        className="form-select"
                        value={packageDuration}
                        onChange={(e) => {
                          setPackageDuration(e.target.value);
                          // console.log(e.target.value)
                        }}
                      >
                        <option value={""} disabled>
                          Duration
                        </option>

                        {durationArrayDays.map((x) => {
                          return <option value={x}>{x} day</option>;
                        })}
                      </select>
                    </Grid>

                    <Grid>
                      <select
                        id="h"
                        className="form-select"
                        value={packageDurationhour}
                        onChange={(e) => {
                          setPackageDurationHour(e.target.value);
                          //   console.log(e.target.value)
                        }}
                        // onChange={setPackageDurationHour(e.target.value)}
                      >
                        <option value={""} disabled>
                          Duration
                        </option>

                        {durationArrayHour.map((x) => {
                          return <option value={x}>{x} hour</option>;
                        })}
                      </select>
                    </Grid>
                  </Stack>
                </LocalizationProvider>

                <Button
                  type="Add Voucher"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // onClick={handleSubmit}
                >
                  Add Coupon
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/users" variant="body2">
                    Back to Users
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

export default AddVoucher;
