/* eslint-disable */
'use client';

import React, { ReactNode, useLayoutEffect, useState } from "react";
import { Categories } from "utils/types";
import styles from "~/app/index.module.css";
import { useUserContext } from "context/UserContext";
import { useRouter } from "next/navigation";



export default function Pagination(){
    const { user, setUser, userStatus } = useUserContext();

    const router = useRouter();

    const [categories, setCategories] = useState<Categories[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(1);

    const pages: number[] = [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

    for(let i = 1; i <= Math.ceil(categories.length/itemsPerPage);i++){
        pages.push(i);
    }

    const handleClick = (e: React.BaseSyntheticEvent) => {
        setCurrentPage(e.target.value)
    }

    const renderPageNumbers = () => pages.map((number)=>{
        if(number < maxPageNumberLimit + 1 && number >= minPageNumberLimit){
            return(<li key={number} value={number} onClick={handleClick} className={currentPage === number ? styles.active : ""}>{number}</li>)
        } else {
            return null
        }
    });

    const isAlreadyPresent = (category: string) => {
        if(user?.category.includes(category)){
            return true
        } else {
            return false
        }
    }

    async function handleCheckBoxInput(e: React.BaseSyntheticEvent){
        const clickedCategory = e.target.value;
        if(e.target.checked){
            if(user?.category !== undefined){
                const updatedCategory = [...user.category, clickedCategory];
                const { updatedUser, status } = await fetch(`/api/user/${user?.id}`,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({updatedCategory: updatedCategory}),
                }).then((data)=>data.json());
                if(status === 200){
                    if(setUser !== undefined){
                        setUser(updatedUser);
                    }
                } 
            }
        } else {
            const updatedCategory = user?.category.filter((categoryName)=>categoryName !== clickedCategory);
            const { updatedUser, status } = await fetch(`/api/user/${user?.id}`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({updatedCategory: updatedCategory}),
            }).then((data)=>data.json());
            if(status === 200){
                if(setUser !== undefined){
                    setUser(updatedUser);
                }
            } 
        }
    }

    const renderCategories = () => {
        return(
            <ul>
                {currentItems.map((category, index)=><li key={index} className={styles.inputLabelContainer}>
                    {isAlreadyPresent(category.name) ? <input defaultChecked type="checkbox" key={category.id} value={category.name} onChange={handleCheckBoxInput} className={styles.checkboxInput}></input> : <input type="checkbox" key={category.id} value={category.name} onChange={handleCheckBoxInput} className={styles.checkboxInput}></input>}{category.name}
                </li>)}
            </ul>
        )
    }

    const getAllCategories = async () => {
        const { allCategories } = await fetch("/api",{
            method: "GET"
        }).then((data) => data.json());
        setCategories(allCategories);
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        if(currentPage + 1 > maxPageNumberLimit){
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
        if((currentPage - 1) % pageNumberLimit == 0){
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    let pageIncrementBtn = null;

    if(pages.length > maxPageNumberLimit){
        pageIncrementBtn = <li onClick={currentPage == pages[pages.length - 1] ? undefined : handleNext}>{`...`}</li>
    }

    let pageDecrementBtn = null;

    if(minPageNumberLimit > 1){
        pageDecrementBtn = <li onClick={currentPage == pages[0] ? undefined : handlePrev}>{`...`}</li>
    }

    useLayoutEffect(() => {
        if (!userStatus && !user?.verified) {
            router.push("/");
        }
        getAllCategories();
    }, []);

    return(
    <>
        <h4 style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>My Saved Interests!</h4>
        <div className={styles.innerCategoriesContainer}>
            {renderCategories()}
        </div>
        <ul className={styles.pageNumbersContainer}>
            <li onClick={currentPage == pages[0] ? undefined : handlePrev}>Prev</li>
            <div className={styles.numberContainer}>
                {pageDecrementBtn}
                {renderPageNumbers()}
                {pageIncrementBtn}
            </div>
            <li onClick={currentPage == pages[pages.length - 1] ? undefined : handleNext}>Next</li>
        </ul>
    </>
    )
}