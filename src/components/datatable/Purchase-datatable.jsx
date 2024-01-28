import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../datatablesource/Purchase-datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllPaymentsRecords`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/deleteGymBranch`;

const GymDatatable = () => {
  const navigate = useNavigate();

  const [isdelete, setIsDelete] = useState(false);
  const [UUser , setUser] = useState([])
  const [username, setUsername]= useState([])

  const getdata = async ()=>{
    let res = await axios.get(API_ENDPOINT1);
    let data = res.data.getAllPaymentsRecords.map((doc,index)=>{
        return ({
               _id  : doc._id,
               userName: (doc["userID"] && doc["userID"][0]) ? doc["userID"][0]?.firstName : '',
               contact: (doc["userID"] && doc["userID"][0]) ? doc["userID"][0]?.number : '',
               mailID: (doc["userID"] && doc["userID"][0]) ? doc["userID"][0]?.email : '',
               orderPaymentID : doc["orderDetails"]?.razorpay_payment_id,
               orderID: doc["orderDetails"]?.razorpay_order_id,
               amount : doc["price"],
               duration: doc["duration"],
               date : new Date(doc["createdAt"]).toISOString(),
               couponID:  doc?.copuan_id && doc?.copuan_id[0] ? doc?.copuan_id[0]?._id : '',
               copuanTitle: doc?.copuan_id && doc?.copuan_id[0] ? doc?.copuan_id[0]?.copuanTitle : '',
               branchName: doc?.service_id && doc?.service_id[0] ? doc?.service_id[0]?.branch_id[0]?.branchName : '',
               location: doc?.service_id && doc?.service_id[0] ? doc?.service_id[0]?.branch_id[0]?.location : '',
            })
         })
     setUser(data)
     const modifiedData =data.reduce(
       (prev, current) => [
         ...prev,
         {
           ...current,
           name: `${current.branchName}`,
          id: current._id
          
         }
        ],[]
        )
        setUsername(modifiedData)
        setIsDelete(false)
        console.log("result->", UUser)

  }  

  const handleDelete = (id) => {
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

  return (
    <div className="datatable">
      <div className="datatableTitle">
       Purchase Order
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
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default GymDatatable;

