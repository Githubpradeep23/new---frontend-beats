import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import LeaveType from "../../../components/datatable/Trainer-LeaveType-datatable"

const TrainerLeaveTypeList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <LeaveType/>
      </div>
    </div>
  )
}

export default TrainerLeaveTypeList