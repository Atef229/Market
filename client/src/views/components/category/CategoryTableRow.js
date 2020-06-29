import React, { Component } from 'react';
import axios from 'axios';
import { Button,  Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


 class CatygoriesTableRow extends Component {
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
        axios.delete('/api/category/delete/' + this.props.obj.category_id)
            .then((res) => 
            console.log('Category successfully deleted!')
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
                <td>{this.props.obj.category_id}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.sub_categories.map(sub_categories => <div>{sub_categories.name}</div>)}</td>
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
export default CatygoriesTableRow;