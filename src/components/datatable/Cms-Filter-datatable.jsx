import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { cmsFiltersColumns } from "../datatablesource/Cms-Filter-datatablesource";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns'
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/cms/filters/all`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/hr/filters`;
const CmsFilter = () => {
    let navigate = useNavigate()
    const [filters, setFilters] = useState([])
    const [isdelete, setIsDelete] = useState(false);

    useEffect(async () => {
        let res = await axios.get(API_ENDPOINT1);
        const modifiedData = res.data.filters
            .reduce(
                (prev, current) => [
                ...prev,
                {
                    ...current,
                    id: current._id,
                    serviceName: current.gymService?.title,
                    category: current.gymService?.category,
                    serviceId: current.gymService?._id,
                    date: format(new Date(current.date), 'MM/dd/yyyy'),
                    fit5: current.fit5 ? 'YES' : 'NO',
                    strong60: current.strong60 ? 'YES' : 'NO',
                    enquiries: current.enquiries ? 'YES': 'NO',
                    renewals: current.renewals ? 'YES' : 'NO',
                    upcomingDemos: current.upcomingDemos ? 'YES' : 'NO',
                    feeBalance: current.feeBalance ? 'YES' : 'NO',
                    inactiveClients: current.inactiveClients ? 'YES' : 'NO',
                    fusions: current.fusions ? 'YES' : 'NO',
                    demosBooked: current.demosBooked ? 'YES' : 'NO',
                    newJoining: current.newJoining ? 'YES' : 'NO',
                    upcomingRenewals: current.upcomingRenewals ? 'YES' : 'NO',
                    review: current.review ? 'YES' : 'NO',
                    activeClients: current.activeClients ? 'YES' : 'NO',
                    fit: current.fit ? 'YES' : 'NO'
                }
                ], []
            )
            setFilters(modifiedData);
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
            Cms Filters List
          </div>
          <DataGrid sx={{
            '& .MuiDataGrid-row .MuiDataGrid-cell': {
                "white-space": "normal !important",
                "word-wrap": "break-word !important",
              },
            }}
            className="datagrid"
            rows={filters}
            columns={cmsFiltersColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            allowColumnResizing={true}
          />
        </div>
      );
};

export default CmsFilter;