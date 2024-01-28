import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
import { userColumns } from "../datatablesource/demos-datatablescourse";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import axios from "axios";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllUserBookingDemo`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/getBannerByCategory`;
const API_ENDPOINT3 = `${config.baseURL}${config.apiEndpoint}/deleteGymBranch`;

const DemoDatatable = () => {
  const navigate = useNavigate();
  const [isdelete, setIsDelete] = useState(false);
  const [UUser, setUser] = useState([]);
  const [ids, setIds] = useState([]);
  const [username, setUsername] = useState([]);
  const [coin, setCoin] = useState([]);
  const [phone, setPhone] = useState([]);
  const [category, setCategory] = useState("");

  const getdata = async () => {
    let res = await axios.get(API_ENDPOINT1);
    console.log("responce->", res.data.getAllDemosBookings);
    setUser(res.data.getAllDemosBookings);
    const modifiedData = res.data.getAllDemosBookings.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          name: `${current.branchName}`,
          id: current._id,
          branch_name:
            current.service_id.length > 0 &&
            current.service_id[0].branch_id.length > 0
              ? current.service_id[0].branch_id[0].branchName
              : undefined,
          location:
            current.service_id.length > 0 &&
            current.service_id[0].branch_id.length > 0
              ? current.service_id[0].branch_id[0].location
              : undefined,
          username:
            current.user_id.length > 0 &&
            current.user_id[0].firstName &&
            current.user_id[0].lastName
              ? current.user_id[0].firstName + " " + current.user_id[0].lastName
              : undefined,
          email:
            current.user_id.length > 0 && current.user_id[0].email
              ? current.user_id[0].email
              : undefined,
          number:
            current.user_id.length > 0 && current.user_id[0].number
              ? current.user_id[0].number
              : undefined,
          service:
            current.service_id.length > 0 && current.service_id[0].title
              ? current.service_id[0].title
              : undefined,
        },
      ],
      []
    );

    setUsername(modifiedData);
    setIsDelete(false);
  };

  const getBannerByCategory = async () => {
    try {
      const res = await axios.post(API_ENDPOINT2, {
        category,
      });
      console.log(
        "🚀 ~ file: Banners-datatable.jsx ~ line 49 ~ getBannerByCategory ~ res",
        res.data.bannerByCategory
      );

      setUser(res?.data?.bannerByCategory);
      const modifiedData = res?.data?.bannerByCategory.reduce(
        (prev, current) => [
          ...prev,
          {
            ...current,
            category: `${current.category}`,
            id: current._id,
          },
        ],
        []
      );
      // setUsername(modifiedData);
      setIsDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBannerByCategory();
  }, [category]);

  const handleDelete = (id) => {
    console.log("id yeh hai=>", id);

    var data = JSON.stringify({
      id: id,
    });

    var config = {
      method: "delete",
      url: API_ENDPOINT3,
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

    setCategory("");
  };
  useEffect(() => {
    getdata();
  }, [isdelete]);
  useEffect(() => {
    getBannerByCategory();
  }, [isdelete]);

  const UserDemo = () => {
    console.log("user dwmo ");
    navigate("/userdemolist");
  };
  const AddDemo = () => {
    console.log("add dwmo ");
    navigate("/add-demo");
  };

  const actionColumn = [
    {
      // field: "action",
      // headerName: "Action",
      // width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <div onClick={() => {
            navigate("/edit-gymbranch", {state: {gym:params.row}})
          }} className="viewButton">Edit</div>
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
        {/* <select
          id="category"
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value={""} disabled>
            Choose Category
          </option>
          <option value="fitness">Fitness</option>
          <option value="wellness">Wellness</option>
          <option value="academy">Academy</option>
        </select> */}
        All Demos
        {/* <Link to="/add-gymbranch" className="link">
          Add New
        </Link> */}
        {/* <Button variant="contained" onClick={AddDemo}>Add Demo</Button> */}
        {/* <Button variant="contained" onClick={UserDemo}>User Demo</Button> */}
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

export default DemoDatatable;
