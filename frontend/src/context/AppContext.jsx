import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '₹';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    // Application States
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false);
    
    // NEW: Global Loading State (starts as true so the skeletons show immediately on load)
    const [isLoading, setIsLoading] = useState(true);

    const getDoctorsData = async () => {
        setIsLoading(true); // Tell the app we are starting to fetch
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            // FINALLY block ensures loading stops whether the fetch succeeds OR fails
            setIsLoading(false); 
        }
    };

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });
            if (data.success) {
                setUserData(data.userData);
            } else {
                // BUG FIX: Changed 'error.message' to 'data.message' to prevent an undefined error crash
                toast.error(data.message); 
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Make sure to add isLoading to your value object!
    const value = {
        doctors, 
        currencySymbol, 
        token, 
        setToken,
        backendUrl, 
        userData, 
        setUserData, 
        loadUserProfileData, 
        getDoctorsData,
        isLoading 
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;