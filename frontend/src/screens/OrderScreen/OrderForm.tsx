import * as React from 'react';
import {Button, Grid, Dropdown, Form} from 'semantic-ui-react';
import * as utils from '../../utils/utilFunctions';
import axios from 'axios'
import { Link } from 'react-router-dom';
import * as getData from '../../components/common/GetData';
import { connect } from 'react-redux';
import * as moment from 'moment';

const OrderForm = (props:any) => {

    let ordrerNumber = props.finalOrder.length+1;
    
    return (
        <div>
        
        <Grid stackable>
            <span className='backButton'>
                <strong>Date of Event:</strong>{localStorage.getItem('date')}<br/>
                <Link to='/chooseDate'>
                    <Button fluid floated='left'size='tiny' inverted onClick={props.backClickHandler}>Change Date of Event</Button>
                </Link>
            </span>
            <Grid.Row centered>
            
            <Grid.Column textAlign='center' mobile={8} tablet={6} computer={4}>
                <h2 className='formTitle'>Order Form:<small> {ordrerNumber}/{ordrerNumber}</small></h2>
                <Form>
                <Form.Field>
                    <label>Select Item</label>
                    <Form.Dropdown 
                    placeholder='Select An Item' 
                    fluid 
                    search 
                    selection 
                    onChange = {props.itemChangeHandler}
                    options={props.options.item} 
                    value={props.order.item} 
                    />              
                </Form.Field>
                <Form.Field>
                    <label>Select Size</label>
                    <Form.Input 
                    disabled = {(props.order.item )?false:true}
                    placeholder='Enter A Size' 
                    fluid 
                    name = 'size'
                    value = {props.order.size} 
                    onChange = {props.inputChangeHandler}
                    />              
                </Form.Field>
                <Form.Field>
                    <label>Select Paper Color</label>
                    <Form.Dropdown 
                    disabled = {(props.order.item && props.order.size )?false:true}
                    placeholder='Select A Paper Color' 
                    fluid 
                    search 
                    selection 
                    onChange = {props.paperChangeHandler}
                    options={props.options.paper} 
                    value={props.order.paper}
                    />              
                </Form.Field>
                <Form.Field>
                    <label>Select Ink Color</label>
                    <Form.Dropdown
                    disabled = {(props.order.item && props.order.size && props.order.paper )?false:true} 
                    placeholder='Select An Ink Color' 
                    fluid 
                    search 
                    selection 
                    onChange = {props.colorChangeHandler}
                    options={props.options.color} 
                    value={props.order.color}
                    />              
                </Form.Field>
                <Form.Field>
                    <label>Select Font Style</label>
                    <Form.Dropdown 
                    disabled = {(props.order.item && props.order.size && props.order.paper && props.order.color)?false:true}
                    placeholder='Select A Font' 
                    fluid 
                    search 
                    selection 
                    onChange = {props.fontChangeHandler}
                    options={props.options.font} 
                    value={props.order.font}
                    />              
                </Form.Field>
                <Form.Field>
                    <label>Select Design Style</label>
                    <Form.Dropdown 
                    disabled = {(props.order.item && props.order.size && props.order.paper && props.order.color && props.order.font)?false:true}
                    placeholder='Select A Design' 
                    fluid 
                    search 
                    selection 
                    onChange = {props.designChangeHandler}
                    options={props.options.design} 
                    value={props.order.design}
                    />              
                </Form.Field>
                <Form.Field>
                    <label>Select Quantity</label>
                    <Form.Input 
                    disabled = {(props.order.item && props.order.size && props.order.paper && props.order.color && props.order.font && props.order.design)?false:true}
                    placeholder='Select An Amount' 
                    fluid 
                    type = 'number'
                    name = 'quantity'
                    value = {props.order.quantity} 
                    onChange = {props.inputChangeHandler}
                    />              
                </Form.Field>
                <Form.Field>
                    <label>Special Instuctions</label>
                    <Form.TextArea 
                    disabled = {(props.order.item && props.order.size && props.order.paper && props.order.color && props.order.font && props.order.design && props.order.quantity)?false:true}
                    placeholder='Max 250 Characters'
                    maxLength="250" 
                    name = 'message'
                    value = {props.order.message} 
                    onChange = {props.inputChangeHandler}
                    />              
                </Form.Field>
                
                
                </Form>
            
            </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
            <Grid.Column textAlign='center'>
                <Button size='huge'  inverted  disabled = {(props.order.quantity )?false:true} onClick ={props.reviewHandler}>Review and <br/>Complete Order</Button>
                <Button size='huge'  inverted   disabled = {(props.order.quantity )?false:true} onClick ={props.addItemHandler}>Order <br/> Another Item</Button>
            </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>  

    )
      
    
    }

    export default OrderForm;