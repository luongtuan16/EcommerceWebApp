import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/apiCalls";
import firebaseApp from '../../firebase'
import "./newProduct.css";

export default function NewProduct() {

  const [name, setName] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [desc, setDesc] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState('');
  const [file, setFile] = useState();
  //const [active, setActive] = useState('');
  const [log, setLog] = useState({});
  const token = useSelector(state => state.user.curUser.token);
  const dispatch = useDispatch();
  const storage = getStorage(firebaseApp);
  //const logRef = useRef();

  const handleCreate = e => {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getTime().toString() + file.name;

      const storageRef = ref(storage, `products/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, file);
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
              setLog({ type: 'success', text: 'Upload is running' });
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
            createProduct(dispatch, {
              name,
              inStock: stock ? true : false,
              img: downloadURL,
              price,
              categories: categories.trim().split(',').map(item => item.trim()),
              size: sizes.trim().split(',').map(item => item.trim()),
              color: colors.trim().split(',').map(item => item.trim()),
              desc,
            }, token).then(res => {
              setLog({ type: 'success', text: 'Success!' });
            }).catch(e => {
              setLog({ type: 'error', text: 'Fail!' })
            });
          });
        }
      );
    } else
      setLog({ type: 'error', text: 'Please choose product\'s image' });
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            onChange={e => setFile(e.target.files[0])}
            type="file" id="file"
          />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text" placeholder="Sweater Oversize"
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            value={desc}
            onChange={e => setDesc(e.target.value)}
            type="text"
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            value={categories}
            onChange={e => setCategories(e.target.value)}
            type="text" placeholder="man,woman,shirt"
          />
        </div>
        <div className="addProductItem">
          <label>Colors</label>
          <input
            value={colors}
            onChange={e => setColors(e.target.value)}
            type="text" placeholder="black,white,gray"
          />
        </div>
        <div className="addProductItem">
          <label>Sizes</label>
          <input
            value={sizes}
            onChange={e => setSizes(e.target.value)}
            type="text" placeholder="M,L,XL"
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            value={price}
            onChange={e => setPrice(e.target.value)}
            type="number" placeholder="1000"
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input
            value={stock}
            onChange={e => setStock(e.target.value)}
            type="text" placeholder="123"
          />
        </div>
        <div style={{ display: 'none' }} className="addProductItem">
          <label>Active</label>
          <select disabled name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <span style={{ display: 'block' }} className={`${log.type}log`}>{log.text}</span>
        <button onClick={handleCreate} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
