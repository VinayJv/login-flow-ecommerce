'use client';

import Pagination from "components/Pagination";
import styles from "~/app/index.module.css";

export default function Dashboard(){

    return(
    <div className={styles.categoriesContainer}>
        <h2 style={{ textAlign: "center" }}>Please mark your interests!</h2>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>We will keep you notified</p>
        <Pagination/>
    </div>)
}