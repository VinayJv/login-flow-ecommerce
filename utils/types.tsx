import type React from "react";

export type user = {
    email: string;
    name: string;
    password: string;
    category: string[];
    id: number;
    createdAt: Date;
    verified: boolean;
}

export type userContext = {
    user: user,
    setUser: React.Dispatch<React.SetStateAction<user>>,
    userStatus: boolean,
    setUserStatus: React.Dispatch<React.SetStateAction<boolean>>
}