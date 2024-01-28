import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import "./index.css";
import config from "../../../config";
const API_ENDPOINT = `${config.baseURL}${config.apiEndpoint}/addBanner`;

const theme = createTheme();
const AddBanners = () => {
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [image1, setImage1] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();

  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [bannerImage, setbannerImage] = useState("");
  const onSubmit = async () => {
    if (!title) {
      toast.success("Enter banner title");
    } else if (!category) {
      toast.success("Select category");
    } else if (!description) {
      toast.success("Enter banner description");
    } else if (!image1) {
      toast.success("Select banner image");
    } else if (!category) {
      toast.success("Select category");
    } else {

    console.log("Login submit click");
    console.log("title =>", title);
    console.log("category =>", category);
    console.log("bannerImage=>", image1);
    console.log("description=>", description);

    var data = new FormData();
    data.append("image", image1);
    data.append("title", title);
    data.append("category", category);
    data.append("description", description);

    var config = {
      method: "post",
      url: API_ENDPOINT,
      data: data,
    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        console.log(response?.data?.success,'===============')
        if (response?.data?.success == true) {
          navigate("/banners");
        } else {
          toast.success("Something went wrong");
        }
        
      })
      .catch(function (error) {
        window.alert("error");
        console.log(error);
      });
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
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <ThemeProvider theme={theme}>
          <Container className="addUserContainer">
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
                Add Banners
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="title"
                      name="title"
                      fullWidth
                      id="title"
                      label="banner title"
                      required
                      autoFocus
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <select
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="description"
                      id="outlined-multiline-static"
                      multiline
                      rows={10}
                      name="description"
                      label="banner description"
                      className="bannerDescription"
                      required
                      autoFocus
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                    />
                  </Grid>

                  <div className="addBannerBtn">
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
                    <button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => onSubmit()}
                    >
                      Add Banners
                    </button>
                  </div>
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
          </Container>
        </ThemeProvider>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddBanners;
