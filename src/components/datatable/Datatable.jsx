import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import * as React from "react";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllUsers`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/deleteUser`;
const Datatable = () => {
  let navigate = useNavigate();
  const [data, setData] = useState();
  const [UUser, setUser] = useState([]);
  const [ids, setIds] = useState([]);
  const [username, setUsername] = useState([]);
  const [isdelete, setIsDelete] = useState(false);

  const [coin, setCoin] = useState([]);
  const [phone, setPhone] = useState([]);

  const getDate = async () => {
    let res = await axios.get(API_ENDPOINT1);
    console.log(
      "responce->",
      res?.data?.getAllUsers?.map((x) => x?.profilePicture?.url)
    );
    setUser(res.data.getAllUsers);
    const modifiedData = res.data.getAllUsers.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          name: `${current.username}`,
          id: current._id,
          Date: new Date(current.DOB).toLocaleDateString(),
        },
      ],
      []
    );
    setUsername(modifiedData);
    setIsDelete(false);
  };

  const handleDelete = (id) => {
    var data = JSON.stringify({
      id: id,
    });

    var config = {
      method: "delete",
      url: API_ENDPOINT2,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setIsDelete(true);
      })
      .catch(function (error) {
        window.alert("delete fail");
        console.log(error);
      });
  };
  useEffect(() => {
    getDate();
  }, [isdelete]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <div onClick={() => {
               navigate("/add-coin", {state: {gym:params.row}})
              }} className="viewButton">Edit</div> */}
            <div
              onClick={() => {
                navigate("/edit-user", { state: { gym: params.row } });
              }}
              className="viewButton"
            >
              Edit
            </div>
            <div
              onClick={() => {
                navigate("/view-user", { state: { gym: params.row } });
              }}
              className="viewButton"
            >
              View
            </div>
            <div
              onClick={() => {
                navigate("/add-user-coin", { state: { gym: params.row } });
              }}
              className="viewButton"
            >
              add-coin
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
            {row.number}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.firstName} {row.lastName}
          </TableCell>
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
                      <TableCell>Questionire</TableCell>
                      <TableCell>Question</TableCell>
                      <TableCell>Question Type</TableCell>
                      <TableCell>Answer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.questionireAnswers.map((questionire) => (
                      <TableRow key={questionire.questionire_id?.type}>
                        <TableCell component="th" scope="row">
                          {questionire.questionire_id?.type}
                        </TableCell>
                        <TableCell>{questionire.questions_id?.text}</TableCell>
                        <TableCell>{questionire.questions_id?.type}</TableCell>
                        <TableCell>
                          {questionire.answer.map((a, i) => {
                            if (questionire.answer.length - 1 === i) {
                              return a;
                            }
                            return a + ",";
                          })}
                        </TableCell>
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
    <div>
      <div className="datatable">
        <div className="datatableTitle">
          Add New User
          <Link to="/users/new" className="link">
            Add New
          </Link>
        </div>
        <DataGrid
          sx={{
            "& .MuiDataGrid-row .MuiDataGrid-cell": {
              "white-space": "normal !important",
              "word-wrap": "break-word !important",
              "margin-top": 10,
            },
          }}
          className="datagrid"
          rows={username}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      </div>
      <div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <div>
        <div className="datatableTitle">Questionire Section</div>
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Phone No</TableCell>
                <TableCell>First Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {username.map((row) => (
                <Row key={row.number} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Datatable;
