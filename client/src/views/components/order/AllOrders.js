import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import OrderTableRow from './OrderTableRow';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

export default class Orders extends Component {

    constructor(props) {
      super(props)
      this.state = {
        order: []
      };
      
    }
  
  
  
    componentDidMount() {
      axios.get('api/order/')
        .then(res => {
          this.setState({
            order: res.data.orders
          });         
        })
        .catch((error) => {
          console.log(error);
        })
        
    }
    
  
    DataTable() {
      return this.state.order.map((res, i) => {
        return <OrderTableRow obj={res} key={i} />;
        
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
                <i className="fa fa-align-justify"></i> All Orders
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="md">
                  <thead>
                  <tr>
                  <th>User ID</th>
                    <th>User Email</th>
                    <th>Order ID</th>
                    <th>Order Details</th>
                    <th>Cteated at</th>
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