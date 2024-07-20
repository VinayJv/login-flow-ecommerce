/* eslint-disable */
'use client';

import Link from "next/link";
import React from "react";
import { useUserContext } from "context/UserContext";
import { useRouter } from "next/navigation";

export default function SignUp(){

    const { setUser, setUserStatus, setloaderStatus } = useUserContext();
    const router = useRouter();

    const handleForm = async (e: React.BaseSyntheticEvent) => {
        setloaderStatus(true);
        e.preventDefault();
        const newUser = {
            name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        }
        try{
            const { createdUser } = await fetch("/api/user", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            }).then((data)=>data.json());

            sessionStorage.setItem("password", Math.random().toString().substring(2, 8));

            const message = {
                from:"donotreply@gmail.com",
                to: newUser.email,
                subject: "ECOMMERCE LOGIN ",
                text: `Your One-Time-Password :${sessionStorage.getItem("password")}`
            }

            if(createdUser){
                const { status } = await fetch("/api/mailer",{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(message)
                }).then((data)=> data);
    
                if(status === 200){
                    if(setUser !== undefined && setUserStatus !== undefined){
                        setUser(createdUser);
                        setUserStatus(true);
                    }
                    setloaderStatus(false);
                    router.push("/verify");
                } else {
                    alert("Error sending mail! Try again after sometime")
                }
            }
        }
        catch(err){
            setloaderStatus(false);
            alert("Email Already Exists, Please Login");
        }  
    }


    return(
        <form onSubmit={handleForm}>
            <div className="loginFormTitleContainer">
                <h2>Create your account</h2>
            </div>
            <label htmlFor="name">
                Name<input type="text" placeholder="Enter" id="name" required></input>
            </label>
            <label htmlFor="email">
                Email<input type="email" placeholder="Enter" id="email" required></input>
            </label>
            <label htmlFor="password">
                Password<input type="text" placeholder="Enter" id="password" required></input>
            </label>
            <button type="submit">Sign Up</button>
            <div className="divider"></div>
            <p>Have an Account? <span><Link href={"/"}>LOGIN</Link></span></p>
        </form>
    )
}