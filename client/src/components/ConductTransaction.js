import React, { Component } from 'react';
import { FormGroup, FormControl, Navbar, Nav, Card, Button, Image, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/blue.jpg';
import history from '../history';

class ConductTransaction extends Component {
    state = { recipient:'', amount: 0, knownAddresses: [] };

    componentDidMount() {
        fetch(`${document.location.origin}/api/known-addresses`)
            .then(response => response.json())
            .then(json => this.setState({ knownAddresses: json }));
    }

    updateRecipient = event => {
        this.setState({ recipient: event.target.value });
    }

    updateAmount = event => {
        this.setState({ amount: Number(event.target.value) });
    }

    conductTransaction = () => {
        const { recipient, amount } = this.state;

        fetch(`${document.location.origin}/api/transact`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({ recipient, amount })
        }).then(response => response.json())
            .then(json => {
                alert(json.message || json.type);
                history.push('/transaction-pool');
            });
    }

    render() {
        return (
            <div className='ConductTransaction'>

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

                {/* <Link to='/'>Home</Link> */}
                <h3>Make a Transaction</h3>
                <br />

                <Container>
                <Row>
                <Col md={{ span: 6, offset: 3 }}>
                <FormGroup>
                    <FormControl
                        input='text'
                        placeholder='recipient'
                        valur={this.state.recipient}
                        onChange={this.updateRecipient}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        input='number'
                        placeholder='amount'
                        valur={this.state.amount}
                        onChange={this.updateAmount}
                    />
                </FormGroup>
                <div>
                    <Button
                        bsStyle="danger"
                        onClick={this.conductTransaction}
                    >
                        Submit
                    </Button>
                </div>
                </Col>
                </Row>
                </Container>

                <div className='known-addr-section'>
                <h4>Known Addresses</h4>
                <br />
                <Container>
                <Row>
                <Col md={{ span: 12, offset: 0 }}>
                {
                    this.state.knownAddresses.map(knownAddress => {
                        return (

                            <Card body>
                                <div key={knownAddress}>
                                    <div>{knownAddress}</div>
                                    <br />
                                </div>
                            </Card>

                        );
                    })
                }
                </Col>
                </Row>
                </Container>
                </div>
                
                {/* <FormGroup>
                    <FormControl
                        input='text'
                        placeholder='recipient'
                        valur={this.state.recipient}
                        onChange={this.updateRecipient}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        input='number'
                        placeholder='amount'
                        valur={this.state.amount}
                        onChange={this.updateAmount}
                    />
                </FormGroup>
                <div>
                    <Button
                        bsStyle="danger"
                        onClick={this.conductTransaction}
                    >
                        Submit
                    </Button>
                </div> */}
            </div>
        )
    }
};

export default ConductTransaction;