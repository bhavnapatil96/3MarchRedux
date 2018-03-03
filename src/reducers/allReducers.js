import  {combineReducers} from 'redux';
import {projectList} from './reducer-project'
const  allReducers=combineReducers({
    projectlist:projectList
})
export default  allReducers;