import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import { Button,  Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


 class UsersTableRow extends Component {
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
        axios.delete('/api/user/delete/' + this.props.obj.user_id)
            .then((res) => 
            console.log('User successfully deleted!')
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
                <td>{this.props.obj.user_id}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.first_name}</td>
                <td>{this.props.obj.last_name}</td>
                <td>{this.props.obj.mobile_number}</td>
                <td>{this.props.obj.address}</td>
                <td>
                <Moment format="'DD/MM/YYYY''LTS'">{this.props.obj.Created_at}</Moment></td>
                 <td>
                    <Link className="edit-link" to={"update-user/" + this.props.obj.user_id}>
                        Update Data 
                    </Link>
                    <br></br>
                    <Link className="edit-link" to={"update-user-photo/" + this.props.obj.user_id}>
                          Update Photo
                    </Link>
                    <br></br>
                    <Link className="edit-link" to={"update-user-password/" + this.props.obj.user_id}>
                          Update Password
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
export default UsersTableRow;