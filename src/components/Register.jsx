/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../API";

const Register = ({setToken}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await registerUser(firstname, lastname, email, password);
    // console.log("response", response);

    if (response && response.token !== undefined) {
      setToken(response.token);                      /*Setting state token*/
      localStorage.setItem("token", response.token); /*Setting local token*/
    } else {
        setError("Registeration fail. Please check informations and try again!")
        return;
    }

    if (response.token) { /**/
      navigate("/users/me");
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="formContainer">
      <h1>Register</h1>

      {error && (<p style={{color: "red"}}>{error}</p>)}

      <form onSubmit={handleSubmit}>
        <label>
          First Name:{" "}
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>

        <label>
          Last Name:{" "}
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>

        <label>
          Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit" className="formButtons">Register</button>
      </form>
    </div>
  );
};

export default Register;
