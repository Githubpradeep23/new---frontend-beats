import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { cmsBillingColumns } from "../datatablesource/Cms-Billing-datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/cms/billing/all`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/cms/billing`;
const CmsBilling = () => {
  let navigate = useNavigate();
  const [billings, setBillings] = useState([]);
  const [isdelete, setIsDelete] = useState(false);

  useEffect(async () => {
    let res = await axios.get(API_ENDPOINT1);
    const modifiedData = res.data.billing.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          id: current._id,
          serviceName: current.gymService?.title,
          category: current.gymService?.category,
          serviceId: current.gymService?._id,
          userName: current.user?.firstName + (current.user?.lastName ?? ""),
          email: current.user?.email,
          clientNumber: current.user?.number,
          userId: current.user?._id,
          activeTo: format(new Date(current.activeTo), "MM/dd/yyyy"),
          activeFrom: format(new Date(current.activeFrom), "MM/dd/yyyy"),
        },
      ],
      []
    );
    setBillings(modifiedData);
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
                navigate("/cms/billing/update", {
                  state: { billing: params.row },
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
        Cms Billing List
        <Link to="/cms/billing/new" className="link">
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
        rows={billings}
        columns={cmsBillingColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        allowColumnResizing={true}
      />
    </div>
  );
};

export default CmsBilling;
