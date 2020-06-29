import React, { Component } from 'react';
import {FormFeedback,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getByuserId } from '../../actions/OrdersActions';
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
      owner_id: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios.get('/api/order/')
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
        owner_id: profile.owner_id
      });
      
    }
    }

onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }
    

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      owner_id: this.state.owner_id,
      errors:this.state.errors
    };

    axios.get('/api/order/' + this.state.owner_id,data)
.then(res => console.log(res.data))

.catch(err => this.setState({ errors: err.response.data }));

  // Redirect to order-data
  this.props.history.push('/get-order-data-by-user-id/' + this.state.owner_id);
  
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
            <strong>Get Order By User ID</strong> 
          </CardHeader>
          <CardBody>
            <Form action="" method="post" key="`${owner_id}`" noValidate onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="nf-email">ID</Label>
                <Input 
                type="number" 
                placeholder="Enter User ID"
                name="owner_id" 
                value={this.state.owner_id}
                onChange={this.onChange}
                invalid={errors.owner_id}
                valid={this.state.owner_id}
                   />
                   <FormFeedback>{errors.owner_id}</FormFeedback>
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
    getByuserId: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { getByuserId })(
    withRouter(GetById)
  );