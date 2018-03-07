import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {statelist,citylist,register} from '../actions/index'
import {Table,Button} from 'react-bootstrap'
let msg='',invalid='';
class Register extends React.Component{
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            password:'',
            contact:'',
            state:'',
            city:'',
            stateId:'',
            cityId:'',
            state1:[],
        }

    }
    componentDidMount(){
        this.props.statelist();
        this.props.citylist();

    }
    componentWillReceiveProps(nextProps){
        // this.setState({
        //     state1:nextProps.statelist
        //
        // })

        if(nextProps.user.length!==0){
            //this.props.history.push('/')
            window.location='/'
        }
       // console.log('User',nextProps.user)
    }
    validation=(e)=>{
        msg=''
        let val=e.target.value
        let nm=e.target.name;
        if(val==='')
        {
            msg=nm+"  Field is Required"
        }
    }
    contactValidator=(e)=>{
        invalid=''
        let val=e.target.value
        let nm=e.target.name;
        let pat=/^\d{10}$/;
        if(!val.match(pat))
        {
            invalid=" Enter digit Only"
        }
    }
    emailValidator=(e)=>{
        invalid=''
        let val=e.target.value
        let nm=e.target.name;
        let pat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!val.match(pat))
        {
            invalid=" Enter Valid Email"
        }
    }
    register1=(e)=>{
        e.preventDefault();

        if(this.state.name!==''&& this.state.email!==''&&this.state.password!==''&&this.state.contact!==''){
            var obj={
                name:this.state.name,
                email:this.state.email,
                contact:this.state.contact,
                password:this.state.password,
                stateId:this.state.stateId,
                cityId:this.state.cityId
            }
            this.props.register(obj)
        }
        else
        {
            alert("Enter a required Fields");
        }

    }
    render(){
        return(
           <div>
               <h1>Register Here</h1>
               <form onSubmit={this.register1}>
               <Table bordered>
                   <thead>
                   <tr><td colSpan="2"><span style={{"color":"red"}}>{msg}</span></td></tr>
                   <tr><td colSpan="2"><span style={{"color":"red"}}>{invalid}</span></td></tr>

                        <tr>
                            <td>Name<span style={{"color":"red"}}>*</span></td>
                            <td><input required="true" type="text" name="name" onChange={(e)=>{this.setState({name:e.target.value});this.validation(e)}}/></td>
                        </tr>
                        <tr>
                            <td>Email<span style={{"color":"red"}}>*</span></td>
                            <td><input type="email" name="email" onChange={(e)=>{this.setState({email:e.target.value});this.validation(e);this.emailValidator(e)}}/></td>
                        </tr>
                        <tr>
                            <td>Password<span style={{"color":"red"}}>*</span></td>
                            <td><input type="password" name="password" onChange={(e)=>{this.setState({password:e.target.value});this.validation(e)}}/></td>
                        </tr>
                        <tr>
                            <td>Contact<span style={{"color":"red"}}>*</span></td>
                            <td><input type="text" name="contact" onChange={(e)=>{this.setState({contact:e.target.value});this.validation(e);this.contactValidator(e)}}/></td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>
                                <select name="state" onChange={(e)=>{this.setState({stateId:e.target.value})}}>
                                    {
                                        this.props.stateList.map((st,i)=>{
                                            return(
                                                <option value={st._id}>{st.statename}</option>
                                            )
                                        })
                                    }

                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>
                                <select onChange={(e)=>{this.setState({cityId:e.target.value})}}>
                                    {
                                        this.props.cityList.map((c,i)=>{
                                            if(c.stateId===this.state.stateId){
                                                return(
                                                    <option value={c._id}>{c.cityname}</option>
                                                )
                                            }
                                        })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" value="Save"/>
                                {/*<Button onClick={this.register1}>Submit</Button>*/}
                            </td>
                        </tr>
                   </thead>
               </Table>
               </form>
           </div>

        )
    }
}
function mapStateToProps(state) {
    console.log('State list ',state.user)
    return{
        user:state.user,
        stateList:state.statelist,
        cityList:state.citylist

    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({statelist,citylist,register},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Register)