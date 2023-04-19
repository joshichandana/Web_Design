
'use client';

// import { Table } from '@mui/material';
import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {useState } from 'react';
import {  selectIncident, deleteIncidentFromMenu } from '../../../store/slice/incidentManagementSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';

import EditNoteIcon from '@mui/icons-material/EditNote';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';



export default function IncidentMenu() {

    /**
     * Incident Menu will manage Table to show all Incident Data and able to edit/update Incident Data
     */    
    const stateRows: any = {}
    const [openDialog, setDialog] = useState({ state: false, stateRows });
    const dispatch: any = useDispatch();
    // const classes = useStyles();
    const [pageSize, setPageSize] = useState<number>(10);

    let columns: GridColDef[] = [
        { field: 'customer', headerName: 'Assigner', sortable: false ,flex: 0.25 },
        { field: 'subject', headerName: 'Subject', flex: 0.5 , sortable: false , align:'center' , headerAlign:'center' },
        { field: 'agent', headerName: 'Assignee', sortable: false ,flex: 0.25,  align: 'center' , headerAlign:'center' },
        { field: 'state', headerName: 'State', sortable: false , align:'center', headerAlign:'center'},
        // { field: 'group', headerName: 'Group', sortable: false , align:'center', headerAlign:'center'},
        { field: 'priority', headerName: 'Priority', sortable: false , align:'center' , headerAlign:'center'},
        { field: 'status', headerName: 'Status', sortable: false , align:'center', headerAlign:'center'},
        {
            field: 'modify', headerName: 'Edit/Delete', sortable: false,
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                    <IconButton
                        sx={{
                            color: 'teal',
                            zIndex: 100,
                            // margin : '5px'
                        }}
                        onClick={() => rowClicked(params)}
                    >
                        <EditNoteIcon />

                    </IconButton>
                    <IconButton
                        sx={{
                            color: 'teal',
                            zIndex: 100
                        }}
                        onClick={() => setDialog({ state: true, stateRows: params })}
                    >
                        < RemoveCircleOutlineIcon/>
                    </IconButton>
                </>

            ),
        },
    ];

    let [rows, filterStateChange] = useSelector((state: any) => [
        state.IncidentManagement.rows,
        state.IncidentManagement.filterState
    ], shallowEqual);

    // edit Incident
    const rowClicked = (gridParams: any) => {
        dispatch(selectIncident(gridParams.row.id));
    }

    //delete Incident
    const deleteIncident = (gridParams: any) => {
        dispatch(deleteIncidentFromMenu({ id: gridParams.row.id }));
        setDialog({ state: false, stateRows: {} });
    }
    return (

        <>

            <div className="TableListMainSection">

                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid

                            disableColumnFilter
                            rows={rows}
                            columns={columns}
                            autoHeight
                            // rowsPerPageOptions={[5, 10, 20]}
                            // pageSize={pageSize}
                            // onPageSizeChange={(newPageSize : any) => setPageSize(newPageSize)}
                            pagination
                            sx={{
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "teal",
                                    color: "white",
                                    fontSize: 16,
                                    borderRight: 'none'
                                },
                                "& .MuiDataGrid-iconSeparator": {
                                    color: 'white'
                                },
                                "& .MuiDataGrid-menuIcon": {
                                    '& .MuiSvgIcon-root': {
                                        color: 'white'
                                    }
                                },
                                '.MuiDataGrid-columnSeparator': {
                                    display: 'none',
                                },

                            }}
                        />
                    </div>
                </div>

            </div>
            {/* Alert To Delete data from table */}
            <Dialog
                open={openDialog.state}
                onClose={() => setDialog({ state: false, stateRows: {} })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                // className={classes.root}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Incident#"}{openDialog.stateRows.id}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to permanently delete this incident ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialog({ state: false, stateRows: {} })}>Cancel</Button>
                    <Button onClick={() => deleteIncident(openDialog.stateRows)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>


        </>

    )
}