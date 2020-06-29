import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import CategoryTableRow from './CategoryTableRow';
import PropTypes from 'prop-types';
import axios from 'axios';
import { search } from '../../actions/CategoriesActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

class SearchCategoryData extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      category: [],
      errors:{}
    };
  }

  componentDidMount() {
    axios.get('/api/category/search/' + this.props.match.params.name)
      .then(res => {
        this.setState({
          category: res.data
        });
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }}

  DataTable() {
    return this.state.category.map((res, i) => {
      return <CategoryTableRow obj={res} key={i} />;
    });
  }

  render() {
    const { errors } = this.state;

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
                <i className="fa fa-align-justify"></i> Category data
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

SearchCategoryData.propTypes = {
  search: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { search })(
  withRouter(SearchCategoryData)
);
