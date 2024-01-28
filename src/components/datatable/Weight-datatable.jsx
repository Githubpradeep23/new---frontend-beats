import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
// import { userColumns } from "../datatablesource/Weight-datatablescource";
import { userColumns } from "../datatablesource/Weight-datatable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import * as React from 'react';
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllWeight`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/getWeightByUser`;

const WeightDatatableOld = () => {

  const [data, setData] = useState();
  const [UUser, setUser] = useState([])
  const [ids, setIds] = useState([])
  const [username, setUsername] = useState([])
  const [coin, setCoin] = useState([])
  const [phone, setPhone] = useState([])
  useEffect(async () => {
    let res = await axios.get(API_ENDPOINT1);
    console.log("responce->", res.data.getAllRecords)
    setUser(res.data.getAllRecords)
    const modifiedData = res.data.getAllRecords
      .reduce(
        (prev, current) => [
          ...prev,
          {
            ...current,
            name: `${current.branchName}`,
            id: current._id,
            firstName:current.userID.length>0 ?current.userID[0].firstName:'',
            number:current.userID.length>0 ?current.userID[0].number:'',


          }
        ], []
      )
    setUsername(modifiedData)
  }, [])


  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      // field: "action",
      // headerName: "Action",
      // width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
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



  // const DATA = [
  //   {
  //     id: 1,
  //     username: "lol",
  //     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     status: "active",
  //     email: "1snow@gmail.com",
  //     age: 35,
  //   },]
  // const DATA = [
  //   {
  //     id: ids,
  //     username: username,
  //     coin: coin,
  //     number: phone,
  //   },]

  return (
    <div className="datatable">
      <div className="datatableTitle">

        Add New Weight
  
         {/* <Link to="/weight/new" className="link">
          Add New
       </Link>
              */}.
      </div>
      <DataGrid sx={{
        '& .MuiDataGrid-row .MuiDataGrid-cell': {
            "white-space": "normal !important",
            "word-wrap": "break-word !important",
            "margin-top": 10
          },
        }}
        className="datagrid"
        rows={username}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

const WeightDatatable = () => {
  const [username, setUsername] = useState([])

  useEffect(async () => {
    let res = await axios.get(API_ENDPOINT2);
    console.log("response->", res.data.getAllRecords)
    setUsername(res.data.getAllRecords)
  }, [])

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.firstName}
          </TableCell>
          <TableCell align="right">{row.lastName}</TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{row.number}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Data
                </Typography>
                <Table size="small" aria-label="weights">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ht</TableCell>
                      <TableCell>PBF</TableCell>
                      <TableCell align="right">SMM</TableCell>
                      <TableCell align="right">Waist</TableCell>
                      <TableCell align="right">PushUp</TableCell>
                      <TableCell align="right">PullUps</TableCell>
                      <TableCell align="right">Weight</TableCell>
                      <TableCell align="right">Measure Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.weights.map((weight) => (
                      <TableRow key={weight.ht}>
                        <TableCell component="th" scope="row">
                          {weight.ht}
                        </TableCell>
                        <TableCell>{weight.PBF}</TableCell>
                        <TableCell align="right">{weight.SMM}</TableCell>
                        <TableCell align="right">{weight.Waist}</TableCell>
                        <TableCell align="right">{weight.PushUp}</TableCell>
                        <TableCell align="right">{weight.PullUps}</TableCell>
                        <TableCell align="right">{weight.weight}</TableCell>
                        <TableCell align="right">{weight.from}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <Typography variant="h6" gutterBottom component="div" marginLeft={20} marginTop= {5}>
            Track and Trace
          </Typography>
          <TableRow>
            <TableCell />
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {username.map((row) => (
            <Row key={row.firstName} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeightDatatable;
