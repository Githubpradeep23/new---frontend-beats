import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import DeleteUser from "./pages/login/DeleteAccount";
import SignUp from "./pages/signup/SignUp";
import List from "./pages/list/List";
import GymList from "./pages/list/Gym-Branch/Gym-branch";
import Weight from "./pages/list/Weight/Weight";
import Single from "./pages/single/Single";
import Gym from "./pages/list/Gym/Gym";
import Banners from "./pages/list/Banners/Banners";
import Services from "./pages/list/Services/Services";
import Testimonials from "./pages/list/Testimonials/Testimonials";
import AddUser from "./components/Adds/Add-User/Add-User";
import AddWeight from "./components/Adds/Add-weight/Add-weight";
import AddGym from "./components/Adds/Add-Gym/Add-Gym";
import EditGym from "./components/Edit/Edit-Gym/Edit-Gym";
import EditGymBranch from "./components/Edit/Edit-GymBranch/Edit-GymBranch";
import EditBanners from "./components/Edit/Edit-Banners/Edit-Banners";
import EditServices from "./components/Edit/Edit-Services/Edit-Services";
import EditTestimonial from "./components/Edit/Edit-Testimonial/Edit-Testimonial";
import AddGymBranch from "./components/Adds/Add-GymBranch/Add-GymBranch";
import AddBanners from "./components/Adds/Add-Banners/Add-Banners";
import AddGymBranchService from "./components/Adds/Add-GymServices/Add-GymServices";
import AddTestimonial from "./components/Adds/Add-Testimonials/Add-Testimonials";
import ComplainList from "./pages/list/Complains/Complains";
import AddQuestion from "./components/Adds/Add-Questions/Add-Questions";
import Questionslist from "./pages/list/Questions/Questions";
import AddCoin from "./components/Adds/Add-coin/Add-Coin";
import EditUser from "./components/Edit/Edit-User/Edit-User";
import DemoList from "./pages/list/Demo/Demo";
import Purchase from "./pages/list/Purchase/Purchase";
import FeedBacklist from "./pages/list/Feedback/Feedback";
import New from "./pages/new/New";
import ViewUser from "./components/Views/View-User";
import AddUserCoin from "./components/Adds/Add-User/Add-User-Coin";
// import UserDemo from "./components/datatable/User-Demo-datatable";
import UserDemoList from "./pages/list/User-Demo/UserDemo";
import AddDemo from "./components/Adds/Add-demo/Add-demo";
import EditDemo from "./components/Edit/Edit-Demo/Edit-Demo";
import AddVoucher from "./components/Adds/Add-Voucher/Add-Voucher";
import Voucher from "./pages/list/Voucher/Voucher";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import CoupanList from "./pages/list/Coupan/Coupan";
import PackageList from "./pages/list/Package/Package";

