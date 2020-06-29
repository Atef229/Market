import React, { Component } from 'react';
import {FormFeedback,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getById } from '../../actions/ProductActions';
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
      product_id: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios.get('/api/product/all')
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
        product_id: profile.product_id
      });
      
    }
    }

onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }
    

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      product_id: this.state.product_id,
      errors:this.state.errors
    };

    axios.get('/api/product/' + this.state.product_id,data)
.then(res => console.log(res.data))

.catch(err => this.setState({ errors: err.response.data }));

  // Redirect to category-data
  this.props.history.push('/get-product-data-by-id/' + this.state.product_id);
  
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
            <strong>Get Category By ID</strong> 
          </CardHeader>
          <CardBody>
            <Form action="" method="post" key="`${product_id}`" noValidate onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="nf-email">Product ID</Label>
                <Input 
                type="number" 
                placeholder="Enter Product ID"
                name="product_id" 
                value={this.state.product_id}
                onChange={this.onChange}
                invalid={errors.product_id}
                valid={this.state.product_id}
                   />
                   <FormFeedback>{errors.product_id}</FormFeedback>
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
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { getById })(
    withRouter(GetById)
  );