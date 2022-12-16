import MediaQuery from "react-responsive";
import { useEffect, useState } from 'react';
import {Row, Col} from 'react-bootstrap';
import axios from "axios";
import { BASE_URL } from "../Constants";
import {Form, Button} from 'react-bootstrap';

function Category() {

    const [category, setCategory] = useState("income");
    const [cats, setCats] = useState();
    const [resMessage, setResMessage] = useState("");

    const [incomeCategory, setIncomeCategory] = useState([]);
    const [expenseCategory, setExpenseCategory] = useState([]);

    async function getCategory() {
        const email = await axios.get(BASE_URL + 'auth/loginemail');
        const categories = await axios.post(BASE_URL + 'category/', {email: email.data});
        setIncomeCategory(categories.data.incomeCategory);
        setExpenseCategory(categories.data.expenseCategory);
    }

    async function addCategoryNew() {
        var email = await axios.get(BASE_URL + 'auth/loginemail');
        email = email.data;
        const catNew = {
            email,
            category: cats
        }
        if (category === "income") {
            const res = await axios.post(BASE_URL + 'category/addIncomeCategory', catNew);
            setResMessage(res.data);
            
        }
        else {
            const res = await axios.post(BASE_URL + 'category/addExpenseCategory', catNew);
            setResMessage(res.data);
        }
    }

    useEffect(()=>{
        getCategory();
    },[]);

    return(
        <div style={{margin: "60px"}}>
            <MediaQuery query="(min-width: 1200px)">
                <Row style={{border: "1px solid black", padding:"10px", margin: "10px", borderRadius: "10px"}}>
                    <Col>
                        <h2><u>Income Category</u></h2>
                        {
                            incomeCategory.length === 0 ?
                            <p style={{color: "red"}}>You don't have any income Category !</p>
                            :
                            <ul>
                                {
                                    incomeCategory.map((inc)=>{
                                        return(
                                            <li>{inc}</li>
                                        );
                                    })
                                }
                            </ul>
                        }
                    </Col>
                    <Col>
                        <h2><u>Expense Category</u></h2>
                        {
                            expenseCategory.length === 0 ?
                            <p style={{color: "red"}}>You don't have any expense Category !</p>
                            :
                            <ul>
                                {
                                    expenseCategory.map((exp)=>{
                                        return(
                                            <li>{exp}</li>
                                        );
                                    })
                                }
                            </ul>
                        }
                    </Col>
                </Row>
            </MediaQuery>
            <MediaQuery query="(max-width: 1200px)">
                <Col style={{border: "1px solid black",margin: "10px", borderRadius: "10px"}}>
                    <Row style={{margin: "10px"}}>
                    <h2><u>Income Category</u></h2>
                        {
                            incomeCategory.length === 0 ?
                            <p style={{color: "red"}}>You don't have any income Category !</p>
                            :
                            <ul>
                                {
                                    incomeCategory.map((inc)=>{
                                        return(
                                            <li>{inc}</li>
                                        );
                                    })
                                }
                            </ul>
                        }
                    </Row>
                    <Row style={{margin: "10px"}}>
                    <h2><u>Expense Category</u></h2>
                        {
                            expenseCategory.length === 0 ?
                            <p style={{color: "red"}}>You don't have any expense Category !</p>
                            :
                            <ul>
                                {
                                    expenseCategory.map((exp)=>{
                                        return(
                                            <li>{exp}</li>
                                        );
                                    })
                                }
                            </ul>
                        }
                    </Row>
                </Col>
            </MediaQuery>
            <div>
                <Form onSubmit={addCategoryNew}>
                    <Form.Group className="mb-3">
                        <Form.Label>Income / Expense</Form.Label>
                        <Form.Select value={category} onChange={e=>setCategory(e.target.value)}>
                                <option value="income">INCOME</option>
                                <option value="expense">EXPENSE</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Category" value={cats} onChange={e=>setCats(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <p>{resMessage}</p>
            </div>
        </div>
    );
}

export default Category;