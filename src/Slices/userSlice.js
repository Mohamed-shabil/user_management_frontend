import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userData",
    initialState:[],
    reducers:{
        fetchUser:(state,action)=>{
            state.splice(state.length,0,...action.payload)
        },
        addUser:(state,action)=>{
            state.push(action.payload)
        },
        deleteUser:(state,action)=>{
            const newState = state.filter((user)=>{
                return user._id !== action.payload
            })
            return newState
        },
        searchUser: (state,action)=>{
            const searchTerm = action.payload.toLowerCase();
            
            const regex = new RegExp('.*' + searchTerm + '.*', 'i');
            return state.filter((user) =>{
                let name = regex.test(user.name) 
                let email = regex.test(user.email) 
                let phone = regex.test(user.mobile)

                return name || email || phone
            });
          },
    }
})

export const {addUser,deleteUser,fetchUser,searchUser,newSearch} = userSlice.actions;
export default userSlice.reducer;