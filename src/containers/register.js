import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {statelist,citylist,register} from '../actions/index'
import {Table,Button} from 'react-bootstrap'
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

        // if(nextProps.user){
        //     this.props.history.push('/login')
        // }
    }
    register1=(e)=>{
        e.preventDefault();

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
    render(){
        return(
           <div>
               <h1>Register Here</h1>
               <Table bordered>
                   <thead>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" name="name" onChange={(e)=>{this.setState({name:e.target.value})}}/></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="email" name="email" onChange={(e)=>{this.setState({email:e.target.value})}}/></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="password" name="password" onChange={(e)=>{this.setState({password:e.target.value})}}/></td>
                        </tr>
                        <tr>
                            <td>Contact</td>
                            <td><input type="text" name="contact" onChange={(e)=>{this.setState({contact:e.target.value})}}/></td>
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
                                <Button onClick={this.register1}>Submit</Button>
                            </td>
                        </tr>
                   </thead>
               </Table>
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