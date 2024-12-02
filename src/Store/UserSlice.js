import { createSlice } from "@reduxjs/toolkit"


const UserSlice = createSlice({
    name: 'user',
    initialState: {
        items: null
    },
    reducers: {
        addUser: (state,action) => {
          let userData = action.payload
          state.items = userData
        },
        deleteUser: (state,action) => {
          state.items = []
        }
    }
})

export const {addUser, deleteUser} = UserSlice.actions;

export default UserSlice.reducer