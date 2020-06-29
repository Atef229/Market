import React, { Component } from 'react';
import {Col,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Label} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { search } from '../../actions/CategoriesActions';
import axios from 'axios';
import SelectListGroup from '../common/SelectListGroup';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
 

class GetAllSubCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      categories:[],
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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

axios.get('/api/subcategory/all/' + this.state.name,data)
.then(res => console.log(res.data))

.catch(err => this.setState({ errors: err.response.data }));

  // Redirect to category-data
  this.props.history.push('/get-all-subcategories-data/' + this.state.name) 
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
            <strong>Get All SubCategory By Name</strong> 
          </CardHeader>
          <CardBody>
            <Form action="" method="post" key="`${name}`" noValidate onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="nf-email">Select Category Name</Label>
                <Col xs="9" md="7">
                <SelectListGroup
                placeholder="name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                options={options}
                error={errors.name}                
                />
                </Col>
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

GetAllSubCategories.propTypes = {
    search: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { search })(
    withRouter(GetAllSubCategories)
  );