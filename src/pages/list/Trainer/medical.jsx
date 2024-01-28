import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Medical from "../../../components/datatable/Trainer-Medical-datatable"

const TrainerMedicalList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Medical/>
      </div>
    </div>
  )
}

export default TrainerMedicalList