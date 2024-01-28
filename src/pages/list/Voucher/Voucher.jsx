import Sidebar from "../../../components/sidebar/Sidebar"
// import Navbar from "../../components/navbar/Navbar"
import VoucherDataTable from "../../../components/datatable/Voucher-datatable"
import Navbar from "../../../components/navbar/Navbar"
const Voucher = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <VoucherDataTable/>
      </div>
    </div>
  )
}

export default Voucher