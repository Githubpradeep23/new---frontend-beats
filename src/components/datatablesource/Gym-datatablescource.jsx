export const userColumns = [
    {
      field: "branchName",
      headerName: "BranchName",
      width: 230,
     
    },

    // {
    //   field: "image",
    //   headerName: "Image",
    //   width: 120,
    // },

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
      field: "branchCode",
      headerName: "BranchCode",
      width: 120,
    },
  
    {
      field: "managerName",
      headerName: "manager name",
      width: 130,
    },
    {
      field: "manager_Phone_Number",
      headerName: "manager phone number",
      width: 130,
    },
   
    {
      field: "location",
      headerName: "BranchCity",
      width: 100,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
   
    // {
    //   field: "opening_branchTiming",
    //   headerName: "opening_branchTiming",
    //   width: 120,
    // },
    // {
    //   field: "closing_branchTiming",
    //   headerName: "closing_branchTiming",
    //   width: 120,
    // },
  //  {
  //   field: "leaving_time",
  //   headerName:"leaving_Timing",
  //   width: "120",
  //  }
  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      username: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "active",
      email: "1snow@gmail.com",
      age: 35,
    },
    {
      id: 2,
      username: "Jamie Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "2snow@gmail.com",
      status: "passive",
      age: 42,
    },
    
    {
      id: 3,
      username: "Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "3snow@gmail.com",
      status: "pending",
      age: 45,
    },
    {
      id: 4,
      username: "Stark",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "4snow@gmail.com",
      status: "active",
      age: 16,
    },
    {
      id: 5,
      username: "Targaryen",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "5snow@gmail.com",
      status: "passive",
      age: 22,
    },
    {
      id: 6,
      username: "Melisandre",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "6snow@gmail.com",
      status: "active",
      age: 15,
    },
    {
      id: 7,
      username: "Clifford",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "7snow@gmail.com",
      status: "passive",
      age: 44,
    },
    {
      id: 8,
      username: "Frances",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "8snow@gmail.com",
      status: "active",
      age: 36,
    },
    {
      id: 9,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "pending",
      age: 65,
    },
    {
      id: 10,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "active",
      age: 65,
    },
  ];
  