import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Audit from "../../../components/datatable/Todo-Audit-datatable"

const TodoAuditList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Audit/>
      </div>
    </div>
  )
}

export default TodoAuditList