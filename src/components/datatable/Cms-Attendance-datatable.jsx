import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { cmsAttendanceColumns } from "../datatablesource/Cms-Attendance-datatablesource";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/cms/attendance/all`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/cms/attendance`;
const CmsAttendance = () => {
    let navigate = useNavigate()
    const [attendances, setAttendances] = useState([])
    const [isdelete, setIsDelete] = useState(false);

    useEffect(async () => {
        let res = await axios.get(API_ENDPOINT1);
        const modifiedData = res.data.attendances
            .reduce(
                (prev, current) => [
                ...prev,
                {
                    ...current,
                    id: current._id,
                    userName: current.user?.firstName + (current.user?.lastName ?? ''),
                    email: current.user?.email,
                    clientNumber: current.user?.number,
                    userId: current.user?._id,
                }
                ], []
            )
            setAttendances(modifiedData);
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

    return (
        <div className="datatable">
          <div className="datatableTitle">
            Cms Attendance List
          </div>
          <DataGrid sx={{
            '& .MuiDataGrid-row .MuiDataGrid-cell': {
                "white-space": "normal !important",
                "word-wrap": "break-word !important",
              },
            }}
            className="datagrid"
            rows={attendances}
            columns={cmsAttendanceColumns}
            pageSize={9}
            rowsPerPageOptions={[9]}
            allowColumnResizing={true}
          />
        </div>
      );
};

export default CmsAttendance;