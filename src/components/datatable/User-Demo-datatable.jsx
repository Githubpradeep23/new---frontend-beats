import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
import { userColumns } from "../datatablesource/User-Demo-datatablescourse";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { format } from 'date-fns'
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllDemosBookings`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/deleteDemo`;


import axios from "axios";
import config from "../../config";


const UserDemo = () => {
  const navigate = useNavigate();
  const [isdelete, setIsDelete] = useState(false);
  const [UUser , setUser] = useState([])
  const [ids, setIds] =useState([])
  const [username, setUsername]= useState([])
  const [coin, setCoin] = useState([])
  const [ phone , setPhone] = useState([])
  const [category, setCategory] = useState("");

  const getdata = async ()=>{

    let res = await axios.get(API_ENDPOINT1);
     console.log("responce->",res.data.getAllDemos)
     setUser(res.data.getAllDemos)  
     const modifiedData = res.data.getAllDemos
     .reduce(
       (prev, current) => [
         ...prev,
         {
           ...current,
           name: `${current.branchName}`,
          id: current._id,
          //  Date: new Date(current.Date).toLocaleTimeString(),
          //  Date: new Date(current.Date).toLocaleTimeString(),
           Date: new Date(current.Date).toLocaleDateString(),
          // Date: new format(new Date(current.Date), 'dd/mm/yyyy'),
          Time: new Date(current.Time).toLocaleTimeString()

          
         }
        ],[]
        )
    
        setUsername(modifiedData)
        setIsDelete(false)

  }


  const handleDelete = (id) => {
     console.log("id yeh hai=>", id)

     var data = JSON.stringify({
      "id": id
    });
    
    var config = {
      method: 'delete',
      url: API_ENDPOINT2,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setIsDelete(true)

    })
    .catch(function (error) {
      console.log(error);
    });


  };
  useEffect(() => {
    getdata()
  }, [isdelete])
  
  const UserDemo=()=>{
    console.log("user dwmo ")
    navigate('/demos');

  }


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
         {/* <div onClick={() => {
            navigate("/edit-demo", {state: {gym:params.row}})
          }} className="viewButton">Edit</div> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete Demo
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
   
      User Demo
        {/* <Link to="/add-gymbranch" className="link">
          Add New
        </Link> */}
      <Button variant="contained" onClick={()=> UserDemo}>All Demo</Button>
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

export default UserDemo;
