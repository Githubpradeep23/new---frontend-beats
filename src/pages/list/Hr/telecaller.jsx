import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Telecaller from "../../../components/datatable/Hr-Telecaller-datatable"

const HrTelecallerList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Telecaller/>
      </div>
    </div>
  )
}

export default HrTelecallerList