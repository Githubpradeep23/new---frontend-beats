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
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import dayjs from "dayjs";

const theme = createTheme();

const EditBilling = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    const [pack, setPack] = useState("");
    const [user, setUser] = useState("");
    const [userName, setUserName] = useState(""); 
    const [gymService, setGymService] = useState("");
    const [gymServiceTitle, setGymServiceTitle] = useState("");
    const [activeFrom, setActiveFrom] = useState("");
    const [activeTo, setActiveTo] = useState("");
    const [totalFee, setTotalFee] = useState("");
    const [paidFee, setPaidFee] = useState("");
    const [feeDue, setFeeDue] = useState("");
    const [remarks, setRemarks] = useState("");
    const [allUsers, setAllUsers] = useState("");
    const [allServices, setAllServices] = useState("");
    const [billingId, setBillingId] = useState("");

    const getUsers = async () => {
        let res = await axios.get(
          "http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/getUsers/ALL"
        );
    
        console.log("responce=============->", res.data.users);
    
        const modifiedData = res.data.users.reduce(
          (prev, current) => [
            ...prev,
            {
              ...current,
              userName: current.firstName + (current.lastName ?? ''),
              email: current.email,
              clientNumber: current.number,
              id: current._id
            },
          ],
          []
        );
        setAllUsers(modifiedData);
      };

    const getGymService = async () => {
        let res = await axios.get(
          "http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/getAllGymService"
        );
    
        console.log("responce=============->", res.data.data);
    
        const modifiedData = res.data.data.reduce(
          (prev, current) => [
            ...prev,
            {
              ...current,
              id: current._id
            },
          ],
          []
        );
        setAllServices(modifiedData);
      };

      useEffect(() => {
        getUsers();
        getGymService()
      }, []);
    
    const routeLocation = useLocation();

    useEffect(() => {
        console.log(routeLocation.state.billing);
        setBillingId(routeLocation.state.billing.id);
        setPack(routeLocation.state.billing.package);
        setActiveFrom(routeLocation.state.billing.activeFrom);
        setActiveTo(routeLocation.state.billing.activeTo);
        setTotalFee(routeLocation.state.billing.totalFee);
        setPaidFee(routeLocation.state.billing.paidFee);
        setFeeDue(routeLocation.state.billing.feeDue);
        setRemarks(routeLocation.state.billing.remarks);
        setUser(routeLocation.state.billing.userId  || '');
        setUserName(routeLocation.state.billing.userName  || '');
        setGymServiceTitle(routeLocation.state.billing.serviceName  || '');
        setGymService(routeLocation.state.billing.serviceId  || '');
    }, []);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log("pack =>", pack)
        console.log("user =>", user)
        console.log("activeFrom =>", activeFrom)
        console.log("activeTo =>", activeTo)
        console.log("totalFee =>", totalFee)
        console.log("gymService =>", gymService)
        var data = new FormData();
        data.append("billingId", billingId)
        data.append("package", pack);
        data.append("user",user);
        data.append("activeFrom", activeFrom);
        data.append("activeTo",activeTo);
        data.append("totalFee",totalFee);  
        data.append("paidFee", paidFee);
        data.append("feeDue",feeDue);
        data.append("remarks",remarks);  
        data.append("gymService",gymService);  
        let config = {
        method: 'put',
        url: 'http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/cms/billing',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.alert("success")
            navigate('/cms/billing')
        })
        .catch(function (error) {
            console.log(error);
            window.alert("fail")
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
                        Update Cms Billing Record
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="pack"
                                    name="package"
                                    fullWidth
                                    id="pack"
                                    label="Package"
                                    required
                                    value={pack}
                                    onChange={(e)=> setPack(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <label htmlFor="activeFrom">ActiveFrom</label>
                                <TextField
                                    autoComplete="activeFrom"
                                    name="activeFrom"
                                    fullWidth
                                    type="date"
                                    id="activeFrom"
                                    autoFocus
                                    value={dayjs(activeFrom).format("YYYY-MM-DD")}
                                    onChange={(e)=> setActiveFrom(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <label htmlFor="activeTo">ActiveTo</label>
                                <TextField
                                    fullWidth
                                    id="activeTo"
                                    type="date"
                                    required
                                    value={dayjs(activeTo).format("YYYY-MM-DD")}
                                    onChange={(e)=>setActiveTo(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    id="user"
                                    className="form-select"
                                    value={user}
                                    name={userName}
                                    onChange={(e) => {
                                    setUser(e.target.value);
                                    }}
                                >
                                    <option value={""} disabled>
                                    Choose User
                                    </option>

                                    {allUsers.length &&
                                    allUsers?.map((x, key) => {
                                        return (
                                        <option key={key} value={x.id}>
                                            {x.userName}
                                        </option>
                                        );
                                    })}
                                </select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    id="gymService"
                                    className="form-select"
                                    value={gymService}
                                    name={gymServiceTitle}
                                    onChange={(e) => {
                                    setGymService(e.target.value);
                                    }}
                                >
                                    <option value={""} disabled>
                                    Choose Service
                                    </option>

                                    {allServices.length &&
                                    allServices?.map((x, key) => {
                                        return (
                                        <option key={key} value={x.id}>
                                            {x.title}
                                        </option>
                                        );
                                    })}
                                </select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="totalFee"
                                    label="totalFee"
                                    required
                                    value={totalFee}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 
                                    maxLength: 6,
                                    minLength: 0,
                                    }}
                                    onChange={(e)=>setTotalFee(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="paidFee"
                                    label="paidFee"
                                    required
                                    value={paidFee}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 
                                    maxLength: 6,
                                    minLength: 0,
                                    }}
                                    onChange={(e)=>setPaidFee(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="feeDue"
                                    label="feeDue"
                                    required
                                    value={feeDue}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 
                                    maxLength: 6,
                                    minLength: 0,
                                    }}
                                    onChange={(e)=>setFeeDue(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="remarks"
                                    label="remarks"
                                    required
                                    value={remarks}
                                    onChange={(e)=>setRemarks(e.target.value)}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update Billing
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/cms/billing" variant="body2">
                                        Back to all Billing Records
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

export default EditBilling;