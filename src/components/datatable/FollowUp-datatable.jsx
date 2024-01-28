import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { followupColumns } from "../datatablesource/FollowUp-datatablesource";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns'
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/todo/followUp`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/todo/delete`;

const FollowUp = () => {
    let navigate = useNavigate()
    const [followup, setFollowUps] = useState([])
    const [isdelete, setIsDelete] = useState(false);

    useEffect(async () => {
        let res = await axios.get(API_ENDPOINT1);
        const modifiedData = res.data.followUps
            .reduce(
                (prev, current) => [
                ...prev,
                {
                    ...current,
                    id: current._id,
                    serviceName: current.gymService?.title,
                    category: current.gymService?.category,
                    dob: format(new Date(current.dob), 'MM/dd/yyyy'),
                    userName: current.userId?.firstName + (current.userId?.lastName ?? ''),
                    email: current.userId?.email,
                    number: current.userId?.number
                }
                ], []
            )
        setFollowUps(modifiedData);
    }, [isdelete]);
    
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
            FollowUp List
          </div>
          <DataGrid sx={{
            '& .MuiDataGrid-row .MuiDataGrid-cell': {
                "white-space": "normal !important",
                "word-wrap": "break-word !important",
              },
            }}
            className="datagrid"
            rows={followup}
            columns={followupColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            allowColumnResizing={true}
          />
        </div>
      );
};

export default FollowUp;