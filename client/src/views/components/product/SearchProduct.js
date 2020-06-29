import React, { Component } from 'react';
import {FormFeedback,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { search } from '../../actions/ProductActions';
import axios from 'axios';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
 

class SearchProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
        name: profile.name
      });
      
    }
    }

onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name
    };

axios.get('/api/product/search/' + this.state.name,data)
.then(res => console.log(res.data))

.catch(err => this.setState({ errors: err.response.data }));

  // Redirect to category-data
  this.props.history.push('/search-product-data/' + this.state.name) 
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
            <strong>Get Product By Name</strong> 
          </CardHeader>
          <CardBody>
            <Form action="" method="post" key="`${name}`" noValidate onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="nf-email">Product Name</Label>
                <Input 
                type="text" 
                placeholder="Enter Product name"
                name="name" 
                value={this.state.name}
                onChange={this.onChange}
                invalid={errors.name}
                valid={this.state.name}
                   />
                   <FormFeedback>{errors.name}</FormFeedback>
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

SearchProduct.propTypes = {
    search: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { search })(
    withRouter(SearchProduct)
  );