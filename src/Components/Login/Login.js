import React, {useContext, useState} from 'react';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {Form, Container, Col, Row, Button} from 'react-bootstrap';
import {HashLoader} from 'react-spinners';
import { BASE_URL } from '../Constants';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resetemail, setResetemail] = useState("");
    const [oldPassword, setOldpassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [forgotemail, setForgotemail] = useState("");
    const [forgotmobile, setForgotmobile] = useState("");

    const {getLoggedIn} = useContext(AuthContext);

    const [loginerrMessage, setLoginerrMessage] = useState("");
    const [forgoterrMessage, setForgoterrMessage] = useState("");
    const [reseterrMessage, setReseterrMessage] = useState("");

    const navigate = useNavigate();


    async function forogotlogin(e) {
        e.preventDefault();
        setForgoterrMessage("");
        setIsLoading(true);
        try {
            const forgotData = {
                forgotemail,
                forgotmobile
            }
            await axios.post(BASE_URL + 'auth/forgotpassword', forgotData);
            setIsLoading(false);
            alert('Mail has been Sent..\nPlease Check your mailbox.. !')
        }
        catch(err) {
            setIsLoading(false);
            setForgoterrMessage(err.response.data.errorMessage);
        }
    }

    async function resetlogin(e) {
        e.preventDefault();
        setReseterrMessage("");
        setIsLoading(true);
        try {
            const resetData = {
                resetemail,
                oldPassword,
                newPassword
            };
            await axios.post(BASE_URL + 'auth/resetpassword', resetData);
            setIsLoading(false);
            alert('Your Password has been Resetted...\nPlease Login.. !')
        }
        catch(err) {
            setIsLoading(false);
            setReseterrMessage(err.response.data.errorMessage);
        }
    }

    async function login(e) {
        e.preventDefault();
        setLoginerrMessage("");
        setIsLoading(true);
        try {
            const loginData = {
                email,
                password
            };
            await axios.post(BASE_URL + "auth/login", loginData);
            await getLoggedIn();
            setIsLoading(false);
            navigate("/home");
        }
        catch(err) {
            setIsLoading(false);
            setLoginerrMessage(err.response.data.errorMessage);
        }
    }


    if (isLoading === false)
    {
        return(
            <div style={{marginTop: "100px"}}>
                <Container fluid="md" className="mt-5">
                    <Row style={{border: "2px black"}}>
                        <Col>
                            <Form onSubmit={login}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                            </Form.Group>
                            <p style={{color:'red'}}>{loginerrMessage}</p>
                            <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <pre>


                        </pre>
                        <p>
                            Dear Members,
                            <ol>
                                <li>If you have reset the password then you can fill the <i>reset password</i> Form.</li>
                                <li>If you have Forgot the password Then,
                                    <ul>
                                        <li>Fill the <i>Forgot Password</i> form.</li>
                                        <li>The mail will go to the registered email id</li>
                                        <li>Your old password is there in the mail</li>
                                        <li>Now You can, reset the password if you wish.(Better Advice: Reset Your Password)</li>
                                    </ul>
                                </li>

                            </ol>
                        </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <pre>


                                
                            </pre>
                            <Form onSubmit={resetlogin}>
                            <fieldset>
                            <legend>Reset Your Password</legend>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setResetemail(e.target.value)} value={resetemail}/>
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e)=>setOldpassword(e.target.value)} value={oldPassword} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} />
                            </Form.Group>
                            <p style={{color:'red'}}>{reseterrMessage}</p>
                            <Button variant="primary" type="submit">Reset Password</Button>
                            </fieldset>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <pre>



                        </pre>
                        <Form onSubmit={forogotlogin}>
                            <fieldset>
                            <legend>Forgot Your Password</legend>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setForgotemail(e.target.value)} value={forgotemail}/>
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="number" placeholder="Mobile Number" onChange={(e)=>setForgotmobile(e.target.value)} value={forgotmobile} />
                            </Form.Group>
                            <p style={{color:'red'}}>{forgoterrMessage}</p>
                            <Button variant="danger" type="submit">Forgot Password</Button>
                            </fieldset>
                            </Form>
                            <pre>


                                
                            </pre>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
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

export default Login;