import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../Components/Constants';

const AuthContext = createContext();
function AuthContextProvider(props) {

    const [loggedIn, setloggedIn] = useState(undefined);

    async function getLoggedIn() {
        const loggedInRes = await axios.get( BASE_URL + 'auth/loggedIn');
        setloggedIn(loggedInRes.data);
    }

    useEffect(()=>{
        getLoggedIn();
    }, [loggedIn]);
    return(
        <AuthContext.Provider value={{loggedIn, getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContextProvider};
export default AuthContext;