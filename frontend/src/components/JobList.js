// src/components/JobList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Select,
  FormControl,
  CircularProgress,
  Chip,
  Stack,
  Link,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function JobList({ refresh, onJobUpdated, search, statusFilter }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };
  const filteredJobs = jobs.filter((job) => {
  const matchesSearch =
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.role.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === 'All' || job.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  useEffect(() => {
    fetchJobs();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      onJobUpdated && onJobUpdated();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, { status: newStatus });
      onJobUpdated && onJobUpdated();
    } catch (err) {
      console.error(err);
      alert('Failed to update');
    }
  };

  const chipColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'default';
      case 'Interview':
        return 'primary';
      case 'Offer':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  // inside JobList component, before return



  return (
  <Box>
    {filteredJobs.length === 0 ? (
      <Typography>No jobs found.</Typography>
    ) : (
      <Grid container spacing={2}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} key={job._id}>
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{job.company}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {job.role}
                      </Typography>

                      {job.link && (
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <Link href={job.link} target="_blank" rel="noreferrer">
                            Job Link
                          </Link>
                        </Typography>
                      )}

                      <Typography variant="caption" color="text.secondary">
                        Applied: {new Date(job.dateApplied).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Stack alignItems="flex-end" spacing={1}>
                      <Chip label={job.status} color={chipColor(job.status)} size="small" />
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <Select
                          native
                          value={job.status}
                          onChange={(e) => handleStatusChange(job._id, e.target.value)}
                          inputProps={{ 'aria-label': 'status' }}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Interview">Interview</option>
                          <option value="Offer">Offer</option>
                          <option value="Rejected">Rejected</option>
                        </Select>
                      </FormControl>

                      <Box>
                        <IconButton onClick={() => handleDelete(job._id)} aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
