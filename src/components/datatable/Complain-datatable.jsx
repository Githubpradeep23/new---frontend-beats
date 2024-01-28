import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
// import { userColumns } from "../datatablesource/Weight-datatablescource";
import { userColumns } from "../datatablesource/Complain-datatablescourse";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllComplains`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/updateComplainStatus`;
const API_ENDPOINT3 = `${config.baseURL}${config.apiEndpoint}/deleteComplain`;

const Complains = () => {

  const [data, setData] = useState();
  const [ids, setIds] = useState([])
  const [username, setUsername] = useState([])
  const [isdelete, setIsDelete] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  useEffect(async () => {
    let res = await axios.get(API_ENDPOINT1);
    console.log("responce->", res.data.getAllComplain)
    const modifiedData = res.data.getAllComplain
      .reduce(
        (prev, current) => [
          ...prev,
          {
            ...current,
            name: `${current.branchName}`,
            id: current._id,

            username:current.user_id.length>0 ?current.user_id[0].firstName+' '+ current.user_id[0].lastName:'',
            createdAt: new Date(current.createdAt).toLocaleString(),
            phoneNumber: current.user_id.length>0 ? current.user_id[0].number : '',
            status: current.status ? 'DONE' : 'PENDING'
          }
        ], []
      )
    setUsername(modifiedData);
    setUpdateStatus(false)

  }, [isdelete, updateStatus])

  const handleUpdateStatus = (id) => {
    var data = JSON.stringify({
      "id": id
    });
    var config = {
      method: 'put',
      url: API_ENDPOINT2,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setUpdateStatus(true);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));

    var data = JSON.stringify({
      "id": id
    });
    
    var config = {
      method: 'delete',
      url: API_ENDPOINT3,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <div
              className="deleteButton"
              onClick={() => handleUpdateStatus(params.row.id)}
            >
              Update Status
            </div>
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

        {/* Add New Complain */}
  
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
        allowColumnResizing={true}
        // checkboxSelection
      />
    </div>
  );
};

export default Complains;
