import React, { Component } from 'react';
import { Navbar, Nav, Card, Button, Image, Row, Col, Container } from 'react-bootstrap';
import Transaction from './Transaction';
import { Link } from 'react-router-dom';
import history from '../history';
import logo from '../assets/blue.jpg';

const POLL_INTERVAL_MS = 10000;

class TransactionPool extends Component {
    state = { transactionPoolMap: {} };

    fetchTransactionPoolMap = () => {
        fetch(`${document.location.origin}/api/transaction-pool-map`)
            .then(response => response.json())
            .then(json => this.setState({ transactionPoolMap: json }));
    }

    fetchMineTransactions = () => {
        fetch(`${document.location.origin}/api/mine-transactions`)
            .then(response => {
                if (response.status === 200) {
                    alert('success');
                    history.push('/blocks');
                } else {
                    alert('The mine-transactions block request did not complete.');
                }
            });
    }

    componentDidMount() {
        this.fetchTransactionPoolMap();

        this.fetchPoolMapInterval = setInterval(
            () => this.fetchTransactionPoolMap(),
            POLL_INTERVAL_MS
        );
    }

    componentWillUnmount () {
        clearInterval(this.fetchPoolMapInterval);
    }

    render() {
        return (
            <div className='TransactionPool'>

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

                {/* <div><Link to='/'>Home</Link></div> */}
                <h3>Transaction Pool</h3>
                {
                    Object.values(this.state.transactionPoolMap).map(transaction => {
                        return (
                            <div key={transaction.id}>
                                <hr />
                                <Transaction transaction={transaction} />
                            </div>
                        )
                    })
                }
                <hr />
                <Button
                    bsStyle="danger"
                    onClick={this.fetchMineTransactions}
                >
                    Mine the Transactions
                </Button>
            </div>
        )
    }
}

export default TransactionPool;