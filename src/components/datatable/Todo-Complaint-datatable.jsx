import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ticketComplaintColumns } from "../datatablesource/Todo-Complaint-datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/todo/ticketComplaints`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/todo/ticketComplaints`;

const TicketComplaint = () => {
  let navigate = useNavigate();
  const [ticketComplaints, setTicketComplaints] = useState([]);
  const [isdelete, setIsDelete] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  useEffect(async () => {
    let res = await axios.get(API_ENDPOINT1);
    const modifiedData = res.data.complaintTickets.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          id: current._id,
          serviceName: current.gymService?.title,
          category: current.gymService?.category,
          userName:
            current.userId?.firstName + (current.userId?.lastName ?? ""),
          email: current.userId?.email,
          clientNumber: current.userId?.number,
          supportEmployeeName:
            current.supportEmployee?.firstName +
            (current.supportEmployee?.lastName ?? ""),
          supportEmployeeEmail: current.supportEmployee?.email,
          supportEmployeeNumber: current.supportEmployee?.number,
        },
      ],
      []
    );
    setTicketComplaints(modifiedData);
  }, [isdelete, updateStatus]);

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

  const handleUpdateStatus = (id) => {
    var config = {
      method: "put",
      url: `${config.baseURL}${config.apiEndpoint}/todo/ticketComplaints/${id}/status`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setUpdateStatus(response.data.data.status);
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

  return (
    <div className="datatable">
      <div className="datatableTitle">Todo Ticket Complaint List</div>
      <DataGrid
        sx={{
          "& .MuiDataGrid-row .MuiDataGrid-cell": {
            "white-space": "normal !important",
            "word-wrap": "break-word !important",
          },
          "& .MuiDataGrid-cell": {
            lineHeight: "1.03 !important",
            maxHeight: "none !important",
            whiteSpace: "normal",
          },
        }}
        className="datagrid"
        rows={ticketComplaints}
        columns={ticketComplaintColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        allowColumnResizing={true}
      />
    </div>
  );
};

export default TicketComplaint;
