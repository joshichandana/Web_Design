export const ADD_INCIDENT_DETAILS = "ADD_INCIDENT_DETAILS";
export const FETCH_INCIDENTS_SUCCESS = "FETCH_INCIDENTS_SUCCESS";
export const FETCH_INCIDENTS_FAILURE = "FETCH_INCIDENTS_FAILURE";


//handling server responses
export const fetchIncidentsSuccess = (incidents) => {
  return {
    type: FETCH_INCIDENTS_SUCCESS,
    payload: incidents.data
  };
};

// Action creator for failed incident retrieval
export const fetchIncidentsFailure = (error) => {
  return {
    type: FETCH_INCIDENTS_FAILURE,
    payload: error
  };
};

export const addIncidentDetails = (title, description, status, priority, type) => {
  return async (dispatch) => {
      dispatch({ type: ADD_INCIDENT_DETAILS });

      const incidentdata = {
          title: title,
          description: description,
          status,
          priority,
          type
      };
      console.log(JSON.stringify(incidentdata));

      try {
          const response = await fetch("http://localhost:8080/incidents", {
              method: 'POST',
              mode : 'cors',
              credentials: 'same-origin',
              cache: 'no-cache',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(incidentdata)
          });
          console.log(incidentdata)
          if (!response.ok) {
              throw new Error('Error while creating incident');
          }

          const incidentJson = await response.json();

          if (incidentJson.error) {
              alert(incidentJson.error);
          } else {
              dispatch({ type: ADD_INCIDENT_DETAILS, payload: incidentJson });
              window.location.href = '/dashboard';
              
          }
      } catch (error) {
          console.error(error);
      }
  };
};


//when you dispatch an action with type GET_ALL_INCIDENTS, the incidents property in your state
// will be updated with the payload data of the action. 

// export const GET_ALL_INCIDENTS = "GET_ALL_INCIDENTS";

// export const getAllIncidents = () => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch("http://localhost:8080/incidents", {
//         method: 'GET',
//         mode : 'cors',
//         credentials: 'same-origin',
//         cache: 'no-cache',
//         headers: {
//           'Content-Type': 'application/json'
//         }
        
//       });
//       if (!response.ok) {
//         throw new Error('Error while fetching incidents');
//       }

//       const incidents = await response.json();
//       console.log(incidents.data)
//       dispatch({
//         type: GET_ALL_INCIDENTS,
//         payload: incidents
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
