import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
// import { userColumns } from "../datatablesource/Testimonials-datatablescource";
import { userColumns } from "../datatablesource/Testimonials-datatablescourse";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";

const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllTestimonial`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/deleteTestimonial`;

const TestimonialsDatatable = () => {
  let navigate = useNavigate();
  const [isdelete, setIsDelete] = useState(false);
  const [UUser, setUser] = useState([]);
  const [ids, setIds] = useState([]);
  const [username, setUsername] = useState([]);
  const [coin, setCoin] = useState([]);
  const [phone, setPhone] = useState([]);

  const getdata = async () => {
    let res = await axios.get(API_ENDPOINT1);
    console.log("responce->", res.data.getAllTestimonial);
    setUser(res.data.getAllTestimonial);
    const modifiedData = res.data.getAllTestimonial.reduce(
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
            <div
              onClick={() => {
                navigate("/edit-testimonials", { state: { gym: params.row } });
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
        Add New Testimonials
        <Link to="/add-testimonials" className="link">
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

export default TestimonialsDatatable;
