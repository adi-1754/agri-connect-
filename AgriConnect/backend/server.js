const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ DATABASE CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/agroDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// ✅ MODEL
const Job = mongoose.model("Job", {
  name: String,
  phone: String,
  title: String,
  wage: String,
  location: String,
  status: String
});

// ✅ POST JOB
app.post("/jobs", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json({ message: "Job Posted Successfully" });
});

// ✅ GET JOBS
app.get("/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// ✅ UPDATE JOB STATUS (used by coordinator panel to open/close a job)
app.patch("/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job Updated Successfully", job });
  } catch (err) {
    res.status(400).json({ message: "Invalid job id", error: err.message });
  }
});
  
// START SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});