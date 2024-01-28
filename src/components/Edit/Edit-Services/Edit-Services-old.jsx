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

const theme = createTheme();


const EditServices = ({ route }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    let navigate = useNavigate();
    const [title, settitle] = useState("");
    const [category, setcategory] = useState("");
    const [branch, setbranch] = useState("");

    const [image, setimage] = useState(null);
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");

    const [Id, setIds] = useState("")
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
        setprice(routeLocation.state.gym.price)
        settitle(routeLocation.state.gym.title)
        setcategory(routeLocation.state.gym.category)
        setbranch(routeLocation.state.gym.branch)

        // setimage(routeLocation.state.gym.image)
    }, [])


    const onSubmit = async (data) => {
        //event.preventDefault();
        // console.log("Login submit click");
        // console.log("Ids of user =>", Id)
        // console.log("User =>", title)
        // console.log("category =>", category)

        // console.log("Image",image )
        var data = new FormData();
        data.append('id', Id);
        data.append('image', image);
        data.append('title', title);
        data.append('category', category);
        data.append('branch', branch);

        data.append('description', description);
        data.append('price', price);


        var config = {
            method: 'put',
            url: 'http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/updateGymSevice',
            headers: { "Content-Type": "multipart/form-data" },

            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.alert("success")
                navigate('/services')
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
                          Edit Branch service
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
                                        value={title}
                                        onChange={(e) => settitle(e.target.value)}
                                   required
                                        // value={student.title}
                                    />
                                    {/* {errors.title && <p style={{ color: "red" }}> User Name is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <select
                                        {...register("category", { required: true })}
                                        id="category"
                                        className="form-select"
                                        value={category}
                                        onChange={(e) => setcategory(e.target.value)}
                                    >
                                        <option value={""} disabled>
                                            Choose category
                                        </option>
                                        <option value="fitness">Fitness</option>
                                        <option value="wellness">Wellness</option>
                                        <option value="academy">Academy</option>
                                    </select>
                                    {/* <TextField
                                        {...register("category", { required: true })}

                                        fullWidth
                                        id="category"
                                        label="category "
                                        name="category"
                                        autoComplete="category"
                                        value={category}
                                        onChange={(e) => setcategory(e.target.value)}
                                    /> */}
                                    {/* {errors.category && <p style={{ color: "red" }}> User category is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <select
                                        {...register("branch", { required: true })}
                                        id="branch"
                                        className="form-select"
                                        value={branch}
                                        onChange={(e) => setbranch(e.target.value)}
                                    >
                                        <option value={""} disabled>
                                            Choose branch
                                        </option>
                                        <option value="safoora">Safoora</option>
                                        <option value="gulshan">Gulshan</option>
                                        <option value="saddar">Saddar</option>
                                    </select>
                               
                                    {errors.category && <p style={{ color: "red" }}> User category is required</p>}

                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        {...register("description", { required: true })}

                                        id="outlined-multiline-static"
                                        multiline
                                        rows={6}
                                        label="description"
                                        name="description"
                                        autoComplete="description"
                                        value={description}
                                        onChange={(e) => setdescription(e.target.value)}
                                        required
                                    // value={student.category}
                                    />
                                    {/* {errors.description && <p style={{ color: "red" }}> description Name is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        {...register("price", { required: true })}

                                        fullWidth
                                        id="price"
                                        label="price"
                                        name="price"
                                        autoComplete="price"
                                        value={price}
                                        onChange={(e) => setprice(e.target.value)}
                                        required
                                    // value={student.category}
                                    />
                                    {/* {errors.price && <p style={{ color: "red" }}> price  is required</p>} */}

                                </Grid>


                                <Grid item xs={12} sm={6}>
                                    <Button variant="contained" component="label">
                                        Upload
                                        <input hidden accept="image/*"
                                            {...register("image", { required: true })}

                                            multiple type="file"
                                            //  value={image}
                                        
                                            onChange={(e) => setimage(e.target.files[0])}
                                        />
                                    </Button>
                                    {errors.image && <p style={{ color: "red" }}> image  is required</p>}



                                </Grid>



                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                // onClick={handleSubmit}

                                >
                                    Edit Branch services
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/services" variant="body2">
                                            Back to services
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

export default EditServices;
