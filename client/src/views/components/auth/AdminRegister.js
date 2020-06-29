import React, { Component } from 'react';
import { FormFeedback, Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
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
      username: '',
      password: '',
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
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        password: this.state.password,
      };

//     axios.post("/api/admin/register", data)
// .then(res => console.log(res.data))
// .catch(err => this.setState({ errors: err.response.data }));
this.props.registerUser(data, this.props.history);
}


  render() {
    const { errors } = this.state;

    return (
      <div>
      <AppHeader fixed> 
       <Header />
    </AppHeader> 
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form noValidate onSubmit={this.onSubmit}>
                    <h1>Admin Register</h1>
                    <p className="text-muted">Create admin account</p>
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
                     placeholder="Username"
                     name="username" 
                     value={this.state.username}
                     onChange={this.onChange}
                     invalid={errors.username}
                     valid={this.state.username}
                        />
                        <FormFeedback>{errors.username}</FormFeedback>
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
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
