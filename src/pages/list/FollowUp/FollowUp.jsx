import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import FollowUp from "../../../components/datatable/FollowUp-datatable"

const FollowUpList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <FollowUp/>
      </div>
    </div>
  )
}

export default FollowUpList