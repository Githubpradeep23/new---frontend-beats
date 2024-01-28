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
import config from "../../../config";
const API_ENDPOINT = `${config.baseURL}${config.apiEndpoint}/updateBanner`;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const theme = createTheme();

const EditBanners = ({ route }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [bannerImage, setbannerImage] = useState(null);
  const [Id, setIds] = useState("");
  const params = new URLSearchParams(window.location.search);
  for (const param of params) {
    console.log(param);
    // setIds(param)
  }
  const routeLocation = useLocation();
  useEffect(() => {
    console.log(routeLocation.state.gym);
    setIds(routeLocation.state.gym.id);

    settitle(routeLocation.state.gym.title);
    setcategory(routeLocation.state.gym.category);
    setdescription(routeLocation.state.gym.description);
    setbannerImage(routeLocation.state.gym.bannerImage);
  }, []);

  const onSubmit = async (data) => {
    // event.preventDefault();
    // console.log("Login submit click");
    console.log("Ids of user =>", Id);
    console.log("User =>", title);
    console.log("category =>", category);

    console.log("Image", bannerImage);
    var data = new FormData();
    data.append("id", Id);
    data.append("image", bannerImage);
    data.append("title", title);
    data.append("category", category);
    data.append("description", description);

    var config = {
      method: "put",
      url: API_ENDPOINT,
      headers: { "Content-Type": "multipart/form-data" },

      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.alert("success")
        navigate('/banners')
      })
      .catch(function (error) {
        window.alert("error")
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
              Edit Banners
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="title"
                    {...register("title", { required: true })}
                    fullWidth
                    id="title"
                    label="Banner Title"
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
                    name="description"
                    {...register("description", { required: true })}
                    id="outlined-multiline-static"
                                        multiline
                                        rows={9}
                    label="Banner description"
                    autoFocus
                    required
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    // value={student.title}
                  />
                  {/* {errors.description && (
                    <p style={{ color: "red" }}> Discritpion is required</p>
                  )} */}
                </Grid>
                <Grid item xs={12} sm={6} mt={-24}>
                  {/* <TextField
                                        {...register("category", { required: true })}

                                        fullWidth
                                        id="category"
                                        label="category Address"
                                        name="category"
                                        autoComplete="category"
                                        value={category}
                                        onChange={(e) => setcategory(e.target.value)}
                                    /> */}
                  <select
                    {...register("category", { required: true })}
                    id="category"
                    className="form-select"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                  >
                    <option value={""} disabled>
                      Choose Category
                    </option>
                    <option value="fitness">Fitness</option>
                    <option value="wellness">Wellness</option>
                    <option value="academy">Academy</option>
                  </select>
                  {errors.category && (
                    <p style={{ color: "red" }}> category Name is required</p>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} mt={-6.5}  mr={2}>
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      hidden
                      accept="image/*"
                      {...register("bannerImage", { required: true })}
                      multiple
                      type="file"
                      //  value={bannerImage}
                      onChange={(e) => setbannerImage(e.target.files[0])}
                    />
                  </Button>
                  {errors.bannerImage && (
                    <p style={{ color: "red" }}> bannerImage is required</p>
                  )}
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // onClick={handleSubmit}
                >
                  Edit Banner
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/banners" variant="body2">
                      Back to banners
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

export default EditBanners;
