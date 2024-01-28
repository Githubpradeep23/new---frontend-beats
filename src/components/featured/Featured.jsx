import "./featured.scss";
import React, { useState, useEffect } from 'react'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import axios from "axios";
import config from "../../config";
const API_ENDPOINT = `${config.baseURL}${config.apiEndpoint}/getAllPaymentsRecords`;
const Featured = () => {
  const [totalEarn, setTotalEarn] = useState(0);

  const getData = async () => {
    try {
      const paymentRecordsResponse = await axios.get(API_ENDPOINT);
      const amountList = paymentRecordsResponse?.data?.getAllPaymentsRecords.map((record) => parseFloat(record?.price));
      const total = amountList.reduce((acc, amount) => acc + amount, 0);
      setTotalEarn(total);
    } catch (error) {
      console.error("Error fetching payment records:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} className="custom-progress"/>
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">{totalEarn}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        {/* <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Featured;
