import {
    DISPLAY_ALERT, CLEAR_ALERT,
    SETUP_USER_SUCCESS, SETUP_USER_ERROR, SETUP_USER_BEGIN, TOGGLE_SIDEBAR, LOGOUT_USER,
    UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS, HANDLE_CHANGE, CLEAR_VALUES,
    CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, CREATE_JOB_BEGIN,
    GET_JOB_SUCCESS, GET_JOB_ERROR, GET_JOB_BEGIN, SET_EDIT_JOB, DELETE_JOB_BEGIN, DELETE_JOB_ERROR,
    EDIT_JOB_BEGIN, EDIT_JOB_ERROR, EDIT_JOB_SUCCESS
} from "./actions";
import { initialState } from "./appContext"

const reducers = (state, action) =>{
    if(action.type === DISPLAY_ALERT){
        return { ...state, showAlert: true, alertType: 'danger', alertText: "please provide all values!"}
    }
    if(action.type === CLEAR_ALERT){
        return {
            ...state, showAlert: false, alertType: '', alertText: ''
        }
    }
    if( action.type === SETUP_USER_BEGIN){
        return { ...state, isLoading: true}
    }
    if(action.type === SETUP_USER_SUCCESS){
        const { user, token , location, alertText} = action.payload
        return { ...state, isLoading: false, token, user, userLocation: location, jobLocation: location,
            showAlert: true, alertType: 'success', alertText: alertText}
    }
    if(action.type === SETUP_USER_ERROR){
        return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload}
    }
    if(action.type === TOGGLE_SIDEBAR){
        return  {...state, showSidebar: !state.showSidebar}
    }
    if(action.type === LOGOUT_USER) {
        return { ...initialState, user: null, userLocation: "", token: null, jobLocation: ""}
    }

    if( action.type === UPDATE_USER_BEGIN){
        return { ...state, isLoading: true}
    }
    if(action.type === UPDATE_USER_SUCCESS){
        const { user, token , location} = action.payload
        return { ...state, isLoading: false,
            token, user, userLocation: location, jobLocation: location,
            showAlert: true, alertType: 'success', alertText: "User Profile Upadtes"}
    }
    if(action.type === UPDATE_USER_ERROR){
        return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload}
    }

    if(action.type === HANDLE_CHANGE){
        return { ...state, [action.payload.name] : action.payload.value }
    }
    if(action.type === CLEAR_VALUES){
        return { ...state, isEditing: false,
            editJobId: "",
            position: "",
            company: "",
            jobType: "full-time",
            status: "pending", jobLocation: state.userLocation}
    }

    if(action.type === CREATE_JOB_BEGIN){
        return { ...state, isLoading: true }
    }

    if(action.type === CREATE_JOB_SUCCESS){
        return { ...state, isLoading: false,
            showAlert: true, alertType: 'success', alertText: "New Job Created"}
    }

    if(action.type === CREATE_JOB_ERROR){
        return { ...state, isLoading: false,
            showAlert: true, alertType: 'danger', alertText: action.payload}
    }

    if(action.type === GET_JOB_BEGIN){
        return { ...state, isLoading: true }
    }
    if(action.type === GET_JOB_SUCCESS){
        const { jobs, totalJobs, numOfPages } = action.payload;
        return { ...state, isLoading: false , jobs, totalJobs, page: numOfPages}
    }
    if(action.type === GET_JOB_ERROR){
        return { ...state, isLoading: false,
            showAlert: true, alertType: 'danger', alertText: action.payload}
    }

    if(action.type === SET_EDIT_JOB){
        const job = state.jobs.find((job) => job._id.toString() === action.payload)
        const { _id, position, company, jobLocation, jobType, status }= job;
        return { ...state, isEditing: true, editJobId: _id, position, company, jobLocation, jobType, status }
    }
    if(action.type === DELETE_JOB_BEGIN){
        return { ...state, isLoading: true }
    }
    if(action.type === DELETE_JOB_ERROR){
        return { ...state, isLoading: false, alertType: 'danger', alertText: action.payload }
    }
    if(action.type === EDIT_JOB_BEGIN){
        return { ...state, isLoading: true }
    }
    if(action.type === EDIT_JOB_ERROR){
        return { ...state, isLoading: false, alertType: 'danger', alertText: action.payload }
    }
    if(action.type === EDIT_JOB_SUCCESS){
        return { ...state, isLoading: false, showAlert: true, alertType: 'success', alertText: "Update SuccessFully"}
    }
    throw new Error(`no such action: ${action.type}`)
}

export default reducers