import "../list.scss"
import BannersDatatable from "../../../components/datatable/Banners-datatable"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <BannersDatatable/>
      </div>
    </div>
  )
}

export default List