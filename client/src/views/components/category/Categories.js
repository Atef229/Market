import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import CategoryTableRow from './CategoryTableRow';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

export default class Categories extends Component {

    constructor(props) {
      super(props)
      this.state = {
        category: []
      };
      
    }
  
  
  
    componentDidMount() {
      axios.get('api/category/all')
        .then(res => {
          this.setState({
            category: res.data
          });         
        })
        .catch((error) => {
          console.log(error);
        })
        
    }
    
  
    DataTable() {
      return this.state.category.map((res, i) => {
        return <CategoryTableRow obj={res} key={i} />;
        
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
                <i className="fa fa-align-justify"></i> All Categories
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="md">
                  <thead>
                  <tr>
                  <th>Category ID</th>
                    <th>Category Name</th>
                    <th>Sub Category Name</th>
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