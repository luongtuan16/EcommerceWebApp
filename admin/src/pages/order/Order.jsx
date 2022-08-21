import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Refresh } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import "./order.css";

export default function Order() {
    const [orders, setOrders] = useState([]);
    const data = useSelector(state => state.listUsers.users);
    const token = useSelector(state => state.user.curUser.token);

    useEffect(() => {
        userRequest(token).get('/order')
            .then(res => setOrders(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleChangeStatus = (_id, status) => {
        userRequest(token).put(`/order/${_id}`, { status })
            .then(res => {
                const newOrders = [...orders];
                const idx = newOrders.findIndex(item => item._id === _id);
                if (idx > -1)
                    newOrders[idx].status = status;
                setOrders(newOrders);
            })
            .catch(err => console.log(err));
    }
    const handleRefresh = () => {
        userRequest(token).get('/order')
            .then(res => setOrders(res.data))
            .catch(err => console.log(err));
    }

    const handleDelete = (_id) => {
        userRequest(token).delete(`/order/${_id}`)
            .then(res => {
                const newOrders = [...orders];
                const idx = newOrders.findIndex(item => item._id === _id);
                if (idx > -1)
                    newOrders.splice(idx, 1);
                setOrders(newOrders);
            })
            .catch(err => console.log(err));
    };

    const columns = [

        {
            field: "userName",
            headerName: "User",
            width: 150,
            renderCell: (params) => {
                const user = data.find(u => u._id === params.row.userId);
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={user.avatar} alt="" />
                        {user.userName}
                    </div>
                );
            },
        },
        { field: "address", headerName: "Address", width: 300 },
        { field: "amount", headerName: "Amount", width: 150 },
        { field: "status", headerName: "Status", width: 130 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.status === 'pending' &&
                            <button
                                onClick={() => handleChangeStatus(params.row._id, 'shipping')}
                                className="userListEdit">Shipping</button>}
                        {(params.row.status === 'shipping')
                            && <button
                                onClick={() => handleChangeStatus(params.row._id, 'shipped')}
                                className="userListEdit">Shipped</button>}
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="userList">
            <div className="top">
                <button className="addBtn topItem rfBtn" onClick={handleRefresh}>
                    <Refresh fontSize='small' />
                    Refresh
                </button>
            </div>
            <DataGrid
                rows={orders}
                disableSelectionOnClick
                columns={columns}
                getRowId={row => row._id}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}
