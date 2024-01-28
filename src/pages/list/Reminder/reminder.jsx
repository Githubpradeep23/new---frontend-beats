import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import RenewalReminder from "../../../components/datatable/Reminder-datatable"

const RenewalReminderList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <RenewalReminder/>
      </div>
    </div>
  )
}

export default RenewalReminderList