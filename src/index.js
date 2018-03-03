import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch,Route,NavLink} from 'react-router-dom'
import Home from './containers/Home';


import {bindActionCreators,createStore,applyMiddleware} from 'redux';
import {Provider} from  'react-redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import allReducers from './reducers/allReducers';
import * as actions from './actions';
const store=createStore(allReducers,composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(actions.projectList());

const Link=()=>{
    return (
        <section>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/login">Login</NavLink>

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
                        <Route path="/home"  component={Home}/>

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
