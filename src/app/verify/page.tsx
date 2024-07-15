/* eslint-disable */
'use client';

import React from "react";
import { useUserContext } from "context/UserContext";
import styles from "~/app/index.module.css";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function Verfiy(){

    const { user,  userStatus, setUser} = useUserContext();
    const router = useRouter();

    const handleVerification = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        let userInput = "";
        for(let i = 0; i<e.target.elements.length; i++){
            userInput+= e.target.elements[i].value
        }
        if(sessionStorage.getItem("password") === userInput){
            const { updatedUser, status } = await fetch(`/api/user/${user?.id}`,{
                method: 'PUT',
                headers: {
                        "Content-Type": "application/json",
                }
            }).then((data)=>data.json())
            if(updatedUser.verified && status === 200){
                if(setUser !== undefined){
                    setUser(updatedUser);
                }
                router.push("/dashboard");
            }
        } else {
            alert("Check Your Password");
        }
    }

    useLayoutEffect(()=>{
        if(!userStatus){
            router.push("/");
        }
},[]);

    return(
        <form style={{marginTop: "5rem", textAlign: "center"}} onSubmit={handleVerification}>
            <h1>Verify your email</h1>
            <p>{`Enter the 6 digit code you have received on ${user?.email}`}</p>
            <p style={{textAlign: "left", fontWeight: "600"}}>Code</p>
        <div className={styles.otpInputContainer}>
            <label>
                <input maxLength={1} type="number" required></input>
            </label>
            <label>
                <input maxLength={1} type="number" required></input>
            </label>
            <label>
                <input maxLength={1} type="number" required></input>
            </label>
            <label>
                <input maxLength={1} type="number" required></input>
            </label>
            <label>
                <input maxLength={1} type="number" required></input>
            </label>
            <label>
                <input maxLength={1} type="number" required></input>
            </label>
        </div>
        <button type="submit">Verify</button>
    </form>
    )
}