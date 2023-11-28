import React, { useState } from "react";
import { useContext } from "react";

import { MyContext } from "./MyContext";

const AuthComponent = () => {
    console.log("Auth is called")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [activeSection, setActiveSection] = useState("login"); // Added state for active section

    const projectId = '3oxp02p5lcr2';
    const baseUrl = 'https://academics.newtonschool.co/api/v1/user/';

    const handleLogin = () => {
        const url = `${baseUrl}login`;

        const requestBody = {
            email: email,
            password: password,
            appType: 'ecommerce',
        };

        sendRequest(url, requestBody);
    };

    const handleSignup = () => {
        const url = baseUrl + "signup";

        const requestBody = {
            name: name,
            email: email,
            password: password,
            appType: 'ecommerce',
        };

        sendRequest(url, requestBody);
    };

    const handleForgotPassword = () => {
        const url = `${baseUrl}forgotPassword`;

        const requestBody = {
            email: email,
            appType: 'ecommerce',
        };

        sendRequest(url, requestBody);
    };

    const handleResetPassword = () => {
        // Implement reset password logic here
        // You may need additional state variables and UI elements
    };

    const sendRequest = (url, requestBody) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'projectID': projectId,
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    setSuccessMessage(data.status);
                    setError("");
                } else {
                    setError(data.message || "Request failed");
                    setSuccessMessage("");
                }
            })
            .catch(error => {
                console.error('Error during request:', error);
                setError("An error occurred");
                setSuccessMessage("");
            });
    };
    const toggleSection = (section) => {
        setActiveSection(section);
        // Optionally, you can reset form fields when toggling sections
        setEmail("");
        setPassword("");
        setName("");
        setNewPassword("");
        setError("");
        setSuccessMessage("");
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Authentication</h2>
            <div className="mb-4">
                <button
                    className={`mr-4 ${activeSection === "login" ? "text-blue-500 border-b-2 border-blue-500" : ""
                        }`}
                    onClick={() => setActiveSection("login")}
                >
                    Login
                </button>
                <button
                    className={`mr-4 ${activeSection === "signup" ? "text-green-500 border-b-2 border-green-500" : ""
                        }`}
                    onClick={() => setActiveSection("signup")}
                >
                    Signup
                </button>
                <button
                    className={`${activeSection === "forgot" ? "text-green-500 border-b-2 border-green-500" : ""
                        }`}
                    onClick={() => setActiveSection("forgot")}
                >
                    Forgot Password
                </button>
            </div>

            {activeSection === "login" && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                    />
                    <label className="block text-sm font-medium text-gray-600 mt-2">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue mt-4 transition duration-300"
                    >
                        Login
                    </button>
                </div>
            )}

            {activeSection === "signup" && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                    />
                    <label className="block text-sm font-medium text-gray-600 mt-2">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                    />
                    <label className="block text-sm font-medium text-gray-600 mt-2">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                    />
                    <button
                        onClick={handleSignup}
                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-green mt-4 transition duration-300"
                    >
                        Signup
                    </button>
                </div>
            )}

            {activeSection === "forgot" && (
                <div className="mb-4">

                    <label className="block text-sm font-medium text-gray-600 mt-2">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                    />

                    <button

                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-green mt-4 transition duration-300"
                    >
                        Reset Password
                    </button>
                </div>
            )}



            {successMessage && <p className="text-green-600">{successMessage}</p>}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
};

export default AuthComponent;
