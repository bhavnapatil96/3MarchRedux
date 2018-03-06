import  {combineReducers} from 'redux';
import {projectList} from './reducer-project'
import {login} from './reducer-user'
import {user} from './reducer-user'
import {citylist,statelist} from './reducer-user';
const  allReducers=combineReducers({
    projectlist:projectList,
    user:user,
    statelist:statelist,
    citylist:citylist,
    login:login


})
export default  allReducers;