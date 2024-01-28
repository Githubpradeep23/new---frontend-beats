import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Divider from "@mui/material/Divider";

import Stack from "@mui/material/Stack";

import axios from "axios";
import config from "../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllPaymentsRecords`;
const VoucherDataTable = () => {
  const [allPayments, setAllPayments] = useState();

  const getdata = async () => {
    const res = await axios.get(
      API_ENDPOINT1
    );
    setAllPayments(res.data.getAllPaymentsRecords);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <table
        style={{
          border: "0.5px solid lightgrey",
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ border: "1px solid lightgrey" }}>
          <tr>
            <u>
              {" "}
              <b>user_id</b>
            </u>
            <th style={{ border: "1px solid lightgrey" }}>FirstName </th>
            <th style={{ border: "1px solid lightgrey" }}>LastName </th>
            <th style={{ border: "1px solid lightgrey" }}>Number </th>
            <th style={{ border: "1px solid lightgrey" }}>Email</th>
            <th style={{ border: "1px solid lightgrey" }}>Gender </th>
            <th style={{ border: "1px solid lightgrey" }}>DateOfBirth </th>
            <th style={{ border: "1px solid lightgrey" }}>User_Address </th>
            <th style={{ border: "1px solid lightgrey" }}>Postal Code</th>
            <th style={{ border: "1px solid lightgrey" }}>Coin</th>
            <u>
              {" "}
              <b> orderDetials</b>
            </u>
            <th style={{ border: "1px solid lightgrey" }}>entity </th>
            <th style={{ border: "1px solid lightgrey" }}> amount </th>
            <th style={{ border: "1px solid lightgrey" }}>amount_paid </th>
            <th style={{ border: "1px solid lightgrey" }}>amount_due </th>
            <th style={{ border: "1px solid lightgrey" }}>currency</th>
            <th style={{ border: "1px solid lightgrey" }}>receipt</th>
            <th style={{ border: "1px solid lightgrey" }}>offer_id</th>
            <th style={{ border: "1px solid lightgrey" }}>status</th>
            <th style={{ border: "1px solid lightgrey" }}> attempts</th>
            <u>
              <b>service_id</b>
            </u>
            <th style={{ border: "1px solid lightgrey" }}>title</th>
            <th style={{ border: "1px solid lightgrey" }}>description </th>
            <th style={{ border: "1px solid lightgrey" }}>price </th>
            <th style={{ border: "1px solid lightgrey" }}>category </th>
            <u>
              {" "}
              <b>voucher_id </b>
            </u>
            <th style={{ border: "1px solid lightgrey" }}>
              discount_percentage{" "}
            </th>
            <th style={{ border: "1px solid lightgrey" }}>discount_coins </th>
            <th style={{ border: "1px solid lightgrey" }}>amount </th>
            <th style={{ border: "1px solid lightgrey" }}>payment_mode </th>
          </tr>
        </thead>
        {allPayments?.map((a) => {
          return (
            <tbody style={{ border: "1px solid lightgrey" }}>
              <tr>
                <th></th>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.firstName}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.lastName}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.number}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.email}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.gender}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.DOB}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.user_Address}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.postal_code}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.coin}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.entity}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.amount}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.amount_paid}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.amount_due}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.currency}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.receipt}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.offer_id}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.status}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.attempts}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.title}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.description}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.price}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.category}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.discount_percentage}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.discount_coins}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.amount}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.payment_mode}
                </td>
                <td style={{ border: "1px solid lightgrey" }}>
                  {a.voucher_id[0].user_id[0]?.price}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
};

export default VoucherDataTable;
