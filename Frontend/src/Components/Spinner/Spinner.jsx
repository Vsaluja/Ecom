import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import "./Spinner.scss";
import { useLocation, useNavigate } from "react-router-dom";

// default value of path is login if no path is provided then only it will go to login
const Spinner = ({
    path = "/login",
    text = "Unauthorized Access. Redirecting in ",
}) => {
    const [time, setTime] = useState(3);
    const navigate = useNavigate();

    const location = useLocation();
    useEffect(() => {
        setTimeout(() => {
            if (time >= 2) {
                setTime((prev) => prev - 1);
            } else {
                // Here we are setting the state of navigate which we can access in another component like at login so when user logs in he will be directed to the page he wanted to go
                navigate(path, { state: location.pathname });
            }
        }, 1000);
    }, [time]);

    return (
        <div className="loader">
            <ReactLoading type="spin" color="black" />
            <h2>{text + time}</h2>
        </div>
    );
};

export default Spinner;
