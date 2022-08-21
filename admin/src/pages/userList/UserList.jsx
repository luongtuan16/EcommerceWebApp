import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Add, DeleteOutline, Refresh } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getListUsers } from "../../redux/apiCalls";
export default function UserList() {

  const dispatch = useDispatch();
  const data = useSelector(state => state.listUsers.users);
  const token = useSelector(state => state.user.curUser.token);
  useEffect(() => {
    getListUsers(dispatch, token);
  }, [dispatch]);

  const handleRefresh = () => {
    getListUsers(dispatch, token);
  }

  const handleDelete = (_id) => {
    deleteUser(dispatch, _id, token);
    //setData(data.filter((item) => item._id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "userName",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.userName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "active", headerName: "Active", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
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
        <Link to="/newUser" className="link">
          <button className="addBtn topItem">
            <Add fontSize='small' />
            Create User
          </button>
        </Link>
        <button className="addBtn topItem rfBtn" onClick={handleRefresh}>
          <Refresh fontSize='small' />
          Refresh
        </button>
        {/* <button className="addBtn updateBtn topItem">Update</button> */}
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
