/**
 * File Name: components/IncidentManagement/Incident/Incident.tsx
 * 
 * 
 * About: 
 * This file contains the individual Incident component
 * This component does the following:
 * 
 * Display the information of the selected Incident
 * Allows user to edit the Incident details and submit an update request
 * 
 * This accesses state data from the redux store
 */

import { Breadcrumbs, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RootState, AppDispatch } from '../../../store'
import IncidentManagementStyles from '../_ticketManagement.module.scss';
import styles from './_ticket.module.scss'
import { fetchIncidentDataAsync, toggleUpdateIncidentDialogue, unselectIncident, updateIncidentDataAsync } from "../../../store/slice/incidentManagementSlice";
import RandomPic from './logo.png'
import Image from "next/image";
import { useEffect, useState } from "react";
import Tags from "../../reusable/Tags";
import SelectLabels from "../../reusable/SimpleSelect";
import TextEditor from "../../reusable/TextEditor";
import { IncidentData, resolutionTypes, statusOptions, priorities, emptyIncident } from "../../../service/models/Incident"
import AlertDialogSlide from "../../reusable/AlertDialogSlide";
import { setCurrentView } from '../../../store/slice/appSlice';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function Incident() {

    // TYPES Required:
    type user = {
        name: string, id: string
    }

    // SELECTORS
    const selectedIncident = useSelector((state: RootState) => {
        return state.IncidentManagement.selectedIncident
    });

    let IncidentData: any = useSelector((state: RootState): IncidentData => {
        return state.IncidentManagement.rows.filter((Incident: IncidentData) => Incident.id === selectedIncident)[0];
    });

    let alertDialogueOpen = useSelector((state: RootState) => {
        return state.IncidentManagement.updateIncidentAlertOpen;
    })

    let users: Array<user> = useSelector((state: RootState) => {
        return state.IncidentManagement.dropDownValues.agent;
    })

    // Local objects
    let tempData: any = emptyIncident;
    const dispatch = useDispatch<AppDispatch>();

    // State variables
    const [compIncidentData, setCompIncidentData] = useState(tempData);



    // let compIncidentData:any={};

    // LIFECYCLE HOOKS
    useEffect(() => {
        // console.log("Use effect called");
        // if( !IncidentData || (Object.keys(IncidentData).length == 0))
        dispatch(fetchIncidentDataAsync({ id: selectedIncident }));
    }, [selectedIncident])

    useEffect(() => {
        setCompIncidentData(IncidentData);
    }, [IncidentData])

    useEffect(() => {
        dispatch(setCurrentView("Incident Information"));
    }, [])




    // Functions

    /**
     * This function takes in a date string and returns either the
     * firstResponse date or the resolution date depending on the value of
     * the type field
     * @param date string
     * @param type string
     * @returns 
     */
    const getResolutionDate = (date: string, type: string) => {

        const numWeeks = 1;
        const now = new Date(date);

        if (type == resolutionTypes.firstResponse) {
            now.setDate(now.getDate() + 1);
        } else if (type == resolutionTypes.resolution) {
            now.setDate(now.getDate() + 7);
        }

        return `${now.toDateString()}, ${now.getHours()}:${now.getMinutes()} Hrs `;


    }


    /**
     * This function is used when a user updates a Incident
     * We get the new data to be stored and the key that has to be updated
     * and we use this single function to update the key of the data based on the key param
     * @param data string | Array<string>
     * @param key string
     */
    const updateIncidentKey = (data: string | Array<string>, key: string) => {
        // dispatch(setIncidentKey({ key: key, value: data, id: selectedIncident }));
        // console.log(compIncidentData);
        let temp: any = Object.assign({}, compIncidentData);
        temp[key] = data;
        setCompIncidentData(temp);
    }

    /**
     * This function is used to get the update toggle modal
     * when the user tries to update a Incident
     * @param okayToUpdateIncident boolean
     */
    const getAlertOutput = (okayToUpdateIncident: boolean) => {
        // console.log("Update ? ", okayToUpdateIncident);
        dispatch(toggleUpdateIncidentDialogue())
        if (okayToUpdateIncident) {
            const firstName = compIncidentData.agent.split(" ")[0];
            const lastName = compIncidentData.agent.split(" ")[1];
            const agentId = users.find(user => user.name === `${firstName} ${lastName}`)?.id;
            let tempData = Object.assign({}, compIncidentData);
            tempData.responder_id = agentId;
            // console.log(agentId);
            dispatch(updateIncidentDataAsync({ IncidentData: tempData }));
        }

    }




    return (

        <div className={styles.wrapper}>
            {/* HEADER WITH BREADCRUMBS FOR NAVIGATING BACK TO ALL IncidentS */}
            <div className={IncidentManagementStyles.IncidentHeader}>

                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="gray" href={""} onClick={() => dispatch(unselectIncident())} >
                        Incident
                    </Link>

                    <Typography color="text.primary">{selectedIncident}</Typography>
                </Breadcrumbs>


            </div>
            {/*  LAYOUT - Flex - Row */}
            <section className={styles.IncidentInfoLayout}>

                {IncidentData
                    ? (
                        <>
                            <section className={styles.mainPanel}>

                                {/* Incident STATUS HEADER */}
                                <header className={styles.header}>
                                    <span className={styles.chip_red}>{IncidentData.status}</span>
                                </header>

                                {/* Incident Details header */}
                                <div className={styles.IncidentDetailsHeader}>

                                    {/*<svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 32 32" ><path d="M2.56 5.333h26.347c1.119 0 2.027.912 2.027 2.036v18.327a2.03 2.03 0 01-2.027 2.036H2.56a2.032 2.032 0 01-2.027-2.036V7.369A2.03 2.03 0 012.56 5.333zm.405 2.444V25.29h25.536V7.777H2.965zm4.323 3.667l8.445 5.657 8.445-5.657c.559-.374 1.314-.223 1.686.339s.222 1.32-.337 1.694l-9.12 6.109a1.21 1.21 0 01-1.349 0l-9.12-6.109c-.559-.374-.71-1.133-.337-1.694s1.128-.713 1.686-.339z"></path></svg>*/}
                                    <AssignmentTurnedInIcon/>
                                    <div className={styles.IncidentSubjectInfo}>
                                        <span className={styles.IncidentSubjectHeading}>{IncidentData.subject}</span>

                                        <div className={styles.IncidentCreatedInfo}>
                                            <span>Created by&nbsp;</span>
                                            <b>{IncidentData.customer}&nbsp;</b>
                                            <span>and Assigned to&nbsp;</span>
                                            <b>{IncidentData.agent}&nbsp;</b>

                                        </div>
                                    </div>

                                </div>
                                {/* Incident DETAILS WRAPPER */}
                                <div className={styles.IncidentDetailsWrapper}>
                                    <div className={styles.IncidentDetailsItemHeader}>
                                        <div className={styles.IncidentDetailsAvatar}>
                                            <Image src={RandomPic} width={30} alt={`User's profile picture`} />
                                        </div>
                                        <div className={styles.IncidentDetailsEmail}>
                                            <div className={styles.senderInfo}>{IncidentData.requester_id}</div>
                                            
                                            <div className={styles.createdTime}>Last updated at {IncidentData.updatedAt}</div>
                                        </div>
                                    </div>
                                    <div className={styles.IncidentDetailsItemContent}>
                                        <DescriptionIcon/>
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="15" viewBox="0 0 32 32">
                                            <path d="M2.56 5.333h26.347c1.119 0 2.027.912 2.027 2.036v18.327a2.03 2.03 0 01-2.027 2.036H2.56a2.032 2.032 0 01-2.027-2.036V7.369A2.03 2.03 0 012.56 5.333zm.405 2.444V25.29h25.536V7.777H2.965zm4.323 3.667l8.445 5.657 8.445-5.657c.559-.374 1.314-.223 1.686.339s.222 1.32-.337 1.694l-9.12 6.109a1.21 1.21 0 01-1.349 0l-9.12-6.109c-.559-.374-.71-1.133-.337-1.694s1.128-.713 1.686-.339z"></path>
                                        </svg> */}
                                        <TextEditor text={IncidentData.description} reportUpdate={(d: string) => updateIncidentKey(d, 'description')} />
                                    </div>
                                </div>
                                 {/* STATUS AND RESOLUTION TIME */}
                                 <div className={styles.statusCardWrapper}>
                                    <div className={styles.statusTitle}>
                                        <span>{IncidentData.status}</span>
                                    </div>
                                    <div className={styles.resolutionWrapper} >
                                        <div className={styles.resolutionTitle}><span>FIRST RESPONSE DUE</span></div>
                                        <div className={styles.resolutionDate}>
                                            by {getResolutionDate(IncidentData.createdAt, resolutionTypes.firstResponse)}
                                        </div>
                                    </div>
                                    <div className={styles.resolutionWrapper} >
                                        <div className={styles.resolutionTitle}><span>RESOLUTION DUE</span></div>
                                        <div className={styles.resolutionDate}>
                                            by {getResolutionDate(IncidentData.createdAt, resolutionTypes.resolution)}
                                        </div>
                                    </div>
                                </div>

                            </section>

                            {/* INFORMATION UPDATE RIGHT SIDE PANEL HERE */}
                            <section className={styles.informationUpdatePanel}>

                               

                                {/* OPTIONS */}
                                <div className={styles.stickyHeader}>
                                    <div className={styles.attributes}>ATTRIBUTES</div>
                                </div>

                                {/* OPTION CONTAINERS */}
                                {/* TAGS */}
                                {/* <div className={styles.tags}>
                                    <span className={styles.optionsTitle}>Tags ({IncidentData.tags.length})</span>
                                    <div className={styles.tagsContainer} title={IncidentData.tags.join(", ")}>
                                        <Tags tags={IncidentData.tags} />
                                    </div>
                                </div> */}

                                {/* STATUS */}
                                <div className={styles.tags}>
                                    <span className={styles.optionsTitle}>Status</span>
                                    <SelectLabels selectChanged={(d: string) => updateIncidentKey(d, 'status')} selected={IncidentData.status} options={statusOptions} />
                                </div>

                                {/* PRIOROTY */}
                                <div className={styles.tags}>
                                    <span className={styles.optionsTitle}>Priority</span>
                                    <SelectLabels selectChanged={(d: string) => updateIncidentKey(d, 'priority')} selected={IncidentData.priority} options={priorities} />
                                </div>

                                {/* AGENT */}
                                <div className={styles.tags}>
                                    <span className={styles.optionsTitle}>Agent</span>
                                    <SelectLabels selectChanged={(d: string) => updateIncidentKey(d, 'agent')} selected={IncidentData.agent} options={users.map((user: user) => user.name)} />
                                </div>

                                {/* UPDATE BUTTON */}
                                <div className={styles.updateButtonContainer}>
                                    <Button onClick={() => dispatch(toggleUpdateIncidentDialogue())} className={styles.updateButton}>Update</Button>
                                </div>

                            </section>

                            {/* THIS DIALOG SLIDES IN FORM BOTTOM WHENEVER A USER CLICKS THE UPDATE BUTTON */}
                            <AlertDialogSlide description={""} title={`Are you sure you want to update task ${IncidentData.subject}?`} open={alertDialogueOpen} getAlertOutput={getAlertOutput} />
                        </>
                    )
                    : null


                }


            </section>

        </div>

    )

}

export default Incident;