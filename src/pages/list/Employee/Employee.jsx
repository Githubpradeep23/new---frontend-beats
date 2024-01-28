import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Employees from "../../../components/datatable/Employee-datatable"

const EmployeeList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Employees/>
      </div>
    </div>
  )
}

export default EmployeeList