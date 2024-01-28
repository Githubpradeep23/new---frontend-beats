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
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./View-User-Coloum";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

const theme = createTheme();


const ViewUser = ({ route }) => {
  const { register, formState: { errors }, handleSubmit } = useForm();

  let navigate = useNavigate();
  const [username, setusername] = useState("");
  const [Username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [coin, setcoin] = useState("");
  const [branch, setbranch] = useState("");
  const [Image, setImage] = useState(null);
  const [Id, setIds] = useState("")
  const params = new URLSearchParams(window.location.search)
  for (const param of params) {
    console.log(param)
    // setIds(param)
  }
  const routeLocation = useLocation();
  useEffect(() => {
    console.log(routeLocation.state.gym)
    let Result = [routeLocation.state.gym]
    // setIds(routeLocation.state.gym.id)
    // setnumber(routeLocation.state.gym.number)
    // setcoin(routeLocation.state.gym.coin)
    // setusername(routeLocation.state.gym.username)
    const modifiedData = Result
      .reduce(
        (prev, current) => [
          ...prev,
          {
            ...current,
            name: `${current.username}`,
            id: current._id,
            Date: new Date(current.Date).toLocaleDateString(),
            gender:current?.gender
          }
        ], []
      )
    setUsername(modifiedData)
    console.log("username dek oo bhai ==>", Username)
    // setemail(routeLocation.state.gym.email)
    // setImage(routeLocation.state.gym.Image)
  }, [])


  // const onSubmit = async (data) => {

  //     // console.log("Login submit click");
  //     console.log("Ids of user =>", Id)
  //     console.log("User =>", username)
  //     console.log("email =>", email)

  //     console.log("Image", Image)
  //     var data = new FormData();
  //     data.append('id', Id);
  //     // data.append('image', Image);
  //     data.append('username', username);
  //     // data.append('email', email);
  //     data.append('number', number);
  //     data.append('coin', coin);
  //     // data.append('branch', branch);


  //     var config = {
  //         method: 'get',
  //         url: 'http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/getAllUsers',
  //         headers: { "Content-Type": "multipart/form-data" },

  //         data: data
  //     };

  //     axios(config)
  //         .then(function (response) {

  //             console.log(JSON.stringify(response.data));
  //             navigate('/users')
  //         })
  //         .catch(function (error) {
  //             console.log(error);
  //         });
  // }


  const actionColumn = [
    {
      //   field: "action",
      //   headerName: "Action",
      //   width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <div onClick={() => {
                navigate("/add-coin", {state: {gym:params.row}})
              }} className="viewButton">Edit</div> */}
            {/* <div onClick={() => {
                navigate("/edit-user", {state: {gym:params.row}})
              }} className="viewButton">Edit</div>
              <div onClick={() => {
                navigate("/view-user", {state: {gym:params.row}})
              }} className="viewButton">View</div>
              <div onClick={() => {
                navigate("/add-user-coin", {state: {gym:params.row}})
              }} className="viewButton">add-coin</div> */}
            {/* <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row.id)}
                >
                  Delete
                </div> */}
          </div>
        );
      },
    },
  ];
  return (

    <div className="datatable">
      <div className="datatableTitle">
     
        View  User
        {/* <Link to="/users/new" className="link">
                  Add New
                </Link>
                 */}
      </div>
      <Grid container justifyContent="flex-end">
        <Link href="/users" variant="body2">
          Back to all Users
        </Link>
      </Grid>
      <DataGrid sx={{
        '& .MuiDataGrid-row .MuiDataGrid-cell': {
          "white-space": "normal !important",
          "word-wrap": "break-word !important",
          "margin-top": 10
        },
      }}
        className="datagrid"
        rows={Username}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default ViewUser;