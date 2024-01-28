import "../list.scss"
import GymDatatable from "../../../components/datatable/Gym-datatable"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <GymDatatable/>
      </div>
    </div>
  )
}

export default List