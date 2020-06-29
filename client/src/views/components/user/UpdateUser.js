import React, { Component } from 'react';
import {FormFeedback,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateprofile, getCurrentProfile } from '../../actions/UsersActions';
import axios from 'axios';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {

      email: '',
      first_name: '',
      last_name: '',
      mobile_number: '',
      address: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.put('/api/user/update/' + this.props.match.params.user_id)
      .then(res => {
        this.setState({
          email: res.data.email,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          mobile_number: res.data.mobile_number,
          address: res.data.address
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        mobile_number: profile.mobile_number,
        address: profile.address
      });
      
    }
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
     onSubmit(e) {
      e.preventDefault();
  
      const profileData = {
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        mobile_number: this.state.mobile_number,
        address: this.state.address
      };
      
      axios.put('/api/user/update/' + this.props.match.params.user_id, profileData)
      .then((res) => {
        console.log(res.data)
        this.props.history.push('/dashboard')
        console.clear()
      }).catch((error) => {
        console.log(error)
      })
      // this.props.updateprofile(profileData);
    }

  render() {
    const { errors } = this.state;

    return (
        <div>
           <AppHeader> 
            <Header />
         </AppHeader> 
      <div className="animated fadeIn" dir="ltr"  className=" app row  col-md-6 m-auto justify-content-center">
            <Card className="mx-4">
              <CardHeader>
                <strong>Update User Data</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" key="`${user_id}`" noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label htmlFor="nf-email">email</Label>
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
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">First Name</Label>
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
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">Last Name</Label>
                    <Input type="text" 
                      placeholder="Last Name"
                      name="last_name" 
                      value={this.state.last_name}
                      onChange={this.onChange}
                      invalid={errors.last_name}
                      valid={this.state.last_name}
                      />
                      <FormFeedback>{errors.last_name}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">Mobile Number</Label>
                    <Input type="text" 
                      placeholder="Mobile Number"
                      name="mobile_number" 
                      value={this.state.mobile_number}
                      onChange={this.onChange}
                      invalid={errors.mobile_number}
                      valid={this.state.mobile_number}
                      />
                      <FormFeedback>{errors.mobile_number}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">Address</Label>
                    <Input type="text" 
                      placeholder="Address"
                      name="address" 
                      value={this.state.address}
                      onChange={this.onChange}
                      invalid={errors.address}
                      valid={this.state.address}
                      />
                      <FormFeedback>{errors.address}</FormFeedback>
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

UpdateUser.propTypes = {
  updateprofile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { updateprofile, getCurrentProfile })(
  withRouter(UpdateUser)
);