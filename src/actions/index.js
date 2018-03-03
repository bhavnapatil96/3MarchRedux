var axios=require('axios');

export const projectList=()=>{
    return (dispatch)=>{
        axios.get('http://localhost:8989/project/list').then((success)=>{
            console.log('in action ',success.data)

            dispatch({
                type:"PROJECT_LIST",
                payload:success.data
            })
        })
    }
}
export const deleteProject=(obj)=>{
    return (dispatch)=>{
        axios.post('http://localhost:8989/project/delete',obj).then((success)=>{
            dispatch({
                type:"PROJECT_DELETE",
                payload:success.data
            })
        })
    }
}
export const addProject=(obj)=>{
    return(dispatch)=>{
        axios.post('http://localhost:8989/project/add',obj).then((success)=>{
            dispatch({
                type:"PROJECT_ADD",
                payload:success.data
            })
        })
    }
}
export const updateProject=(obj)=>{

    return(dispatch)=>{
        axios.post('http://localhost:8989/project/update',obj).then((success)=>{
            console.log('in action  update',success.data)

            dispatch({
                type:"PROJECT_UPDATE",
                payload:success.data
            })
        })
    }
}