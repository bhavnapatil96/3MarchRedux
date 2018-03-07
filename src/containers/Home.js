import  React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteProject,addProject,updateProject} from "../actions/index";
import {Modal,Table,Button} from 'react-bootstrap'
let msg='',dt='',flag='asc';
class Home extends React.Component{
    constructor(){
        super();
        this.state={
            data1:[],
            isActive:false,
            isEditing:false,
            photo:'',
            name:'',
            startDate:'',
            endDate:'',
            client:'',
            id:'',
            curr:1,
            totoalRecords:3,
            searchArr:[],
            isSearch:false,
        }

    }
    componentWillMount(){
        if(!localStorage.getItem('token')){
            this.props.history.push('/');
        }

        this.setState({
            data1:this.props.list
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data1:nextProps.list
        })
    }
    toggleActive=()=>{
        this.setState({
            isActive:!this.state.isActive,
        })
        this.clearData();
    }
    mypage=(no)=>{
        //alert(no)
        this.setState({curr:no})
    }
    handleEntry=(e)=>{
        alert(e.target.value)
        this.setState({
            totoalRecords:e.target.value
        })
    }
    sort=(e)=>{
        if(flag==='asc') {
            var key = e.target.id;

            var myData = [].concat(this.state.data1.sort((a, b) => a[key] > b[key]));

            console.log('Sorting', myData);
            this.setState({
                data1: myData
            })
            flag='desc'
        }
        else if(flag==='desc'){
            var key = e.target.id;

            var myData = [].concat(this.state.data1.sort((a, b) => a[key] < b[key]));

            console.log('Sorting', myData);
            this.setState({
                data1: myData
            })
            flag='asc'
        }
    }
    addProject1=()=>{
        dt=''
        if(msg==='') {
            console.log("AddData")
            var formData = new FormData()
            formData.append('name', this.state.name)
            formData.append('startDate', this.state.startDate)
            formData.append('endDate', this.state.endDate)
            formData.append('client', this.state.client)
            formData.append('pic', this.state.photo)
            console.log(this.state)
            this.props.addProject(formData);
            this.clearData();
            this.toggleActive();
        }
        else{
            alert("Please Enter the Required Field")
        }
    }
    editData=(project)=>{
       // alert(project.pic)

        let sdate=project.startDate.split("T");
        let edate=project.endDate.split("T");

        this.setState({
            name:project.name,
            startDate:sdate[0],
            endDate:edate[0],
            client:project.client,
            photo:project.pic,
            id:project._id
        })
        this.setState({
            isEditing:true
        })

        //this.toggleActive();

    }
    updateProject1=()=>{
        alert();
        console.log(this.state)
        var formData=new FormData();
        formData.append('id',this.state.id)
        formData.append('name',this.state.name)
        formData.append('startDate',this.state.startDate)
        formData.append('endDate',this.state.endDate)
        formData.append('client',this.state.client)
        formData.append('pic',this.state.photo)

        this.props.updateProject(formData);
        this.toggleActive();
        this.clearData();
    }
    deleteProject1=(id1)=>{
        var obj={
            id:id1
        }
        //alert(obj);
        this.props.deleteProject(obj);

    }
    clearData=()=>{
        this.setState({
            isEditing:false,
            name:'',
            startDate:'',
            endDate:'',
            client:'',
            photo:'',
        })
    }

    validation=(e)=>{
        msg='';
        let val=e.target.value;
        let nm=e.target.name;
        if(val===''){
            msg=nm+' Field is required'
        }
    }

    search=(e)=> {
        e.preventDefault();
        var key = e.target.value;
        this.setState({
            isSearch:true,
            searchArr:[]
        })

        var temp=[]
        this.state.data1.map((st,i)=>{
            if(st.name.includes(key))
            {
                temp.push(st);
            }
            else if(st.client.includes(key))
            {
                temp.push(st);
            }

            if(key===""){
                this.setState({
                    isSearch:false
                })
            }
        })
        this.setState({
            searchArr:temp
        })

        console.log('Serach Array',this.state.searchArr);

    }

