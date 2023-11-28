import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import HomePage from "./src/components/HomePage";
import SearchBar from "./src/components/SearchBar";
import ProductDetails from "./src/components/ProductDetails";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AuthComponent from "./src/components/AuthComponent";
import MyContext from "./src/components/MyContext";
import { useState } from "react";
import { Provider } from "react-redux";

const AppLayout = () => {
    const [text, setText] = useState("");
    return (
        <MyContext.Provider value={{ token: text, setText }}>
            <div >
                <Header />
                <SearchBar />
                <Outlet />
            </div>
        </MyContext.Provider >


    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true, // Use 'index: true' instead of a duplicate path
                element: <HomePage />,
            },
            {
                path: "login", // Use 'index: true' instead of a duplicate path
                element: <AuthComponent />,
            },
            {
                path: "product/:pid",
                element: <ProductDetails />,
            },
        ],
    },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
