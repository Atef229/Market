import React, { Component } from 'react';
import {CardHeader,Label, FormGroup, FormFeedback, Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProduct } from '../../actions/addActions';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import SelectListGroup from '../common/SelectListGroup';
import axios from 'axios';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

class AddProduct extends Component {

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
    this.onFileChange = this.onFileChange.bind(this);
  }
  

  componentDidMount() {
    axios.get('/api/category/all')
      .then(res => {
        this.setState({
            categories:res.data
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
  }

  //Uploading multiple images
onFileChange(e) {
  this.setState({ Images: e.target.files })
}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    axios.get(`api/subcategory/all/${e.target.value}`)
    .then(res => {
      this.setState({
        subcategories:res.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    
    data.append('product_id', this.state.product_id)
    data.append('name', this.state.name)
    data.append('category_name', this.state.category_name)
    data.append('subcategory_name', this.state.subcategory_name)
    data.append('price', this.state.price)
    data.append('color', this.state.color)

    for (const key of Object.keys(this.state.Images)) {
      data.append('Images', this.state.Images[key])
  }

this.props.addProduct(data, this.props.history);

}


  render() {
    const { errors } = this.state;

    var style = {
      marginTop:"70px"
    }

    let options =
    this.state.categories.map(function (Category) {
     return { value: Category.name, label: Category.name };
   })

  let options1 = 
  this.state.subcategories.map(subcategory => {  
   return { value: subcategory.name, label: subcategory.name
  };
 });


    return (
      <div>
      <AppHeader fixed> 
       <Header />
    </AppHeader>
      <div className="align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4" style={style}>
              <CardHeader>
                <strong>Add Product</strong> 
              </CardHeader>
                <CardBody className="p-4">
                  <Form noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                      <Label htmlFor="text">Product Id</Label>
                      <Input 
                      placeholder="Product Id" 
                      name="product_id"
                      type="number"
                      value={this.state.product_id}
                      onChange={this.onChange}
                      invalid={errors.product_id}
                       valid={this.state.product_id}
                      />
                      <FormFeedback>{errors.product_id}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                      <Label htmlFor="text">Product Name</Label>
                      <Input 
                      type="text" 
                      placeholder="Product Name"
                      name="name" 
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
                      <Label htmlFor="text">Price</Label>
                    <Input 
                     type="number" 
                     placeholder="price"
                     name="price" 
                     value={this.state.price}
                     onChange={this.onChange}
                     invalid={errors.price}
                     valid={this.state.price}
                        />
                    <FormFeedback>{errors.price}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="text">Color</Label>
                    <Input 
                     type="text" 
                     placeholder="color"
                     name="color" 
                     value={this.state.color}
                     onChange={this.onChange}
                     invalid={errors.color}
                     valid={this.state.color}
                        />
                    <FormFeedback>{errors.color}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="text">weight</Label>
                    <Input 
                     type="text" 
                     placeholder="weight"
                     name="weight" 
                     value={this.state.weight}
                     onChange={this.onChange}
                     invalid={errors.weight}
                     valid={this.state.weight}
                        />
                    <FormFeedback>{errors.weight}</FormFeedback>
                    </FormGroup>
                    <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input" className="text-muted">Product photos</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                      // name="Images"
                      type="file"
                      name="Images"  
                      multiple 
                      onChange={this.onFileChange} 
                      />
                      <Label className="text-muted">Must chosse photos</Label>
                    </Col>
                    </FormGroup>
                <Button type="submit" color="success" block >Add Product</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      </div>
    );
  }
}

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addProduct })(withRouter(AddProduct));