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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import config from "../../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/employee/getAll`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/hr/expense/submit`;
const theme = createTheme();

const AddExpense = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();

  const [expense, setExpense] = useState("");
  const [employee, setEmployee] = useState("");
  const [description, setDescription] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [status, setStatus] = useState("");
  const [allEmployees, setAllEmployees] = useState("");

  const getEmployees = async () => {
    let res = await axios.get(API_ENDPOINT1);

    console.log("responce=============->", res.data.getAllEmployee);

    const modifiedData = res.data.getAllEmployee.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          employeeName: current.firstName + (current.lastName ?? ""),
          id: current._id,
        },
      ],
      []
    );
    setAllEmployees(modifiedData);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log("expense =>", expense);
    console.log("employee =>", employee);
    console.log("description =>", description);
    console.log("billAmount =>", billAmount);
    console.log("status =>", status);
    var data = new FormData();
    data.append("expense", expense);
    data.append("employeeId", employee);
    data.append("description", description);
    data.append("billAmount", billAmount);
    data.append("status", status);
    let config = {
      method: "post",
      url: API_ENDPOINT2,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.alert("success");
        navigate("/hr/expense");
      })
      .catch(function (error) {
        console.log(error);
        window.alert("fail");
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
              Add Hr Expense Record
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="expense"
                    {...register("expense", { required: true })}
                    name="expense"
                    fullWidth
                    id="expense"
                    label="Expense"
                    autoFocus
                    required
                    value={expense}
                    onChange={(e) => setExpense(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="description"
                    {...register("description", { required: false })}
                    name="description"
                    fullWidth
                    id="description"
                    label="Description"
                    autoFocus
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="billAmount"
                    label="billAmount"
                    required
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <select
                    {...register("employee", { required: true })}
                    id="employee"
                    className="form-select"
                    value={employee}
                    onChange={(e) => {
                      setEmployee(e.target.value);
                    }}
                  >
                    <option value={""} disabled>
                      Choose Employee
                    </option>

                    {allEmployees.length &&
                      allEmployees?.map((x, key) => {
                        return (
                          <option key={key} value={x.id}>
                            {x.employeeName}
                          </option>
                        );
                      })}
                  </select>
                </Grid>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add Hr Expense
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/hr/expense" variant="body2">
                      Back to all Hr Expense Records
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

export default AddExpense;
