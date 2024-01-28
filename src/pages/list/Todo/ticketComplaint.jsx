import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import TicketComplaint from "../../../components/datatable/Todo-Complaint-datatable"

const TicketComplaintList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <TicketComplaint/>
      </div>
    </div>
  )
}

export default TicketComplaintList