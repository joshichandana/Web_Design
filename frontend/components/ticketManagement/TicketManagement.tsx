import * as React from 'react';
import { useEffect } from 'react';
import styles from "./_ticketManagement.module.scss";
import TicketMenu from './TicketMenu/TicketMenu';
import Button from '@mui/material/Button';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { openFilterDrawer, commonSortFilters, unselectTicket, fetchRows } from '../../store/slice/ticketManagementSlice';
import FilterScreen from './FilterScreen/FilterScreen';
import * as state from '../../service/ticket-management/ticket-management-service';
import { Autocomplete, IconButton, TextField } from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import { setCurrentView } from '../../store/slice/appSlice';

import Ticket from './Ticket/Ticket';

// const useStyles = makeStyles(() => (state.Autocomplete));

function TicketManagement() {

    /**
     * This is entry point for Ticket Management 
     * Ticket Management will have : 
     * - Sort Functionality 
     * - Filter Functionality
     * - Update/Delete Ticket 
     */

    const dispatch : any = useDispatch()

    useEffect(() => {
        dispatch(unselectTicket())
        dispatch(fetchRows());
        dispatch(setCurrentView("Ticket Management"));
    }, []);

    const [filterDrawerState, sortFilters, ticketSelected , filterState] = useSelector((state: any) => [
        state.ticketManagement.filterDrawerOpen,
        { ...state.ticketManagement.sortFilters },
        state.ticketManagement.ticketSelected ,
         state.ticketManagement.filterState
    ]);

    let sortOrder: any = ['Asc', 'Desc'];

    let [ sort , setSort] = React.useState(sortFilters);

    // const classes = useStyles();


    // this will open Filter Drawer
    const handleDrawerOpen = () => {
        dispatch(openFilterDrawer({ filterDrawerOpen: filterDrawerState }));
    }

     // this will close Filter Drawer

    const CloseFilterDrawer = () => {
        dispatch(openFilterDrawer({ filterDrawerOpen: true }));
    }


    //Sort Functionalities
    const handleSortTable = (value: any) => {
       
        sort.type = value;
        setSort(sort)
        dispatch(commonSortFilters({sortFilters : sort}));
    }

    const handleSortOrder = (newValue: any) => {
       
        sort = {
            type : sort.type,
            order : newValue
        }
        setSort(sort);
        dispatch(commonSortFilters({sortFilters : sort}));
    }

    return (

        <>
            {(!ticketSelected)
                ?
                (
                    /* Components Needed
        - Nav Options -
        -  List of Tickets - card View Table View
        - Mock Data for Tickets
        - Possible Filters
         */
                    <div className={styles.TicketMangement}>

                        <div className={styles.TicketHeader}>
                           
                                

                            <div className='FilterScreen'>
                                <div className={filterState ?styles.RedIcon : ""}></div>
                                <Button
                                    variant="contained"
                                    onClick={handleDrawerOpen}
                                    sx={{
                                        color: 'white',
                                        // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                           background: 'teal',
                                        ':hover': {
                                            // bgcolor: '#ECEFF3', // theme.palette.primary.main
                                            color: 'white',
                                        },

                                    }}
                                >
                                    <MovieFilterIcon sx={{
                                        color: 'white',
                                        ':hover': {
                                            color: '#12344D',
                                        },
                                    }} />
                                    Filter</Button>

                            </div>   
                        </div>
                        

                        <div>

                            {/* Component to Show Tickets either in Card / Ticket View  */}
                            <TicketMenu></TicketMenu>
                        </div>
                        <div>
                            <Drawer
                                PaperProps={{
                                    sx: {
                                        width: '28%',
                                        top: '17%',
                                        backgroundColor: '#ebeff3',
                                        color: 'black',
                                        boxShadow: 'rgb(0 0 0 / 25%) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 12%) 0px 4px 6px, rgb(0 0 0 / 17%) 0px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px'
                                    }
                                }}
                                variant="persistent"
                                anchor="right"
                                open={filterDrawerState}
                                onClose={handleDrawerOpen}
                            >
                                <div>
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            color: 'white',
                                            top: '15px',
                                            right: '13px',
                                            zIndex: 100
                                        }}
                                        onClick={CloseFilterDrawer}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </div>
                                <FilterScreen></FilterScreen>
                            </Drawer>
                        </div>
                        

                    </div>
                )
                :
                (<Ticket />)
            }
        </>

    )
}

export default TicketManagement;