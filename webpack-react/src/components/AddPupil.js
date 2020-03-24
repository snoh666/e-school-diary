import React, {useState} from 'react'
import { Redirect, Link } from 'react-router-dom';

const AddUser = () => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [sentStatus, setSentStatus] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const sendForm = e => {
    e.preventDefault();

    fetch("http://localhost/e-dziennik-sbd/api/pupil/add/", {
      method: "POST",
      body: JSON.stringify({
        pupil: {
          name: name,
          surname: surname,
        },
      }),
    })
      .then(response => response.json())
      .then(value => {
        if (value.message) {
          setSentStatus(true);
        } else if(value.error) {
          setErrMsg(value.error);
        }
      });
  }

  return sentStatus ? <Redirect exact to={{pathname: '/'}} /> : (
    <div>
      <p>Add user:</p>
      <form onSubmit={sendForm} method="post">
        <label htmlFor="name">
          <span>Name</span>
          <input
            type="text"
            name="name"
            id="name"
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <label htmlFor="surname">
          <span>Surname</span>
          <input
            type="text"
            name="surname"
            id="surname"
            onChange={({ target }) => setSurname(target.value)}
          />
        </label>
        <p style={{ color: 'red' }}>
          {errMsg}
        </p>
        <button type="submit" className="squaredBorders"><span>Add</span></button>
      </form>
      <Link exact to="/">Go back</Link>
    </div>
  );
};

export default AddUser;