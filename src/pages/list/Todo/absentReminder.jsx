import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import AbsentReminder from "../../../components/datatable/Todo-Absent-Reminder-datatable"

const AbsentReminderList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <AbsentReminder/>
      </div>
    </div>
  )
}

export default AbsentReminderList