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

      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

//   componentDidMount() {
//     axios.put('/api/admin/update/' + this.props.match.params.admin_id)
//       .then(res => {
//         this.setState({
//           password: res.data.password
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        password: profile.password,
      });
      
    }
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
     onSubmit(e) {
      e.preventDefault();
  
      const profileData = {
        password: this.state.password,
      };
      
      axios.put('/api/admin/update/password/' + this.props.match.params.admin_id, profileData)
      .then((res) => {
        console.log(res.data)
        this.props.history.push('/dashboard')
        console.clear()
      }).catch(err => this.setState({ errors: err.response.data }));
      // this.props.updateprofile(profileData);
    }

  render() {
    const { errors } = this.state;

    return (
      <div>
      <AppHeader fixed> 
       <Header />
    </AppHeader> 
      <div className="animated fadeIn" dir="ltr"  className=" app row  col-md-4 m-auto justify-content-center">
            <Card>
              <CardHeader>
                <strong>Update Admin password</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" key="`${admin_id}`" noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label htmlFor="nf-email">password</Label>
                    <Input 
                    type="password" 
                    placeholder="Enter New Password"
                    name="password" 
                    value={this.state.password}
                    onChange={this.onChange}
                    invalid={errors.password}
                    valid={this.state.password}
                       />
                       <FormFeedback>{errors.password}</FormFeedback>
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