export const Type = {
    change_name: 'change-name',
    change_email: 'change-email',
    change_phone: 'change-phone',
    change_password: 'change-password',
    change_passwordConfirm: 'change-password-confirm'
}
export const formReducers = (state,action)=>{
    switch(action.type){
        case Type.change_name:
            return {
                ...state,
                name:action.payload
            }
        
        case Type.change_email:
            return {
                ...state,
                name:action.payload
            }
        case Type.change_phone:
            return {
                ...state,
                name:action.payload
            }
        case Type.change_password:
            return {
                ...state,
                name:action.payload
            } 
        case Type.change_passwordConfirm:
            return {
                ...state,
                name:action.payload
            }   
    }
}