    render(){

        var pages=[];
        let len=this.state.data1.length;
        let page=Math.ceil(len/this.state.totoalRecords)
        for(let i=1;i<=page;i++){
             pages.push(i);
        }


        let lastRec=this.state.curr*this.state.totoalRecords;
        let firstRec=lastRec-this.state.totoalRecords;
        let totalRec=this.state.data1.slice(firstRec,lastRec);



        var dt=new Date(this.state.startDate).toLocaleDateString();
       // alert(dt)
        return(
            <div>
            <fieldset>
                <legend></legend>
                <Table>
                    <thead>
                    <tr>
                        <td>
                            <select onChange={this.handleEntry}>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" name="searchText" onChange={this.search}/>
                        </td>
                        <td>
                            <Button bsStyle="primary" style={{"float":"right"}} onClick={this.toggleActive}>Add Project</Button>
                        </td>
                    </tr>
                    </thead>
                </Table>
                <br/><br/><br/>
                <Table hover border="1">
                    <thead>
                    <tr>
                    <td id="name" onClick={this.sort}>Name</td>
                        <td id="startDate" onClick={this.sort}>Start Date</td>
                        <td id="endDate" onClick={this.sort}>End Date</td>
                        <td id="client" onClick={this.sort}>Client</td>
                        <td>Photo</td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    {
                        (this.state.isSearch)?

                            this.state.searchArr.map((pr,i)=>{
                                let date=pr.startDate;
                                let d=new Date(pr.startDate);

                                return(
                                    <tbody>
                                    <tr>
                                        <td>{pr.name}</td>
                                        <td>{new Date(pr.startDate).toLocaleDateString()}</td>
                                        <td>{new Date(pr.endDate).toLocaleDateString()}</td>
                                        <td>{pr.client}</td>
                                        <td><img src={'http://localhost:8989/upload/'+pr.pic} height="50px" width="50px"/></td>
                                        <td><Button onClick={()=>{this.deleteProject1(pr._id)}}>Delete</Button>
                                            <Button onClick={()=>{

                                                this.toggleActive();
                                                this.editData(pr);


                                            }}>Edit</Button></td>

                                    </tr>
                                    </tbody>
                                )
                            })

                            :
                        totalRec.map((pr,i)=>{
                            let date=pr.startDate;
                            let d=new Date(pr.startDate);

                            return(
                                <tbody>
                                <tr>
                                    <td>{pr.name}</td>
                                    <td>{new Date(pr.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(pr.endDate).toLocaleDateString()}</td>
                                    <td>{pr.client}</td>
                                    <td><img src={'http://localhost:8989/upload/'+pr.pic} height="50px" width="50px"/></td>
                                    <td><Button onClick={()=>{this.deleteProject1(pr._id)}}>Delete</Button>
                                    <Button onClick={()=>{

                                        this.toggleActive();
                                        this.editData(pr);


                                    }}>Edit</Button></td>

                                </tr>
                                </tbody>
                            )
                        })
                    }
                    <tr>
                        <td style={{"margin-left":"10px"}} colSpan="6">
                            {pages.map((p,i)=>{
                                return <Button onClick={()=>this.mypage(p)}>{p}</Button>
                            })}
                        </td>
                    </tr>

                </Table>


                <Modal onHide={this.toggleActive} show={this.state.isActive}>
                    <Modal.Header>
                        <Modal.Title>Project Management</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form encType="multipart/form-data" onSubmit={(e)=>e.preventDefault()}>

                        <Table>

                            <thead>
                            <tr>
                                <td colSpan="2"><p style={{"color":"red"}}>{msg}</p></td>
                            </tr>
                            <tr>
                                <td>Name<span style={{"color":"red"}}>*</span></td>
                                <td><input type="text" name="name" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value});this.validation(e)}}/><br/><br/></td>
                            </tr>
                            <tr>
                                <td>Start Date</td>
                                <td><input type="date" name="startDate" value={this.state.startDate} onChange={(e)=>this.setState({startDate:e.target.value})}/><br/><br/></td>
                            </tr>
                            <tr>
                                <td>End Date</td>
                                <td><input type="date"  name="endDate" value={this.state.endDate} onChange={(e)=>this.setState({endDate:e.target.value})}/><br/><br/></td>
                            </tr>
                            <tr>
                                <td>Client<span style={{"color":"red"}}>*</span></td>
                                <td><input type="text" name="client" value={this.state.client} onChange={(e)=>{this.setState({client:e.target.value});this.validation(e)}}/><br/><br/></td>
                            </tr>
                            <tr>
                                <td>Photo</td>
                                <td><img src={"http://localhost:8989/upload/"+this.state.photo} height="50px" width="50px"/>
                                    <input type="file" name="pic" onChange={(e)=>this.setState({photo:e.target.files[0]})}/><br/><br/>
                                    {
                                        this.state.isEditing?
                                            <Button bsStyle="primary" onClick={this.updateProject1} value="Update">Update</Button>

                                            :
                                            <Button bsStyle="primary" onClick={this.addProject1} value="Save">Save</Button>

                                    }
                                    </td>
                            </tr>
                            </thead>
                        </Table>
                        </form>


                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.toggleActive}>Close</button>
                    </Modal.Footer>
                </Modal>
            </fieldset>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log('in Home ',state.projectlist);
    return {
        list:state.projectlist
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({deleteProject,addProject,updateProject},dispatch);

}
export default connect(mapStateToProps,matchDispatchToProps)(Home)