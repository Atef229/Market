import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
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
      Avatar: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    //this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    axios.put('/api/user/update/' + this.props.match.params.user_id)
      .then(res => {
        this.setState({
          Avatar:res.data.Avatar
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
        Avatar: profile.Avatar
      });
      
    }
    }

  onChangeHandler=event=>{
    this.setState({
      Avatar: event.target.files[0],
      loaded: 0,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('Avatar', this.state.Avatar)

    axios.put("/api/user/update/"+ this.props.match.params.user_id, data)
    .then(res =>{
    console.log(res.data)
    this.props.history.push('/dashboard')
    console.clear()
    })
    .catch(err => this.setState({ errors: err.response.data }));

  // Redirect to Dashboard
  //this.props.history.push('/dashboard') 
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
                <strong>Update User Photo</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" key="`${user_id}`" noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label htmlFor="nf-email">chosse photo</Label>
                    <Input 
                        type="file"  
                        name="Avatar" 
                        onChange={this.onChangeHandler}
                        />
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