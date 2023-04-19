

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIncidentData, putIncidentData, postIncidentData } from "../../service/data-service/incidentDataService"
import {
    getAllIncidents, getRowFiltering,
    fillDropdownValues, selectedFilters, dropDownValues, getCommonSort,
    deleteIncidentbyId, getAllUserforIncident, dropDownStructure
} from '../../service/incident-management/incident-management-service';

const IncidentStatusTypes = {
    open: 'Open',
    inprogress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed'
};

//Thunk operations 

export const fetchIncidentDataAsync = createAsyncThunk(
    'Incidents/fetchIncident',
    /**
     * 
     * @param  arg {id:string}
     * @returns 
     */
    async ({ id }) => {

        const response = await getIncidentData(id)
        return response;


    }
)

export const updateIncidentDataAsync = createAsyncThunk(
    'Incidents/updateIncident',
    /**
     * 
     * @param  arg {IncidentData:IncidentData}
     * @returns 
     */
    async ({ IncidentData }, { dispatch }) => {

        const response = await putIncidentData(IncidentData);
        dispatch(fetchRows());
        return response;
    }
)

export const postIncidentDataAsync = createAsyncThunk(
    'Incidents/postIncident',
    /**
     * 
     * @param  arg {IncidentData:IncidentData}
     * @returns 
     */
    async ({ IncidentData }) => {

        const response = await postIncidentData(IncidentData)
        return response;
    }
)

export const fetchRows = createAsyncThunk(
    'IncidentManagement/fetchRows',
    async (args, { dispatch }) => {
        const response = await getAllIncidents();
        return response.data;
    }
)

export const deleteIncidentFromMenu = createAsyncThunk(
    'IncidentManagement/deleteRow',
    /**
    * 
    * @param  arg {IncidentData:IncidentData}
    * @returns 
    */
    async ({ id }, { dispatch }) => {
        await deleteIncidentbyId(id);
        return dispatch(fetchRows());
    }
)

export const getAllUserDetails = createAsyncThunk(
    'IncidentManagement/getAllUser',
    async () => {
        const response = await getAllUserforIncident();
        return response.data;
    }
)

//Intial state for Incident Management 
const initialState = {
    selectedIncident: "",
    filterDrawerOpen: false,
    IncidentSelected: false,
    IncidentsData: {},
    selectedFilters,
    dropDownValues,
    fetchedRows: [],
    filteredRows: [],
    rows: [],
    status: null,
    error: null,
    filterState: false,
    sortFilters: {
        type: 'No Sort',
        order: 'Asc'
    },
    IncidentData: {
        id: "",
        subject: "",
        description: "",
        status: "",
        priority: "",
        requester_id: "",
        tags: [""],
        createdAt: "",
        updatedAt: "",
        userData: {
            firstname: "",
            lastname: "",
            phoneNumber: "",
            email: "",
            role: ""
        }
    },
    updateIncidentAlertOpen: false,
    users: []


};

/**
 * 
 * @param {string} createdAtDate 
 * @param {string} priority 
 */
function isDue(createdAtDate, priority) {
    // based on the urgency of the task, we identify a task a due or overdue

    // Time allowed in days for resolving an issue
    const timeAllowed = {
        'Low': 14,
        'Medium': 7,
        'High': 2,
        "Urgent": 1
    };

    // now let's find the due date
    let dueDate = new Date(createdAtDate);
    dueDate.setDate(dueDate.getDate() + timeAllowed[priority]);

    // let's see if today is past the due date or not
    // See if 
    let isPassed = new Date() - dueDate;

    return [isPassed < 0 ? "Due" : "Overdue", dueDate];
}

/**
 * This function takes in a Incident object and sends 
 * out an array of types that this card belongs to
 * amongst the varoious available card types
 * @param {IncidentData} x 
 */
function assignIncidentTypes(x, overDue, dueDateObject, agent) {
    /**
     *  unresolved: "unresolved", // done
        overdue: "overdue", // done
        dueToday: "dueToday" , // done
        open: "open", // done
        onHold: "onHold", // <!--removed from types-->
        unassigned: "unassigned" // done
     */

    /**
     * Incident types are open,  In progress, Resolved, Closed
     */

    let out = [];

    // check if Incident is un resolved
    if (x.status !== IncidentStatusTypes.resolved) {
        out.push("unresolved");
    }

    if (x.status == IncidentStatusTypes.open) {
        out.push("open");
    }

    // check if Incident is overdue
    if (overDue === "Overdue") {
        out.push("overdue");
    }

    // check if it is due today
    // what is the end of date today ?
    let endOfToday = new Date();

    endOfToday.setHours(23);
    endOfToday.setMinutes(59);
    endOfToday.setSeconds(59);

    // if the due date is before endOfToday and after start of today 
    // the due date is today

    let startOfToday = new Date();
    startOfToday.setHours(0);
    startOfToday.setMinutes(0);
    startOfToday.setSeconds(0);



    if (startOfToday <= dueDateObject && dueDateObject <= endOfToday) {
        out.push("dueToday");
    }

    // check if Incident is unassigned
    if (agent === "Unassigned") {
        out.push("unassigned");
    }

    return out;

}

