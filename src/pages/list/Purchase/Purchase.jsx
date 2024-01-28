import "../list.scss"
import Purchasedatatable from "../../../components/datatable/Purchase-datatable"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"

const Purchase = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Purchasedatatable/>
      </div>
    </div>
  )
}

export default Purchase