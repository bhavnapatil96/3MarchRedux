import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch,Route,NavLink} from 'react-router-dom'
import Home from './containers/Home';
import  Login from './containers/login'
import  Logout from './containers/logout'


import {Button} from 'react-bootstrap'
import {bindActionCreators,createStore,applyMiddleware} from 'redux';
import {Provider} from  'react-redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import allReducers from './reducers/allReducers';
import * as actions from './actions';
import Register from "./containers/register";
const store=createStore(allReducers,composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(actions.projectList());

const Link=()=>{
    return (
        <section>
            <br/><br/>
            <Button bsStyle="success" style={{"margin-left":"500px"}}><NavLink to="/home">Home</NavLink></Button>

            {
                (localStorage.getItem('token'))?
                    <Button bsStyle="success" style={{"margin-left":"50px"}}><NavLink to="/logout">Logout</NavLink></Button>

                    :
                    <Button bsStyle="success" style={{"margin-left":"50px"}}><NavLink to="/login">Login</NavLink></Button>

            }
            <br/><br/>
        </section>
    );
}

class Page extends React.Component{
    render(){
        return(
            <header>
                <BrowserRouter>
                    <div>
                    <Link/>
                    <switch>
                        <Route exact path="/"  component={Login}/>
                        <Route exact path="/home"  component={Home}/>
                        <Route exact path="/logout"  component={Logout}/>
                        <Route exact path="/register"  component={Register}/>
                        {/*<Route component={Register}/>*/}

                    </switch>
                    </div>
                </BrowserRouter>
            </header>
        )
    }
}
ReactDOM.render(<Provider store={store}>
    <Page/>
</Provider>, document.getElementById('root'));
