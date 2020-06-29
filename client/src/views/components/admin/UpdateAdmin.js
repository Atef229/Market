import React, { Component } from 'react';
import {Alert,FormFeedback,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateprofile, getCurrentProfile } from '../../actions/AdminsActions';
import axios from 'axios';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

class UpdateAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {

      username: '',
      first_name: '',
      last_name: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.put('/api/admin/update/' + this.props.match.params.admin_id)
      .then(res => {
        this.setState({
          username: res.data.username,
          first_name: res.data.first_name,
          last_name: res.data.last_name
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
        username: profile.username,
        first_name: profile.first_name,
        last_name: profile.last_name,
      });
      
    }
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
     onSubmit(e) {
      e.preventDefault();
  
      const profileData = {
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
      };
      
      axios.put('/api/admin/update/' + this.props.match.params.admin_id, profileData)
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
      <AppHeader fixed> 
       <Header />
    </AppHeader> 
      <div className="animated fadeIn" dir="ltr"  className=" app row  col-md-6 m-auto justify-content-center">
            <Card>
              <CardHeader>
                <strong>Update Admin Data</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" key="`${admin_id}`" noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label htmlFor="nf-email">Username</Label>
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

UpdateAdmin.propTypes = {
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
  withRouter(UpdateAdmin)
);