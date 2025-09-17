const express = require('express');
const router = express.Router();
const { getJobs, addJob, updateJob, deleteJob } = require('../controllers/jobController');

// Routes
router.get('/', getJobs);         // GET all jobs
router.post('/', addJob);         // ADD new job
router.put('/:id', updateJob);    // UPDATE job by ID
router.delete('/:id', deleteJob); // DELETE job by ID

module.exports = router;
