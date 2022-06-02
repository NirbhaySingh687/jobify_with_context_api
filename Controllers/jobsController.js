import Job from "../models/Job";
import { StatusCodes} from "http-status-codes";
import {BadRequestError, NotFoundError} from "../errors"
import checkPermission from "../utils/CheckPermission";
import mongoose from "mongoose";

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

const getAllJob = async (req, res, next) => {
    try{
        const jobs = await Job.find({ createdBy: req.user.userId});
        res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1})
    }catch (err) {
        next(err)
    }
}

const updateJob = async (req, res, next) => {
    try {
        const { id: jobId } = req.params
        const { company, position } = req.body;
        if(!position || !company){
            throw new BadRequestError("Please Provide all value")
        }
        const job = await Job.findOne({ _id: jobId });
        if(!job){
            throw new NotFoundError(`No job With the Id ${jobId}`)
        }
        checkPermission(req.user, job["createdBy"])
        const updatedJob = await Job.findOneAndUpdate({ _id: job }, req.body, { new: true, runValidators: true})
        res.status(StatusCodes.OK).json({ updatedJob })
    } catch (err) {
        next(err)
    }
}

const deleteJob = async (req, res, next) => {
    try {
        const { id: jobId } = req.params
        const job = await Job.findOne({ _id: jobId });
        if(!job){
            throw new NotFoundError(`No job With the Id ${jobId}`)
        }
        checkPermission(req.user, job["createdBy"])
        await job.remove()
        res.status(StatusCodes.OK).json({ msg: "Success! Job Removed"})
    } catch (err) {
        next(err)
    }

}

const showStats = async (req, res, next) => {
    try {
        let stats = await Job.aggregate([
            { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId)}},
            { $group: { _id: `$status`, count: { $sum: 1 }}}
        ])
        stats = stats.reduce((acc, curr) => {
            const { _id: title, count } = curr;
            acc[title] = count
            return acc
        }, {})

        const defaultStats = {
            pending: stats.pending || 0,
            interview: stats.interview || 0,
            declined: stats.declined || 0,
        }
        let monthlyApplication = []
        res.status(StatusCodes.OK).json({ defaultStats, monthlyApplication })
    } catch (err) {
        next(err)
    }
}

export { createJob, getAllJob, updateJob, deleteJob, showStats }