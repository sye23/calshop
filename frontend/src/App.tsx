import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import UserLogin from './screens/Login/UserLogin'
import StartForm from './screens/StartForm/StartForm';
import OrderScreen from './screens/OrderScreen/OrderScreen';
import PrivateRoute from './PrivateRoute';
import ReviewOrder from './screens/OrderScreen/ReviewOrder';
import FileUploader from './components/FileUploader';
import axios from 'axios';



export default class App extends React.Component<any, any> {

  checkWebToken = (token: any) => {
    const jwt: any = jwtDecode(token);

    if (jwt.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  }

  async componentWillMount() {
    if (localStorage.getItem('token') !== null) {
      const token: any = localStorage.getItem('token');
      if (this.checkWebToken(token)) {
        let logout = await axios.post('api/logout', {path:localStorage.getItem('path')},{headers: { 'x-access-token': token }});
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('phone');
        localStorage.removeItem('email');
        localStorage.removeItem('date');
        localStorage.removeItem('roll');
        localStorage.removeItem('customer');
        localStorage.removeItem('company');
        localStorage.removeItem('path');
      }
    }

  }

  render() {

    return (
      <div>
        <Router>
          <div>

            <Route exact path="/" component={UserLogin} />
            <Route path="/upload" component={FileUploader}/>
            <Route path="/chooseDate" component={PrivateRoute(StartForm, ['user'])} />
            <Route path="/orderForm" component={PrivateRoute(OrderScreen, ['user'])} />
          
          </div>

        </Router>

      </div >
    );
  }
}


