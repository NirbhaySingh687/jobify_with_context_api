import React, {useContext, useReducer} from "react"
import reducers from "./reducers";
import {
    DISPLAY_ALERT, CLEAR_ALERT,
    SETUP_USER_SUCCESS, SETUP_USER_ERROR, SETUP_USER_BEGIN, TOGGLE_SIDEBAR, LOGOUT_USER,
    UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS, HANDLE_CHANGE, CLEAR_VALUES,
    CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, CREATE_JOB_BEGIN,
    GET_JOB_SUCCESS, GET_JOB_ERROR, GET_JOB_BEGIN, SET_EDIT_JOB,
    DELETE_JOB_BEGIN, DELETE_JOB_ERROR, EDIT_JOB_SUCCESS, EDIT_JOB_ERROR, EDIT_JOB_BEGIN
} from "./actions";
import axios from "axios";

const token = localStorage.getItem("token")
const user = localStorage.getItem("user")
const userLocation = localStorage.getItem("location")
const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || "",
    jobLocation: userLocation || "",
    showSidebar: false,
    isEditing: false,
    editJobId: "",
    position: "",
    company: "",
    jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
    jobType: "full-time",
    statusOptions: ["interview", "declined", "pending"],
    status: "pending",
    jobs: [],
    totalJobs: 0,
    page: 1,
}

const AppContext = React.createContext()
const url = "http://localhost:5000"

const AppProvider = ({ children }) => {
    const [ state, dispatch] = useReducer(reducers, initialState)

    const authFetch = axios.create({
        baseURL: `${url}/api/v1/`,
    })
    //Request
    authFetch.interceptors.request.use((config) => {
        config.headers.common["Authorization"] = `Bearer ${state.token}`
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    //Response
    authFetch.interceptors.response.use((response) => {
        return response
    }, (error) => {
        console.log(`Interceptor`, error.message)
        if(error.response.status === 401){
            logoutUser()
        }
        return Promise.reject(error)
    })
    const addUserToLocalStorage = ({ user, token, location }) =>{
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", token)
        localStorage.setItem("location", location)
    }
    const removeUserToLocalStorage = () =>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("location")
    }

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT})
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(()=> {
            dispatch({ type: CLEAR_ALERT})
        }, 3000)
    }

    const setUpUser = async ({currentUser, endPoint, alertText}) => {
        console.log(`Reducer Login Current User`, currentUser);
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const response = await axios.post(`${url}/api/v1/auth/${endPoint}`, currentUser)
            const { user, token } = response.data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, location: user.location, alertText }
            })
            addUserToLocalStorage({ user, token, location:user.location })
        }catch (err) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: err.response.data.msg
            })
        }
        clearAlert()
    }

    const toggleSidebar = () => {
        dispatch({
            type: TOGGLE_SIDEBAR
        })
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserToLocalStorage()
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch(`auth/updateUser`, currentUser)
            const { user, location, token } = data;
            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location, token }})
            addUserToLocalStorage({ user, token, location})
        }catch (err) {
            dispatch({ type: UPDATE_USER_ERROR, payload: err.response.data.msg})
        }
        clearAlert()
    }

    const handleChange = ({ name, value}) =>{
        dispatch({ type: HANDLE_CHANGE, payload: { name, value }})
    }

    const clearValues = ()=>{
        dispatch({ type: CLEAR_VALUES})
    }

    const createJob = async ()=>{
        dispatch({ type: CREATE_JOB_BEGIN})
        try {
            const { position, company, jobLocation, jobType, status } = state
            await authFetch.post("/jobs", {
                position, company, jobLocation, jobType, status
            })
            dispatch({ type: CREATE_JOB_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (err) {
            if(err.response.status === 401) return;
            dispatch({ type: CREATE_JOB_ERROR, payload: err.response.data.msg })
        }
        clearAlert()
    }

    const getJob = async () => {
        dispatch({ type: GET_JOB_BEGIN })
        try {
            const { data } = await authFetch.get("/jobs")
            const { jobs, totalJobs, numOfPages } = data;
            console.log(`@@@@@jobs@@@`,jobs, data)
            dispatch({
                type: GET_JOB_SUCCESS,
                payload: { jobs, totalJobs, numOfPages }
            })
        } catch (err) {
            console.log(`Err`,err.response);
            dispatch({
                type: GET_JOB_ERROR,
                payload: err.response.data.msg
            })
            //logoutUser()
        }
        clearAlert()
    }

    const setEditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: id })
    }

    const editJob = async () => {
       dispatch({ type: EDIT_JOB_BEGIN})
        try {
            const { position, company, jobLocation, jobType, status } = state
            await authFetch.patch(`/jobs/${state.editJobId}`, { position, company, jobLocation, jobType, status })
            dispatch({ type: EDIT_JOB_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (err) {
            dispatch({ type:EDIT_JOB_ERROR, payload: err.response.data.msg })
        }
    }
    const deleteJob = async(jobId) => {
        dispatch({ type: DELETE_JOB_BEGIN })
        try{
            await authFetch.delete(`/jobs/${jobId}`)
            getJob()
        } catch(err) {
            dispatch({ type:DELETE_JOB_ERROR, payload: err.response.data.msg })
        }
    }
    return <AppContext.Provider value={{ ...state, displayAlert, setUpUser, toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createJob, getJob, setEditJob, deleteJob, editJob }}>
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }