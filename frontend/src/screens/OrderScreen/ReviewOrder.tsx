import * as React from 'react';
import {Button,Grid,Table} from 'semantic-ui-react';
import * as utils from '../../utils/utilFunctions';
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import * as reducerActions from '../../actions/actions';
import * as moment from 'moment';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

 


export default class ReviewOrder extends React.Component < any, any > {

    constructor(){
        super();
        this.state = {
            isSubmitted: false,
            isReordering: false,
            isLoggingout: false,
            isRedirecting: false
        }
    }

    //console.log('1prop order******',this.props.order);
    //this.props.order.splice(0,1);

    //console.log('2prop order******',this.props.order);
    submit= async() =>{
        const token: any = localStorage.getItem('token');
        const config = {
          headers: { 'x-access-token': token }
        };
        let response = await axios.post('api/sendOrder',{order:this.props.order, user: this.props.user},config)
        .catch((e:any)=>{return e.response.data});
        if(response.data === 'sent'){
            this.setState({isSubmitted: true})
            setTimeout(() => {
                this.setState({isLoggingout: true})
            }, 4000); 
        }
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('phone');
        localStorage.removeItem('email');
        localStorage.removeItem('date');
        localStorage.removeItem('roll');
        localStorage.removeItem('customer');
    }

    reorder = async() =>{
        const token: any = localStorage.getItem('token');
        const config = {
          headers: { 'x-access-token': token }
        };
        let response = await axios.post('api/sendOrder',{order:this.props.order, user: this.props.user},config)
        .catch((e:any)=>{return e.response.data});
        if(response.data === 'sent'){
            this.setState({isReordering: true})
            setTimeout(() => {
                this.setState({isRedirecting: true})
            }, 3000);
        }
        localStorage.removeItem('date');
        localStorage.removeItem('customer');
    }

    render(){
        let render;
        let redirect;

           
       if(this.state.isLoggingout){
           redirect = <Redirect to={'/'}/>;
       }else if(this.state.isRedirecting){
            redirect = <Redirect to={'/chooseDate'}/>;
       }
            
        if(this.state.isSubmitted){
            render = <h1 className='submitMsg'>Order Submitted Successfully.<br/>You Order Will be Reviewed.<br/>You Can Expect to Hear From us Shortly.</h1>;
        }else if(this.state.isReordering){
            render = <h1 className='submitMsg'>Order Submitted Successfully.<br/>You Are Being Redirected.</h1>;
        }else{
            render = (
                <div>
                    <Grid stackable>
                    <Grid.Row centered id='reviewHeader'>
                        <Grid.Column textAlign='center' mobile={16} tablet={16} computer={8}>
                            <h2 className='formTitle'>Review Order</h2>
                            <h3 className='forTitle'> For: {this.props.order[0].customer}</h3>
                            <h3 className='dateTitle'> Date of Event: {this.props.order[0].date}</h3>
                        </Grid.Column>
                    </Grid.Row>
                    
                    { this.props.order.map((order:any, index:any) =>{
                        return (
                                <Grid.Row key={index} centered id='reviewTable'>
                                    <Grid.Column textAlign='center' mobile={16} tablet={16} computer={8}>
                                        <Table  compact definition striped>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.Cell />
                                                    <Table.HeaderCell textAlign='right'>Order: {index+1}/{this.props.order.length} </Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
        
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell >Item:</Table.Cell>
                                                    <Table.Cell>{order.item}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Size:</Table.Cell>
                                                    <Table.Cell>{order.size}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Paper Color:</Table.Cell>
                                                    <Table.Cell>{order.paper}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Ink Color:</Table.Cell>
                                                    <Table.Cell>{order.color}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Font Style:</Table.Cell>
                                                    <Table.Cell>{order.font}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Design Style:</Table.Cell>
                                                    <Table.Cell>{order.design}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Quantity:</Table.Cell>
                                                    <Table.Cell>{order.quantity}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Special Instructions:</Table.Cell>
                                                    <Table.Cell>{order.message}</Table.Cell>
                                                </Table.Row>
                                            
                                            </Table.Body>
                                            {/* <Table.Footer fullWidth>
                                            <Table.Row>
                                                <Table.HeaderCell />
                                                <Table.HeaderCell textAlign= 'right'>
                                                    <Button color='red' size='small'>Remove Order</Button>
                                                </Table.HeaderCell>
                                            </Table.Row>
                                            </Table.Footer> */}
                                        </Table>
                                    </Grid.Column>
                                </Grid.Row>
                        )
                    })}
                        
                    
                    
                    <Grid.Row centered>
                    <Grid.Column textAlign='center'>
                        <Button size='huge' inverted onClick={this.reorder}>Finish And <br/> Start New Order</Button>
                        <Button size='huge' inverted onClick={this.submit}>Place Order <br/> And Finish</Button>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
              </div>
            )
        }
        return (
            <div>
                {render}  
                {redirect} 
            </div>
    
        )
    }
    
 
}



