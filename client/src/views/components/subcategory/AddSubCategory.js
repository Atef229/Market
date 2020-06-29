import React, { Component } from 'react';
import {Col,FormFeedback,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addSubCategory } from '../../actions/addActions';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import axios from 'axios';
import SelectListGroup from '../common/SelectListGroup';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';


class Add extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category_name: '',
      categories:[],
      errors: {}
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = (e) => {
    e.preventDefault();

    const data = {
        name: this.state.name,
        category_name: this.state.category_name
      };

 this.props.addSubCategory(data, this.props.history);
} 


  render() {
    const { errors } = this.state;

      let options =
       this.state.categories.map(function (Category) {
        return { value: Category.name, label: Category.name };
      })

    return (
          <div>
          <AppHeader fixed> 
          <Header />
        </AppHeader> 
            <div className="animated fadeIn" dir="ltr"  className=" app row  col-md-4 m-auto justify-content-center">
            <Card>
              <CardHeader>
                <strong>Add SubCategory</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" key="`${category_name}`" noValidate onSubmit={this.onSubmit}>
                <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text">Category Name</Label>
                    </Col>
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
                  </FormGroup>
                  <FormGroup>
                  <Label htmlFor="text">SubCategory Name</Label>
                  <Input 
                    placeholder="SubCategory Name" 
                    name="name"
                    type="text"
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

Add.propTypes = {
  addSubCategory: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addSubCategory })(withRouter(Add));