export const IncidentManagementSlice = createSlice({
    name: 'IncidentManagement',
    initialState,
    reducers: {
        // To open Filter Drawer 
        openFilterDrawer: (state, action) => {
            state.filterDrawerOpen = !action.payload.filterDrawerOpen;
        },

        selectIncident: (state, action) => {
            state.selectedIncident = action.payload;
            if (!state.IncidentSelected) {
                state.IncidentSelected = true;
            }

        },

        unselectIncident: (state) => {
            state.IncidentSelected = false;
        },

        setIncidentKey: (state, action) => {

            const { key, value, id } = action.payload;
            let Incident = state.IncidentsData[id];

            Incident[key] = value;

            state.IncidentsData[id] = Incident;

        },

        clearIncidentData: (state) => {
            state.IncidentData = {
                id: "",
                subject: "",
                description: "",
                status: "",
                priority: "",
                requester_id: "",
                tags: [""],
                createdAt: "",
                updatedAt: "",
                userData: {
                    firstname: "",
                    lastname: "",
                    phoneNumber: "",
                    email: "",
                    role: ""
                }
            }
        },

        toggleUpdateIncidentDialogue: (state) => {
            state.updateIncidentAlertOpen = !state.updateIncidentAlertOpen;
        },

        // After Apply Filters , Save Filters will be executed to filter Row Values 
        saveSelectedFilter: (state, action) => {
            state.filterState = action.payload.filterState;
            state.selectedFilters = action.payload.filters;
            state.filteredRows = getRowFiltering(state.fetchedRows, action.payload.filters);
            state.rows = state.filterState ? [...state.filteredRows] : [...state.fetchedRows];


        },

        // To set default dropdown values for state, status and Priority
        defaultFilterDropdown: (state, action) => {
            state.dropDownValues = fillDropdownValues(state.fetchedRows, { ...state.dropDownValues });
        },

        //top filters sorting logic with type and order of filter 

        commonSortFilters: (state, action) => {
            /* sort rows based on common filter selection
             and order selected eg : Sort By Date and Ascending Order */
            state.sortFilters = { ...action.payload.sortFilters };
            state.rows = state.filterState ?
                getCommonSort(state.filteredRows, action.payload.sortFilters) :
                getCommonSort([...state.fetchedRows], action.payload.sortFilters)
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchIncidentDataAsync.fulfilled, (state, action) => {
                state.IncidentsData[action.payload.id] = action.payload;
            }) // to fetch Incident data for editing A Incident
            
            .addCase(updateIncidentDataAsync.fulfilled, (state, action) => {
                let _index = state.fetchedRows.findIndex(x => x.id === action.payload.id);
                const { firstname, lastname } = state.users.find(x => x.id === action.payload.requester_id);
                action.payload.agent = `${firstname} ${lastname}`;
                state.fetchedRows[_index] = action.payload;
                state.IncidentsData[action.payload.id] = action.payload
                state.rows = state.filterState ? [...state.filteredRows] : [...state.fetchedRows];
                window.alert("Succesfully updated Incident details");
            }) // to update Incident data after edit
            .addCase(fetchRows.fulfilled, (state, action) => {
                // Add user to the state array
                let finalFormat = [];
                state.status = 'complete';

                // set row values 
                action.payload.forEach((x, i) => {
                    let row = {};
                    // using destructuring to extract the keys from object x
                    const { createdAt, priority, id, requester_id, subject, status, responder_id } = x;
                    const name = state.users.find(x => x.id === requester_id);
                    const responderName = state.users.find(y => y.id === responder_id);
                    // identifying the due date information
                    let dueInfo = isDue(createdAt, priority);
                    row['id'] = id;
                    row['customer'] = `${name?.firstname} ${name?.lastname}` || 'No Contact';
                    row['subject'] = subject;
                    row['agent'] = `${responderName?.firstname} ${responderName?.lastname}` || 'Unassigned' // create logic for assignee .. get from requester id
                    row['state'] = dueInfo[0];
                    row['dueDate'] = dueInfo[1];
                    row['status'] = status;
                    row['priority'] = priority;
                    // row['group'] = 'group 1 ';
                    row['IncidentTypes'] = assignIncidentTypes(x, dueInfo[0], dueInfo[1], row['agent']);
                    finalFormat.push({ ...row, ...x });

                });

                /* set Dropdown Filters - FetchedRows will have all rows , 
                rows will have  data that need to shown on table
                based on filter and Sort values */

                state.fetchedRows = finalFormat;
                state.filteredRows = getRowFiltering(finalFormat, { ...state.selectedFilters });

                // check if filter State is true or will return all row values 
                state.rows = state.filterState ? [...state.filteredRows] : [...state.fetchedRows];
            }) //fetch all Incident from fetch thunk
            .addCase(getAllUserDetails.fulfilled, (state, action) => {
                /**
                 * Get All users loggend in to filter agents , customer and 
                 * set users state to build dropdown values
                 */

                state.users = action.payload;
                //default Valuess
                state.dropDownValues = fillDropdownValues(state.fetchedRows, { ...state.dropDownValues });

                //custom values fetched from Api
                state.dropDownValues.agent = action.payload.filter(user => user.role === 'Agent').map(x => ({ name: `${x.firstname} ${x.lastname}`, id: x.id }));
                state.dropDownValues.customer = action.payload.filter(user => user.role === 'Customer').map(x => ({ name: `${x.firstname} ${x.lastname}`, id: x.id }));
            }); //fetch all user details 
    }
});



export const {
    openFilterDrawer,
    saveSelectedFilter,
    getAllRowsTothetable,
    defaultFilterDropdown,
    commonSortFilters,
    selectIncident, setIncidentKey, unselectIncident, toggleUpdateIncidentDialogue

} = IncidentManagementSlice.actions;

export default IncidentManagementSlice.reducer;
