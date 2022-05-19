import Job from "../models/Job";
import { StatusCodes} from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors"

const createJob = async (req, res, next) => {
    try {
        const { position, company } = req.body;
        if(!position || !company){
            throw new BadRequestError("Please Provide all value")
        }
        req.body.createdBy = req.user.userId
        const job = await Job.create(req.body);
        res.status(StatusCodes.CREATED).json({job})
    } catch (err) {
        next(err)
    }
}

const getAllJob = async (req, res) => {
    res.send("get all Job")
}

const updateJob = async (req, res) => {
    res.send("update Job")
}

const deleteJob = async (req, res) => {
    res.send("delete Job")
}

const showStats = async (req, res) => {
    res.send("show Stats Job")
}

export { createJob, getAllJob, updateJob, deleteJob, showStats }