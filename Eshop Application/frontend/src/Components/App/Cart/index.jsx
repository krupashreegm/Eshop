import React, { Component } from 'react';
import { Row, Table, Button, Container, Icon, Modal, Input } from 'react-materialize'

class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cart: (this.props.cart),
            total: 0
        }
    }

    renderCart = (item, i) => (

        <div>
            <Table>
                <thead>
                    <tr>
                        <th data-field="id">Item</th>
                        <th data-field="price">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.props.cart[i].title}</td>
                        <td>CDN$ {this.props.cart[i].price / 100}</td>
                        <td><Button className="clearBtn" onClick={() => { this.props.removeItem(item) }}><Icon medium className="clearCross">clear</Icon></Button></td>
                    </tr>
                </tbody>
            </Table>
        </div>)


    render() {

        let priceArr = this.props.cart.map((item) => {
            return item.price
        })
        let cartTotal = priceArr.reduce((sum, item) => {
            return sum + item / 100
        }, 0).toFixed(2)
        
        if (cartTotal === 0) {
            cartTotal = "Your Cart Is Currently Empty"
        }

        return (
            <Container>
                <h3>Shopping Cart</h3>
                <Row >
                    {this.props.cart.map(this.renderCart)}
                </Row>
                <Table>
                    <tr>
                        <th data-field="id">Cart Total</th>
                        <th data-field="price">CDN$ {cartTotal}</th>
                    </tr>
                </Table>

                <Modal
                    trigger={<Button className="checkoutBtn">Check Out</Button>}>
                    <h4>Enter your username and password</h4>
                    <Button className="loginBtn">Proceed as Guest</Button>
                    <Row>
                        <Input s={6} label="User Name" />
                        <Input type="password" label="password" s={12} />
                        <Button className="loginBtn">Submit</Button>
                    </Row>
                </Modal>
            </Container>
        )
    }
}




export default Cart;