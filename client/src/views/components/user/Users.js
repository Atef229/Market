import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import UsersTableRow from './UsersTableRow';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

export default class Admins extends Component {

    constructor(props) {
      super(props)
      this.state = {
        admins: []
      };
      
    }
  
  
  
    componentDidMount() {
      axios.get('api/user/all')
        .then(res => {
          this.setState({
            admins: res.data
          });         
        })
        .catch((error) => {
          console.log(error);
        })
        
    }
    
  
    DataTable() {
      return this.state.admins.map((res, i) => {
        return <UsersTableRow obj={res} key={i} />;
        
      });
    }
  
  
    render() {
  
      return (
        <div>
        <AppHeader> 
         <Header />
      </AppHeader> 
        <div className="animated fadeIn app row  col-md-11 m-auto justify-content-center">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> User data
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="md">
                  <thead>
                  <tr>
                  <th>User ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mobile Number</th>
                    <th>Address</th>
                    <th>Created at</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.DataTable()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      </div>
      );
    }
  }