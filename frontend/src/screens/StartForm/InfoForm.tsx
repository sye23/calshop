import * as React from 'react';
import {Grid, Form,Button} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';




const InfoForm = (props: any) =>{
 

    return(
        <div>
                <Grid stackable>
                <Grid.Row centered>
                    <Grid.Column textAlign='center' mobile={8} tablet={6} computer={6}>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input 
                                label=" Your Customer's First Name" 
                                placeholder='First Name' 
                                name='firstName' 
                                value={props.firstName} 
                                onChange={props.inputChangeHandler}
                            />
                            <Form.Input 
                                label=" Your Customer's Last Name" 
                                placeholder='Last Name' 
                                name='lastName' 
                                value={props.lastName}
                                onChange={props.inputChangeHandler}
                            />
                        </Form.Group>
                            <label className='dateLabel'>Choose a date</label>
                            <div className='dateDiv'>
                            <DatePicker
                                readOnly
                                selected={props.startDate}
                                onChange={props.handleChange}
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
                                onClick={props.validate} 
                                disabled={(props.startDate  && props.firstName && props.lastName)?false:true}
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

export default InfoForm;

