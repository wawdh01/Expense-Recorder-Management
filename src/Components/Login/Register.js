import React, {useState} from 'react';
import axios from 'axios';
import { BASE_URL } from '../Constants';
import {Form, Container, Col, Row, Button} from 'react-bootstrap';
import {HashLoader} from 'react-spinners';

function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [mbNumStr, setMbNumStr] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function register(e) {
        e.preventDefault();
        setErrMessage("");
        setIsLoading(true);
        try {
            const mbNum = parseInt(mbNumStr);
            const registerData = {
                email,
                name,
                mbNum,
                password,
                passwordVerify
            };
            await axios.post( BASE_URL + "auth/", registerData);
            setIsLoading(false);
            alert("User Succesfully Registerd & Mail hase been sent to User\nThank You !");
            setEmail("");
            setName("");
            setMbNumStr("");
            setPassword("");
            setPasswordVerify("");
        }
        catch(err) {
            setIsLoading(false);
            setErrMessage(err.response.data.errorMessage);
        }
    }

    if (isLoading === false)
    return(
        <div style={{marginTop: "100px"}}>
        <Container fluid="md" className="mt-5">
            <Row>
                <Col>
                    <Form onSubmit={register}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                        <Form.Text className="text-muted">
                        e.g. abcd@gmail.com
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} value={name}/>
                        <Form.Text className="text-muted">
                        e.g. abcd
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicMobileNumber">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter Name" onChange={(e)=>setMbNumStr(e.target.value)} value={mbNumStr}/>
                        <Form.Text className="text-muted">
                        e.g. 5475856789
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPasswordVerify(e.target.value)} value={passwordVerify} />
                    </Form.Group>
                    <p style={{color: 'red'}}>{errMessage}</p>
                    <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
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


export default Register;