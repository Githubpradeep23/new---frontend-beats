import "../list.scss"
import AllGymDatatable from "../../../components/datatable/All-Gym-datatable"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <AllGymDatatable/>
      </div>
    </div>
  )
}

export default List