import React, { Component } from 'react';
import {FormFeedback,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getByorderId } from '../../actions/OrdersActions';
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
      order_id: '',
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
        order_id: profile.order_id
      });
      
    }
    }

onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }
    

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      order_id: this.state.order_id,
      errors:this.state.errors
    };

    axios.get('/api/order/orders/' + this.state.order_id,data)
.then(res => console.log(res.data))

.catch(err => this.setState({ errors: err.response.data }));

  // Redirect to order-data
  this.props.history.push('/get-order-data-by-order-id/' + this.state.order_id);
  
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
            <strong>Get Order By Order ID</strong> 
          </CardHeader>
          <CardBody>
            <Form action="" method="post" key="`${order_id}`" noValidate onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="nf-email">ID</Label>
                <Input 
                type="number" 
                placeholder="Enter Order ID"
                name="order_id" 
                value={this.state.order_id}
                onChange={this.onChange}
                invalid={errors.order_id}
                valid={this.state.order_id}
                   />
                   <FormFeedback>{errors.order_id}</FormFeedback>
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
    getByorderId: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { getByorderId })(
    withRouter(GetById)
  );