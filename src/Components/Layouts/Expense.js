import { useState, useEffect} from "react";
import axios from 'axios';
import { BASE_URL } from "../Constants";
import {Table} from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import {Image} from 'react-bootstrap';
import { HashLoader } from "react-spinners";
import alert from '../../Images/alert.png'

function Expense() {

    const [expense, setExpense] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getExpense() {
        setIsLoading(true);
        const emailExpense = await axios.get(BASE_URL + 'auth/loginemail');
        const email = emailExpense.data;
        const expenseData = {
            email
        }
        const expenseRes = await axios.post(BASE_URL + "expense/", expenseData);
        setExpense(expenseRes.data);
;    }

    useEffect(()=>{
        getExpense();
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
        if (expense.length === 0) {
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
                        <p><b>This is your overall EXPENSE...</b></p>
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
                                expense.map((exp)=>{
                                    return(
                                        <tr>
                                            <td>{exp.category}</td>
                                            <td style={{color:"red"}}>{exp.price}</td>
                                            <td>{exp.description}</td>
                                            <td>{splitDate(exp.updatedAt)}</td>
                                        </tr>
                                    );
                                })
                            }
                        </Table>
                    </center>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 1200px)">
                        <center>
                        <p><b>This is your overall EXPENSE...</b></p>
                        {
                            expense.map((exp)=>{
                                return(
                                    <div style={{margin: "10px", padding: "10px"}}>
                                    <center>
                                    <details>
                                        <summary>
                                            <div style={{border: "1px solid black", borderRadius: "5px", margin:"10px", padding: "10px"}}>
        
                                                <td style={{padding: "5px"}}>{exp.category}</td>
                                                <td style={{padding: "5px", color:"red", border:"2px solid blue", borderRadius: "5px"}}><b>{exp.price} &#x20B9;</b></td>
                                                <td>{splitDate(exp.updatedAt)}</td>
                                            </div>
                                        </summary>
                                        <p>
                                            {exp.description}
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

export default Expense;