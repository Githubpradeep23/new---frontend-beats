import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Coupan from "../../../components/datatable/Coupan-datatable"

const CoupanList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Coupan/>
      </div>
    </div>
  )
}

export default CoupanList