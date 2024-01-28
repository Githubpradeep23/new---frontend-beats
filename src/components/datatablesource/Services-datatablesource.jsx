import { width } from "@mui/system";

export const userColumns = [
    // { field: "id", headerName: "ID", width: 250 },
    {
      field: "image",
      headerName: "image",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="avatar" />
          </div>
        );
      },
    },

    {
      field: "bannerImage",
      headerName: "Banner Image",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.bannerImage} alt="avatar" />
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 100,
    },
    {
      field: "branchName",
      headerName: "Branch",
      width: 100,
    },
    {
      field: "description",
      headerName: "Description",
      width: 230,
    },
    // {
    //   field: "price",
    //   headerName: "Price",
    //   width: 100,
    // },
    // {
    //   field: "date",
    //   headerName: "Date",
    //   width: 150,
    // },
    {
      field: "category",
      headerName: "Category",
      width: 230,
    },
  {
field:"delievrables",
headerName:"Deliverables",
width:"230"
  },
//   {
//     field:"consultationDate",
//     headerName:"Consultation Date",
//     width:"230"
//   },
//   {
// field:"consultationTime",
// headerName:"Consultation Time",
// widht:"230"
//   },
  // {
  //   field:"managerName",
  //   headerName:"Manager Name",
  //   widht:"230"
  // },
  {
    field:"manager_contact_no",
    headerName:"Manager Phone Number",
    widht:"230"
  },
  {
    field:"branchCode",
    headerName:"Branch Code",
    widht:"230"
  },
  {
    field:"branchCity",
    headerName:"Branch City",
    widht:"230"
  },
  {
    field:"branchPhoneNumber",
    headerName:"Branch Phone Number",
    widht:"230"
  },
  // {
  //   field:"slotTime",
  //   headerName:"Slot Timing",
  //   width:"500"
  // },
  // {
  //   field:"closing_branchTiming",
  //   headerName:"Closing Branch Timing",
  //   width:"230"
  // },
  {
    field:"location",
    headerName:"Location",
    width:"230"
  },
  
  
  
  // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 160,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`cellWithStatus ${params.row.status}`}>
    //         {params.row.status}
    //       </div>
    //     );
    //   },
    // },
  ];
  
  //temporary data
  