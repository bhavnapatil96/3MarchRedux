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
export const login=(obj)=>{
    return(dispatch)=>{
        axios.post('http://localhost:8989/user/loginp',obj).then((success)=>{
            console.log('in login action',success.data,success.headers["x-auth"])

            dispatch({
                type:"LOGIN_USER",
                payload:success
            })
        })
    }
}
export const statelist=()=>{
    return (dispatch)=>{
        axios.get('http://localhost:8989/state/list').then((success)=>{
            console.log('in state action',success.data)

            dispatch({
                type:"STATE_LIST",
                payload:success.data
            })
        })
    }
}
export const citylist=()=>{
    return (dispatch)=>{
        axios.get('http://localhost:8989/city/list').then((success)=>{
            console.log('in city action',success.data)

            dispatch({
                type:"CITY_LIST",
                payload:success.data
            })
        })
    }
}
export const register=(obj)=>{
    return(dispatch)=>{
        axios.post('http://localhost:8989/user/add',obj).then((success)=>{
            console.log('in add user action',success.data);
            dispatch({
                type:'REGISTER',
                payload:success.data
            })
        })
    }
}