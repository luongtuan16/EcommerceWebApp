import { useRef, useState } from "react";
import "./newUser.css";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/apiCalls";

export default function NewUser() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  //const [active, setActive] = useState('yes');
  const [gender, setGender] = useState('');
  const [log, setLog] = useState('');
  const token = useSelector(state => state.user.curUser.token);
  const dispatch = useDispatch();
  const logRef = useRef();

  const handleCreate = e => {
    e.preventDefault();

    createUser(dispatch, {
      userName: name,
      email,
      password,
      //active,
      //address,
      //gender
    }, token).then(res => {
      console.log(res)
      setLog('Success');
    }).catch(err => {
      setLog('Fail');
      console.log('aaa', err);
    });
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text" placeholder="John Smith" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email" placeholder="john@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            type="text" placeholder="New York | USA" />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input
              //value={gender}
              checked={gender === 'male'}
              onChange={e => setGender(e.target.value)}
              type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
            <input
              //  value={name}
              checked={gender === 'female'}
              onChange={e => setGender(e.target.value)}
              type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input
              //  value={name}
              checked={gender === 'other'}
              onChange={e => setGender(e.target.value)}
              type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select
            disabled
            className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div ref={logRef} className="log">{log}</div>
        <button onClick={handleCreate} className="newUserButton">Create</button>
      </form>
    </div>
  );
}
