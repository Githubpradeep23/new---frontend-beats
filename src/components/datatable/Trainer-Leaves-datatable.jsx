import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { trainerLeavesColumns } from "../datatablesource/Trainer-Leaves-datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/trainer/leave/all`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/trainer/leave/delete`;

const TrainerLeaves = () => {
  let navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [isdelete, setIsDelete] = useState(false);

  useEffect(async () => {
    let res = await axios.get(API_ENDPOINT1);
    const modifiedData = res.data.leaves.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          id: current._id,
          serviceName: current.gymService?.title,
          category: current.gymService?.category,
          employeeName:
            current.employeeId?.firstName +
            (current.employeeId?.lastName ?? ""),
          employeeEmail: current.employeeId?.email,
          employeeNo: current.employeeId?.number,
          approver1Name:
            current.approver1?.firstName + (current.approver1?.lastName ?? ""),
          approver1Email: current.approver1?.email,
          approver1No: current.approver1?.number,
          approver2Name:
            current.approver2?.firstName + (current.approver2?.lastName ?? ""),
          approver2Email: current.approver2?.email,
          approver2No: current.approver2?.number,
        },
      ],
      []
    );
    setLeaves(modifiedData);
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
                navigate("/trainer/leave/updateStatus", {
                  state: { leave: params.row },
                });
              }}
              className="viewButton"
            >
              Update Status
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
      <div className="datatableTitle">Trainer Leaves List</div>
      <DataGrid
        sx={{
          "& .MuiDataGrid-row .MuiDataGrid-cell": {
            "white-space": "normal !important",
            "word-wrap": "break-word !important",
          },
        }}
        className="datagrid"
        rows={leaves}
        columns={trainerLeavesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        allowColumnResizing={true}
      />
    </div>
  );
};

export default TrainerLeaves;
