import "../list.scss"
import UserDome from "../../../components/datatable/User-Demo-datatable"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"

const UserDemoList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <UserDome/>
      </div>
    </div>
  )
}

export default UserDemoList