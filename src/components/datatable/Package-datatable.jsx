import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Divider from '@mui/material/Divider';

import Stack from '@mui/material/Stack';

import axios from 'axios'
import config from '../../config'
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/getAllPackageByUser`;
const PackageDataTable = () => {

    const [allPayments, setAllPayments] = useState()

    const getdata = async () => {
        const res = await axios.get(API_ENDPOINT1)
        console.log(res.data.allPackages)
        setAllPayments(res.data.allPackages)
    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <>


            {/* {allPayments?.map((a) => {
        return (
          <div style={{ width: "200px", height: "200px", backgroundColor: "red", marginTop:"20px" }}>{a.voucher_id[0].service_id[0].title}</div>
        )
      })
      } */}
            <Stack
                direction="row"
                // divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                m={2}
                xs={12} sm={7}
            >
                {allPayments?.map((a) => {
                    const Dates = new Date(a.Date).toLocaleString()
                    const Create = new Date(a.createdAt).toLocaleString()
                    const BookPackage =new String(a.bookPackage)
                    // console.log("Shapoter waqas", a.user_id[0]?.age)
                    console.log(" waqas", a.user_id[0]?.firstName)
                    return (

                        <table style={{border:"0.5px solid lightgrey",width:"100%" , borderCollapse: "collapse"}}>
                            <thead style={{border:"1px solid lightgrey"}} >

                                <tr>
                                    <th style={{border:"1px solid lightgrey"}}>User <br />Id</th>
                                    <th style={{border:"1px solid lightgrey"}}>age</th>
                                    <th style={{border:"1px solid lightgrey",marginLeft:"9%"}}>heightInFit</th>
                                    <th style={{border:"1px solid lightgrey"}}>heightInINCH</th>
                                    <th style={{border:"1px solid lightgrey"}}>previous_injury</th>
                                    <th style={{border:"1px solid lightgrey"}} >health_Detials</th>
                                    <th style={{border:"1px solid lightgrey"}}>weight</th>
                                    <th style={{border:"1px solid lightgrey"}}>firstName</th>
                                    <th style={{border:"1px solid lightgrey"}}>lastName</th>
                                    <th style={{border:"1px solid lightgrey"}}>number</th>
                                    <th style={{border:"1px solid lightgrey"}}>email</th>
                                    <th style={{border:"1px solid lightgrey"}}>gender</th>
                                    <th style={{border:"1px solid lightgrey"}}>DOB</th>
                                    <th style={{border:"1px solid lightgrey"}}>user_Address</th>
                                    <th  style={{border:"1px solid lightgrey"}}>postal_code</th>
                                    <th style={{border:"1px solid lightgrey"}}>profilePicture</th>
                                    <th style={{border:"1px solid lightgrey"}}>coin</th>
                                    <th style={{border:"1px solid lightgrey"}}>Date</th>
                                    <th style={{border:"1px solid lightgrey"}}>Time</th>
                                    <th style={{border:"1px solid lightgrey"}}>Duration</th>
                                    <th style={{border:"1px solid lightgrey"}}>Date</th>
                                    <th style={{border:"1px solid lightgrey"}}>bookPackage</th>
                                    <th style={{border:"1px solid lightgrey"}}>createdAt</th>
                                </tr>
                            </thead>
                            <tbody  style={{border:"1px solid lightgrey"}}>
                                <tr>
                                    <td style={{border:"1px solid lightgrey"}}>{a.user_id[0]?._id}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{a.user_id[0]?.age}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{a.user_id[0]?.heightInFit}</td>
                                    <td style={{border:"1px solid lightgrey"}}> {a.user_id[0]?.heightInINCH}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{a.user_id[0]?.previous_injury}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{a.user_id[0]?.health_Detials}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{a.user_id[0]?.weight}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{a.user_id[0]?.firstName}</td>
                                    <td style={{border:"1px solid lightgrey"}}> {a.user_id[0]?.lastName}</td>
                                    <td style={{border:"1px solid lightgrey"}}> {a.user_id[0]?.number}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{a.user_id[0]?.email}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{a.user_id[0]?.gender}</td>
                                    <td style={{border:"1px solid lightgrey"}}> {a.user_id[0]?.DOB}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{a.user_id[0]?.user_Address}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{a.user_id[0]?.postal_code}</td>
                                    <td style={{border:"1px solid lightgrey"}}> {a.user_id[0]?.coin}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{a.package_id[0]?.profilePicture }</td>
                                    <td style={{border:"1px solid lightgrey"}}>{a.package_id[0]?.Date }</td>
                                    <td style={{border:"1px solid lightgrey"}}> {a.package_id[0]?.Time }</td>
                                    <td style={{border:"1px solid lightgrey"}}> {a.package_id[0]?.Duration }</td>
                                    <td style={{border:"1px solid lightgrey"}}>{Dates}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{BookPackage}</td>
                                    <td style={{border:"1px solid lightgrey"}}>{Create}</td>
                                </tr>
                            </tbody>
                        </table>

                    )
                })
                }
            </Stack>

        </>
    )

}

export default PackageDataTable;



// <Card sx={{ maxWidth: 345}}>
//   <CardActionArea>
//     <CardMedia
//       component="img"
//       height="140"
//       image={a.user_id[0]?.profilePicture}

//       alt="green iguana"
//     />

//     <CardContent>
//       <Typography gutterBottom variant="h5" component="div">
//         user_id
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//       age :  {a.user_id[0]?.age}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//       heightInFit :   {a.user_id[0]?.heightInFit}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//       heightInINCH :  {a.user_id[0]?.heightInINCH}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//       previous_injury : {a.user_id[0]?.previous_injury}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//       health_Detials :  {a.user_id[0]?.health_Detials}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//       weight :  {a.user_id[0]?.weight}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//         First Name :  {a.user_id[0]?.firstName}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">

//         Last Name: {a.user_id[0]?.lastName}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">

//         Number:  {a.user_id[0]?.number}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">

//         Email :  {a.user_id[0]?.email}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">

//         Gender:  {a.user_id[0]?.gender}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">

//         Date Of Birth:  {a.user_id[0]?.DOB}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//       User_Address :  {a.user_id[0]?.user_Address}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//         Postal code :  {a.user_id[0]?.postal_code}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//         Coin :  {a.user_id[0]?.coin}
//       </Typography>
//     </CardContent>





//     <CardContent>
//       <Typography gutterBottom variant="h5" component="div">
//       package_id
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//       Date :  {a.package_id[0]?.Date}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//       Duration : {a.package_id[0]?.Time}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//         amount_paid : {a.package_id[0]?.Duration}
//       </Typography>

//     </CardContent>
//     <CardContent>
//       <Typography gutterBottom variant="h5" component="div">
//       allPackages
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//       {/* expireAt: new Date(current.expireAt).toLocaleString() */}

//       Date :{Dates}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//       bookPackage : {a?.bookPackage}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//       createdAt : {Create}
//       </Typography>

//     </CardContent>

//   </CardActionArea>
{/* <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions> */}
            // </Card>