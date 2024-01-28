import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Billing from "../../../components/datatable/Cms-Billing-datatable"

const CmsBillingList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Billing/>
      </div>
    </div>
  )
}

export default CmsBillingList