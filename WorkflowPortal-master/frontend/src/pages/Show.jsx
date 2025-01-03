import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Show = () => {
  const [job, setJob] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/jobs/${id}`);
        setJob(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-xl text-gray-600 mb-2">{job.company}</p>
      <p className="text-lg text-gray-500 mb-4">{job.location}</p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700">{job.description}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Requirements</h2>
        <ul className="list-disc list-inside text-gray-700">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Salary</h2>
        <p className="text-gray-700">{job.salary}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <Link to={`mailto:${job.postedBy.email}`} className="text-gray-700">
          {job.postedBy.email}
        </Link>
      </div>
    </div>
  );
};

export default Show;
