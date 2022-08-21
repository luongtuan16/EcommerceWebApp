import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import firebaseApp from '../../firebase'
import { updateUserInfo } from "../../redux/apiCalls";
import "./user.css";

export default function User() {
  const path = useLocation().pathname.split('/');
  const user = useSelector(state => state.listUsers.users
    .find(user => user._id === path[path.length - 1]));
    const token = useSelector(state => state.user.curUser.token);
  //const id = path[path.length-1];
  const [name, setName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState();
  //const [address, setAddress] = useState('');
  //const [active, setActive] = useState('yes');
  //const [gender, setGender] = useState('');
  const [log, setLog] = useState('');

  const dispatch = useDispatch();
  const storage = getStorage(firebaseApp);
  
  useEffect(() => {
    setLog('');
  }, [email, name]);

  const handleUpdate = e => {
    e.preventDefault();

    if (avatar) {
      const fileName = new Date().getTime().toString() + avatar.name;
      //console.log(fileName);
      const storageRef = ref(storage, `avatars/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, avatar);

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
            updateUserInfo(dispatch, user._id,
              { ...user, userName: name, email, avatar: downloadURL }, token);
            setLog('Update Successful');
            setAvatar(null);
          });
        }
      );
    } else{
      updateUserInfo(dispatch, user._id,
        { ...user, userName: name, email }, token);
      setLog('Update Successful');
    }
  }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.avatar}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.userName}</span>
              {/* <span className="userShowUserTitle">Software Engineer</span> */}
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              {/* <span className="userShowInfoTitle">10.12.1999</span> */}
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            {/* <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99@gmail.com</span>
            </div> */}
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              {/* <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={"annabeck99"}
                  className="userUpdateInput"
                />
              </div> */}
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  //placeholder={user.userName}
                  value={name}
                  className="userUpdateInput"
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                  disabled
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={user.address}
                  className="userUpdateInput"
                  disabled
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={avatar ? URL.createObjectURL(avatar) : user.avatar}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  //value={avatar}
                  onChange={e => setAvatar(e.target.files[0])}
                  type="file" id="file" style={{ display: "none" }}
                />
              </div>
              <span style={{color: 'teal'}}>{log}</span>
              <button
                onClick={handleUpdate}
                className="userUpdateButton"
              >Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
