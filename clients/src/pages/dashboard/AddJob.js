import React from "react"
import { FormRow, Alert, FormRowSelect } from "../../component"
import { useAppContext} from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

function AddJob() {
    const { isLoading, isEditing, showAlert, displayAlert, position, company, jobLocation, jobType, jobTypeOptions, statusOptions, status, handleChange, clearValues, createJob, editJob } = useAppContext()
    const handleJobChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value
        handleChange({ name, value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!position || !company || !jobLocation){
            displayAlert()
            return
        }
        if(!isEditing){
            createJob()
            return;
        }else{
            editJob()
        }
        console.log(`Create Job`)
    }
    return (
        <Wrapper>
            <form className="form">
                <h3>{ isEditing? "Edit Job": "add Job"}</h3>
                { showAlert && <Alert />}
                <div className="form-center">
                    <FormRow type="text" name="position" value={position} handleChange={handleJobChange}/>
                    <FormRow type="text" name="company" labelText="job location" value={company} handleChange={handleJobChange}/>
                    <FormRow type="text" name="jobLocation" value={jobLocation} handleChange={handleJobChange}/>

                    <FormRowSelect lists={statusOptions}
                                   handleChange={handleJobChange}
                                   name="status"
                                   value={status}/>

                    <FormRowSelect lists={jobTypeOptions}
                                   handleChange={handleJobChange}
                                   name="jobType"
                                   value={jobType}/>
                    <div className="btn-container">
                        <button type="button" className="btn btn-block submit-btn" onClick={(e) => handleSubmit(e)} disabled={isLoading}>Submit</button>
                        <button type="submit" className="btn btn-block clear-btn" onClick={(e) => {
                            e.preventDefault()
                            clearValues()
                        }}>Clear</button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob