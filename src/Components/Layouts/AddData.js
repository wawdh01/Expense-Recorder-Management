import { useEffect, useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { BASE_URL } from '../Constants';
import axios from 'axios';
import {Container, Col, Row} from 'react-bootstrap';
import MediaQuery from 'react-responsive';


function AddData() {

    
    const [incomeCategory, setIncomeCategory] = useState([]);
    const [expenseCategory, setExpenseCategory] = useState([]);

    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();

    const [incomeErrMessage, setIncomeErrMessage] = useState("");
    const [expenseErrMessage, setExpenseErrMessage] = useState("");

    async function getCategory() {
        const email = await axios.get(BASE_URL + 'auth/loginemail');
        const categories = await axios.post(BASE_URL + 'category/', {email: email.data});
        setIncomeCategory(categories.data.incomeCategory);
        setExpenseCategory(categories.data.expenseCategory);
    }

    useEffect(()=>{
        getCategory();
    },[]);

    async function addExpenseCategory(e) {
        e.preventDefault();
        try {
            
            const emailCategory = await axios.get(BASE_URL + 'auth/loginemail');
            const email = emailCategory.data;
            const incomeexpenseData = {
                email,
                category,
                price,
                description
            }
            console.log(incomeexpenseData);
            axios.post(BASE_URL + 'expense/addExpense', incomeexpenseData);
            alert("Expense record is added !")
        }
        catch(err) {
            setExpenseErrMessage(err.response.data.errorMessage);
        }
    }

    async function addIncomeCategory(e) {
        e.preventDefault();
        try {
            
            const emailCategory = await axios.get(BASE_URL + 'auth/loginemail');
            const email = emailCategory.data;
            const incomeexpenseData = {
                email,
                category,
                price,
                description
            }
            console.log(incomeexpenseData);
            axios.post(BASE_URL + 'income/addIncome', incomeexpenseData);
            alert("Income record is added !")
            
        }
        catch(err) {
            setIncomeErrMessage(err.response.data.errorMessage);
        }
    }



    return(
        <div style={{margin:"50px",  padding:"10px"}}>
            <MediaQuery query="(min-width: 1200px)">
                <Row>
                    <Col>
                        <Container style={{border: "1px solid black", borderRadius:"10px", padding: "10px"}}>
                            <h2>INCOME</h2>
                            <Form onSubmit={addIncomeCategory}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Income Category</Form.Label>
                                    <Form.Select value={category} onChange={e=>setCategory(e.target.value)}>
                                    {
                                    incomeCategory.map((cat)=>{
                                            return(
                                            <option value={cat}>{cat}</option>
                                            );
                                        })
                                    }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Price" value={price} onChange={e=>setPrice(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        We'll never share price with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox" required>
                                    <Form.Check type="checkbox" label="Once added, you can't delete it !" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <p style={{color:"red"}}>{incomeErrMessage}</p>
                        </Container>
                    </Col>


                    <Col>
                        <Container style={{border: "1px solid black", borderRadius:"10px", padding: "10px"}}>
                            <h2>EXPENSE</h2>
                            <Form onSubmit={addExpenseCategory}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Income Category</Form.Label>
                                    <Form.Select value={category} onChange={e=>setCategory(e.target.value)}>
                                    {
                                    expenseCategory.map((cat)=>{
                                            return(
                                            <option value={cat}>{cat}</option>
                                            );
                                        })
                                    }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Price" value={price} onChange={e=>setPrice(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        We'll never share price with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox" required>
                                    <Form.Check type="checkbox" label="Once added, you can't delete it !" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <p style={{color:"red"}}>{expenseErrMessage}</p>
                        </Container>
                    </Col>
                </Row>
            </MediaQuery>




            <MediaQuery query="(max-width: 1200px)">
                <Col>
                    <Row>
                        <Container style={{border: "1px solid black", borderRadius:"10px", padding: "10px", marginBottom: "20px"}}>
                            <h2>INCOME</h2>
                            <Form onSubmit={addIncomeCategory}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Income Category</Form.Label>
                                    <Form.Select value="category" onChange={e=>setCategory(e.target.value)}>
                                    {
                                    incomeCategory.map((cat)=>{
                                            return(
                                            <option value={cat}>{cat}</option>
                                            );
                                        })
                                    }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Price" value={price} onChange={e=>setPrice(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        We'll never share price with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox" required>
                                    <Form.Check type="checkbox" label="Once added, you can't delete it !" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <p style={{color:"red"}}>{incomeErrMessage}</p>
                        </Container>
                    </Row>


                    <Row>
                        <Container style={{border: "1px solid black", borderRadius:"10px", padding: "10px"}}>
                            <h2>EXPENSE</h2>
                            <Form  onSubmit={addExpenseCategory}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Income Category</Form.Label>
                                    <Form.Select value={category} onChange={e=>setCategory(e.target.value)}>
                                    {
                                    expenseCategory.map((cat)=>{
                                            return(
                                            <option value={cat}>{cat}</option>
                                            );
                                        })
                                    }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Price" value={price} onChange={e=>setPrice(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        We'll never share price with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox" required>
                                    <Form.Check type="checkbox" label="Once added, you can't delete it !" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <p style={{color:"red"}}>{expenseErrMessage}</p>
                        </Container>
                    </Row>
                </Col>
            </MediaQuery>

        </div>
    );
}

export default AddData;