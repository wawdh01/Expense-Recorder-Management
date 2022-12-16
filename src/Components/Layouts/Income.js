import { useState, useEffect} from "react";
import axios from 'axios';
import { BASE_URL } from "../Constants";
import {Table} from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import {HashLoader} from "react-spinners";
import alert from '../../Images/alert.png';
import {Image} from "react-bootstrap";

function Income() {

    const [income, setIncome] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
      

    async function getIncome() {
        setIsLoading(true);
        const emailIncome = await axios.get(BASE_URL + 'auth/loginemail');
        const email = emailIncome.data;
        const incomeData = {
            email
        }
        const incomeRes = await axios.post(BASE_URL + "income/", incomeData);
        setIncome(incomeRes.data);
    }

    useEffect(()=>{
        getIncome();
        setIsLoading(false);
    }, []);


    function splitDate(dateTime) {
        const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const date = dateTime.split('T')[0];
        const date_split = date.split('-');
        var date_str = ''
        date_str += date_split[2];
        date_str += ' '
        date_str += monthArr[parseInt(date_split[1]) - 1];
        date_str += ' '
        date_str += date_split[0];
        return date_str;

    }

    if (isLoading === false) {
        if (income.length === 0) {
            return (
                <div style={{marginTop: "100px", padding: "10px"}}>
                <center>
                    <Image style={{width: "20%", height: "15%"}} src={alert} roundedCircle />
                    <p>You don't have any Transaction</p>
                    <p style={{fontFamily: "Hind"}}>(आपका कोई लेन-देन नहीं है !)</p>
                </center>
                </div>
            );
        }
        else {
            return(
                <div style={{marginTop: "60px"}}>
                    <MediaQuery query="(min-width: 1200px)">
                    <center>
                        <p><b>This is your overall INCOME...</b></p>
                        <Table bordered striped variant="dark" size="sm">
                            <thead>
                                <tr>
                                    <td>Category</td>
                                    <td>Price (&#x20B9;)</td>
                                    <td>Description</td>
                                    <td>Date</td>
                                </tr>
                            </thead>
                            {
                                income.map((inc)=>{
                                    return(
                                        <tr>
                                            <td>{inc.category}</td>
                                            <td style={{color:"green"}}>{inc.price}</td>
                                            <td>{inc.description}</td>
                                            <td>{splitDate(inc.updatedAt)}</td>
                                        </tr>
                                    );
                                })
                            }
                        </Table>
                    </center>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 1200px)">
                        <center>
                        <p><b>This is your overall INCOME...</b></p>
                        {
                            income.map((inc)=>{
                                return(
                                    <div style={{margin: "10px", padding: "10px"}}>
                                    <center>
                                    <details>
                                        <summary>
                                            <div style={{border: "1px solid black", borderRadius: "5px"}}>

                                                <td style={{padding: "5px", marginRight: "10px", marginLeft:"30px"}}>{inc.category}</td>
                                                <td style={{padding: "5px", color:"green", border:"2px solid blue", borderRadius: "5px"}}>{inc.price} &#x20B9;</td>
                                                <td>{splitDate(inc.updatedAt)}</td>
                                            </div>
                                        </summary>
                                        <p>
                                            {inc.description}
                                        </p>
                                    </details>
                                    </center>
                                    </div>
                                );
                            })
                        }
                        </center>
                    </MediaQuery>
                </div>
            );
        }
    }
    else {
        return(
            <div>
                <div style={{marginTop: "200px", textAlign:"center", fontFamily: "Great Vibes"}}>
                    <h1>Expense Recorder System</h1>
                </div>
                <center>
                    <div style={{marginTop: "15%", marginLeft:"5%"}}>
                        <HashLoader loading size="40"/>
                    </div>
                </center>
            </div>
        );
    }
}

export default Income;