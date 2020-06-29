import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import ProductsTableRow from './ProductsTableRow';
import PropTypes from 'prop-types';
import axios from 'axios';
import { search } from '../../actions/ProductActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

class SearchProductData extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      product: [],
      errors:{}
    };
  }

  componentDidMount() {
    axios.get('/api/product/search/' + this.props.match.params.name)
      .then(res => {
        this.setState({
          product: res.data
        });
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }}

  DataTable() {
    return this.state.product.map((res, i) => {
      return <ProductsTableRow obj={res} key={i} />;
    });
  }

  render() {
    const { errors } = this.state;

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
                  {errors.name} 
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

SearchProductData.propTypes = {
  search: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { search })(
  withRouter(SearchProductData)
);
