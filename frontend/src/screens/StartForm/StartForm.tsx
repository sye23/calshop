import * as React from 'react';
import {Button,Grid,} from 'semantic-ui-react';
import * as utils from '../../utils/utilFunctions';
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import * as reducerActions from '../../actions/actions';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';




class StartForm extends React.Component < any, any >{


  constructor(){
    super();
    this.state = {
      redirect : '',
      startDate: null
    }
  }

 

validate = () =>{
  this.props.addDateSuccess(this.state.startDate)
  localStorage.setItem('date', moment(this.state.startDate).format('MM/DD/YYYY'));
  let state = Object.assign({}, this.state)
  if(this.state.startDate){
      state.redirect = <Redirect to={'/orderForm'}/>;
      state.startdate = null;
  }
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
        
        <Grid stackable>
          <Grid.Row centered>
            <Grid.Column textAlign='center' mobile={8} tablet={6} computer={4}>
              <div className='dateDiv'>
              <DatePicker
                readOnly
                selected={this.state.startDate}
                onChange={this.handleChange.bind(this)}
                minDate={moment()}
                maxDate={moment().add(180, "days")}
                placeholderText="Date Of Event" 
                className="datePicker"
              />
              </div>
              <div className='startOrderBtnDiv'>
                <Button className='startOrderBtn' size='massive' fluid inverted onClick={this.validate} disabled={(this.state.startDate)?false:true}>Start Order</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    )
  }
  
  
}

function mapDispatchToProps(dispatch: any) {
  return {
      addDateSuccess: (date: Date) => dispatch(reducerActions.dateSuccess(date)),
      }
}


export default connect<any, any, any>(null, mapDispatchToProps)(StartForm);


