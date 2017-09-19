import * as React from 'react';
import {Button,Grid,} from 'semantic-ui-react';
import * as utils from '../../utils/utilFunctions';
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import * as reducerActions from '../../actions/actions';
import * as moment from 'moment';
import InfoForm from './InfoForm';
import 'react-datepicker/dist/react-datepicker.css';




class StartForm extends React.Component < any, any >{


  constructor(){
    super();
    this.state = {
      redirect : '',
      startDate: null,
      customer:{
        firstName: '',
        lastName: ''
      }
    }
  }

 

validate = () =>{
  let obj = {
    firstName: this.state.customer.firstName,
    lastName: this.state.customer.lastName
  }
  let name = utils.capitalizeFirstLetter(this.state.customer.firstName)+' '+utils.capitalizeFirstLetter(this.state.customer.lastName)
  this.props.addDateSuccess(this.state.startDate);
  this.props.addCustomerSuccess(obj);
  localStorage.setItem('date', moment(this.state.startDate).format('MM/DD/YYYY'));
  localStorage.setItem('customer', name)
  let state = Object.assign({}, this.state);
  if(this.state.startDate && this.state.customer.firstName && this.state.customer.lastName){
      state.redirect = <Redirect to={'/orderForm'}/>;
      state.startdate = null;
  }
  this.setState(state);
}


inputChangeHandler  = (e: any) =>{
  let state = Object.assign({}, this.state);
  state.customer[e.target.name] = e.target.value;
  this.setState(state);
}


handleChange = (date: any) => {
  this.setState({
    startDate: date
  });
}

componentWillUnmount(){
  this.setState({
    startDate: null
  });
}

  render(){
    return (
      <div>
      {this.state.redirect}        
        <h1 className='formHeader'>The Calligraphy Shop</h1>
        <InfoForm
          startDate = {this.state.startDate}
          firstName = {this.state.customer.firstName}
          lastName = {this.state.customer.lastName}
          validate = {this.validate}
          inputChangeHandler = {this.inputChangeHandler}
          handleChange = {this.handleChange.bind(this)}
        />
       
      </div>

    )
  }
  
  
}

function mapDispatchToProps(dispatch: any) {
  return {
      addDateSuccess: (date: Date) => dispatch(reducerActions.dateSuccess(date)),
      addCustomerSuccess: (obj: any) => dispatch(reducerActions.addCustomerSuccess(obj))
      }
}


export default connect<any, any, any>(null, mapDispatchToProps)(StartForm);


