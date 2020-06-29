import React, { Component } from 'react';
import {FormFeedback,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
//import { FormFeedback, Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCategory } from '../../actions/addActions';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';


class Add extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = (e) => {
    e.preventDefault();

    const data = {
        name: this.state.name,
      };

this.props.addCategory(data, this.props.history);
}


  render() {
    const { errors } = this.state;

    return (
          <div>
          <AppHeader fixed> 
          <Header />
        </AppHeader> 
            <div className="animated fadeIn" dir="ltr"  className=" app row  col-md-3 m-auto justify-content-center">
            <Card>
              <CardHeader>
                <strong>Add Category</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" key="`${name}`" noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                  <Input 
                    placeholder="Category Name" 
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.onChange}
                    invalid={errors.name}
                    valid={this.state.name}
                    />
              <FormFeedback>{errors.name}</FormFeedback>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="lg" color="primary" className=" btn-block mt-2" onClick={this.onSubmit}>
                  <i className="fa fa-dot-circle-o"></i> Submit</Button>
              </CardFooter>
            </Card>
      </div>
      </div>
    );
  }
}

Add.propTypes = {
  addCategory: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addCategory })(withRouter(Add));
