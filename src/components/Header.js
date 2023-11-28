import React, { useState, useEffect } from 'react';
import { image_link } from '../utils/constants';
import { Link } from 'react-router-dom';



const Header = () => {

    const [userLocation, setUserLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ latitude, longitude });

                        // Make API call to OpenWeatherMap
                        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<YOUR_API_KEY>&units=metric`)
                            .then(response => response.json())
                            .then(data => {
                                setWeatherData(data);
                            })
                            .catch(error => console.log(error));
                    },
                    (error) => {
                        console.error("Error getting location:", error.message);
                        setUserLocation("Location not available");
                    }
                );
            } else {
                setUserLocation("Geolocation is not supported by this browser.");
            }
        };

        getLocation();
    }, []);

    return (
        <div className="header bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-2 md:mb-0">
                <div className="icon">
                    <img src={image_link} alt="Icon" className="h-8 w-8" />
                </div>
                <div className="menu ml-2">Menu</div>
            </div>

            <div className="location mb-2 md:mb-0">
                {/* Display the extracted location and weather information */}
                {userLocation && typeof userLocation === "object" ? (
                    <>

                        <p className="text-xs md:text-base">{`Location: Lat ${userLocation.latitude}, Long ${userLocation.longitude}`}</p>
                    </>
                ) : (
                    <span>{userLocation}</span>
                )}
            </div>
            <Link to={"/login"}>
                <div className="user mb-2 md:mb-0">
                    Login
                </div>
            </Link>
            <Link to={"/"}>
                <div className="user mb-2 md:mb-0">
                    Home
                </div>
            </Link>
            <div className="cart">
                Cart
            </div>
        </div>
    );
};

export default Header;
