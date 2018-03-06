import React from 'react';
class Logout extends React.Component{
    constructor(){

        super();
        this.state={
            username:'',
            password:''
        }

    }

    render(){
        localStorage.removeItem('token');
        window.location = '/';
        // window.href="/login"
        //this.props.history.push('/');
        return (
           <div>
               hello
           </div>
        )


    }


}

export default Logout;