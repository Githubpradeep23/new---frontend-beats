import "../list.scss"
import ServiceDatatable from "../../../components/datatable/Services-datatable"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ServiceDatatable/>
      </div>
    </div>
  )
}

export default List