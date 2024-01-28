import "../list.scss"
// import AllGymDatatable from "../../../components/datatable/All-Gym-datatable"

import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Complains from "../../../components/datatable/Complain-datatable"

const ComplainList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Complains/>
      </div>
    </div>
  )
}

export default ComplainList