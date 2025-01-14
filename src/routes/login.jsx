import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;
    const [docs, setDocs] = useState([]);
    const [msg, setMsg] = useState(<div></div>);
    const [error, setError] = useState("");  // Track error messages

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userRef = collection(db, "User-data");

        try {
            const response = await getDocs(userRef);
            const userdata = response.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
            }));
            setDocs(userdata);
            checkUserCredentials(userdata);  // Pass `userdata` to avoid async issues
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Error fetching user data. Please try again.");
        }
    };

    function checkUserCredentials(userdata) {
        const userMatch = userdata.find(
            (up) => email === up.data.user["emailId"] && password === up.data.user["password"]
        );

        if (userMatch) {
            setMsg(<h2>Welcome, {userMatch.data.user["firstName"]}</h2>);
            setError("");
        } else {
            setError("Credentials do not match");
        }
    }

    return (
        <div className="Login">
            <Link to="/signup">
                <button className="sign-up">Sign up</button>
            </Link>
            <div className="login-details">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Your email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter Your Email ID"
                        required
                    />

                    <label htmlFor="password">Your Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Enter Your Password"
                        required
                    />

                    <br />
                    <button className="login-button" type="submit">
                        Login
                    </button>
                </form>
            </div>
            <div className="display-msg">
                {msg}
                {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
        </div>
    );
}

export default Login;
