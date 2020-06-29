import React, { Component , Suspense} from 'react';
import { Router,HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import jwt_decode from 'jwt-decode';
import setAuthToken from './views/components/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './views/actions/authActions';
 import { clearCurrentProfile } from './views/actions/AdminsActions';
import './App.scss';
import { Provider } from 'react-redux';
import store from './views/store';
import Spinner from './views/components/common/Spinner';
import PrivateRoute from './views/components/common/PrivateRoute';
//const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
import Dashboard from './containers/DefaultLayout';
import Header from './containers/DefaultLayout/DefaultHeader';
import Footer from './containers/DefaultLayout/DefaultFooter';
import DefaultAside from './containers/DefaultLayout/DefaultAside';

import UpdateAdmin from './views/components/admin/UpdateAdmin';
import UpdateAdminPassword from './views/components/admin/UpdateAdminPassword';
import GetAdminById from './views/components/admin/GetAdminById';
import GetAdminDataById from './views/components/admin/GetAdminDataById';
import AllAdmins from './views/components/admin/Admins';
import SearchAdmin from './views/components/admin/SearchAdmin';
import SearchAdminData from './views/components/admin/SearchAdminData';

import UserRegister from './views/components/auth/UserRegister';
import UserLogin from './views/components/auth/UserLogin';
import UpdateUser from './views/components/user/UpdateUser';
import UpdateUserPassword from './views/components/user/UpdateUserPassword';
import UpdateUserPhoto from './views/components/user/UpdateUserPhoto';
import GetUserById from './views/components/user/GetUserById';
import GetUserDataById from './views/components/user/GetUserDataById';
import AllUsers from './views/components/user/Users';
import SearchUser from './views/components/user/SearchUser';
import SearchUserData from './views/components/user/SearchUserData';

import AddCategory from './views/components/category/AddCategory';
import AllCategories from './views/components/category/Categories';
import GetCategoryById from './views/components/category/GetCategoryById';
import GetCategoryDataById from './views/components/category/GetCategoryDataById';
import SearchCategory from './views/components/category/SearchCategory';
import SearchCategoryData from './views/components/category/SearchCategoryData';

import AddSubCategory from './views/components/subcategory/AddSubCategory';
import GetAllSubCategories from './views/components/subcategory/GetAllSubCategories';
import GetAllSubCategoriesData from './views/components/subcategory/GetAllSubCategoriesData';

import AddProduct from './views/components/product/AddProduct';
import UpdateProduct from './views/components/product/UpdateProduct';
import UpdateProductPhotos from './views/components/product/UpdateProductPhotos';
import AllProducts from './views/components/product/products';
import GetProductById from './views/components/product/GetProductById';
import GetProductDataById from './views/components/product/GetProductDataById';
import SearchProduct from './views/components/product/SearchProduct';
import SearchProductData from './views/components/product/SearchProductData';

//import AllOrders from './views/components/order/Orders';
import AllOrders from './views/components/order/AllOrders';
import GetOrderByUserId from './views/components/order/GetOrderByUserId';
import GetOrderDataByUserId from './views/components/order/GetOrderDataByUserId';
import GetOrderByOrderId from './views/components/order/GetOrderByOrderId';
import GetOrderDataByOrderId from './views/components/order/GetOrderDataByOrderId';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
import { Table } from 'reactstrap';

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
// const Login = React.lazy(() => import('./views/Pages/Login'));
// const Register = React.lazy(() => import('./views/Pages/Register'));
const AdminRegister = React.lazy(() => import('./views/components/auth/AdminRegister'));
const AdminLogin = React.lazy(() => import('./views/components/auth/AdminLogin'));
// const Page404 = React.lazy(() => import('./views/Pages/Page404'));
// const Page500 = React.lazy(() => import('./views/Pages/Page500'));


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/#/admin-login';
  }
}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <HashRouter>
          <React.Suspense fallback={<Spinner />}>
          <div className="App">
          {/* <AppHeader fixed>
            <Header />
        </AppHeader> */}
            <Switch>
              {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} /> */}
              <Route exact path="/admin-login" name="Login Page" render={props => <AdminLogin {...props}/>} />
              {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} /> */}
              {/* <PrivateRoute exact path="/admin-register" name="Register Page" render={props => <AdminRegister {...props}/>} /> */}
              {/* <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} /> */}
              {/* <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}
                <PrivateRoute exact path="/Dashboard" name="Home"  component={Dashboard} />
                {/* <PrivateRoute path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
                
                 <PrivateRoute exact path="/admin-register" name="Home"  component={AdminRegister} /> 
                <PrivateRoute exact path="/update-admin/:admin_id" name="Home"  component={UpdateAdmin} /> 
                <PrivateRoute exact path="/update-admin-password/:admin_id" name="Home"  component={UpdateAdminPassword} />
                <PrivateRoute exact path="/get-admin-by-id/" name="Home"  component={GetAdminById} />  
                <PrivateRoute exact path="/get-admin-data-by-id/:admin_id" name="Home"  component={GetAdminDataById} />
                <PrivateRoute exact path="/get-admin-data-by-id/update-admin/:admin_id" name="Home"  component={UpdateAdmin} />
                <PrivateRoute exact path="/get-admin-data-by-id/update-admin-password/:admin_id" name="Home"  component={UpdateAdminPassword} />
                <PrivateRoute exact path="/all-admins" name="Home"  component={AllAdmins} />
                <PrivateRoute exact path="/search-admin" name="Home"  component={SearchAdmin} />
                <PrivateRoute exact path="/search-admin-data/:username" name="Home"  component={SearchAdminData} /> 
                <PrivateRoute exact path="/search-admin-data/update-admin/:admin_id" name="Home"  component={UpdateAdmin} />
                <PrivateRoute exact path="/search-admin-data/update-admin-password/:admin_id" name="Home"  component={UpdateAdminPassword} />
                <Route exact path="/user-register" name="Home"  component={UserRegister} /> 
                <Route exact path="/user-login" name="Home"  component={UserLogin} /> 
                <Route exact path="/update-user/:user_id" name="Home"  component={UpdateUser} />
                <Route exact path="/update-user-password/:user_id" name="Home"  component={UpdateUserPassword} /> 
                <Route exact path="/update-user-photo/:user_id" name="Home"  component={UpdateUserPhoto} />
                <PrivateRoute exact path="/get-user-by-id/" name="Home"  component={GetUserById} /> 
                <PrivateRoute exact path="/get-user-data-by-id/:user_id" name="Home"  component={GetUserDataById} />
                <PrivateRoute exact path="/get-user-data-by-id/update-user/:user_id" name="Home"  component={UpdateUser} />
                <PrivateRoute exact path="/get-user-data-by-id/update-user-photo/:user_id" name="Home"  component={UpdateUserPhoto} />
                <PrivateRoute exact path="/get-user-data-by-id/update-user-password/:user_id" name="Home"  component={UpdateUserPassword} />
                <PrivateRoute exact path="/all-users" name="Home"  component={AllUsers} /> 
                <PrivateRoute exact path="/search-user" name="Home"  component={SearchUser} /> 
                <PrivateRoute exact path="/search-user-data/:email" name="Home"  component={SearchUserData} />
                <PrivateRoute exact path="/add-category" name="Home"  component={AddCategory} /> 
                <PrivateRoute exact path="/all-categories" name="Home"  component={AllCategories} /> 
                <PrivateRoute exact path="/get-category-by-id/" name="Home"  component={GetCategoryById} />
                <PrivateRoute exact path="/get-category-data-by-id/:category_id" name="Home"  component={GetCategoryDataById} /> 
                <PrivateRoute exact path="/search-category" name="Home"  component={SearchCategory} /> 
                <PrivateRoute exact path="/search-category-data/:name" name="Home"  component={SearchCategoryData} />
                <PrivateRoute exact path="/add-subcategory" name="Home"  component={AddSubCategory} /> 
                <PrivateRoute exact path="/get-all-subcategories/" name="Home"  component={GetAllSubCategories} />
                <PrivateRoute exact path="/get-all-subcategories-data/:name" name="Home"  component={GetAllSubCategoriesData} />
                <PrivateRoute exact path="/add-product" name="Home"  component={AddProduct} /> 
                <PrivateRoute exact path="/update-product/:product_id" name="Home"  component={UpdateProduct} /> 
                <PrivateRoute exact path="/update-product-photos/:product_id" name="Home"  component={UpdateProductPhotos} /> 
                <PrivateRoute exact path="/all-products" name="Home"  component={AllProducts} /> 
                <PrivateRoute exact path="/get-product-by-id/" name="Home"  component={GetProductById} /> 
                <PrivateRoute exact path="/get-product-data-by-id/:product_id" name="Home"  component={GetProductDataById} /> 
                <PrivateRoute exact path="/get-product-data-by-id/update-product/:product_id" name="Home"  component={UpdateProduct} /> 
                <PrivateRoute exact path="/get-product-data-by-id/update-product-photos/:product_id" name="Home"  component={UpdateProductPhotos} /> 
                <PrivateRoute exact path="/search-product" name="Home"  component={SearchProduct} /> 
                <PrivateRoute exact path="/search-product-data/:name" name="Home"  component={SearchProductData} />  
                <PrivateRoute exact path="/all-orders" name="Home"  component={AllOrders} />
                <PrivateRoute exact path="/get-order-by-user-id/" name="Home"  component={GetOrderByUserId} />  
                <PrivateRoute exact path="/get-order-data-by-user-id/:owner_id" name="Home"  component={GetOrderDataByUserId} /> 
                <PrivateRoute exact path="/get-order-by-order-id/" name="Home"  component={GetOrderByOrderId} /> 
                <PrivateRoute exact path="/get-order-data-by-order-id/:order_id" name="Home"  component={GetOrderDataByOrderId} />   
            </Switch>
            </div>
            <AppFooter fixed>
            <Footer />
        </AppFooter>
          </React.Suspense>
      </HashRouter>
      </Provider>
    );
  }
}

export default App;
