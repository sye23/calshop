import * as React from 'react';
import {Button, Grid, Dropdown, Form, Modal, Header, Icon} from 'semantic-ui-react';
import FormInput from './FormInput';
import * as utils from '../../utils/utilFunctions';
import * as reducerActions from '../../actions/actions';
import axios from 'axios'
import { Link } from 'react-router-dom';
import * as getData from '../../components/common/GetData';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';

const OrderForm = (props:any) => {

    let ordrerNumber = props.finalOrder.length+1;
    
    let handleChange = (date: any) =>{
        props.addDateSuccess(date);
        localStorage.setItem('date', moment(props.date).format('MM/DD/YYYY'));
    }
    
    return (
        <div>
            
        <Grid stackable>
            
            <span className='backButton'>
                <strong>Date of Event:</strong>{localStorage.getItem('date')}<br/>
            </span>
            <Grid.Row centered>
                <Grid.Column textAlign='center' mobile={8} tablet={6} computer={4}>
                    <FormInput
                        order = {props.order}
                        options = {props.options}
                        finalOrder = {props.finalOrder}
                        inputChangeHandler = {props.inputChangeHandler}
                        itemChangeHandler = {props.itemChangeHandler}
                        sizeChangeHandler = {props.sizeChangeHandler}
                        paperChangeHandler = {props.paperChangeHandler}
                        colorChangeHandler = {props.colorChangeHandler}
                        fontChangeHandler = {props.fontChangeHandler}
                        designChangeHandler = {props.designChangeHandler}
                        reviewHandler = {props.reviewHandler}
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column textAlign='center'>
                    <Button size='huge'  inverted  disabled = {(props.order.quantity )?false:true} onClick ={props.reviewHandler}>Review and <br/>Complete Order</Button>
                    <Button size='huge'  inverted   disabled = {(props.order.quantity )?false:true} onClick ={props.addItemHandler}>Order <br/> Another Item</Button>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column textAlign='center'>
                    <Link to='/chooseDate'>
                        <Button size='tiny' inverted onClick={props.backClickHandler}>Go Back</Button>
                    </Link>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>  

    )
      
    
    }
    
    export default OrderForm;
