import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import BalanceReminder from "../../../components/datatable/Todo-Balance-Reminder-datatable"

const BalanceReminderList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <BalanceReminder/>
      </div>
    </div>
  )
}

export default BalanceReminderList