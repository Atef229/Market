import React, { Component } from 'react';
import {Label, FormGroup, FormFeedback, Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUsers } from '../../actions/authActions';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      Avatar: '',
      mobile_number: '',
      address: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeHandler=event=>{
    this.setState({
      Avatar: event.target.files[0],
      loaded: 0,
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('Avatar', this.state.Avatar)
    
    data.append('first_name', this.state.first_name)
    data.append('last_name', this.state.last_name)
    data.append('email', this.state.email)
    data.append('password', this.state.password)
    data.append('mobile_number', this.state.mobile_number)
    data.append('address', this.state.address)

this.props.registerUsers(data, this.props.history);

}


  render() {
    const { errors } = this.state;

    var style = {
      marginTop:"70px"
    }

    return (
      <div>
      <AppHeader fixed> 
       <Header />
    </AppHeader>
      <div className="align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4" style={style}>
                <CardBody className="p-4">
                  <Form noValidate onSubmit={this.onSubmit}>
                   
                    <h4 className="text">Create User Account</h4>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                      placeholder="First Name" 
                      name="first_name"
                      type="text"
                      value={this.state.first_name}
                      onChange={this.onChange}
                      invalid={errors.first_name}
                       valid={this.state.first_name}
                      />
                      <FormFeedback>{errors.first_name}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                      type="text" 
                      placeholder="Last Name"
                      name="last_name" 
                      value={this.state.last_name}
                      onChange={this.onChange}
                      invalid={errors.last_name}
                      valid={this.state.last_name}
                      />
                      <FormFeedback>{errors.last_name}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                     type="text" 
                     placeholder="email"
                     name="email" 
                     value={this.state.email}
                     onChange={this.onChange}
                     invalid={errors.email}
                     valid={this.state.email}
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                     type="password" 
                     placeholder="Password"
                     name="password" 
                     value={this.state.password}
                     onChange={this.onChange}
                     invalid={errors.password}
                     valid={this.state.password}
                        />
                        <FormFeedback>{errors.password}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i className="icon-screen-smartphone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                    <Input 
                     type="number" 
                     placeholder="Mobile Number"
                     name="mobile_number" 
                     value={this.state.mobile_number}
                     onChange={this.onChange}
                     invalid={errors.mobile_number}
                     valid={this.state.mobile_number}
                        />
                    <FormFeedback>{errors.mobile_number}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i className="icon-location-pin"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                    <Input 
                     type="text" 
                     placeholder="Address"
                     name="address" 
                     value={this.state.address}
                     onChange={this.onChange}
                     invalid={errors.address}
                     valid={this.state.address}
                        />
                    <FormFeedback>{errors.address}</FormFeedback>
                    </InputGroup>
                    <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input" className="text-muted">User photo</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input 
                      type="file"  
                      name="Avatar" 
                      onChange={this.onChangeHandler}
                      />
                      <Label className="text-muted">Must chosse photo</Label>
                    </Col>
                    </FormGroup>
                <Button type="submit" color="success" block >Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUsers })(withRouter(Register));