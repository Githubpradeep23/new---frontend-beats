import "../list.scss"
// import AllGymDatatable from "../../../components/datatable/All-Gym-datatable"

import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import FeedBack from "../../../components/datatable/FeedBack-datatable"

const FeedBacklist = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <FeedBack/>
      </div>
    </div>
  )
}

export default FeedBacklist