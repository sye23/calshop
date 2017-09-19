import * as React from 'react';
import {Grid, Form,Button} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';




export default class InfoForm extends React.Component <any, any>{

    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <div>
                 <Grid stackable>
                    <Grid.Row centered>
                        <Grid.Column textAlign='center' mobile={8} tablet={6} computer={6}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input 
                                    label=' Customer First Name' 
                                    placeholder='First Name' 
                                    name='firstName' 
                                    value={this.props.firstName} 
                                    onChange={this.props.inputChangeHandler}
                                />
                                <Form.Input 
                                    label='Customer Last Name' 
                                    placeholder='Last Name' 
                                    name='lastName' 
                                    value={this.props.lastName}
                                    onChange={this.props.inputChangeHandler}
                                />
                            </Form.Group>
                                <label className='dateLabel'>Choose a date</label>
                                <div className='dateDiv'>
                                <DatePicker
                                    readOnly
                                    selected={this.props.startDate}
                                    onChange={this.props.handleChange}
                                    minDate={moment()}
                                    maxDate={moment().add(180, "days")}
                                    placeholderText="Date Of Event" 
                                    className="datePicker"
                                />
                                </div>
                            </Form> 
                            <div className='startOrderBtnDiv'>
                                <Button 
                                    className='startOrderBtn' 
                                    size='massive' 
                                    fluid 
                                    inverted 
                                    onClick={this.props.validate} 
                                    disabled={(this.props.startDate  && this.props.firstName && this.props.lastName)?false:true}
                                >
                                Start Order
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
                
            </div>
        )
    }

}

