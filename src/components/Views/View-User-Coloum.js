export const userColumns = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "profilePicture",
      headerName: "profilePicture",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.profilePicture} alt="avatar" />
            </div>
            );
          },
        },
    {
      field: "firstName",
      headerName: "firstName",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "lastName",
      width: 150,
    },
    {
      field: "number",
      headerName: "number",
      width: 200,
    },
    {
      field: "email",
      headerName: "email",
      width: 170,
    },
    {
      field: "gender",
      headerName: "gender",
      width: 170,
    },
   
    {
      field: "DOB",
      headerName: "DOB",
      width: 150,
    },
    {
      field: "user_Address",
      headerName: "user_Address",
      width: 100,
    },
    
    {
      field: "postal_code",
      headerName: "postal_code",
      width: 100,
    },
    
    {
      field: "coin",
      headerName: "Coin",
      width: 100,
    },
    
  ];