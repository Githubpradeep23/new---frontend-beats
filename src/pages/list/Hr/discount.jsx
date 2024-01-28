import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Discount from "../../../components/datatable/Hr-Discount-datatable"

const HrDiscountList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Discount/>
      </div>
    </div>
  )
}

export default HrDiscountList