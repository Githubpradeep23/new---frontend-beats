import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FollowTheSigns from "@mui/icons-material/FollowTheSigns";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import QuizIcon from "@mui/icons-material/Quiz";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
      <img src="logo.png"/>

        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">Beats Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>
          </li>
          <p className="title">USER</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/demos" style={{ textDecoration: "none" }}>
            <li>
              <OndemandVideoIcon className="icon" />
              <span>Demo</span>
            </li>
          </Link>
          <Link to="/coupan" style={{ textDecoration: "none" }}>
            <li>
              <OndemandVideoIcon className="icon" />
              <span>Coupon</span>
            </li>
          </Link>
          <p className="title">TRACK & TRANCE SECTION</p>
          <Link to="/weight" style={{ textDecoration: "none" }}>
            <li>
              <FitnessCenterIcon className="icon" />
              <span>track & trace section</span>
            </li>
          </Link>
          <p className="title">GYM</p>
          <Link to="/Gym-list" style={{ textDecoration: "none" }}>
            <li>
              <AccountBalanceIcon className="icon" />
              <span>Gym Branch</span>
            </li>
          </Link>
          <Link to="/services" style={{ textDecoration: "none" }}>
            <li>
              <MiscellaneousServicesIcon className="icon" />
              <span>Gym Branch Services</span>
            </li>
          </Link>
          <p className="title">PURCHASE ORDER</p>
          <Link to="/purchase" style={{ textDecoration: "none" }}>
            <li>
              <ProductionQuantityLimitsIcon className="icon" />
              <span>Purchase Order</span>
            </li>
          </Link>

          <p className="title">BANNER</p>
          <Link to="/banners" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Banners</span>
            </li>
          </Link>
          <p className="title">COMPLAIN</p>
          <Link to="/complains" style={{ textDecoration: "none" }}>
            <li>
              <HowToRegIcon className="icon" />
              <span>Complains</span>
            </li>
          </Link>
          <p className="title">TESTIMONIALS</p>

          <Link to="/testimonials" style={{ textDecoration: "none" }}>
            <li>
              <ContentPasteSearchIcon className="icon" />
              <span>Testimonials</span>
            </li>
          </Link>
          <p className="title">Employee</p>
          <Link to="/employees" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Employees</span>
            </li>
          </Link>
          <p className="title">ToDo</p>
          <Link to="/followup" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>FollowUp</span>
            </li>
          </Link>
          <Link to="/reminder" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>RenewalReminder</span>
            </li>
          </Link>
          <Link to="/todo/ticketComplaint" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>TicketComplaint</span>
            </li>
          </Link>
          <Link to="/todo/absentReminder" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>AbsentReminder</span>
            </li>
          </Link>
          <Link to="/todo/balanceReminder" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>BalanceReminder</span>
            </li>
          </Link>
          <Link to="/todo/audit" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Audit</span>
            </li>
          </Link>
          <p className="title">Trainer</p>
          <Link to="/trainer/leaveType" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Leave Type</span>
            </li>
          </Link>
          <Link to="/trainer/leaves" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Leaves</span>
            </li>
          </Link>
          <Link to="/trainer/medical" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Medical</span>
            </li>
          </Link>
          <Link to="/trainer/exercise" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Exercise</span>
            </li>
          </Link>
          <Link to="/trainer/workout" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Workout</span>
            </li>
          </Link>
          <p className="title">HR</p>
          <Link to="/hr/discount" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Discount</span>
            </li>
          </Link>
          <Link to="/hr/expense" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Expense</span>
            </li>
          </Link>
          <Link to="/hr/telecaller" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Telecaller</span>
            </li>
          </Link>
          <p className="title">CMS</p>
          <Link to="/cms/filter" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Filters</span>
            </li>
          </Link>
          <Link to="/cms/enquiry" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Enquiry</span>
            </li>
          </Link>
          <Link to="/cms/billing" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Billing</span>
            </li>
          </Link>
          <Link to="/cms/attendance" style={{ textDecoration: "none" }}>
            <li>
              <FollowTheSigns className="icon" />
              <span>Attendance</span>
            </li>
          </Link>
          <p className="title">Logout</p>
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li>
                <ExitToAppIcon className="icon" />
                <span>Logout</span>
              </li>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
