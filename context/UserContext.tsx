'use client';

import { createContext, type ReactNode, useContext, useState } from "react"
import { type userContext, type user } from "utils/types"

type Props = {
    children: ReactNode;
}

const UserContext = createContext<userContext | undefined>(undefined);

export function UserProvider({children} : Props){
    const [user, setUser] = useState<user>({
        email: "",
        name: "",
        password: "",
        category: [],
        id: 0,
        createdAt: new Date(),
        verified: false,
    });

    const [userStatus, setUserStatus] = useState(false);

    const [loaderStatus, setloaderStatus] = useState(false);

    const value = {
        user,
        setUser,
        userStatus,
        setUserStatus,
        loaderStatus,
        setloaderStatus
    }
    
    return(
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if(context === undefined){
        throw new Error("useUserContext must be within UserProvider")
    }
    return context;
};



