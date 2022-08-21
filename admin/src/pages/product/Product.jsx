import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebaseApp from '../../firebase'
import { updateProductInfo } from "../../redux/apiCalls";

export default function Product() {
    const path = useLocation().pathname.split('/');
    const product = useSelector(state => state.listProducts.products
        .find(product => product._id === path[path.length - 1]));
    const token = useSelector(state => state.user.curUser.token);

    const [name, setName] = useState(product.name);
    const [desc, setDesc] = useState(product.desc);
    const [stock, setStock] = useState(product.inStock);
    const [price, setPrice] = useState(product.price);
    const [categories, setCategories] = useState(product.categories.toString());
    const [size, setSize] = useState(product.size.toString());
    const [color, setColor] = useState(product.color.toString());
    const [file, setFile] = useState();
    //const [active, setActive] = useState('');
    const [log, setLog] = useState('');

    const dispatch = useDispatch();
    const storage = getStorage(firebaseApp);

    const handleUpdate = e => {
        e.preventDefault();

        if (file) {
            const fileName = new Date().getTime().toString() + file.name;
            //console.log(fileName);
            const storageRef = ref(storage, `files/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            //console.log('Upload is paused');
                            break;
                        case 'running':
                            setLog('Upload is running');
                            break;
                        default:
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                        default:
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        //console.log('File available at', downloadURL);
                        updateProductInfo(dispatch, product._id, {
                            name,
                            inStock: stock,
                            img: downloadURL,
                            price,
                            categories: categories?.trim()?.split(',').map(item => item.trim()),
                            desc,
                        }, token);
                        setLog('Update Successful');
                        setFile(null);
                    });
                }
            );
        } else {
            updateProductInfo(dispatch, product._id, {
                ...product,
                name,
                inStock: stock,
                price,
                categories: categories?.trim()?.split(',')?.map(item => item.trim()),
                size: size?.trim()?.split(',')?.map(item => item.trim()),
                color: color?.trim()?.split(',')?.map(item => item.trim()),
                desc,
            }, token);
            setLog('Update Successful');
        }
    }
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={productData} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.name}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">active:</span>
                            <span className="productInfoValue">yes</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">
                                {product.inStock ? 'yes' : 'no'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text" />
                        <label>In Stock</label>
                        <select
                            value={stock ? 'yes' : 'no'}
                            onChange={e => setStock(e.target.value === 'yes' ? true : false)}
                            name="inStock" id="idStock">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label>Active</label>
                        <select disabled name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        
                            <label>Color</label>
                            <input
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                type="text" placeholder="black,white,yellow"
                            />
                       
                    </div>
                    <div className="productFormMiddle">
                        <div className="updateProductItem">
                            <label>Description</label>
                            <input
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className="updateProductItem">
                            <label>Categories</label>
                            <input
                                value={categories}
                                onChange={e => setCategories(e.target.value)}
                                type="text" placeholder="man,woman,shirt"
                            />
                        </div>
                        <div className="updateProductItem">
                            <label>Size</label>
                            <input
                                value={size}
                                onChange={e => setSize(e.target.value)}
                                type="text" placeholder="M,L,XL"
                            />
                        </div>
                        <div className="updateProductItem">
                            <label>Price</label>
                            <input
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                type="number" placeholder="1000"
                            />
                        </div>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img
                                src={file ? URL.createObjectURL(file) : product.img}
                                alt="" className="productUploadImg"
                            />
                            <label htmlFor="file">
                                <Publish style={{ cursor: 'pointer' }} />
                            </label>
                            <input
                                onChange={e => setFile(e.target.files[0])}
                                type="file" id="file" style={{ display: "none" }}
                            />
                        </div>
                        <button
                            onClick={handleUpdate}
                            className="productButton"
                        >Update</button>
                    </div>
                </form>
                <div className="log">{log}</div>
            </div>
        </div>
    );
}
