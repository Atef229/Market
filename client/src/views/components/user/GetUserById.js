import React, { Component } from 'react';
import {FormFeedback,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getById, getCurrentProfile } from '../../actions/UsersActions';
import axios from 'axios';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
 

class GetById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    //this.onClickHandler = this.onClickHandler.bind(this);
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
        user_id: profile.user_id
      });
      
    }
    }

onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }
    

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      user_id: this.state.user_id,
      errors:this.state.errors
    };

    axios.get('/api/user/' + this.state.user_id,data)
.then(res => console.log(res.data))
.catch(err => this.setState({ errors: err.response.data }));

  // Redirect to admin-data
  this.props.history.push('/get-user-data-by-id/' + this.state.user_id);
  
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
            <strong>Get User By ID</strong> 
          </CardHeader>
          <CardBody>
            <Form action="" method="post" key="`${user_id}`" noValidate onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="nf-email">ID</Label>
                <Input 
                type="number" 
                placeholder="Enter User ID"
                name="user_id" 
                value={this.state.user_id}
                onChange={this.onChange}
                invalid={errors.user_id}
                valid={this.state.user_id}
                   />
                   <FormFeedback>{errors.user_id}</FormFeedback>
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

GetById.propTypes = {
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
    withRouter(GetById)
  );