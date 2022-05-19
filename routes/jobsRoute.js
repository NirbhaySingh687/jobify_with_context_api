import express from "express";
import { createJob, getAllJob, showStats, deleteJob, updateJob } from "../Controllers/jobsController"

const router = express.Router()

router.route("/").post(createJob).get(getAllJob)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router