import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Expense from "../../../components/datatable/Hr-Expense-datatable"

const HrExpenseList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Expense/>
      </div>
    </div>
  )
}

export default HrExpenseList