import React from 'react';
import {Form,FormGroup,FormControl,Col,Button} from 'react-bootstrap'
import {login} from '../actions/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {BrowserRouter,Route,Switch,NavLink} from 'react-router-dom'
import Register from './register'
let msg='',inValid=''
class Login extends React.Component{
    constructor(){

        super();
        this.state={
            username:'',
            password:''
        }

    }
    componentWillMount(){
        msg=''
    }
    componentWillReceiveProps(nextProps){
        msg=''
       alert(nextProps.data)
        if(nextProps.data!=='success'){
            //alert(nextProps.data)
            inValid="Invalid Username or Password"
        }
        if(localStorage.getItem('token'))
        {
            this.props.history.push('/home')
        }
    }
    validation=(e)=>{
        msg='';
        if(e.target.value===''){
            msg=e.target.name +" Field is required..."
        }
        if(e.target.name==='email')
        {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!e.target.value.match(mailformat)){
                msg='Enter a valid Email'
            }
        }
    }
    sendData=(e)=>{
        e.preventDefault();

        if(this.state.username==='' && this.state.password==='')
        {
            msg='Please Enter a required Field'
            alert(msg)

        }
        else{
            var obj={
                username:this.state.username,
                password:this.state.password
            }
            this.props.login(obj);
        }
    }

    render(){
        return(
            <div>
               <hr/>
                <Form horizontal onSubmit={(e)=>e.preventDefault()}>
                    <center>
                        <span style={{"color":"red"}}>{inValid}</span>
                        <FormGroup>
                            <Col sm={2}>
                                <span style={{"color":"red"}}>{msg}</span>
                            </Col>
                        </FormGroup>
                    <FormGroup>
                        <Col sm={1}>
                            Email<span style={{"color":"red"}}>*</span>
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" name="email" onChange={(e)=>{this.setState({username:e.target.value});this.validation(e)}}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={1}>
                            Password<span style={{"color":"red"}}>*</span>
                        </Col>
                        <Col sm={3}>
                            <FormControl type="password" name="password" onChange={(e)=>{this.setState({password:e.target.value});this.validation(e)}}/>
                        </Col>
                    </FormGroup>
                        <FormGroup>
                            <Col sm={3}>
                                <Button bsStyle="primary" onClick={this.sendData}>Sign In</Button>
                                <NavLink to="/register">Register here</NavLink>

                            </Col>

                        </FormGroup>
                    </center>
                </Form>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return{
        data:state.login
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({login},dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Login);