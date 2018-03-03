import  React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteProject,addProject,updateProject} from "../actions/index";
import {Modal,Table} from 'react-bootstrap'
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
            id:''
        }

    }
    componentWillMount(){
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
    addProject1=()=>{
        console.log("AddData")
      var formData=new FormData()
        formData.append('name',this.state.name)
        formData.append('startDate',this.state.startDate)
        formData.append('endDate',this.state.endDate)
        formData.append('client',this.state.client)
        formData.append('pic',this.state.photo)
        console.log(this.state)
        this.props.addProject(formData);
        this.clearData();
        this.toggleActive();
    }
    editData=(project)=>{
       alert(project.pic)
        this.setState({
            name:project.name,
            startDate:project.startDate,
            endDate:project.endDate,
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


    render(){
        return(
            <section>

                <button onClick={this.toggleActive}>Add Project</button>
                <Table hover border="1">
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Start Date</td>
                        <td>End Date</td>
                        <td>Client</td>
                        <td>Photo</td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    {
                        this.state.data1.map((pr,i)=>{
                            let date=pr.startDate;
                            let d=new Date(pr.startDate);

                            return(
                                <tbody>
                                <tr>
                                    <td>{pr.name}</td>
                                    <td>{pr.startDate.format('MM/dd/yyyy')}</td>
                                    <td>{pr.endDate}</td>
                                    <td>{pr.client}</td>
                                    <td><img src={'http://localhost:8989/upload/'+pr.pic} height="50px" width="50px"/></td>
                                    <td><button onClick={()=>{this.deleteProject1(pr._id)}}>Delete</button>
                                    <button onClick={()=>{

                                        this.toggleActive();
                                        this.editData(pr);


                                    }}>Edit</button></td>

                                </tr>
                                </tbody>
                            )
                        })
                    }

                </Table>


                <Modal onHide={this.toggleActive} show={this.state.isActive}>
                    <Modal.Header>
                        <Modal.Title>Project Management</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <form encType="multipart/form-data" onSubmit={(e)=>e.preventDefault()}>
                                name
                                <input type="text" name="name" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})}/><br/><br/>
                                Start Date
                                <input type="date" name="startDate" value="2018-09-09" onChange={(e)=>this.setState({startDate:e.target.value})}/><br/><br/>
                                End Date
                                <input type="date" name="endDate" value={this.state.endDate} onChange={(e)=>this.setState({endDate:e.target.value})}/><br/><br/>
                                Client
                                <input type="text" name="client" value={this.state.client} onChange={(e)=>this.setState({client:e.target.value})}/><br/><br/>
                                Photo
                                <img src={"http://localhost:8989/upload/"+this.state.photo}/>
                                <input type="file" name="pic" onChange={(e)=>this.setState({photo:e.target.files[0]})}/><br/><br/>
                                {
                                    this.state.isEditing?
                                        <input type="submit" onClick={this.updateProject1} value="Update"/>

                                        :
                                        <input type="submit" onClick={this.addProject1} value="Save"/>

                                }

                            </form>
                    </Modal.Body>
                    <Modal.Footer>

                        <button onClick={this.toggleActive}>Close</button>
                    </Modal.Footer>
                </Modal>
            </section>
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