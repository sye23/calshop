import OrderForm from '../OrderScreen/OrderForm';
import * as React from 'react';
import {Button, Grid, Dropdown, Form} from 'semantic-ui-react';
import * as utils from '../../utils/utilFunctions';
import axios from 'axios'
import { Link } from 'react-router-dom';
import * as getData from '../../components/common/GetData';
import ReviewOrder from './ReviewOrder';
import { connect } from 'react-redux';
import * as moment from 'moment';


class OrderScreen extends React.Component < any, any > {

  constructor(){ 
    super();
    this.state = {
      options:{
        item:[],
        paper: [],
        color: [],
        font: [],
        design: []
      },
      order:{
        date: null,
        item: '',
        size: '',
        paper: '',
        color: '',
        font: '',
        design: '',
        quantity: '',
        message: ''
      },
      values:{
        item: '',
        size: '',
        paper: '',
        color: '',
        font: '',
        design: '',
        quantity: '',
        message: ''
      },
      user:{
        name: localStorage.getItem('name'),
        phone: localStorage.getItem('phone'),
        email: localStorage.getItem('email')
      },
      finalOrder:[],
      isReviewable: false,
      render: ''
    }
  }

  inputChangeHandler  = (e: any) =>{
    let state = Object.assign({}, this.state);
    state.values[e.target.name] = e.target.value;
    state.order[e.target.name] = e.target.value;
    this.setState(state);
  }
  itemChangeHandler = async (e: any, data: any) => {
    
    let state = Object.assign({}, this.state);
    let option = data.options.filter((option: any)=>{return option.key === data.value});
      state.values.item = data.value;
      state.order.item = option[0].text;
      state.options.paper = await getData.getPaper(data.value);
      state.options.color = await getData.getColor(data.value);
      
      this.setState(state);
  }
  paperChangeHandler = (e: any, data: any) => {
      let state = Object.assign({}, this.state);
      let option = data.options.filter((option: any)=>{return option.key === data.value});
        state.values.paper =  data.value;
        state.order.paper = option[0].text;
        this.setState(state);
  }
  colorChangeHandler = (e: any, data: any) => {
    let state = Object.assign({}, this.state);
    let option = data.options.filter((option: any)=>{return option.key === data.value});
      state.values.color =  data.value;
      state.order.color = option[0].text;
      this.setState(state);
  }
  fontChangeHandler = (e: any, data: any) => {
    let state = Object.assign({}, this.state);
    let option = data.options.filter((option: any)=>{return option.key === data.value});
      state.values.font = data.value;
      state.order.font = option[0].text;
      this.setState(state);
  }
  designChangeHandler = (e: any, data: any) => {
    let state = Object.assign({}, this.state);
    let option = data.options.filter((option: any)=>{return option.key === data.value});
      state.values.design =  data.value;
      state.order.design = option[0].text;
      this.setState(state);
  }

  backClickHandler = () =>{
    localStorage.removeItem('date');
  }

  async componentWillMount(){
    let state = Object.assign({}, this.state);
    let savedDate = localStorage.getItem('date');
    (this.props.date)?state.order.date = moment(this.props.date).format('MM/DD/YYYY'):state.order.date = savedDate;
    state.options.item = await getData.getItems();
    state.options.font = await getData.getFont();
    state.options.design = await getData.getDesign(); 
    this.setState(state);
  }

  reviewHandler = () =>{
    let state = Object.assign({}, this.state);
    state.finalOrder.push(this.state.order);
    state.isReviewable = true;
    this.setState(state);
  }

  addItemHandler = () =>{ 
    let order = {
      date: this.state.order.date,
      item: '',
      size: '',
      paper: '',
      color: '',
      font: '',
      design: '',
      quantity: '',
      message: ''
    }
    let values = {
      item: '',
      size: '',
      paper: '',
      color: '',
      font: '',
      design: '',
      quantity: '',
      message: ''
    }

    let state = Object.assign({}, this.state);
    state.finalOrder.push(this.state.order);
    state.isReordering = true;
    state.order = order;
    state.values = values;
    this.setState(state);
    window.scrollTo(0, 0)
  }


  render() {
    //console.log('Original State******',this.state.finalOrder)
    let render;
    let order = this.state.order;
    let options = this.state.options;
    
    if(this.state.isReviewable){
      render = <ReviewOrder 
                  order = {this.state.finalOrder} 
                  user = {this.state.user}
               />
    }else{
      render = <OrderForm
                  order = {this.state.values}
                  options = {this.state.options}
                  finalOrder = {this.state.finalOrder}
                  inputChangeHandler = {this.inputChangeHandler}
                  itemChangeHandler = {this.itemChangeHandler}
                  paperChangeHandler = {this.paperChangeHandler}
                  colorChangeHandler = {this.colorChangeHandler}
                  fontChangeHandler = {this.fontChangeHandler}
                  designChangeHandler = {this.designChangeHandler}
                  reviewHandler = {this.reviewHandler}
                  backClickHandler={this.backClickHandler}
                  addItemHandler = {this.addItemHandler}
                />
                  
    }
    return (
        <div>
          <h1 className='formHeader'>The Calligraphy Shop</h1>
          {render}
        </div>

    )
  }

}

function mapStateToProps(state: any) {
  return {
      date: state.dateReducer
  }
}


export default connect<any, any, any>(mapStateToProps)(OrderScreen)