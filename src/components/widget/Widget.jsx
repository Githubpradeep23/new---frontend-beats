import "./widget.scss";
import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StoreIcon from "@mui/icons-material/Store";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import FollowTheSigns from "@mui/icons-material/FollowTheSigns";




import axios from "axios";

const Widget = ({ type, bg,count }) => {
  const [username, setUsername] = useState([]);
  const [totalOrdes, settotalOrdes] = useState([]);
  const [totalUser, settotalUser] = useState([]);
  const [totalEarn, settotalEarn] = useState([]);

  const [totalEmployee, setTotalEmployee] = useState("100");
  const [gymServices, setGymServices] = useState("120");
  const [branches, setBranches] = useState("50");


  const [totalComplaints, setTotalComplaints] = useState("500");
  const [subscription, setSubscription] = useState("180");
  const [queries, setQueries] = useState("190");

  
  const [totalInquery, setTotalInquery] = useState("40");
  const [totalDemo, setTotalDemo] = useState("300");
  const [totalBooked, setTotalBooked] = useState("250");

  const getdata = async () => {
    let res = await axios.get(
      "http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/getAllPaymentsRecords"
    );
    let apiData = res.data.getAllPaymentsRecords;
    let totalOrder = apiData.length;
    settotalOrdes(totalOrder);
    // console.log("totalOrdes line 18 ", totalOrdes)

    let ress = await axios.get(
      "http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/getAllUsers"
    );
    let apiDatas = ress.data.getAllUsers;
    let totalUsers = apiDatas.length;
    settotalUser(totalUsers);
    console.log("totalOrdes line 18 ", totalUser);
    let getAllRecordResponse = await axios.get(
      "http://ec2-13-211-131-177.ap-southeast-2.compute.amazonaws.com:8080/api/v1/getAllPaymentsRecords"
    );

    let amountList = getAllRecordResponse?.data?.getAllPaymentsRecords.map(
      (doc, index) => {
        return doc["orderDetials"]?.amount;
      }
    );

    // console.log(amountList)
    let totalearning = amountList.reduce(function (a, b) {
      return a + b;
    }, 0);
    settotalEarn(totalearning);
    // console.log("totalEarn line 18 ------93939", totalEarn)
  };
  useEffect(() => {
    getdata();
  }, []);

  let data;

  //temporary
  // const amount = totalOrdes;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "Total Users",
        isMoney: false,
        amount: totalUser,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "#fd9206",
              backgroundColor: "white",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Total Attandance",
        isMoney: true,
        amount: totalOrdes,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "#3e98c7",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Total Leave",
        isMoney: true,
        amount: totalEarn,

        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "white", color: "green" }}
          />
        ),
      };
      break;
      // second card
    case "employee":
      data = {
        title: "Employee",
        isMoney: false,
        amount: totalEmployee,
        link: "See all users",
        icon: (
          <StoreIcon
            className="icon"
            style={{
              color: "#1b2850",
              backgroundColor: "white",
            }}
          />
        ),
      };
      break;
      case "services":
        data = {
          title: "Gym Services",
          isMoney: false,
          amount: gymServices,
          link: "See all users",
          icon: (
            <MiscellaneousServicesIcon
              className="icon"
              style={{
                color: "#636e72",
                backgroundColor: "white",
              }}
            />
          ),
        };
        break;
        case "branches":
          data = {
            title: "Gym Branches",
            isMoney: false,
            amount: branches,
            link: "See all users",
            icon: (
              <AccountBalanceIcon
                className="icon"
                style={{
                  color: "#8854d0",
                  backgroundColor: "white",
                }}
              />
            ),
          };
          break;
      // third card
      case "complaints":
        data = {
          title: "Ticket Complaints",
          isMoney: false,
          amount: totalComplaints,
          link: "See all users",
          icon: (
            <HowToRegIcon
              className="icon"
              style={{
                color: "#00b894",
                backgroundColor: "white",
              }}
            />
          ),
        };
        break;
        case "subscription":
          data = {
            title: "Total Subcription",
            isMoney: false,
            amount: subscription,
            link: "See all users",
            icon: (
              <ContentPasteSearchIcon
                className="icon"
                style={{
                  color: "#0fb9b1",
                  backgroundColor: "white",
                }}
              />
            ),
          };
          break;
          case "queries":
            data = {
              title: "Total Queries",
              isMoney: false,
              amount: queries,
              link: "See all users",
              icon: (
                <FollowTheSigns
                  className="icon"
                  style={{
                    color: "#4b6584",
                    backgroundColor: "white",
                  }}
                />
              ),
            };
            break;
// fourth card

case "inquery":
  data = {
    title: "Total Inquery",
    isMoney: false,
    amount: totalInquery,
    link: "See all users",
    icon: (
      <AccountBalanceWalletOutlinedIcon
        className="icon"
        style={{
          color: "#b2bec3",
          backgroundColor: "white",
        }}
      />
    ),
  };
  break;
  case "demo":
    data = {
      title: "Total Demo",
      isMoney: false,
      amount: totalDemo,
      link: "See all users",
      icon: (
        <OndemandVideoIcon
          className="icon"
          style={{
            color: "#636e72",
            backgroundColor: "white",
          }}
        />
      ),
    };
    break;
    case "booked":
      data = {
        title: "Total Booked",
        isMoney: false,
        amount: totalBooked,
        link: "See all users",
        icon: (
          <FitnessCenterIcon
            className="icon"
            style={{
              color: "#2d3436",
              backgroundColor: "white",
            }}
          />
        ),
      };
      break;

    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;

    // second cards

    default:
      break;
  }

  return (
    <div className="widget" style={{ backgroundColor: bg }}>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {/* {data.isMoney} {data.amount} */}{count}
        </span>
        {/* <span className="link">{data.link}</span> */}
      </div>
      <div className="right">
        {/* <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
  </div>*/}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
