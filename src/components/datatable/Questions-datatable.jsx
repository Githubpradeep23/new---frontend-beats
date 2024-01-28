import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'
import { Link } from 'react-router-dom'
import config from '../../config';
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllQuestions`;
export default function Questions() {
  const [question, setQuestion] = useState([])

  useEffect(async () => {
    let res = await axios.get(API_ENDPOINT1);
    console.log("responce->", res.data.questions)
    setQuestion(res.data.questions)
    //  setUser(res.data.getAllGymBranch)  
    //  const modifiedData = res.data.getAllGymBranch
    //     setUsername(modifiedData)
  }, [])
  return (
    <div>
      <div className="datatable">
        <div className="datatableTitle">

          Add questions
          <Link to="/add-question" className="link">
            Add New
          </Link>
        </div>

        {question.map((x) => {
          return (
            <Accordion>

              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{x.description}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {x.alternatives.map((y) => {
                  return (
                    <Typography>
                      {y.text}
                    </Typography>

                  )
                })}

              </AccordionDetails>
            </Accordion>

          )
        })}

      </div>
    </div>
  );
}
