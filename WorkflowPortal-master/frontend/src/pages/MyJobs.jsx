import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found. Please log in.');
          return;
        }

        console.log('Fetching jobs from:', `${API_BASE_URL}/api/jobs/myjobs`);
        const response = await axios.get(`${API_BASE_URL}/api/jobs/myjobs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('API Response:', response.data);
        setJobs(response.data);
        
        if (response.data.length === 0) {
          console.log('No jobs returned from the API');
        }
      } catch (error) {
        console.error('Error fetching my jobs:', error.response || error);
        setError('Failed to fetch jobs. Please try again later.');
      }
    };

    fetchMyJobs();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Posted Jobs</h1>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">You haven't posted any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-2">{job.company}</p>
              <p className="text-gray-500 mb-4">{job.location}</p>
              <div className="flex justify-between">
                <Link to={`/jobs/${job._id}`} className="text-blue-500 hover:text-blue-700">View</Link>
                <Link to={`/jobs/${job._id}/edit`} className="text-green-500 hover:text-green-700">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;