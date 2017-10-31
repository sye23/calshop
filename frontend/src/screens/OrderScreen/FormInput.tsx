import * as React from 'react';
import {Form} from 'semantic-ui-react';


const FormInput = (props:any) =>{

    let ordrerNumber = props.finalOrder.length+1;

    return(
        <div>
            <h2 className='formTitle'>Order Form:<small> {ordrerNumber}/{ordrerNumber}</small></h2>
            <Form>
                <Form.Field>
                    <label>Select Item</label>
                    <Form.Dropdown 
                    placeholder='Select An Item' 
                    fluid 
                    selection 
                    onChange = {props.itemChangeHandler}
                    options={props.options.item} 
                    value={props.order.item} 
                    />              
                </Form.Field>
                <Form.Field>
                    <label>Select Size</label>
                    <Form.Dropdown 
                    disabled = {(props.order.item)?false:true}
                    placeholder='Select An Size' 
                    fluid 
                    selection 
                    onChange = {props.sizeChangeHandler}
                    options={props.options.size} 
                    value={props.order.size} 
                    />                    
                </Form.Field>
                <Form.Field>
                    <label>Select Paper Color</label>
                    <Form.Dropdown 
                    disabled = {(props.order.item && props.order.size )?false:true}
                    placeholder='Select A Paper Color' 
                    fluid 
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
                    min="0"
                    value = {props.order.quantity} 
                    onChange = {props.inputChangeHandler}
                    />              
                </Form.Field>
                <Form.Field>
                    <label>Special Instuctions</label>
                    <Form.TextArea 
                    disabled = {(props.order.item && props.order.size && props.order.paper && props.order.color && props.order.font && props.order.design && props.order.quantity)?false:true}
                    placeholder='Special Instuctions'
                    maxLength="1000" 
                    name = 'message'
                    value = {props.order.message} 
                    onChange = {props.inputChangeHandler}
                    />              
                </Form.Field>
            </Form>
        </div>
    )
}

export default FormInput;