import { useContext} from "react";
import NavbarCustom from "./Components/NavbarCustom";
import AuthContext from "./Context/AuthContext";
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import Home from './Components/Home';
import Income from './Components/Layouts/Income';
import Expense from './Components/Layouts/Expense';
import MonthlyReport from './Components/Layouts/MonthlyReport';
import CustomTime from './Components/Layouts/CustomTime';
import About from './Components/Layouts/About';
import Category from "./Components/Layouts/Category";
import AddData from "./Components/Layouts/AddData";

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function Router() {
    const {loggedIn} = useContext(AuthContext);

    return(
        <BrowserRouter>
            <NavbarCustom></NavbarCustom>
            <Routes>
                {
                    loggedIn === false && (
                        <>
                            <Route exact  path="/" element={<Home />} />
                            <Route exat path='/home' element={<Home />} />
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/register" element={<Register />} />
                            <Route exact path="/about" element={< About />} />
                        </>
                    )
                }
                {
                    loggedIn === true && (
                        <>
                            <Route exact  path="/" element={<Home />} />
                            <Route exat path='/home' element={<Home />} />
                            <Route exact path="/income" element={<Income />} />
                            <Route exact path="/expense" element={<Expense />} />
                            <Route exact path="/monthlyReport" element={<MonthlyReport />}/>
                            <Route exact path="/customTime" element={<CustomTime />} />
                            <Route exact path="/about" element={< About />} />
                            <Route exact path="/category" element={< Category />} />
                            <Route exact path="/addData" element={< AddData />} />
                        </>
                    )
                }
            </Routes>
        </BrowserRouter>
    );

}

export default Router;