import { LOGIN_USER, ADD_USER_DETAILS } from "../actions/useractions";
import { ADD_INCIDENT_DETAILS } from "../actions/incidentactions";
// Redux store 
//The initial state includes userDetails and ticketDetails objects, which store user and ticket information 
const initialState = {
  userDetails: {
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
    securityQuestion: "",
    securityAnswer: ""
  },
  ticketDetails: {
    title: "",
    description: "",
    status: "",
    priority: "",
    type: "",
  },
  incidents: [],
  isLoggedIn: false,
  resetPasswordSuccess: false,
  resetPasswordError: null
};
// reducer function that updates the state based on actions

//The reducer returns a new state object for each action type, using the spread operator to copy over the previous state 
//and only update the necessary properties. 
//If the action type is not recognized, it returns the previous state unchanged.
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          firstname: action.payload?.firstname || "",
          lastname: action.payload?.lastname || "",
          phoneNumber: action.payload?.phoneNumber || "",
          email: action.payload?.email || "",
          password: action.payload?.password || "",
          role: action.payload?.role || ""
        }
      };
    case LOGIN_USER:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          email: action.payload?.email || "",
          password: action.payload?.password || ""
        },
        isLoggedIn: true
      };
    case 'FORGOT_PASSWORD_REQUEST':
      return {
        ...state,
        resetPasswordSuccess: false,
        resetPasswordError: null
      };
    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        ...state,
        resetPasswordSuccess: true,
        resetPasswordError: null
      };
    case 'FORGOT_PASSWORD_FAILURE':
      return {
        ...state,
        resetPasswordSuccess: false,
        resetPasswordError: action.payload
      };
    case ADD_INCIDENT_DETAILS: // case to add incidents
      return {
        ...state,
        ticketDetails: {
          ...state.ticketDetails,
          title: action.payload?.title || "",
          description: action.payload?.description || "",
          status: action.payload?.status || "",
          priority: action.payload?.priority || "",
          type: action.payload?.type || ""
        }
      };
    // case GET_ALL_INCIDENTS: // to get incidents
    // console.log(state)
    //   return {
    //     ...state,
    //     incidents: action.payload.incidents
    //   };
      
    // case FETCH_INCIDENTS_FAILURE:
    //   return state;
    default:
      return state;
  }
};

export default Reducer;
