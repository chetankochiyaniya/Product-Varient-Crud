import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../Util/constant";
import authService from "../../../services/authService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const history = useHistory();

    const validate = () => {
        let tempErrors = {};
        // Check if username is not an image file
        if (!username || username.length < 4) {
            tempErrors.username = "Username must be at least 4 characters";
        } else if (/\.(jpg|jpeg|png|gif)$/i.test(username)) {
            tempErrors.username = "Username cannot be an image";
        }

        // Check if password is at least 4 characters
        if (!password || password.length < 4) {
            tempErrors.password = "Password must be at least 4 characters";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        if (!validate()) return;

        try {
            const { accessToken, refreshToken } = await authService.loginApi(username, password);
            // Store tokens in localStorage (or HTTP-only cookies for better security)
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            history.push("/dashboard"); // Redirect to dashboard
        } catch (error) {
            if (error.response) {
                setServerError(error.response.data.error || "Something went wrong. Please try again.");
            } else {
                setServerError("Network error. Please check your connection.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            placeholder="Enter Username"
                        />
                        {errors.username && <p style={styles.error}>{errors.username}</p>}
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Enter Password"
                        />
                        {errors.password && <p style={styles.error}>{errors.password}</p>}
                    </div>
                    {serverError && <p style={styles.serverError}>{serverError}</p>}
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
};



const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
    },
    card: {
        backgroundColor: "#191c24",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
    },
    title: {
        color: "#fff",
        marginBottom: "20px",
    },
    inputGroup: {
        marginBottom: "15px",
        textAlign: "left",
    },
    label: {
        color: "#fff",
        fontSize: "14px",
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "4px",
        border: "none",
        outline: "none",
        fontSize: "16px",
        color: "#000", // Set text color to black
    },
    button: {
        backgroundColor: "#0090e7",
        color: "#fff",
        padding: "10px 15px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        width: "100%",
        fontSize: "16px",
        marginTop: "12px",
        marginBottom: "10px"
    },
    error: {
        color: "red",
        fontSize: "12px",
    },
    serverError: {
        color: "red",
        fontSize: "14px",
        marginBottom: "10px",
    },
};

export default Login;
