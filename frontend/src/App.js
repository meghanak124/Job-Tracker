// src/App.js
import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Paper, TextField, MenuItem } from '@mui/material';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

function App() {
  const [refresh, setRefresh] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const refreshJobs = () => setRefresh(prev => prev + 1);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Job Application Tracker
          </Typography>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search by company or role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
          <TextField
            select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ bgcolor: 'white', borderRadius: 1, minWidth: 120 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Interview">Interview</MenuItem>
            <MenuItem value="Offer">Offer</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <JobForm onJobAdded={refreshJobs} />
        </Paper>

        <Box>
          <JobList
            refresh={refresh}
            onJobUpdated={refreshJobs}
            search={search}
            statusFilter={statusFilter}
          />
        </Box>
      </Container>
    </>
  );
}

export default App;
