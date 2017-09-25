import * as React from 'react';
import {Button,Form,Grid,Header,Image,Message,Segment} from 'semantic-ui-react';
import * as utils from '../../utils/utilFunctions';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export default class UserLogin extends React.Component < any, any > {

  constructor() {
    super();
    this.state = {
      user:{
        email:''
      },
      errors:{
        errorMsg: '',
        error: false
      },
      isSubmittable: false
    }
  }

changeHandler = (e: any) => {
  let state = Object.assign({}, this.state);
  state.user[e.target.name] = e.target.value;
  this.setState(state);
}


formValidation = () =>{
  let state =Object.assign({}, this.state);
  let formIsValid = true;

  if(!state.user.email || !utils.checkEmail(state.user.email)){
    formIsValid = false;
    state.errors.errorMsg = 'Enter valid email';
    state.errors.error = true;
  } else{
    formIsValid = true;
    state.errors.error = false;
    state.errors.errorMsg = '';
  }
  this.setState(state);
  return formIsValid;
}


submit = async() => {
  let state =Object.assign({}, this.state);
  this.formValidation()
  if(this.formValidation()){
      let response = await axios.post('/auth/login',{login: this.state.user}).catch(e=>{return e.response.data});
      if(response === 'Invalid Login Credentials'){
        state.errors.error = true;
        state.errors.errorMsg = response;
        this.setState(state);
      }else if(response.data.success){
        let name = utils.capitalizeFirstLetter(response.data.firstName)+' '+utils.capitalizeFirstLetter(response.data.lastName)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', name);
          localStorage.setItem('company', response.data.company)
          localStorage.setItem('phone', response.data.phone);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('roll', response.data.roll);
          this.setState({isSubmittable: true});
      }
 }
}

  render() {
      let render;

      if(this.state.isSubmittable || localStorage.getItem('token')){
        render = <Redirect to = {'/chooseDate'}/>
      }else{
          render = (
            <div className='login-form'>
            <style>
              {
                ` body > div,
                body > div > div,
                body > div > div > div.login-form {
                  height: 100%;
                }
                 `
              }</style>
    
              <h1 className='mainHeader'>The Calligraphy Shop</h1>
            <Grid
              textAlign='center'
              style={{
              height: '100%'
            }}
            
              verticalAlign='middle'>
              <Grid.Row centered>
                <Grid.Column mobile={16} tablet={10} computer={5}>
                    <Form  size='large' error = {this.state.errors.error}>
                        <Message
                            floating
                            size='mini'
                            error
                            content={this.state.errors.errorMsg}
                        />
                    
                    <Segment stacked>
                        <Header as='h2'  textAlign='center'>
                        {' '}Login to Place Order
                        </Header>
                    
                        <Form.Input
                        error = {this.state.errors.error}                  
                        fluid
                        icon='at'
                        iconPosition='left'
                        name='email'
                        value={this.state.user.email}
                        onChange={this.changeHandler}
                        placeholder={(!this.state.errors.error)?'E-mail address': this.state.errors.errorMsg}/>
                        <Button
                        className = 'loginBtn'
                        fluid size='large' 
                        onClick={this.submit}>
                        Login
                        </Button>
                    </Segment>
                    </Form>
                    {/* <Message>
                    <Link to='/adminLogin'>Admin Login</Link>
                    </Message> */}
                </Grid.Column>
              </Grid.Row>
              
              
                
            </Grid>
          </div>
          )
      }
    
    return (
      <div>
          {render}
      </div>

    )
  }

}