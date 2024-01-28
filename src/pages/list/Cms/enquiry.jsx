import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Enquiry from "../../../components/datatable/Cms-Enquiry-datatable"

const CmsEnquiryList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Enquiry/>
      </div>
    </div>
  )
}

export default CmsEnquiryList