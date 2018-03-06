export const user=(state=[],action)=>{
    switch (action.type)
    {
        case 'REGISTER':
            console.log('add reducer ',action.payload)
            return action.payload
        default :
            return state;
    }
}
export  const statelist=(state=[],action)=>{
    switch (action.type)
    {
        case 'STATE_LIST':
            return action.payload
        default:
            return state
            break
    }
}
export  const citylist=(state=[],action)=>{
    switch (action.type)
    {
        case 'CITY_LIST':
            return action.payload
        default:
            return state
            break
    }
}
export const login=(state=[],action)=>{
    switch (action.type)
    {
        case 'LOGIN_USER':
            console.log('in Login Reducer',action.payload.data)
            if(action.payload.headers['x-auth']){
                localStorage.setItem('token',action.payload.headers['x-auth'])
            }

            return action.payload.data
            break;

        default :
            return state;
    }
}
