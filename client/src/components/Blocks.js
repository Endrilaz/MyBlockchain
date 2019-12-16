import React, { Component } from 'react';
import { Navbar, Nav, Card, Button, Image, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Block from './Block';
import logo from '../assets/blue.jpg';

class Blocks extends Component {
    state = { blocks: [], paginatedId: 1, blocksLength: 0 };

    componentDidMount() {
        fetch(`${document.location.origin}/api/blocks/length`)
            .then(response => response.json())
            .then(json => this.setState({ blocksLength: json }));

        this.fetchPaginatedBlocks(this.state.paginatedId)();
    }

    fetchPaginatedBlocks = paginatedId => () => {
        fetch(`${document.location.origin}/api/blocks/${paginatedId}`)
            .then(response => response.json())
            .then(json => this.setState({ blocks: json }));
    }

    render() {
        console.log('this.state', this.state);

        return (

            <div>

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

                <h3>Blocks</h3>
                <br />
                <div>
                    {
                        [...Array(Math.ceil(this.state.blocksLength/5)).keys()].map(key => {
                            const paginatedId = key+1;

                            return (
                                <span key={key} onClick={this.fetchPaginatedBlocks(paginatedId)}>
                                    <Button bsSize="small" bsStyle="danger">
                                        {paginatedId}
                                    </Button>{' '}
                                </span>
                            )
                        })
                    }
                </div>
                <br />
                {
                    this.state.blocks.map(block => {
                        return (

                            <Container>
                                <Row>
                                    <Col md={{ span: 6, offset: 3 }}>
                                    <Card body>
                                        <Block key={block.hash} block={block} />
                                    </Card>
                                    </Col>
                                </Row>
                            </Container>
                        );
                    })
                }
            </div>
        );
    }
}

export default Blocks;