import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Profile from "../Profile";
import config from "../../config";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      let res = await axios.get(`${config.baseURL}${config.apiEndpoint}/employee/adminDashboradCount`);
      console.log("response ->", res?.data?.data);
      setData(res?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., set an error state)
    }
  };
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" bg="#fd9206" count={data?.userCount} />
          <Widget type="order" bg="#3e98c7" count={data?.attandace}/>
          <Widget type="earning" bg="#a2cf83" count={data?.leave}/>
          {/* <Widget type="balance" /> */}
        </div>
        <div className="widgets">
          <Widget type="employee" bg="#1b2850" count={data?.employeeCount}/>
          <Widget type="services" bg="#636e72" count={data?.gymServices}/>
          <Widget type="branches" bg="#8854d0" count={data?.branchs}/>
        </div>
        <div className="widgets">
          <Widget type="complaints" bg="#00b894" count={data?.ticketComplaint}/>
          <Widget type="subscription" bg="#0fb9b1" count={data?.subscriptions}/>
          <Widget type="queries" bg="#4b6584" count={data?.querys}/>
        </div>
        <div className="widgets">
          <Widget type="inquery" bg="#b2bec3" count={data?.enquirys}/>
          <Widget type="demo" bg="#636e72" count={data?.demos}/>
          <Widget type="booked" bg="#2d3436" count={data?.bookpackages}/>
        </div>
        <div className="charts">
          <Featured />
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
        <Profile />

        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}

      </div>
    </div>
  );
};

export default Home;
