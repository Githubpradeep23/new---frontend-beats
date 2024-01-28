import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Filter from "../../../components/datatable/Cms-Filter-datatable"

const CmsFilterList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Filter/>
      </div>
    </div>
  )
}

export default CmsFilterList