import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateproduct } from '../../actions/ProductActions';
import axios from 'axios';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
 

class UpdateProductPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Images: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  componentDidMount() {
    axios.put('/api/product/update/' + this.props.match.params.product_id)
      .then(res => {
        this.setState({
          Images:res.data.Images
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
        Images: profile.Images
      });
      
    }
    }

    onFileChange(e) {
        this.setState({ Images: e.target.files })
      }

  onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    for (const key of Object.keys(this.state.Images)) {
        data.append('Images', this.state.Images[key])
    }

    axios.put("/api/product/update/"+ this.props.match.params.product_id, data)
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
                <Form action="" method="post" key="`${product_id}`" noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label htmlFor="nf-email">chosse photos</Label>
                    <Input
                      type="file"
                      name="Images"  
                      multiple 
                      onChange={this.onFileChange} 
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

UpdateProductPhoto.propTypes = {
    updateproduct: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { updateproduct })(
    withRouter(UpdateProductPhoto)
  );