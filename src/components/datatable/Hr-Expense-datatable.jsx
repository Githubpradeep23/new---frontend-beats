import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { hrExpensesColumns } from "../datatablesource/Hr-Expense-datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/hr/expense/all`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/hr/expense/delete`;

const HrExpense = () => {
  let navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [isdelete, setIsDelete] = useState(false);

  useEffect(async () => {
    let res = await axios.get(API_ENDPOINT1);
    const modifiedData = res.data.expenses.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          id: current._id,
          employeeName:
            current.employeeId?.firstName +
            (current.employeeId?.lastName ?? ""),
          employeeEmail: current.employeeId?.email,
          employeeNo: current.employeeId?.number,
          employeeId: current.employeeId?._id,
        },
      ],
      []
    );
    setExpenses(modifiedData);
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
                navigate("/hr/expense/updateStatus", {
                  state: { expense: params.row },
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
      <div className="datatableTitle">
        Hr Expenses List
        <Link to="/cms/expense/new" className="link">
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
        rows={expenses}
        columns={hrExpensesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        allowColumnResizing={true}
      />
    </div>
  );
};

export default HrExpense;
