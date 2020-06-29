import React, { Component } from 'react';
import {Col,InputGroup,FormFeedback,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateproduct } from '../../actions/ProductActions';
import axios from 'axios';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import SelectListGroup from '../common/SelectListGroup';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {

        product_id: '',
        name: '',
        category_name: '',
        subcategory_name: '',
        Images: '',
        price: '',
        color: '',
        weight: '',
        categories:[],
        subcategories:[],
        errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.put('/api/product/update/' + this.props.match.params.product_id)
      .then(res => {
        this.setState({
          product_id: res.data.product_id,
          name: res.data.name,
          category_name: res.data.category_name,
          subcategory_name: res.data.subcategory_name,
          price: res.data.price,
          color: res.data.color,
          weight: res.data.weight
        });
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('/api/category/all')
      .then(res => {
        this.setState({
            categories:res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('/api/subcategory/all')
      //axios.get('/api/subcategory/Shirt')
      .then(res => {
        this.setState({
          subcategories:res.data
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
        product_id: profile.product_id,
        name: profile.name,
        category_name: profile.category_name,
        subcategory_name: profile.subcategory_name,
        price: profile.price,
        color: profile.color,
        weight: profile.weight
      });
      
    }
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
     onSubmit(e) {
      e.preventDefault();
  
      const profileData = {
        product_id: this.state.product_id,
        name: this.state.name,
        category_name: this.state.category_name,
        subcategory_name: this.state.subcategory_name,
        price: this.state.price,
        color: this.state.color,
        weight: this.state.weight
      };
      
      axios.put('/api/product/update/' + this.props.match.params.product_id, profileData)
      .then((res) => {
        console.log(res.data)
        this.props.history.push('/dashboard')
        console.clear()
      }).catch((error) => {
        console.log(error)
      })
      // this.props.updateproduct(profileData);
    }

  render() {
    const { errors } = this.state;

    let options =
    this.state.categories.map(function (Category) {
     return { value: Category.name, label: Category.name };
   })

   let options1 =
   this.state.subcategories.map(subcategorys => {    
    return { value: subcategorys.name, label: subcategorys.name+'-'+subcategorys.category_name };
  });

  var style = {
    marginTop:"70px"
  }

    return (
      <div>
      <AppHeader fixed> 
       <Header />
    </AppHeader> 
      <div className="animated fadeIn" dir="ltr"  className=" app row  col-md-6 m-auto justify-content-center">
            <Card style={style}>
              <CardHeader>
                <strong>Update Product Data</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" key="`${product_id}`" noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label htmlFor="nf-email">Product Id</Label>
                    <Input 
                    type="number" 
                    placeholder="Product Id"
                    name="product_id" 
                    value={this.state.product_id}
                    onChange={this.onChange}
                    invalid={errors.product_id}
                    valid={this.state.product_id}
                       />
                       <FormFeedback>{errors.product_id}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">Product Name</Label>
                    <Input
                      placeholder="Product Name" 
                      name="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.onChange}
                      invalid={errors.name}
                       valid={this.state.name}
                       />
                       <FormFeedback>{errors.name}</FormFeedback>
                  </FormGroup>
                  <InputGroup className="mb-3">
                    <Label htmlFor="text">Category Name</Label>
                      <Col xs="9" md="7">
                      <SelectListGroup
                        placeholder="category_name"
                        name="category_name"
                        value={this.state.category_name}
                        onChange={this.onChange}
                        options={options}
                        error={errors.category_name}                
                        />
                    </Col>
                        <FormFeedback>{errors.category_name}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <Label htmlFor="text">Subcategory Name</Label>
                    <Col xs="9" md="7">
                      <SelectListGroup
                        placeholder="subcategory_name"
                        name="subcategory_name"
                        value={this.state.subcategory_name}
                        onChange={this.onChange}
                        options={options1}
                        error={errors.subcategory_name}                
                        />
                    </Col>
                        <FormFeedback>{errors.subcategory_name}</FormFeedback>
                    </InputGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">Price</Label>
                    <Input type="text" 
                      placeholder="Price"
                      name="price" 
                      value={this.state.price}
                      onChange={this.onChange}
                      invalid={errors.price}
                      valid={this.state.price}
                      />
                      <FormFeedback>{errors.price}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">Color</Label>
                    <Input type="text" 
                      placeholder="Color"
                      name="color" 
                      value={this.state.color}
                      onChange={this.onChange}
                      invalid={errors.color}
                      valid={this.state.color}
                      />
                      <FormFeedback>{errors.color}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">Weight</Label>
                    <Input type="text" 
                      placeholder="Weight"
                      name="weight" 
                      value={this.state.weight}
                      onChange={this.onChange}
                      invalid={errors.weight}
                      valid={this.state.weight}
                      />
                      <FormFeedback>{errors.weight}</FormFeedback>
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

UpdateProduct.propTypes = {
  updateproduct: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { updateproduct })(
  withRouter(UpdateProduct)
);