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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import config from "../../../config";

const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/updateTestimonial`;
const theme = createTheme();


const EditTestimonial = ({ route }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    let navigate = useNavigate();
    const [title, settitle] = useState("");
    const [category, setcategory] = useState("");
    const [description, setdescription] = useState("");
    const [customerName, setcustomerName] = useState("");
    const [youtubeLink, setyoutubeLink] = useState(null);

    const [rating, setrating] = useState("");
    const [testimonialImage, settestimonialImage] = useState(null);
    const [Id, setIds] = useState("")
    const [selectedFile, setSelectedFile] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const validateSelectedFile = () => {
        const MIN_FILE_SIZE = 1024 // 1MB
        const MAX_FILE_SIZE = 5120 // 5MB

        if (!selectedFile) {
            setErrorMsg("Please choose a file");
            setIsSuccess(false)
            return
        }

        const fileSizeKiloBytes = selectedFile.size / 1024

        if (fileSizeKiloBytes < MIN_FILE_SIZE) {
            setErrorMsg("File size is less than minimum limit");
            setIsSuccess(false)
            return
        }
        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            setErrorMsg("File size is greater than maximum limit");
            setIsSuccess(false)
            return
        }

        setErrorMsg("")
        setIsSuccess(true)
    };
    const params = new URLSearchParams(window.location.search)
    for (const param of params) {
        console.log(param)
        // setIds(param)
    }
    const routeLocation = useLocation();
    useEffect(() => {
        console.log(routeLocation.state.gym)
        setIds(routeLocation.state.gym.id)
        setdescription(routeLocation.state.gym.description)
        setcustomerName(routeLocation.state.gym.customerName)
        setrating(routeLocation.state.gym.rating)
        settitle(routeLocation.state.gym.title)
        setcategory(routeLocation.state.gym.category)
        setyoutubeLink(routeLocation.state.gym.youtube_link)
        // settestimonialImage(routeLocation.state.gym.testimonialImage)
    }, [])


    const onSubmit = async (data) => {

        // console.log("Login submit click");
        console.log("Ids of user =>", Id)
        console.log("User =>", title)
        console.log("category =>", category)

        console.log("Image", testimonialImage)
        var data = new FormData();
        data.append('id', Id);
        data.append('image', selectedFile);
        data.append('title', title);
        data.append('category', category);
        data.append('description', description);
        data.append('customerName', customerName);
        data.append('rating', rating);
        data.append("youtube_link", youtubeLink);


        var config = {
            method: 'put',
            url: API_ENDPOINT1,
            headers: { "Content-Type": "multipart/form-data" },

            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));

                if (response.status === 200) {
                    alert('Testimoneal Updated Successfully')
                    navigate('/testimonials')
                } else {
                    alert('something went wrong')
                }
            })
            .catch(function (error) {
                window.alert("error")
                console.log(error);
            });
    }


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
                            Edit Testimonials
                        </Typography>

                        <Box

                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="title"
                                        {...register("title", { required: true })}

                                        fullWidth
                                        id="firstName"
                                        label="User Name"
                                        autoFocus
                                        required
                                        value={title}
                                        onChange={(e) => settitle(e.target.value)}
                                    // value={student.title}
                                    />
                                    {/* {errors.title && <p style={{ color: "red" }}> User Name is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <select
                                        {...register("category")}
                                        id="category"
                                        required
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
                                    {/* {errors.category && <p style={{ color: "red" }}> category Name is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={15}>

                                    {/* {errors.description && <p style={{ color: "red" }}> description is required</p>} */}
                                    <textarea name="Text1" cols="60" rows="5" value={description}
                                        onChange={(e) => setdescription(e.target.value)} required>{description}</textarea>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        {...register("customerName")}

                                        fullWidth
                                        id="customerName"
                                        required
                                        label="customerName"
                                        name="customerName"
                                        autoComplete="customerName"
                                        value={customerName}
                                        onChange={(e) => setcustomerName(e.target.value)}
                                    // value={student.category}
                                    />
                                    {/* {errors.customerName && <p style={{ color: "red" }}>  customerName is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        {...register("youtubeLink", { required: false })}
                                        fullWidth
                                        id="youtubeLink"
                                        label="youtubeLink"
                                        name="youtubeLink"
                                        autoComplete="youtubeLink"
                                        value={youtubeLink}
                                        onChange={(e) => setyoutubeLink(e.target.value)}
                                    // value={student.category}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        {...register("rating")}
                                        inputProps={{
                                            inputMode: 'numeric', pattern: '[1-5]*',
                                            maxLength: 5,
                                            minLength: 1,
                                        }}
                                        fullWidth
                                        id="rating"
                                        required
                                        label="rating"
                                        name="rating"
                                        autoComplete="rating"
                                        value={rating}
                                        onChange={(e) => setrating(e.target.value)}
                                    // value={student.category}
                                    />
                                    {/* {errors.rating && <p style={{ color: "red" }}> rating  is required</p>} */}

                                </Grid>

                                {/* <Grid item xs={12} sm={6}>
                                    <Button variant="contained" component="label">
                                        Upload Image
                                        <input hidden accept="image/*"
                                                                                {...register("testimonialImage", { required: true })}

                                            multiple type="file"
                                            //  value={testimonialImage}
                                            onChange={(e) => settestimonialImage(e.target.files[0])}
                                        />
                                    </Button>
                                    {errors.testimonialImage && <p style={{ color: "red" }}> Image is required</p>}



                                </Grid> */}

                                <div className="App-container" style={{ border: "1px solid lightgray", width: "70", marginLeft: "4%", marginTop: "5%" }}>
                                    <div className="card">
                                        <div className="card-header">
                                        <label>Image</label>
                                        </div>

                                        <div className="card-body">
                                            <p className="label">Choose File</p>
                                            <input
                                                type="file"
                                                name='file'
                                                
                                                onChange={handleFileChange}
                                            />

                                           
                                            {isSuccess ? <p className="success-message">Validation successful</p> : null}
                                            <p className="error-message">{errorMsg}</p>

                                            {/* <button className="btn" onClick={validateSelectedFile}>
                                                Submit
                                            </button> */}
                                        </div>
                                    </div>
                                </div>



                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                // onClick={handleSubmit}

                                >
                                    edit Testimonials
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/testimonials" variant="body2">
                                            Back to testimonials
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </form>
    );
};

export default EditTestimonial;
