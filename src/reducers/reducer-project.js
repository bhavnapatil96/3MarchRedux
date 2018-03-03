export const projectList=(state=[],action)=>{

    switch (action.type){
        case 'PROJECT_LIST':
            console.log('in reducer ',action.payload)

            return action.payload
            break;
        case 'PROJECT_DELETE':
            return [...state].filter((dt)=>(dt._id)!==action.payload._id);
        case 'PROJECT_ADD':
            return [...state,action.payload];
        case 'PROJECT_UPDATE':
            console.log('in Reducer update',action.payload)
            var arr=[...state];
            var index=arr.findIndex((u)=>u._id===action.payload._id);
            arr.splice(index,1);
            arr.splice(index,0,action.payload);
            return arr;
        default :
            return state;
    }
}