import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import ProductsTableRow from './ProductsTableRow';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';
import PaginationComponent from "react-reactstrap-pagination";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Products extends Component {

    constructor(props) {
      super(props)
      this.state = {
        products: []
      };
    }
  
    componentDidMount() {
      axios.get('api/product/all')
        .then(res => {
          this.setState({
            products: res.data
          });         
        })
        .catch((error) => {
          console.log(error);
        })
    }
    
  
    DataTable() {
      return this.state.products.map((res, i) => {
        return <ProductsTableRow obj={res} key={i} />;
        
      });
    }
  
    render() {  
      return (
        <div>
        <AppHeader> 
         <Header />
      </AppHeader> 
        <div className="animated fadeIn app row  col-md-12 m-auto justify-content-center">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Product data
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="md">
                  <thead>
                  <tr>
                  <th>Product ID</th>
                    <th>Name</th>
                    <th>Category Name</th>
                    <th>Subcategory Name</th>
                    <th>Price</th>
                    <th>Color</th>
                    <th>Weight</th>
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

