import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Exercise from "../../../components/datatable/Trainer-Exercise-datatable"

const TrainerExerciseList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Exercise/>
      </div>
    </div>
  )
}

export default TrainerExerciseList