import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Leaves from "../../../components/datatable/Trainer-Leaves-datatable"

const TrainerLeavesList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Leaves/>
      </div>
    </div>
  )
}

export default TrainerLeavesList