import React from 'react';
import expenselogo from '../../Images/expenselogo.png';
import {Row, Col, Image} from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import tech1 from '../../Images/tech1.png';
import tech2 from '../../Images/tech2.png';
import tech3 from '../../Images/tech3.png';
import tech4 from '../../Images/tech4.png';
function About() {
    return(
        <div style={{margin: "40px", padding: "10px"}}>
            <center>
                <img src={expenselogo} alt='Expense Logo' style={{width: "50%", marginTop: "30px"}}></img>
                <h3>This is an Opensource project</h3>
            </center>
                <div style={{margin: "10px", padding:"10px", border:"2px solid black", borderRadius:"10px"}}>
                    <p>
                        <ul>
                            <li>This project is made to keep the record of your expenses.</li>
                            <li>You can add your expenses , income record and get the record of every month in PDF format.</li>
                            <li>You can also get the record of specific time. (Customization is available)</li>
                            <li>Techstacks used are as follows (MERN Stack):-</li>
                                <ul>
                                    <li><b>M</b>ongo DB</li>
                                    <li><b>E</b>xpress</li>
                                    <li><b>R</b>eact</li>
                                    <li><b>N</b>ode js</li>
                                </ul>
                        </ul>
                    </p>
                </div>
            <div>
                <MediaQuery query="(min-width: 1200px)">
                    <Row>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={tech1} rounded />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={tech2} rounded />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={tech3} rounded />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={tech4} rounded />
                        </Col>
                    </Row>
                </MediaQuery>
                <MediaQuery query="(max-width: 1200px)">
                    <Col>
                        <Row>
                            <Image style={{width: "100%", height: "80%"}} src={tech1} rounded />
                        </Row>
                        <Row>
                            <Image style={{width: "100%", height: "80%"}} src={tech2} rounded />
                        </Row>
                        <Row>
                            <Image style={{width: "100%", height: "80%"}} src={tech3} rounded />
                        </Row>
                        <Row>
                            <Image style={{width: "100%", height: "80%"}} src={tech4} rounded />
                        </Row>
                    </Col>
                </MediaQuery>
            </div>
            <center>
                <a href="https://github.com/wawdh01/Expense-Recorder-Management" target={"_blank"}><b style={{color: "blue"}}>Github Repository Link</b></a>
            </center>
        </div>
    );
}

export default About;