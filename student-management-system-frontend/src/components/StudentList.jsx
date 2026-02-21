import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentList.css';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/students');
            setStudents(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching students:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`http://localhost:8080/api/students/${id}`);
                setStudents(students.filter(student => student.id !== id));
                alert('Student deleted successfully!');
            } catch (error) {
                console.error('Error deleting student:', error);
                alert('Error deleting student');
            }
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="container">
            <div className="header">
                <h1>Student Management System</h1>
                <button className="btn btn-primary" onClick={() => navigate('/add')}> Add New Student </button>
            </div>
            {students.length === 0 ? (
                <p className="no-students">No students found. Click "Add New Student" to get started!</p>
            ) : (
                <div className="table-container">
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Course</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phoneNumber}</td>
                                    <td>{student.address}</td>
                                    <td>{student.course}</td>
                                    <td>
                                        <button className="btn btn-edit" onClick={() => navigate(`/edit/${student.id}`)} > Edit </button>
                                        <button className="btn btn-delete" onClick={() => handleDelete(student.id)} > Delete </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default StudentList;