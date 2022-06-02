import React, { useState } from "react"
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, Alert } from "../../component"

function Profile() {
    const { isLoading, showAlert, user, displayAlert, updateUser } = useAppContext()

    const [name, setName ] = useState(user?.name)
    const [email, setEmail ] = useState(user?.email)
    const [lastName, setLastName ] = useState(user?.lastName)
    const [location, setLocation ] = useState(user?.location)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!name || !email || !location || !lastName){
            displayAlert()
            return
        }
        updateUser({ name, email, lastName, location})
    }
    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h3>profile</h3>
                { showAlert && <Alert />}
                <div className="form-center">
                    <FormRow type="text" name="name" value={name} handleChange={(e) => setName(e.target.value)}></FormRow>
                    <FormRow type="text" name="last Name" value={lastName} handleChange={(e) => setLastName(e.target.value)}></FormRow>
                    <FormRow type="email" name="email" value={email} handleChange={(e) => setEmail(e.target.value)}></FormRow>
                    <FormRow type="text" name="location" value={location} handleChange={(e) => setLocation(e.target.value)}></FormRow>
                    <button className="btn btn-block" type="submit" disabled={isLoading}>{ isLoading ? "Please Wait...": "Save Changes"}</button>
                </div>
            </form>
        </Wrapper>
    )
}

export default Profile