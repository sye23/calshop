import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import { connect } from 'react-redux';
import * as reducerActions from '../actions/actions';



import 'react-datepicker/dist/react-datepicker.css';

class DateSelect extends React.Component < any, any > {
  constructor() {
    super();
    this.state = {
      startDate: null
    };
  }

   handleChange = (date: Date) => {
    this.setState({
      startDate: date
    });
  }

  componentWillUpdate(){
    this.props.addDateSuccess(this.state.startDate);
  }

  render() {
    console.log('date state ******',this.state.startDate);
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange.bind(this)}
        minDate={moment()}
        maxDate={moment().add(180, "days")}
        placeholderText="Date Of Event" 
        className="datePicker"
      />
    );
  }

 
}
function mapDispatchToProps(dispatch: any) {
  return {
      addDateSuccess: (date: Date) => dispatch(reducerActions.dateSuccess(date)),
      }
}


export default connect<any, any, any>(null, mapDispatchToProps)(DateSelect);