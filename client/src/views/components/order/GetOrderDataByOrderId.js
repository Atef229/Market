import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import OrderTableRow from './OrderTableRow';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getByorderId } from '../../actions/OrdersActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

class GetOrderDataByOrderId extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      order: [],
      errors:{}
    };
  }

  componentDidMount() {
    axios.get('/api/order/orders/' + this.props.match.params.order_id)
      .then(res => {
        this.setState({
          order: res.data.orders
        });
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }}

  DataTable() {
    return this.state.order.map((res, i) => {
      return <OrderTableRow obj={res} key={i} />;
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
      <AppHeader fixed> 
       <Header />
    </AppHeader>
      <div className="animated fadeIn app row  col-md-9 m-auto justify-content-center">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Order data
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
                  {errors.order_id} 
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

GetOrderDataByOrderId.propTypes = {
  getByorderId: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { getByorderId })(
  withRouter(GetOrderDataByOrderId)
);
