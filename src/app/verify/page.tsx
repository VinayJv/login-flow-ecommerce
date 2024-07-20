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

    const renderInputs = () => {
        return Array.from({length: 6}, (item, id) => id).map((id, index)=>{
            return <label key={index}>
                <input maxLength={1} type="text" required></input>
            </label>
        });
    }

    useLayoutEffect(()=>{
        if(!userStatus){
            router.push("/");
        }
},[]);

    return(
        <form style={{textAlign: "center"}} onSubmit={handleVerification} className={styles.verifyContainer}>
            <h1 style={{ margin: "1rem" }}>Verify your email</h1>
            <p style={{margin: "1rem"}}>{`Enter the 6 digit code you have received on ${user?.email}`}</p>
        <div className={styles.otpInputContainer}>
            {renderInputs()}
        </div>
        <button type="submit">Verify</button>
    </form>
    )
}