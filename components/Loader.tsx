'use client';

import styles from "~/app/index.module.css";
import { useUserContext } from "context/UserContext";

export default function Loader(){

    const { loaderStatus } = useUserContext();

    return(
    <div className={styles.loader} style={{display: loaderStatus ? "flex" : "none"}}>
        <span className={styles.loaderSpan}></span>
    </div>
    )
}