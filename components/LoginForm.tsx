/* eslint-disable */
'use client';

import Link from "next/link";
import React, { useState } from "react";
import "~/styles/globals.css";
import styles from "~/app/index.module.css";
import { useUserContext } from "context/UserContext";
import { useRouter } from "next/navigation";

export function LoginForm(){
    const [toggle, setToggle] = useState<boolean>(false);
    const { setUser, setUserStatus } = useUserContext();
    const router = useRouter();


    const toggler = () => {
        setToggle(!toggle);
    }

    const handleFormInput = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        const { foundUser, status } = await fetch("/api",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: e.target.elements[0].value,
                password: e.target.elements[1].value
            })
        }).then((data)=>data.json());

        if(status === 200 && foundUser.verified){
            if(setUser !== undefined){
                setUser(foundUser);
                if(setUserStatus !== undefined){
                    setUserStatus(true);
                }
            }
            router.push("/dashboard");
        } else{
            alert("Check Your Email Password");
        }
    }

    return( 
    <>
        <form onSubmit={handleFormInput}>
            <div>
                <h2>Login</h2>
                <div>
                    <p>Welcome back to ECOMMERCE</p>
                    <p>The next gen business marketplace</p>
                </div>
            </div>
        <label htmlFor="email">
            Email<input type="email" placeholder="Enter" id="email" required></input>
        </label>
        <label htmlFor="password">
            Password
            <div className={styles.passwordWrapper}>
                <input type={toggle ? "text" : "password"} placeholder="Enter" id="password" required></input>
                <p className={styles.passwordToggle} onClick={toggler}>Show</p>
            </div>
        </label>
        <button type="submit">Login</button>
        <div className={styles.divider}></div>
        <p>{`Don't have an Account?`}<span><Link href={"/signup"}>SIGN UP</Link></span></p>    
        </form>
    </>
    )
}