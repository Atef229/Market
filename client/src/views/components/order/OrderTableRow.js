import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Button,  Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

 class OrdersTableRow extends Component {
    constructor(props) {
        super(props);
         
        this.state = {
            modal: false,
            danger: false,
          };

         this.toggleDanger = this.toggleDanger.bind(this);
         this.toggle = this.toggle.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
      // Redirect to Dashboard
      this.props.history.push('/dashboard')
    
      }

    deleteOrder() {
        axios.delete('/api/order/delete/' + this.props.obj.order_id)
            .then((res) => 
            console.log('Order successfully deleted!')
            ).catch((error) => {
                console.log(error)
            })

    // Redirect to Dashboard
       //this.props.history.push('/dashboard' );
    }

    toggle() {
        this.setState({
          modal: !this.state.modal,
        });
      }

    toggleDanger() {
        this.setState({
          danger: !this.state.danger,
        });
      }



    render() {
      
        return (
            <tr>
                <td>{this.props.obj.owner_id}</td>
                <td>{this.props.obj.owner.email}</td>
                <td>{this.props.obj.order_id}</td>
                {/* <td>{this.props.obj.products.map(products => <div>{products.product.name}</div>)}</td> */}
         <td>{this.props.obj.products.map(products => <div>Product Name: {products.product.name}
        <br/>Price: {products.product.price}
        <br/>Color: {products.product.color}  
        <br/>Subcategory Name: {products.product.subcategory_name}
        <br/>Quantity: {products.quantity}     
        </div> )}</td>
        <td><Moment format="'DD/MM/YYYY''LTS'">{this.props.obj.Created_at}</Moment></td>
        <td>
                    <Button color="danger" onClick={this.toggleDanger} className="mr-1">Delete</Button></td>
                            <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                                className={'modal-danger ' + this.props.className}>
                            <ModalHeader toggle={this.toggleDanger}>Delete Confirm</ModalHeader>
                            <ModalBody><font size="6" text="center">Are you sure?</font></ModalBody>
                            <ModalFooter>
                                <Button color="danger" 
                                onClick={() => {
                                    this.deleteOrder();
                                    this.toggleDanger();
                                    window.location.href='/#/dashboard'
                                }}
                                >Delete </Button>
                                <Button color="secondary" onClick={this.toggleDanger}>Cancel</Button>
                            </ModalFooter>
                            </Modal>
                        </tr>
        );
    }
}
export default OrdersTableRow;