import type { User } from "@/constants/User";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserSlice {
    user: User | null,
    isLoading: boolean,
}

import { DEFAULT_MOCK_USER } from "@/constants/staticMockData";

const getCurrentUser = (): User | null => {
    try {
        const savedUser = localStorage.getItem("user")
        if (savedUser) return JSON.parse(savedUser)
        // Default static user
        localStorage.setItem("user", JSON.stringify(DEFAULT_MOCK_USER))
        return DEFAULT_MOCK_USER
    }
    catch(_) {
        return DEFAULT_MOCK_USER
    }
}
const initialState: UserSlice = {
    user: getCurrentUser(),
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        }
    }
})

export default userSlice.reducer
export const { setCurrentUser, setIsLoading } = userSlice.actions