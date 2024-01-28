import "../list.scss"
import WeightDatatable from "../../../components/datatable/Weight-datatable"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <WeightDatatable/>
      </div>
    </div>
  )
}

export default List