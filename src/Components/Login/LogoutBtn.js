import axios from 'axios';
import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import {Button} from 'react-bootstrap';
import {BASE_URL} from '../Constants';

function LogOutBtn() {

    const {getLoggedIn} = useContext(AuthContext);

    const navigate = useNavigate();
    async function logout() {
        await axios.get(BASE_URL + "auth/logout");
        await getLoggedIn();
        navigate("/login");
    }

    return (
        <Button variant="outline-danger" onClick={logout}>
            LogOut
        </Button>
    );
}

export default LogOutBtn;