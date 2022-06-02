import React, { useEffect } from "react";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import {useAppContext} from "../context/appContext";

function JobContainer(){
    const { getJob, jobs, isLoading, page, totalJobs } = useAppContext();
    console.log(`@@@@@@@@@@@`,jobs)
    useEffect(() => {
        getJob()
    }, [])
    return(
        <div>
            {
                isLoading ? <Loading center={true}/> : jobs.length === 0 ?
                    <Wrapper><h2>No Jobs to display...</h2></Wrapper> :
                    <Wrapper>
                        <h5>{totalJobs} job{jobs.length> 1 && 's'}</h5>
                        <div className="jobs">
                            {
                                jobs.map((job, index) => {
                                    return <Job key={job._id} {...job}/>
                                })
                            }
                        </div>
                    </Wrapper> }
        </div>
    )
}

export default JobContainer