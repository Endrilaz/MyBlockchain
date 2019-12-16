import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/blue.jpg';
import bg from '../assets/bg-header.png';
import { Navbar, Nav, Card, Button, Image, Row, Col, Container } from 'react-bootstrap';

class App extends Component {
state = { walletInfo: {} };

    componentDidMount() {
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
            .then(json => this.setState({ walletInfo: json }));
    }
    render() {
        const { address, balance } = this.state.walletInfo;

        return (
            <div className='App'>

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />{' '}
                    ZIMABLUE<strong>.</strong>
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/blocks">Blocks</Nav.Link>
                    <Nav.Link href="/conduct-transaction">Make a Transaction</Nav.Link>
                    <Nav.Link href="/transaction-pool">Pool</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

                <div className='zimablue-line-full'></div>

                {/* <Image src={bg} fluid /> */}

                <div className='header-txt'>
                    <h1>ZIMABLUE<strong>.</strong></h1>
                    <h2>
                    ZB is a prototype project of an emulated cryptocurrency based on blockchain
                    </h2>
                </div>

                <div className='zimablue-line-full'></div>

                <Container>
                <Row>
                <Col md={{ span: 10, offset: 1 }}>


                <div className='wallet-section'>
                <div className='container'>
                    <div className="text-center">

                    <div className='Card'>
                    <Card>
                    <Card.Header>My wallet</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                        <p>
                            <div className='WalletInfo'>
                                <div>
                                    Address
                                    <br />
                                    {address}
                                </div>
                                <div>
                                    Balance
                                    <br />
                                    {balance}
                                </div>
                            </div>
                        </p>
                        </blockquote>
                        {/* <Button variant="info">Info</Button> */}
                    </Card.Body>
                    </Card>
                    </div>

                    </div>
                </div>
                </div>

                </Col>
                </Row>
                </Container>

            </div>
        );
    }
}

export default App;