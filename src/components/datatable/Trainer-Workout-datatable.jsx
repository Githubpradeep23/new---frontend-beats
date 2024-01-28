import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { trainerWorkoutColumns } from "../datatablesource/Trainer-Workout-datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/trainer/workout/all`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/trainer/workout/delete`;

const WorkoutRecords = () => {
  let navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [isdelete, setIsDelete] = useState(false);

  useEffect(async () => {
    let res = await axios.get(API_ENDPOINT1);
    const modifiedData = res.data.workouts.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          id: current._id,
          set1Exercise1:
            current.set1.length > 0 ? current.set1[0].exercise.name : "",
          set1Exercise1Id:
            current.set1.length > 0 ? current.set1[0].exercise._id : "",
          set1Reps1: current.set1.length > 0 ? current.set1[0].reps : 0,
          set1Exercise2:
            current.set1.length > 1 ? current.set1[1].exercise.name : "",
          set1Exercise2Id:
            current.set1.length > 1 ? current.set1[1].exercise._id : "",
          set1Reps2: current.set1.length > 1 ? current.set1[1].reps : 0,
          set1Exercise3:
            current.set1.length > 2 ? current.set1[2].exercise.name : "",
          set1Exercise3Id:
            current.set1.length > 2 ? current.set1[2].exercise._id : "",
          set1Reps3: current.set1.length > 2 ? current.set1[2].reps : 0,
          set1Exercise4:
            current.set1.length > 3 ? current.set1[3].exercise.name : "",
          set1Exercise4Id:
            current.set1.length > 3 ? current.set1[3].exercise._id : "",
          set1Reps4: current.set1.length > 3 ? current.set1[3].reps : 0,
          set2Exercise1:
            current.set2.length > 0 ? current.set2[0].exercise.name : "",
          set2Exercise1Id:
            current.set2.length > 0 ? current.set2[0].exercise._id : "",
          set2Reps1: current.set2.length > 0 ? current.set2[0].reps : 0,
          set2Exercise2:
            current.set2.length > 1 ? current.set2[1].exercise.name : "",
          set2Exercise2Id:
            current.set2.length > 1 ? current.set2[1].exercise._id : "",
          set2Reps2: current.set2.length > 1 ? current.set2[1].reps : 0,
          set2Exercise3:
            current.set2.length > 2 ? current.set2[2].exercise.name : "",
          set2Exercise3Id:
            current.set2.length > 2 ? current.set2[2].exercise._id : "",
          set2Reps3: current.set2.length > 2 ? current.set2[2].reps : 0,
          set2Exercise4:
            current.set2.length > 3 ? current.set2[3].exercise.name : "",
          set2Exercise4Id:
            current.set2.length > 3 ? current.set2[3].exercise._id : "",
          set2Reps4: current.set2.length > 3 ? current.set2[3].reps : 0,
        },
      ],
      []
    );
    setWorkouts(modifiedData);
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
                navigate("/trainer/workout/update", {
                  state: { workout: params.row },
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
        Trainer Workout List
        <Link to="/trainer/workout/new" className="link">
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
        rows={workouts}
        columns={trainerWorkoutColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        allowColumnResizing={true}
      />
    </div>
  );
};

export default WorkoutRecords;
