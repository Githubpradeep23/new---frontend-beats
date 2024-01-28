import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import PackageDataTable from "../../../components/datatable/Package-datatable"


const PackageList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <PackageDataTable/>
      </div>
    </div>
  )
}

export default PackageList