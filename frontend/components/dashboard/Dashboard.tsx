/**
 * File Name: components/dashboard/Dashboard.tsx
 * 
 * 
 * About: 
 * This file contains code for the dashboard
 */
import CardsSection from "./cardsSection/Cards";
import styles from "./_dashboard.module.scss";
import {useDispatch} from 'react-redux';
import {setCurrentView} from '../../store/slice/appSlice'
import {useEffect} from 'react';
import Charts from '../chart';
import {getAllUserDetails} from '../../store/slice/incidentManagementSlice';

function Dashboard(){

    const dispatch:any = useDispatch();

    useEffect(()=>{
        dispatch(getAllUserDetails());
        dispatch(setCurrentView("Dashboard"));
    }, []);

    return (

        <div className={styles.wrapper}>
            <h1>Incident Analytics</h1>
            <h2>Active Data</h2>
            <CardsSection />
            <Charts />
        </div>


    )
}

export default Dashboard;