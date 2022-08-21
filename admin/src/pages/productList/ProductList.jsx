import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Add, DeleteOutline, Refresh } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getListProducts } from "../../redux/apiCalls";

export default function ProductList() {

  const dispatch = useDispatch();
  const data = useSelector(state => state.listProducts.products);
  const token = useSelector(state => state.user.curUser.token);
  //console.log(data);
  useEffect(() => {
    getListProducts(dispatch, token);
  }, [dispatch]);

  const handleRefresh = () => {
    getListProducts(dispatch, token);
  }

  const handleDelete = (_id) => {
    deleteProduct(dispatch, _id, token);
    //setData(data.filter((item) => item._id !== id));
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },

    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="top">
        <Link to="/newProduct" className="link">
          <button className="addBtn topItem">
            <Add fontSize='small' />
            Create Product
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
