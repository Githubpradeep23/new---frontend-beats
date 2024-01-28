import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Demo from "../../../components/datatable/Demo-datatable"

const DemoList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Demo/>
      </div>
    </div>
  )
}

export default DemoList