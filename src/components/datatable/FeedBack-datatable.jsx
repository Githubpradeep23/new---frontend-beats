import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllUsersFeedBack`;
export default function Feedback() {
  const [feedBackData, setFeedBackData] = useState([]);

  useEffect(async () => {
    let res = await axios.get(API_ENDPOINT1);
    console.log("Api Response line => ", res?.data?.getAllUsersFeedBack);
    setFeedBackData(res?.data?.getAllUsersFeedBack);
  }, []);
  return (
    <div>
      <div className="datatable">
        <div className="datatableTitle">
          FeedBack
          {/* <Link to="/add-question" className="link">
                        Add New
                    </Link> */}
        </div>

        {feedBackData.map((value, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{value.username}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{value.feedBack}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
