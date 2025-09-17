import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';


export default function JobForm({ onJobAdded }) {
const [company, setCompany] = useState('');
const [role, setRole] = useState('');
const [link, setLink] = useState('');
const [status, setStatus] = useState('Applied');
const [loading, setLoading] = useState(false);


const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
try {
const res = await axios.post('http://localhost:5000/api/jobs', { company, role, link, status });
onJobAdded && onJobAdded(res.data);
setCompany(''); setRole(''); setLink(''); setStatus('Applied');
} catch (err) {
console.error(err);
alert('Failed to add job');
} finally {
setLoading(false);
}
};


return (
<Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
<TextField label="Company" value={company} onChange={(e)=>setCompany(e.target.value)} required sx={{ flex: '1 1 200px' }} />
<TextField label="Role" value={role} onChange={(e)=>setRole(e.target.value)} required sx={{ flex: '1 1 200px' }} />
<TextField label="Job Link" value={link} onChange={(e)=>setLink(e.target.value)} sx={{ flex: '1 1 200px' }} />


<FormControl sx={{ minWidth: 160 }}>
<InputLabel id="status-label">Status</InputLabel>
<Select labelId="status-label" label="Status" value={status} onChange={(e)=>setStatus(e.target.value)}>
<MenuItem value="Applied">Applied</MenuItem>
<MenuItem value="Interview">Interview</MenuItem>
<MenuItem value="Offer">Offer</MenuItem>
<MenuItem value="Rejected">Rejected</MenuItem>
</Select>
</FormControl>


<Button type="submit" variant="contained" disabled={loading} sx={{ alignSelf: 'center' }}>
{loading ? 'Adding...' : 'Add Job'}
</Button>
</Box>
);
}