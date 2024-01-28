export const userColumns = [
    {
        field: "bannerImage",
        headerName: "BannerImage",
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
        headerName: "banner title",
        width: 150,
    },
    {
        field: "date",
        headerName: "Date",
        width: 150,
    },
    {
        field: "category",
        headerName: "Category",
        width: 230,
    },
    {
        field: "description",
        headerName: "Description",
        width: 230,
    },
    {
        field: "image",
        headerName: "Image",
        width: 230,
    },
    {
        field: "price",
        headerName: "Price",
        width: "230",
    },
    {
        field: "category",
        headerName: "Category",
        width: "230",
    },
    {
        field: "branch_id",
        headerName: "BRanch ID",
        width: "230",
    },
    {
        field: "dicount_percentage",
        headerName: "Discount Percentage",
        width: "230",
    },
    {
        field: "discount_coins",
        headerName: "Discount Coins",
        width: "230",
    },
    {
        field: "amount",
        headerName: "Amount",
        width: "230",
    },
    {
        field: "payment_mode",
        headerName: "Payment Mode",
        width: "230",
    },
    {
        field: "entity",
        headerName: "Entity",
        width: "230",
    },
    {
        field: "amount",
        headerName: "Amount",
        field: "230",
    },
    {
        field: "amount_paid",
        headerName: "AMOUNT Paid",
        field: "230",
    },
    {
        field: "amount_due",
        headerName: "Amount Due",
        field: "230",
    },
    {
        field: "currency",
        headerName: "Currency",
        field: "230",
    },
    {
        field: "receipt",
        headerName: "Receipt",
        field: "230",
    },
    {
        field: "offer_id",
        headerName: "Offer ID",
        field: "230",
    },
    {
        field: "status",
        headerName: "Status",
        field: "230",
    },
    {
        field: "attempts",
        headerName: "Attempts",
        field: "230",
    },
    {
        field: "notes",
        headerName: "Notes",
        field: "230",
    },

];