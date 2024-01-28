import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { userColumns } from "../datatablesource/Banners-datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllBanner`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/getBannerByCategory`;
const API_ENDPOINT3 = `${config.baseURL}${config.apiEndpoint}/deleteBanner`;
const BannersDatatable = () => {
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
    console.log("responce->", res.data.getAllBanner.bannerImage);
    setUser(res.data.getAllBanner);
    const modifiedData = res.data.getAllBanner.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          name: `${current.title}`,
          id: current._id,
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
        res.data
      );

      setUser(res?.data?.bannerByCategory);
      const modifiedData = res?.data?.bannerByCategory.reduce(
        (prev, current) => [
          ...prev,
          {
            ...current,
            name: `${current.title}`,
            id: current._id,
          },
        ],
        []
      );
      setUsername(modifiedData);
      setIsDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
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
  }, [category]);
  useEffect(() => {
    getBannerByCategory();
  }, [isdelete]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              onClick={() => {
                navigate("/edit-banners", { state: { gym: params.row } });
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
        <select
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
        </select>
        <Link to="/add-banners" className="link">
          Add New Banner
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

export default BannersDatatable;
