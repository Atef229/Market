import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import AdminsTableRow from './AdminsTableRow';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getById, getCurrentProfile } from '../../actions/AdminsActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

class GetAdminDataById extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      admins: [],
      errors:{}
    };
  }

  componentDidMount() {
    axios.get('/api/admin/' + this.props.match.params.admin_id)
      .then(res => {
        this.setState({
          admins: res.data
        });
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }}

  DataTable() {
    return this.state.admins.map((res, i) => {
      return <AdminsTableRow obj={res} key={i} />;
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
                  {errors.admin_id} 
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

GetAdminDataById.propTypes = {
  getById: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { getById, getCurrentProfile })(
  withRouter(GetAdminDataById)
);
