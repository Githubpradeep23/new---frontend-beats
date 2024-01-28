import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Workout from "../../../components/datatable/Trainer-Workout-datatable"

const TrainerWorkoutList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Workout/>
      </div>
    </div>
  )
}

export default TrainerWorkoutList