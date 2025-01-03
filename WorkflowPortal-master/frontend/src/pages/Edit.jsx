import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Edit = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const job = response.data;
        setTitle(job.title);
        setCompany(job.company);
        setLocation(job.location);
        setDescription(job.description);
        setRequirements(job.requirements.join("\n")); // Convert array to multiline string
        setSalary(job.salary);
      } catch (error) {
        setError("Error fetching job details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_BASE_URL}/api/jobs/${id}`,
        {
          title,
          company,
          location,
          description,
          requirements: requirements.split("\n"), // Convert multiline string to array
          salary,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(`/jobs/${id}`);
    } catch (error) {
      setError("Error updating job");
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Edit Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Job Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="company"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Job Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="requirements"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Requirements (one per line)
          </label>
          <textarea
            id="requirements"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            htmlFor="salary"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Salary
          </label>
          <input
            type="text"
            id="salary"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
