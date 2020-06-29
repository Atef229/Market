import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import AdminsTableRow from './AdminsTableRow';
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
      axios.get('api/admin/all')
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
        return <AdminsTableRow obj={res} key={i} />;
        
      });
    }
  
  
    render() {
  
      return (
        <div>
        <AppHeader> 
         <Header />
      </AppHeader> 
        <div className="animated fadeIn app row  col-md-9 m-auto justify-content-center">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Admin data
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="md">
                  <thead>
                  <tr>
                  <th>Admin ID</th>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
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