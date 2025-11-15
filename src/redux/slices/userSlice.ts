import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Cookies } from "react-cookie";

const cookies = new Cookies();


export interface userType {
    user: { firstName: string | null, profilePicture: string | null, role : "User" | "Vendor" }
}

type addUserType = { firstName: string, profilePicture: string, role : "User" | "Vendor" }

const initialState: userType = {
    user: { firstName: null, profilePicture: null, role : "User" }
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserDetails: (state, { payload }: PayloadAction<addUserType>) => {
            state.user.firstName = payload?.firstName;
            state.user.profilePicture = payload?.profilePicture;
            state.user.role = payload?.role
        },

        removeUser: (state) => {
            state.user.firstName = null;
            state.user.profilePicture = null;
            
            cookies.remove("accessToken", { path: "/" });
            cookies.remove("token", { path: "/" });
            cookies.remove("refreshToken", { path: "/" });
        },
    },
})

// Action creators are generated for each case reducer function
export const { addUserDetails, removeUser } = userSlice.actions;

export default userSlice.reducer;