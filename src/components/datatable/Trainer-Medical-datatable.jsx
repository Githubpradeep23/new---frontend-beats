import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { trainerMedicalColumns } from "../datatablesource/Trainer-Medical-datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/trainer/medicalRecord/all`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/trainer/medicalRecord/delete`;

const MedicalRecords = () => {
  let navigate = useNavigate();
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [isdelete, setIsDelete] = useState(false);

  useEffect(async () => {
    let res = await axios.get(API_ENDPOINT1);
    const modifiedData = res.data.medicalRecords.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          id: current._id,
          userName: current.user?.firstName + (current.user?.lastName ?? ""),
          email: current.user?.email,
          clientNumber: current.user?.number,
          userId: current.user?._id,
        },
      ],
      []
    );
    setMedicalRecords(modifiedData);
  }, [isdelete]);

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
                navigate("/trainer/medical/update", {
                  state: { medicalRecord: params.row },
                });
              }}
              className="viewButton"
            >
              Update
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
        Trainer Medical Record List
        <Link to="/trainer/medical/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        sx={{
          "& .MuiDataGrid-row .MuiDataGrid-cell": {
            "white-space": "normal !important",
            "word-wrap": "break-word !important",
          },
        }}
        className="datagrid"
        rows={medicalRecords}
        columns={trainerMedicalColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        allowColumnResizing={true}
      />
    </div>
  );
};

export default MedicalRecords;