import EditCoupan from "./components/Edit/Edit-Coupan/EditCoupan";
import AddCoupan from "./components/Adds/Add-Coupan/AddCoupan";
// Employee Section
import EmployeeList from "./pages/list/Employee/Employee";
import AddEmployee from "./components/Adds/Add-Employee/Add-Employee";
import EditEmployee from "./components/Edit/Edit-Employee/Edit-Employee";
// Todo Section
import FollowUpList from "./pages/list/FollowUp/FollowUp";
import RenewalReminderList from "./pages/list/Reminder/reminder";
import TicketComplaintList from "./pages/list/Todo/ticketComplaint";
import AbsentReminderList from "./pages/list/Todo/absentReminder";
import BalanceReminderList from "./pages/list/Todo/balanceReminder";
import TodoAuditList from "./pages/list/Todo/audit";
// Trainer Section
import LeaveTypeList from "./pages/list/Trainer/leaveType";
import AddLeaveType from "./components/Adds/Add-Trainer/Add-Trainer-LeaveType";
import TrainerLeavesList from "./pages/list/Trainer/leaves";
import UpdateTrainerStatus from "./components/Edit/Edit-Trainer/Update-TrainerStatus";
import ExerciseList from "./pages/list/Trainer/exercise";
import AddExercise from "./components/Adds/Add-Trainer/Add-Trainer-Exercise";
import MedicalList from "./pages/list/Trainer/medical";
import AddMedical from "./components/Adds/Add-Trainer/Add-Trainer-Medical";
import EditMedical from "./components/Edit/Edit-Trainer/Edit-Trainer-Medical";
// Workout
import WorkoutList from "./pages/list/Trainer/workout";
import AddWorkout from "./components/Adds/Add-Trainer/Add-Trainer-Workout";
import EditWorkout from "./components/Edit/Edit-Trainer/Edit-Trainer-Workout";
// Hr
import DiscountList from "./pages/list/Hr/discount";
import AddDiscount from "./components/Adds/Add-Hr/Add-Hr-Discount";
import UpdateDiscountStatus from "./components/Edit/Edit-Hr/Edit-Hr-Discount-Status";
import ExpenseList from "./pages/list/Hr/expense";
import AddExpense from "./components/Adds/Add-Hr/Add-Hr-Expense";
import UpdateExpenseStatus from "./components/Edit/Edit-Hr/Edit-Hr-Expense-Status";
import TelecallerList from "./pages/list/Hr/telecaller";
import AddTelecaller from "./components/Adds/Add-Hr/Add-Hr-Telecaller";
// CMS
import FilterList from "./pages/list/Cms/filter";
import EnquiryList from "./pages/list/Cms/enquiry";
import AddEnquiry from "./components/Adds/Add-Cms/Add-Cms-Enquiry";
import BillingList from "./pages/list/Cms/billing";
import AddBilling from "./components/Adds/Add-Cms/Add-Cms-Billing";
import EditBilling from "./components/Edit/Edit-Cms/Edit-Cms-Billing";
import AttendanceList from "./pages/list/Cms/attendance";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="deleteAccount" element={<DeleteUser />} />
            <Route path="Signup" element={<SignUp />} />
            <Route path="home" element={<Home />} />

            <Route path="users" element={<List />} />
            <Route path="users/new" element={<AddUser />} />
            <Route path="edit-user" element={<EditUser />} />
            <Route path="view-user" element={<ViewUser />} />
            <Route path="voucher" element={<Voucher />} />

            <Route path="add-voucher" element={<AddVoucher />} />
            {/* <Route path="userdemo" element={<UserDemo />} /> */}
            <Route path="userdemolist" element={<UserDemoList />} />
            <Route path="add-user-coin" element={<AddUserCoin />} />
            <Route path=":userId" element={<Single />} />

            <Route path="demos" element={<DemoList />} />
            <Route path="add-demo" element={<AddDemo />} />
            <Route path="edit-demo" element={<EditDemo />} />

            <Route path="Gym-list" element={<GymList />} />
            <Route path="edit-gym" element={<EditGym />} />
            <Route path="all-gym" element={<Gym />} />
            <Route path="gym/new" element={<AddGym />} />

            <Route path="edit-gymbranch" element={<EditGymBranch />} />
            <Route path="add-gymbranch" element={<AddGymBranch />} />

            <Route path="Weight" element={<Weight />} />
            <Route path="weight/new" element={<AddWeight />} />

            <Route path="banners" element={<Banners />} />
            <Route path="edit-banners" element={<EditBanners />} />
            <Route path="add-banners" element={<AddBanners />} />

            <Route path="services" element={<Services />} />
            <Route path="edit-services" element={<EditServices />} />
            <Route path="add-services" element={<AddGymBranchService />} />

            <Route path="testimonials" element={<Testimonials />} />
            <Route path="edit-testimonials" element={<EditTestimonial />} />
            <Route path="add-testimonials" element={<AddTestimonial />} />

            <Route path="complains" element={<ComplainList />} />

            <Route path="questions" element={<Questionslist />} />

            <Route path="purchase" element={<Purchase />} />

            <Route path="add-question" element={<AddQuestion />} />

            <Route path="feedback" element={<FeedBacklist />} />

            <Route path="add-coin" element={<AddCoin />} />

            <Route path="coupan" element={<CoupanList />} />

            <Route path="add-coupan" element={<AddCoupan />} />

            <Route path="edit-coupan" element={<EditCoupan />} />

            <Route path="package" element={<PackageList />} />
            {/* Employee Section */}
            <Route path="employees" element={<EmployeeList />} />
            <Route path="employee/new" element={<AddEmployee />} />
            <Route path="employee/update" element={<EditEmployee />} />
            {/* Todo Up Section */}
            <Route path="followup" element={<FollowUpList />} />
            <Route path="reminder" element={<RenewalReminderList />} />
            <Route
              path="todo/ticketComplaint"
              element={<TicketComplaintList />}
            />
            <Route
              path="todo/absentReminder"
              element={<AbsentReminderList />}
            />
            <Route
              path="todo/balanceReminder"
              element={<BalanceReminderList />}
            />
            <Route path="todo/audit" element={<TodoAuditList />} />
            {/* Trainer Section */}
            <Route path="trainer/leaveType" element={<LeaveTypeList />} />
            <Route path="/trainer/leaveType/new" element={<AddLeaveType />} />
            <Route path="/trainer/leaves" element={<TrainerLeavesList />} />
            <Route
              path="/trainer/leave/updateStatus"
              element={<UpdateTrainerStatus />}
            />
            <Route path="trainer/exercise" element={<ExerciseList />} />
            <Route path="/trainer/exercise/new" element={<AddExercise />} />
            <Route path="trainer/medical" element={<MedicalList />} />
            <Route path="/trainer/medical/new" element={<AddMedical />} />
            <Route path="/trainer/medical/update" element={<EditMedical />} />
            <Route path="trainer/workout" element={<WorkoutList />} />
            <Route path="/trainer/workout/new" element={<AddWorkout />} />
            <Route path="/trainer/workout/update" element={<EditWorkout />} />
            {/* Hr */}
            <Route path="hr/discount" element={<DiscountList />} />
            <Route path="/hr/discount/new" element={<AddDiscount />} />
            <Route
              path="/hr/discount/updateStatus"
              element={<UpdateDiscountStatus />}
            />
            <Route path="hr/expense" element={<ExpenseList />} />
            <Route path="/hr/expense/new" element={<AddExpense />} />
            <Route
              path="/hr/expense/updateStatus"
              element={<UpdateExpenseStatus />}
            />
            <Route path="hr/telecaller" element={<TelecallerList />} />
            <Route path="/hr/telecaller/new" element={<AddTelecaller />} />
            {/* Cms */}
            <Route path="cms/filter" element={<FilterList />} />
            <Route path="cms/enquiry" element={<EnquiryList />} />
            <Route path="cms/enquiry/new" element={<AddEnquiry />} />
            <Route path="cms/billing" element={<BillingList />} />
            <Route path="cms/billing/new" element={<AddBilling />} />
            <Route path="/cms/billing/update" element={<EditBilling />} />
            <Route path="/cms/attendance" element={<AttendanceList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
