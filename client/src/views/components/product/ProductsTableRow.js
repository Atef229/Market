import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import { Button,  Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


 class ProductsTableRow extends Component {
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

    deleteAdmin() {
        axios.delete('/api/product/delete/' + this.props.obj.product_id)
            .then((res) => 
            console.log('Product successfully deleted!')
                  // <Redirect  to='/dashboard' />
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
                <td>{this.props.obj.product_id}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.category_name}</td>
                <td>{this.props.obj.subcategory_name}</td>
                <td>{this.props.obj.price}</td>
                <td>{this.props.obj.color}</td>
                <td>{this.props.obj.weight}</td>
                <td>
                <Moment format="'DD/MM/YYYY''LTS'">{this.props.obj.Created_at}</Moment></td>
                 <td>
                    <Link className="edit-link" to={"update-product/" + this.props.obj.product_id}>
                        Update Data 
                    </Link>
                    <br></br>
                    <Link className="edit-link" to={"update-product-photos/" + this.props.obj.product_id}>
                          Update Photos
                    </Link>
                    </td>
                    <td>
                    <Button color="danger" onClick={this.toggleDanger} className="mr-1">Delete</Button></td>
                            <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                                className={'modal-danger ' + this.props.className}>
                            <ModalHeader toggle={this.toggleDanger}>Delete Confirm</ModalHeader>
                            <ModalBody><font size="6" text="center">Are you sure?</font></ModalBody>
                            <ModalFooter>
                                <Button color="danger" 
                                onClick={() => {
                                    this.deleteAdmin();
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
export default ProductsTableRow;