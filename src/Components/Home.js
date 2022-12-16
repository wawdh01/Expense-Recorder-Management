import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import pic1 from '../Images/pic1.jpeg'
import pic2 from '../Images/pic2.png'
import pic3 from '../Images/pic3.jpg'
import pic4 from '../Images/pic4.png'

function Home() {
    return(
        <div style={{padding: "10px", marginTop: "60px"}}>
            <Container style={{ borderRadius: "10px", color: "purple", border: "2px solid blueviolet", padding: "10px", backgroundColor: "blueviolet"}}>
            <MediaQuery query="(min-width: 1200px)">
                <Container>
                    <Row>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic1} rounded />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic2} rounded />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic3} rounded />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic4} rounded />
                        </Col>
                    </Row>
                </Container>
            </MediaQuery>
            <MediaQuery query="(max-width: 1200px)">
                <Container>
                    <Row>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic1} roundedCircle />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic2} roundedCircle />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic3} roundedCircle />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic4} roundedCircle />
                        </Col>
                    </Row>
                </Container>
            </MediaQuery>
            </Container>

            <div>
                <center>
                    <hr></hr>
                    <Container style={{display: "flex-box", padding: "20px", margin: "20px"}}>
                        <i class="fa fa-area-chart" style={{fontSize: "48px", padding: "20px", color:"orange"}}></i>
                        <i class="fa fa-bar-chart" style={{fontSize: "48px", padding: "20px", color:"purple"}}></i>
                        <i class="fa fa-line-chart" style={{fontSize: "48px", padding: "20px", color:"black"}}></i>
                        <i class="fa fa-pie-chart" style={{fontSize: "48px", padding: "20px", color:"blue"}}></i>
                    </Container>
                    <hr></hr>
                    <h4 style={{fontFamily: "Dancing Script", fontSize: "30px"}}><b>"Do not save what is left after spending; instead spend what is left after saving."</b></h4>
                    <pre>


                    </pre>
                </center>
            </div>
        </div>
    );
}

export default Home;