import {create} from "zustand";

export interface Iauth {
    auth: boolean;
    username: string;
    role: "user" | "premium";
    setUser : (userData: IUserData) => void;
}

export interface IUserData{
    username: string,
    role: "user" | "premium"
}

const useAuthStore = create<Iauth>((set, get) => {
    return {
        auth: false,
        username: "",
        role: "user",
        setUser(userData : IUserData){
            set({
                auth: true,
                username: userData.username,
                role: userData.role,
            })
        }
    }
})

export default useAuthStore;