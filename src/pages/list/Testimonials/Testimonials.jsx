import "../list.scss"
import TestimonialsDatatable from "../../../components/datatable/Testimonials-datatable"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <TestimonialsDatatable/>
      </div>
    </div>
  )
}

export default List