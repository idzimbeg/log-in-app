import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState()
// already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(JSON.stringify(loggedInUser));
      setUser(foundUser);
    }
  }, []);

  // logout the user
  const handleLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { username, password };
    // send user input to the server
    const response = await axios.post(
      "http://api.getcountapp.com/api/v1/authenticate",
      user
    );
    // set the user state 
    setUser(response.data)
    // store in localStorage
    localStorage.setItem('user', response.data)
    console.log(response.data)
    
  };

// logged in page
  if (user) {
    return <div>{user.name} Logged in
    <button onClick={handleLogout}>Logout</button>
    </div>;
  }

  //  show the login form for non user
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        value={username}
        placeholder="enter a username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={password}
          placeholder="enter a password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>

  );
};


export default App;
