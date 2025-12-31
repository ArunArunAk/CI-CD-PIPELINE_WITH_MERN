import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
const API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_BASE_URL
  : "";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    grade: "",
  });
  const [editingStudentId, setEditingStudentId] = useState(null);
console.log("API_URL:", API_URL);
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`/api/students`);
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingStudentId) {
      // Update existing student
      try {
        await axios.put(
          `/api/students/${editingStudentId}`,
          newStudent
        );
        fetchStudents();
        setNewStudent({ name: "", age: "", grade: "" });
        setEditingStudentId(null);
      } catch (err) {
        console.log(err);
      }
    } else {
      // Create new student
      try {
        await axios.post(`/api/students`, newStudent);
        fetchStudents();
        setNewStudent({ name: "", age: "", grade: "" });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = (student) => {
    setNewStudent({
      name: student.name,
      age: student.age,
      grade: student.grade,
    });
    setEditingStudentId(student._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Student Management with cicd</h1>
        <form onSubmit={handleFormSubmit} className="student-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newStudent.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newStudent.age}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={newStudent.grade}
            onChange={handleInputChange}
            required
          />
          <button type="submit">
            {editingStudentId ? "Update Student" : "Add Student"}
          </button>
        </form>

        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.grade}</td>
                <td>
                  <button onClick={() => handleEdit(student)}>Update</button>
                  <button onClick={() => handleDelete(student._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
