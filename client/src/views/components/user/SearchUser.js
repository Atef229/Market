import React, { Component } from 'react';
import {FormFeedback,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { search, getCurrentProfile } from '../../actions/UsersActions';
import axios from 'axios';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
 

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios.get('/api/user/all')
      .then(res => {
        this.setState({
          profile:res.data.profile
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
        email: profile.email
      });
      
    }
    }

onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email
    };

    axios.get('/api/user/search/' + this.state.email,data)
.then(res => console.log(res.data))

.catch(err => this.setState({ errors: err.response.data }));

  // Redirect to resident-data
  this.props.history.push('/search-user-data/' + this.state.email) 
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
            <strong>Get User By Email</strong> 
          </CardHeader>
          <CardBody>
            <Form action="" method="post" key="`${email}`" noValidate onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="nf-email">Email</Label>
                <Input 
                type="text" 
                placeholder="Enter User Email"
                name="email" 
                value={this.state.email}
                onChange={this.onChange}
                invalid={errors.email}
                valid={this.state.email}
                   />
                   <FormFeedback>{errors.email}</FormFeedback>
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

SearchUser.propTypes = {
    search: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { search, getCurrentProfile })(
    withRouter(SearchUser)
  );