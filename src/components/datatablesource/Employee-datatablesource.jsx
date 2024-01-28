export const employeeColumns = [
    {
        field: "employeeName",
        headerName: "EmployeeName",
        width: 130,
    },
    {
        field: "profilePicture",
        headerName: "Image",
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
        field: "number",
        headerName: "Ph_Number",
        width: 130,
    },
    {
        field: "email",
        headerName: "Email",
        width: 160,
    },
    {
        field: "gender",
        headerName: "Gender",
        width: 120,
    },
    {
        field: "employee_address",
        headerName: "Address",
        width: 250,
    },
    {
        field: "age",
        headerName: "Age",
        width: 120,
    },
    {
        field: "role",
        headerName: "Designation",
        width: 130,
    },
    {
        field: "status",
        headerName: "Status",
        width: 120,
    },
    {
        field: "password",
        headerName: "Password",
        width: 130,
    },
    {
        field: "branchName",
        headerName: "Branch Name",
        width: 130,
    },
    {
        field: "branchLocation",
        headerName: "Branch Loc",
        width: 130,
    },
  ];