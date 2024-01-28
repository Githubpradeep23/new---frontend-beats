import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
import { userColumns } from "../datatablesource/ALL-Gym-datatablescource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllGYM`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/deleteGYM`;
const AllGymDatatable = () => {
  const [isdelete, setIsDelete] = useState(false);
  const [UUser, setUser] = useState([]);
  const [ids, setIds] = useState([]);
  const [username, setUsername] = useState([]);
  const [coin, setCoin] = useState([]);
  const [phone, setPhone] = useState([]);
  const navigate = useNavigate();

  const getdata = async () => {
    let res = await axios.get(API_ENDPOINT1);
    console.log("responce->", res.data.getAllGym);
    setUser(res.data.getAllGym);
    const modifiedData = res.data.getAllGym.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          name: `${current.gymName}`,
          id: current._id,
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
        console.log(error);
      });
  };
  useEffect(() => {
    getdata();
  }, [isdelete]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/:id" style={{ textDecoration: "none" }}>*/}
            <div
              onClick={() => {
                navigate("/edit-gym", { state: { gym: params.row } });
              }}
              className="viewButton"
            >
              Edit
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

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Gym
        <Link to="/gym/new" className="link">
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
        checkboxSelection
      />
    </div>
  );
};

export default AllGymDatatable;
