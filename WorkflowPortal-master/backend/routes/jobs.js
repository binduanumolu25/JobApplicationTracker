import express from "express";
import Job from "../models/Job.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("Inside / get");

    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error fetching jobs" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    console.log("Inside / post");

    const newJob = new Job({
      ...req.body,
      postedBy: req.userId,
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error creating job" });
  }
});

router.get("/myjobs", auth, async (req, res) => {
  try {
    console.log("Inside /myjobs get");

    const jobs = await Job.find({ postedBy: req.userId }).sort({
      createdAt: -1,
    });
    res.json(jobs);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error fetching your jobs" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log("Inside /id get");

    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ message: "Error fetching job" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    console.log("Inside /id patch");

    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found or you are not authorized to update it",
      });
    }
    res.json(updatedJob);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error updating job" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    console.log("Inside /id delete");

    const deletedJob = await Job.findOneAndDelete({
      _id: req.params.id,
      postedBy: req.userId,
    });
    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found or you are not authorized to delete it",
      });
    }
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error deleting job" });
  }
});

export default router;
